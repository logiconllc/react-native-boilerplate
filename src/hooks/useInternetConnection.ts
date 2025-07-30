import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useInternetConnection = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    // Initial check
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
    });

    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { isConnected };
};
