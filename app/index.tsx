import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image ,Animated} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import LoadingPage from "./loading";
// import LoadingPage from "./loading";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const LoadingNextPage = () => (
  <View style={styles.loadingPage}>
    {/* <LoadingPage/> */}
    <LoadingPage />
  </View>
);

const Index = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [shakeAnimation] = useState(new Animated.Value(0));
  const [backgroundFade] = useState(new Animated.Value(0));

  useEffect(() => {
    const hideSplashScreen = async () => {
      // Simulate a 5-second delay before hiding the splash screen
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setIsSplashVisible(false); // Hide splash screen
      await SplashScreen.hideAsync(); // Manually hide the splash screen
    };

    // Start shake animation and background fade-in animation
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    hideSplashScreen();
  }, []);

  // If the splash screen is visible, display the splash screen
  if (isSplashVisible) {
    return (
      <Animated.View
        style={[
          styles.splashContainer,
          { opacity: backgroundFade }, // Apply fade-in effect to background
        ]}
      >
        <Animated.Image
          source={require("../assets/images/dashboard/splash_icon.png")} // Your splash image
          style={[
            styles.splashImage,
            {
              transform: [
                {
                  translateX: shakeAnimation.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-10, 10], // Shake movement distance
                  }),
                },
              ],
            },
          ]}
        />
      </Animated.View>
    );
  }

  // Redirect to LoadingPage after splash screen
  return <LoadingNextPage />;
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#ffffff", // Background color for splash screen
  },
  splashImage: {
    width:260,
    height:135,
    resizeMode: "contain", // Adjust this to your splash image dimensions
  },
  loadingPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f5f5f5", // Background color for the loading page
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#6200EE",
  },
});

export default Index;
