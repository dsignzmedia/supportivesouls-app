

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image,ScrollView, SafeAreaView, ImageBackground, Platform, Dimensions, TextInput,Alert } from "react-native";
import { router } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { signin, storeAsyncData } from "./services/service";
import { FloatingLabelInput } from "react-native-floating-label-input";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
// import LoadingPage from "./loading";
import FlashMessage, { showMessage } from "react-native-flash-message";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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

  const handleCancel = () => {
    navigation.goBack();
    // console.log(navigation.getState());
  };

  
  async function openLogin() {
    const loginData = { email, password };
    const res = await signin(loginData);

    if (res?.status === 200 && res.success) {
        await storeAsyncData('userDetails', res.user);

         // Show success message
      showMessage({
        message: "Login Successful",
        description: "Welcome back!",
        type: "success",
        icon: "success",
        duration: 1000,
        backgroundColor: "#4CAF50", 
        color: "#FFFFFF", 
        textStyle: { fontSize: 16, fontWeight: "bold" },
        titleStyle: { fontSize: 18 }, 
      });
        
      // Navigate to Dashboard
      try {
        router.replace('/(tabs)/Dashboard');
        console.log('Navigation successful to Dashboard');
      } catch (error) {
        console.error('Failed to navigate to Dashboard:', error);
      }

        // Navigate to Dashboard
        // router.replace('/(tabs)/Dashboard');
    } else {
        // Show error message
      showMessage({
        message: "Invalid credentials. Please try again.",
        type: "danger",
        icon: "danger",
        duration: 1000,
        backgroundColor: "#cc5050", 
        color: "#FFFFFF", 
        textStyle: { fontSize: 16, fontWeight: "bold" }, 
        titleStyle: { fontSize: 18 },
      });

        // Set field errors
        if (res.errors?.email) setEmailError(res.errors.email);
        if (res.errors?.password) setPasswordError(res.errors.password);
    }
}


  return (
    <View style={styles.container}>
      
            {/* {flashMessage.message && (
              <View
                style={[
                  styles.flashMessage,
                  flashMessage.type === 'success' ? styles.success : styles.error,
                ]}
              >
                <Text style={styles.flashText}>{flashMessage.message}</Text>
              </View>
            )} */}

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/dashboard/supportive_souls_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
            <FlashMessage position="center" />

      <View style={styles.bottomContainer}>

        <ImageBackground source={require('../assets/images/dashboard/bottom_image.png')} style={styles.bottomImage}>
        <View style={styles.overlay} />

        <ScrollView >
        <View style={styles.bottomContent}>

          <Text style={styles.heading}>Sign in your account</Text>

          {/* Form Fields */}
          {/* <View> */}
            {/* <Text style={styles.label}>Email</Text> */}
            {/* <TextInput
              style={styles.input}
              placeholder="selva@dselva.com"
              // placeholderTextColor="#aaa"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            /> */}
             {/* Email Field */}
            <View style={styles.floatingInputContainer}>
              <FloatingLabelInput
                label="Email"
                value={email}
                keyboardType="email-address"
                containerStyles={styles.containerStyles}
                labelStyles={styles.labelStyles}
                inputStyles={styles.inputStyles}
                onChangeText={(value) => setEmail(value)}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text>: null}
            </View>


            {/* Password Field */}
            <View style={styles.floatingInputContainer}>
            <FloatingLabelInput
              label="Password"
              value={password}
              isPassword={!isPasswordVisible} // Toggle password visibility
              customHidePasswordComponent={password !== '' && (
                <FontAwesome 
                  name="eye-slash" 
                  size={20} 
                  color="#AFAFAF" 
                  onPress={() => setIsPasswordVisible(false)} // Handle hide password
                />
              )}
              customShowPasswordComponent={password !== '' && (
                <FontAwesome 
                  name="eye" 
                  size={20} 
                  color="#AFAFAF" 
                  onPress={() => setIsPasswordVisible(true)} // Handle show password
                />
              )}
              containerStyles={styles.containerStyles}
              labelStyles={styles.labelStyles}
              inputStyles={styles.inputStyles}
              onChangeText={(value) => setPassword(value)}
            />
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text>: null}
            </View>
            {/* Forget Password Link */}
            <TouchableOpacity style={styles.forgetContainer}> 
              <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
            </TouchableOpacity>
          {/* </View> */}
 

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.signInButton} onPress={handleSubmit} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} activeOpacity={0.7}>
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
    marginTop:50,
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
    marginBottom: 25,
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
    // paddingLeft: 15,
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
    marginBottom: 10,
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
  forgetContainer:{
    alignItems:'flex-end',
    justifyContent:'flex-end',
    width:288,
  },
  forgotPasswordText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "right",
    justifyContent: "flex-end",
    // marginRight: 10,
    marginBottom:30,
    textDecorationLine: "none",
    fontFamily: "PP_Regular",
  },
  // 
  inputStyles: {
    color: '#000000',
    borderRadius: 5,
    fontSize:16,
    textDecorationLine:'none',

},
containerStyles: {
  borderWidth: 1,
  paddingHorizontal: 10,
  backgroundColor: '#fff',
  borderColor: '#AFAFAF',
  borderRadius: 5,
  height: 47,
  width:28,
  marginBottom: 20,
},
labelStyles: {
  backgroundColor: '#fff',
  paddingHorizontal: 5,
  fontSize: 17,
  color:'#00000',
},
floatingInputContainer: {
    width: 288, // Constrain the width to 288px
    // marginBottom: 20,
  },
  flashMessage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 10,
    alignItems: 'center',
},
success: {
    backgroundColor: 'green',
},
error: {
    backgroundColor: 'red',
},
flashText: {
    color: 'white',
    fontWeight: 'bold',
},
});
