import { Text, TouchableOpacity } from "react-native";

export const Button = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      className="bg-blue-500 p-2 rounded-md w-auto"
      onPress={onPress}
    >
      <Text className="text-white text-center">{title}</Text>
    </TouchableOpacity>
  );
};
