
import React, { useEffect, useRef,useState } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';


export default function CustomSplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const animationProgress = useRef(new Animated.Value(1)).current;
  
    useEffect(() => {
      setTimeout(() => {
      Animated.timing(animationProgress, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setIsLoading(true);
     });
    },1000)
    }, [animationProgress]);
  
    const interpolatedProgress = animationProgress.interpolate({
      inputRange: [0, 3],
      outputRange: ['0%', '3%'],
    });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/supportive_souls_logo.png')}
          style={styles.gif}
          resizeMode="contain"
        />
      </View>
    );
  }

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3366cc',
    },
    gif: {
      width: '100%',
      height: '100%',
    },
    logoText:{
      marginBottom:55,
      color:'#fff',
      fontSize:20,
      fontWeight:'semibold',
      fontFamily:'LatoRegular'
  },
});