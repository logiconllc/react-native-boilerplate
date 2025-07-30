import { Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen } from "expo-router";
import React, { ReactNode, useEffect } from "react";
import { Platform, Linking } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { StatusBar } from "expo-status-bar";
import { useInternetConnection } from "@/hooks/useInternetConnection";
import NetInfo from "@react-native-community/netinfo";
import { NoInternetModal } from "@/components/ui/no-internet-modal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import { NAV_THEME } from "@/lib/constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: {
    regular: {
      fontFamily: "Urbanist-Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Urbanist-Medium",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "Urbanist-Bold",
      fontWeight: "700",
    },
    heavy: {
      fontFamily: "Urbanist-Heavy",
      fontWeight: "900",
    },
  },
};

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before app is ready
SplashScreen.preventAutoHideAsync();

export default function RootProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { isConnected } = useInternetConnection();

  const handleRetryConnection = async () => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      // Open device settings if on mobile
      if (Platform.OS !== "web") {
        if (Platform.OS === "ios") {
          Linking.openURL("App-Prefs:root=WIFI");
        } else {
          Linking.sendIntent("android.settings.WIFI_SETTINGS");
        }
      }
    }
  };

  useEffect(() => {
    // Add background color for web platform
    if (Platform.OS === "web") {
      document.documentElement.classList.add("bg-background");
    }
    // Hide splash screen once app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={LIGHT_THEME}>
        <GestureHandlerRootView className="flex-1">
          <BottomSheetModalProvider>
            <StatusBar style="dark" />
            {children}
            <NoInternetModal
              isVisible={!isConnected}
              onRetry={handleRetryConnection}
            />
            <PortalHost />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
