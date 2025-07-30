import { CustomBottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { ScrollView, View } from "react-native";

export default function Index() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <ScrollView className="flex-1 android:pt-2">
      <View className="gap-8 px-4 pb-4">
        {/* Typography Showcase */}
        <View className="gap-4">
          <Text variant="h1" weight="bold" className="text-primary">
            Typography Examples
          </Text>
          <Text variant="h1" weight="bold">
            Heading 1
          </Text>
          <Text variant="h2" weight="semiBold">
            Heading 2
          </Text>
          <Text variant="h3" weight="medium">
            Heading 3
          </Text>
          <Text variant="p1" weight="regular">
            Paragraph 1 - Regular text for main content
          </Text>
          <Text variant="p2" weight="medium">
            Paragraph 2 - Medium text for secondary content
          </Text>
          <Text variant="p3" weight="regular" className="text-gray-500">
            Paragraph 3 - Small text for captions
          </Text>
        </View>

        {/* Button Variants Showcase */}
        <View className="gap-4">
          <Text variant="h2" weight="bold" className="text-primary">
            Button Variants
          </Text>
          <Button>
            <Text>Default Button</Text>
          </Button>
          <Button variant="secondary">
            <Text>Secondary Button</Text>
          </Button>
          <Button variant="outline">
            <Text>Outline Button</Text>
          </Button>
          <Button variant="destructive">
            <Text>Destructive Button</Text>
          </Button>
          <Button loading loadingText="Loading...">
            <Text>Loading Button</Text>
          </Button>
          <Button disabled>
            <Text>Disabled Button</Text>
          </Button>
        </View>

        {/* Bottom Sheet Showcase */}
        <View className="gap-4">
          <Text variant="h2" weight="bold" className="text-primary">
            Bottom Sheet
          </Text>
          <Button onPress={handleOpenBottomSheet}>
            <Text>Open Bottom Sheet</Text>
          </Button>
        </View>

        {/* Bottom Sheet Component */}
        <CustomBottomSheet
          ref={bottomSheetRef}
          snapPoints={["30%", "50%", "75%"]}
          enablePanDownToClose
        >
          <View className="p-4">
            <Text variant="h3" weight="semiBold" className="mb-4">
              Bottom Sheet Content
            </Text>
            <Text variant="p1">
              This is an example of the bottom sheet component. You can
              customize the content and behavior as needed.
            </Text>
            <Button
              className="mt-4"
              variant="secondary"
              onPress={() => bottomSheetRef.current?.close()}
            >
              <Text>Close Bottom Sheet</Text>
            </Button>
          </View>
        </CustomBottomSheet>
      </View>
    </ScrollView>
  );
}
