import { Text } from "react-aria-components";
import { tv } from "tailwind-variants";

const classNames = tv({
  slots: {
    error: "text-xs text-red-500",
    desc: "text-xs",
  },
})();

interface FieldMessageProps {
  description?: string;
  error?: string;
}

export const FieldMessage = ({ description, error }: FieldMessageProps) => {
  if (error) {
    return (
      <Text className={classNames.error()} slot='errorMessage'>
        {error}
      </Text>
    );
  }

  if (description) {
    return (
      <Text className={classNames.desc()} slot='description'>
        {description}
      </Text>
    );
  }

  return null;
};
