import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform,Image } from 'react-native';
import HeadersImage from '@/components/Admin/HeadersImage';
import { FontAwesome } from '@expo/vector-icons'; 
import { router } from "expo-router";
import { getAsyncData, yourDonation } from '../services/service';


const Donations = ({ children }: any) => {
  const [yourTotalDonation , setYourTotalDonation] = useState('');
  const [paymentDates,setPaymentDates] =useState('');

  const yourDonationInit = async () => {
    const data = await getAsyncData('userDetails')
    if(data){
      const total = await yourDonation(data.id);
      console.warn('total => ', total);
      setYourTotalDonation(total.total)

      // Get the current year and calculate last year
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

      // Split dates if they are comma-separated and format them
      const formattedDates = total.payment_dates
        .split(',')
        .map((date) => new Date(date))
        .filter((date) => date.getFullYear() === lastYear) // Only include dates from last year
        .map((date) =>
          `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`
        )
        .join(', ');

        setPaymentDates(formattedDates);

    }
    else{
      console.log('total is empty')
    }
    
  };
  

useEffect(() => {
      yourDonationInit();
    }, []);
  const openTheLogin = ()=>{
    router.push('../login');
  }

  return (
    <View style={styles.container}>

      <HeadersImage>
        <View style={styles.donationContent}>
          <Text style={styles.donationname}>Your Donations</Text>
        </View>
      </HeadersImage>
      
      <View style={styles.Content}>
        {/* Donation Info Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            {/* Donation Amount Section */}
            <View style={styles.infoContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../../assets/images/dashboard/donation_image.png')}
                  style={styles.iconImage}
                  resizeMode="contain"
                />            
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.amountText}>₹ {yourTotalDonation}</Text>
                <Text style={styles.labelText}>Your Donation</Text>
              </View>
            </View>

            <View style={styles.verticalLine}></View>

            {/* Date Section */}
            <View style={styles.infoContainer}>
              <View style={styles.iconContainer}>
              <Image
                  source={require('../../assets/images/dashboard/donation_date_icon.png')}
                  style={styles.iconImage}
                  resizeMode="contain"
                />             
                </View>
              <View style={styles.textContainer}>
                <Text style={styles.dateText}>{paymentDates}</Text>
                <Text style={styles.labelText}>Donation Date</Text>
              </View>
            </View>
          </View>

          {/* Utilization Button */}
          <TouchableOpacity style={styles.utilizationButton}>
            <Text style={styles.utilizationButtonText}>Check your donations utilization</Text>
          </TouchableOpacity>
        </View>

        {/* Impact Text */}
        <View>
          <Text style={styles.impactText}>To make an Social Impact</Text>

          {/* Donate More Button onPress={openTheLogin}*/}
          <TouchableOpacity style={styles.donateButton}>
            <Text style={styles.donateButtonText}>Donate More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
  },
  donationContent:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'flex-end',
    paddingBottom:30,
    },
    donationname:{
      color:'#fff',
      fontSize:24,
      fontFamily:'PN_BoldItalic',
      justifyContent:'center',
      textAlign:'center',
      alignItems:'center',
      // marginTop:70,
    },
  Content:{
    paddingHorizontal:25,
    paddingTop:25,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    // padding: 16 ,
    paddingVertical:14,
    paddingHorizontal:12,
    marginVertical: 16,
    marginBottom:50,
    borderWidth:1,
    borderColor:'#E0E0E0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    marginBottom:25,

  },
  verticalLine:{
    backgroundColor:'#E5E5E6',
    width:1,
    marginHorizontal:14,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent:'space-between'
  },
  iconContainer: {
    marginRight: 6,
  },
  iconImage: {
    width: 42,
    height: 42,
    objectFit:'contain'
  },
  textContainer: {
    // flex: 1,
  },
  amountText: {
    fontSize: 15,
    fontFamily:'PP_SemiBold',
    color: '#000000',
  },
  dateText: {
    fontSize: 15,
    fontFamily:'PP_SemiBold',
    color: '#333',
  },
  labelText: {
    fontSize: 10,
    fontFamily:'RB_Regular',
    color: '#666',
  },
  utilizationButton: {
    paddingHorizontal:12,
    paddingVertical:6,
    height:36,
    borderWidth: 1,
    borderColor: '#85B336',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent:'center',
    margin:'auto',
  },
  utilizationButtonText: {
    color: '#85B336',
    fontSize: 14,
    fontFamily:'PP_Medium',
  },
  impactText: {
    fontSize: 18,
    fontFamily:'PP_Regular',
    color: '#000000',
    textAlign: 'center',
    // marginVertical: 24,
    marginBottom:20,
  },
  donateButton: {
    width:288,
    height:42,
    backgroundColor: '#85B336',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    margin:'auto',
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily:'PP_SemiBold',
  },
});

export default Donations;