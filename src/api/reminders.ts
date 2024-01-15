import type { QueryClient } from "@tanstack/react-query";

import type { ReminderFormValues } from "~/modals/Event";
import { api, getAuthHeaders } from "./axios";

const domain = "reminder";
const ALL = "all";

export interface Reminder {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  minutes: number;
  allDay: boolean;
}

export const getRemindersQuery = {
  queryKey: [domain, ALL, "getRemindersQuery"],
  queryFn: () => api.get<Reminder[]>("/events"),
};

export const getReminderQuery = (id: string | null) => ({
  enabled: id !== null,
  queryKey: [domain, id, "getReminderQuery"],
  queryFn: () =>
    api
      .get<Reminder>(`/events/${id}`)
      .then((r) => ({ ...r.data, minutes: r.data.minutes + 30 })),
});

export const createReminder = {
  mutation: async (reminder: ReminderFormValues) => {
    const response = await api.post<Reminder>(
      `/events`,
      { ...reminder },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  },
  invalidates: (
    queryClient: QueryClient,
    {
      reminderId,
    }: {
      reminderId?: string;
    },
  ) => {
    void queryClient.invalidateQueries([domain, ALL]);
    void queryClient.invalidateQueries([domain, reminderId]);
  },
};

export const updateReminder = {
  mutation: async (reminder: Reminder) => {
    const response = await api.put<Reminder>(`/events`, reminder, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
  invalidates: (
    queryClient: QueryClient,
    {
      reminderId,
    }: {
      reminderId?: string;
    },
  ) => {
    void queryClient.invalidateQueries([domain, ALL]);
    void queryClient.invalidateQueries([domain, reminderId]);
  },
};

export const deleteReminder = {
  mutation: async (reminder: Reminder) => {
    await api.delete<void>(`/events/${reminder.id}`, {
      headers: getAuthHeaders(),
    });
  },
  invalidates: (queryClient: QueryClient, reminderId: string) => {
    void queryClient.invalidateQueries([domain, ALL]);
    void queryClient.invalidateQueries([domain, reminderId]);
  },
};
