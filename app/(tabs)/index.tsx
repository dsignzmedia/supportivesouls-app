
import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { ThemeProvider } from 'react-native-paper';

export default function Index() {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <ThemeProvider> */}
        <Stack>
          {/* <Stack.Screen name="index" options={{ title: 'Home Screen' }} />
          <Stack.Screen name="Home" options={{ title: 'Home Screen' }} /> */}
          <Stack.Screen name="Dashboard" options={{ title: 'Dashboard Screen' }} />
          <Stack.Screen name="Favorites" options={{ title: 'Favorites Screen' }} />
        </Stack>
        {/* </ThemeProvider> */}
    </GestureHandlerRootView>

    );
};

