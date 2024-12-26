import { TextInput } from "react-native";

export const Input = ({ placeholder }: { placeholder: string }) => {
  return (
    <TextInput
      placeholder={placeholder}
      className="border border-gray-300 rounded-md p-2"
    />
  );
};
