import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView,ImageBackground,Platform ,Dimensions} from "react-native";
import { navigate } from 'expo-router/build/global-state/routing';
import { router } from "expo-router";

const { width, height } = Dimensions.get('window');

const openLogin = ()=> {
  router.push('/login');
}

// Adjust height based on platform
const adjustedHeight = Platform.OS === "ios" ? height - 285 : height - 80;

export default function LoadingPage() {
  return (

      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image
              source={require('../assets/images/dashboard/supportive_souls_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
        </View>

        <View style={styles.bottomContainer}>

          {/* bottom image */}
          <ImageBackground source={require('../assets/images/dashboard/bottom_image.png')} style={styles.bottomImage}>

          {/* Semi-transparent Overlay */}
          <View style={styles.overlay} />

          <Text style={styles.heading}>Empowering Futures Through Education</Text>
          <Text style={styles.description}>
            Education is the foundation for a brighter tomorrow, and Supportive Souls Charitable Trust
            is dedicated to making it accessible to every child. With your support, we have helped 190+
            students pursue education, opening doors to endless opportunities.
            {"\n"}Join us in transforming lives and make a difference.
          </Text>

          {/* Buttons */}
          <View style={styles.buttoncontainer}>
            <TouchableOpacity style={styles.donorButton} onPress={openLogin}>
              <Text style={styles.buttonText}>Donor Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join With Us</Text>
            </TouchableOpacity>
          </View>
          </ImageBackground>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  bottomLoadingImage:{
    width:'100%',
    height:600,
    objectFit:'cover',
  },
  logoContainer: {
    alignItems: "center",
    borderColor:'red',
    marginTop: Platform.OS === "ios"?80:80,
    width:260,
    height:135,
    marginBottom:40,
    alignSelf:'center',
  },
  logo: {
    width:'100%',
    height:'100%',
  },
  bottomContainer:{
    flex:1,
  },
  bottomImage:{
    width:width,
    height:'100%',
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    overflow:'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "#83B624",
    opacity: 0.8,
    borderTopRightRadius:50,
    borderTopLeftRadius:50,
  },
  heading: {
    fontSize: 30,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 25,
    fontFamily:'PN_BoldItalic',
    marginTop:30,
    letterSpacing:2,
  },
  description: {
    fontSize: 14,
    fontFamily:'PP_Regular',
    letterSpacing:1,
    color: "#ffffff",
    textAlign: "center",
    paddingHorizontal:10,
    marginBottom: 20,
    // maxWidth:390,
    lineHeight:21,
  },
  buttoncontainer:{
    alignItems: "center",
  },
  donorButton: {
    backgroundColor: "#557C0B",
    borderRadius: 10,
    width: 288,
    height:42,
    justifyContent:'center',
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily:'PP_SemiBold',
    letterSpacing:1,
  },
  joinButton: {
    backgroundColor: '#557C0B4D',
    borderRadius: 10,
    borderWidth: 1,
    width: 288,
    height:42,
    justifyContent:'center',
    borderColor: "#608913",
    alignItems: "center",
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily:'PP_SemiBold',
    letterSpacing:1,
  },

});
