import React, { useEffect, useState ,useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform,Image ,Animated,Linking, Alert} from 'react-native';
import HeadersImage from '@/components/Admin/HeadersImage';
import { FontAwesome } from '@expo/vector-icons'; 
import { router } from "expo-router";
import { getAsyncData, yourDonation } from '../services/service';
import CustomBottomsheetModel from "@/components/common/CustomBottomsheetModel";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';


const Donations = ({ children }: any) => {
  const [yourTotalDonation , setYourTotalDonation] = useState('');
  const [paymentDates,setPaymentDates] =useState('');
  const [loading, setLoading] = useState(true); 
  const fadeAnim = useRef(new Animated.Value(0.3)).current;
  const secondSheetRef = useRef<BottomSheetModal>(null);
  
  const handleOpenDetails = () => {
    secondSheetRef.current?.present();
  };


  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0.3, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);


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
    setLoading(false);
  };
  

useEffect(() => {
      yourDonationInit();
    }, []);
  const openTheLogin = ()=>{
    router.push('../login');
  }

  // Function to open UPI apps with deep linking
  const openPaymentApp = (upiId: string, appPackage: string) => {
    const url = `upi://pay?pa=${upiId}&pn=Supportive Souls&cu=INR`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", `Please install ${appPackage} to continue`);
    });
  };

  return (
        <BottomSheetModalProvider>
    
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
                {loading ? (
                  <Animated.View style={[styles.skeletonBox, { opacity: fadeAnim }]} />
                ) : (
                  <Text style={styles.amountText}>₹ {yourTotalDonation || 'N/A'}</Text>
                )}
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
                {loading ? (
                  <Animated.View style={[styles.skeletonBox, { opacity: fadeAnim }]} />
                ) : (
                  <Text style={styles.dateText}>{paymentDates || 'N/A'}</Text>
                )}
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

          <TouchableOpacity style={styles.donateButton} activeOpacity={0.8} onPress={handleOpenDetails}>
            <Text style={styles.donateButtonText}>Donate More</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
    {/* Bottom Sheet */}
<CustomBottomsheetModel
  bottomSheetRef={secondSheetRef}
  snapPoints={['75%', '100%']}
  initialIndex={0}
  showHandleIndicator={true}
>
  <View style={styles.bottomSheetContainer}>

    {/* Heading & Description */}
    <View style={{marginBottom: 20}}>
      <Text style={styles.heading}>Donate</Text>
      <Text style={styles.content}>
        We are committed towards making a positive impact in the lives of those in need. Our programs and services focus on 
        education, fight-hunger, and community development, and we rely on the generosity of donors like you to continue 
        our work. We thank you for considering a donation to our charity trust and for helping us to create a brighter future for all.
      </Text>
    </View>

    {/* Donation Details */}
    <View style={styles.detailsContainer}>
      <View style={{borderWidth:1, padding:10,borderRadius:10, borderColor:'#E0E0E0',width:'100%'}}>
    
        <View style={styles.detailRow}>
          {/* <FontAwesome name="check-circle" size={16} color="green" /> */}
          <Text style={styles.label}>Account Number:</Text>
          <Text style={styles.value}>1169120030000442</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Account Name:</Text>
          <Text style={styles.value}>SUPPORTIVE SOULS CHARITABLE TRUST</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>IFSC:</Text>
          <Text style={styles.value}>UJVN0001169</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Account Type:</Text>
          <Text style={styles.value}>Current Account</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>UPI ID:</Text>
          <Text style={[styles.value, styles.upiId]}>ujjbb8398972371@ujjivan</Text>
        </View>
      </View>
    </View>

    {/* Payment Icons */}
    <View style={styles.paymentContainer}>
      <Text style={styles.heading}>Donate via UPI</Text>
      <View style={styles.iconContainer}>

        <TouchableOpacity onPress={() => openPaymentApp('ujjbb8398972371@upi', 'PhonePe')}>
          <Image source={require('../../assets/images/amount-icon/google-pay.png')} style={styles.icon} />
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => openPaymentApp('ujjbb8398972371@paytm', 'Paytm')}>
          <Image source={require('../../assets/images/amount-icon/phone-pe.png')} style={styles.icon} />
        </TouchableOpacity>

      
        <TouchableOpacity onPress={() => openPaymentApp('ujjbb8398972371@upi', 'Google Pay')}>
          <Image source={require('../../assets/images/amount-icon/paytm-icons.png')} style={styles.icon} />
        </TouchableOpacity>

      </View>
    </View>
  </View>
</CustomBottomsheetModel>

    </BottomSheetModalProvider>
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
    // display:'flex',
    flexDirection:'row',
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
  skeletonBox: { width: 80, height: 20, backgroundColor: '#ccc', borderRadius: 4, marginBottom: 4 },
  bottomSheetContainer:{
    padding: 16,
  },
  heading:{
    fontSize: 18,
    fontFamily:'PP_Bold',
    color: '#000000',
    marginBottom: 16,
  },
  content:{
    fontSize: 14,
    fontFamily:'PP_Regular',
    color: '#333',
    textAlign: 'justify',
    lineHeight: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 10,
  },
  detailRow: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    // marginLeft: 5,
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    marginLeft: 5,
    color: '#666',
  },
  upiId: {
    color: 'green',
  },
  qrCode: {
    width: 100,
    height: 100,
    marginLeft: 20,
  },
  paymentContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
});

export default Donations;