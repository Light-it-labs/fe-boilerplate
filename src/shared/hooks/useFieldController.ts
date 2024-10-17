import { Control, FieldValues, Path, useController } from "react-hook-form";

export function useFieldController<U extends FieldValues>({
  name,
  control,
}: {
  name?: Path<U>;
  control?: Control<U>;
}) {
  return name && control ? useController({ name, control }) : null;
}
