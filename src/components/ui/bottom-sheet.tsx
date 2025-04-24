import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

interface BottomSheetProps extends Partial<BottomSheetModalProps> {
  children: React.ReactNode;
  snapPoints?: string[] | number[];
  onChange?: (index: number) => void;
  enablePanDownToClose?: boolean;
  enableDynamicSizing?: boolean;
  backdropOpacity?: number;
}

export const CustomBottomSheet = React.forwardRef<
  BottomSheetModal,
  BottomSheetProps
>(
  (
    {
      children,
      snapPoints: customSnapPoints,
      onChange,
      enablePanDownToClose = true,
      enableDynamicSizing = false,
      backdropOpacity = 0.5,
      ...props
    },
    ref,
  ) => {
    // Define default snap points if none provided
    const snapPoints = useMemo(
      () => customSnapPoints ?? ["25%", "50%", "90%"],
      [customSnapPoints],
    );

    // Backdrop component
    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={backdropOpacity}
        />
      ),
      [backdropOpacity],
    );

    // Handle sheet changes
    const handleSheetChanges = useCallback(
      (index: number) => {
        onChange?.(index);
      },
      [onChange],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={enablePanDownToClose}
        enableDynamicSizing={enableDynamicSizing}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.indicator}
        backgroundStyle={styles.background}
        {...props}
      >
        <View style={styles.contentContainer}>{children}</View>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  background: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  indicator: {
    backgroundColor: "#CCCCCC",
    width: 32,
  },
});

CustomBottomSheet.displayName = "CustomBottomSheet";
