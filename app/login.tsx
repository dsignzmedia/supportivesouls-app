import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image,ScrollView, SafeAreaView, ImageBackground, Platform, Dimensions, TextInput,Alert } from "react-native";
import { router } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { signin, storeAsyncData } from "./services/service";

const { width, height } = Dimensions.get('window');

// const openLogin = () => {
//   // Navigate to the login page
//   router.push('/login');
// }

// Adjust height based on platform
const adjustedHeight = Platform.OS === "ios" ? height - 285 : height - 80;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigation();

  const handleSubmit = () => {

    let valid = true;
    // Reset error states
    setEmailError("");
    setPasswordError("");

    // Check if email is empty
    if (!email) {
      setEmailError("Email is required!");
      valid = false;
    }

    // Check if password is empty
    if (!password) {
      setPasswordError("Password is required!");
      valid = false;
    }

    if (valid) {
      openLogin(); 
    }
  };

  
 async function openLogin() {
    const loginData = {email, password};
    const res = await signin(loginData);
    console.warn('email => ', email);
    console.warn('password => ',  password);
    // console.warn('res => ', res);  
    // console.warn('email=>',email);
    // console.warn('password=>',password);
    // router.push('/(tabs)/Dashboard');
    
      if (res?.status === 200 && res.success) {
        console.log("Login successful:", res.message);
        // Navigate to dashboard or next screen

        await storeAsyncData('userDetails', res.user);
        router.push('/(tabs)/Dashboard');
      } else {
        alert('Login credientals are invalid....')
        console.warn("Login failed:", res.message);
        if (res.errors.email) setEmailError(res.errors.email);
        if (res.errors.password) setPasswordError(res.errors.password);
        
  }
} 

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

        <ImageBackground source={require('../assets/images/dashboard/bottom_image.png')} style={styles.bottomImage}>
        <View style={styles.overlay} />

        <ScrollView >
        <View style={styles.bottomContent}>

          <Text style={styles.heading}>Sign in your account</Text>

          {/* Form Fields */}
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="selva@dselva.com"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.passwordinput}
              placeholder="********"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

            {/* Forget Password Link */}
            <TouchableOpacity onPress={() => console.log("Navigate to Forget Password Screen")}>
              <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
            </TouchableOpacity>
          </View>


          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={()=>navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </View>

          </ScrollView>

        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    // backgroundColor:'#fff',
  },
  logoContainer: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 80 : 80,
    width: 260,
    height: 135,
    marginBottom: 40,
    alignSelf: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  bottomContainer: {
    flex: 1,
  },
  bottomImage: {
    width: width,
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#83B624",
    opacity: 0.8,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  bottomContent:{
    marginTop:40,
    // marginHorizontal:40,
    // paddingTop:40,
    // paddingHorizontal:40,
    // borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
  },
  heading: {
    fontSize: 30,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 35,
    fontFamily: "PN_BoldItalic",
    letterSpacing: 1,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
    fontFamily: "PP_Regular",
  },
  // inputContainer: {
  //   marginHorizontal: 20,
  //   marginBottom: 20,
  // },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    height: 42,
    width:288,
    marginBottom: 20,
    paddingLeft: 15,
    alignItems:'center',
    justifyContent:'center',
    fontSize: 15,
    fontFamily:'PP_Regular',
    color: "#888888",
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 2,
  },
  passwordinput:{
    backgroundColor: "#ffffff",
    borderRadius: 10,
    height: 42,
    // paddingHorizontal:15,
    // paddingVertical:15,
    width:288,
    marginBottom: 5,
    paddingLeft: 15,
    alignItems:'center',
    justifyContent:'center',
    fontSize: 15,
    fontFamily:'PP_Regular',
    color: "#888888",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 15,
    // textAlign: "center",
  },
  buttonContainer: {
    // alignItems: "center",
  },
  signInButton: {
    backgroundColor: "#557C0B",
    width: 288,
    height:42,
    borderRadius: 10,
    justifyContent:'center',
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PP_SemiBold",
    letterSpacing:1,
  },
  cancelButton: {
    backgroundColor: '#557C0B4D',
    borderColor: "#608913",
    borderWidth: 1,
    width: 288,
    height:42,
    borderRadius: 10,
    justifyContent:'center',
    alignItems: "center", 
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PP_SemiBold",
    letterSpacing:1,
  },
  forgotPasswordText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "right",
    marginRight: 10,
    marginBottom:30,
    textDecorationLine: "none",
    fontFamily: "PP_Regular",
  },
});
