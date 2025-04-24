import React from "react";
import { View, Modal } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import WifiOff from "@/assets/images/wifi-off.svg";

interface NoInternetModalProps {
  isVisible: boolean;
  onRetry: () => void;
}

export const NoInternetModal = ({
  isVisible,
  onRetry,
}: Readonly<NoInternetModalProps>) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-2xl p-6 w-[90%]">
          <View className="items-center gap-4">
            <WifiOff width={64} height={64} />
            <Text variant="h4" weight="semiBold" className="text-center">
              No Internet Connection
            </Text>
            <Text
              variant="p2"
              weight="regular"
              className="text-center text-gray-500"
            >
              Please check your internet connection and try again
            </Text>
            <Button onPress={onRetry} className="w-full mt-2">
              <Text variant="p2" weight="medium" className="text-white">
                Retry
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
