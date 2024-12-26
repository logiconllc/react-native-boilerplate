import { Button } from "@/components/button";
import { Text, View } from "react-native";
import "~/global.css";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center gap-4">
      <Text>Welcome to our react native starter template!</Text>
      <Button title="Get Started" onPress={() => {}} />
    </View>
  );
}
