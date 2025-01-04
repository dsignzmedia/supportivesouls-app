import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView ,ImageBackground} from 'react-native';

const Headers = ({children}:any) => {
  return (
    <View style={styles.headerContainer}>
        <ImageBackground source={require('../../assets/images/dashboard/header_image.png')} style={styles.bottomImage}>
        {children}
        </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
    headerContainer: {
  },
  bottomImage: {
    width:'100%',
    height:140,
    overflow: "hidden",
  },
});
export default Headers;