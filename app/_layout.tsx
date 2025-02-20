import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Tabs from './(tabs)/_layout';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // PoltawskiNowy font 
    PN_Bold: require('../assets/fonts/Poltawski_Nowy/static/PoltawskiNowy-Bold.ttf'),
    PN_BoldItalic: require('../assets/fonts/Poltawski_Nowy/static/PoltawskiNowy-BoldItalic.ttf'),
    PN_Italic: require('../assets/fonts/Poltawski_Nowy/static/PoltawskiNowy-Italic.ttf'),
    PN_Medium: require('../assets/fonts/Poltawski_Nowy/static/PoltawskiNowy-Medium.ttf'),
    PN_MediumItalic: require('../assets/fonts/Poltawski_Nowy/static/PoltawskiNowy-MediumItalic.ttf'),
    PN_Regular: require('../assets/fonts/Poltawski_Nowy/static/PoltawskiNowy-Regular.ttf'),
    PN_SemiBold: require('../assets/fonts/Poltawski_Nowy/static/PoltawskiNowy-SemiBold.ttf'),
    PN_SemiBoldItalic: require('../assets/fonts/Poltawski_Nowy/static/PoltawskiNowy-SemiBoldItalic.ttf'),
    // Poppins font 
    PP_Regular: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    PP_SemiBold: require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PP_Medium: require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    // Roboto
    RB_Regular: require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
    RB_Bold: require('../assets/fonts/Roboto/Roboto-Bold.ttf'),

  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    <ThemeProvider value={ DefaultTheme}>
    {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
          <GestureHandlerRootView>

      <Stack  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="Dashboard" />
        <Stack.Screen name="Jionprogram" />
        <Stack.Screen name="LoadingPage" />
        <Stack.Screen name="Login" />

      </Stack>
      <StatusBar style="auto" />
      </GestureHandlerRootView>

    </ThemeProvider>
  );
}
