import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import React from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { router } from 'expo-router';
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";

const SocialImpact = () => {

  
  return (
    <View>
      <HeadersImage>
        <View style={styles.scholarsContent}>
          <Text style={styles.scholarsname}>Social Impact</Text>
        </View>
      </HeadersImage> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scholarsContent:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'flex-end',
    paddingBottom:30,
    },
    scholarsname:{
      color:'#fff',
      fontSize:24,
      fontFamily:'PN_BoldItalic',
      justifyContent:'center',
      textAlign:'center',
      alignItems:'center',
      // marginTop:70,
    },
});
export default SocialImpact