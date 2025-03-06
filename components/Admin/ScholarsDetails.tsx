import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform ,Animated,Linking, Alert } from 'react-native';
import React, { useEffect, useState ,useRef } from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, useSearchParams } from 'expo-router/build/hooks';
import { getScholarDetails } from '@/app/services/service';
import CustomBottomsheetModel from "@/components/common/CustomBottomsheetModel";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';


const ScholarsDetails = () => {

  const {id} = useLocalSearchParams();


  console.log(id); 
 
    const [selectedTab, setSelectedTab] = useState('Financial Support');
    const [scholarDetails, setScholarDetails] = useState({course:'',college:"",category:"",});
    const [scholarShipDetails, setScholarShipDetails] = useState();
    const [backgroundInformationDetails, setbackgroundInformationDetails] = useState();
    const [DocumentDetails, setDocumentDetails] = useState();
    const [scholarName, setScholarName] = useState('');
    const [donationAmount, setDonationAmount] = useState('');

    const [Created_at, setCreated_at] = useState('');
    const [loading, setLoading] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0.5)).current;
    const secondSheetRef = useRef<BottomSheetModal>(null);
      
      const handleOpenDetails = () => {
        secondSheetRef.current?.present();
      };


  const [expandedIndex, setExpandedIndex] = useState(0); 
  // const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  useEffect(() => {
    const getScholarDetail = async (id: any) => {
      const res =  await getScholarDetails(id);

      setScholarDetails(res.scholar_details);
      setScholarShipDetails(res.scholarship_details);
      setbackgroundInformationDetails(res.background_information);
      setDonationAmount(res.donation_amount);
      setCreated_at(res.created_at);
      setScholarName(res.scholar_name);
      setDocumentDetails(res.documents)
      setLoading(false);
      console.warn('res => ', res)
      console.warn('scholar_details => ', res.scholarship_details)
      console.warn('donated_amount => ', res.donation_amount)
      console.warn('created_at => ', res.created_at)

    }
   getScholarDetail(id);
   Animated.loop(
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true,
      })
    ])
  ).start();
  }, []);
    const router = useRouter();

  // const openDonationDashboard = () => {
  //   // Clear form fields
    
  //   // Redirect to Dashboard
  //   router.replace('/(tabs)/Donations');
  // };
 
  const SkeletonLoader = () => (
    <Animated.View style={[styles.skeletonCard, { opacity: fadeAnim }]}> 
      <View style={styles.skeletonText} />
      <View style={styles.skeletonText} />
      <View style={styles.skeletonText} />
    </Animated.View>
  );

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
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.iconfav}>
            <Link href={'/Scholars'}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require('../../assets/images/dashboard/properties-backarrow.png')}
              />
            </Link>
          </TouchableOpacity>
          <Text style={styles.username}>Scholars Informations</Text>
        </View>
      </HeadersImage>

      <ScrollView>
      {loading ? (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : scholarDetails && scholarShipDetails ? (
        <View style={styles.header}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.highlightText}>
              {scholarName} <Text style={styles.supportText}>Details</Text>
            </Text>
          </View>

          <Accordion
            title="Scholar Details"
            expanded={expandedIndex === 0}
            onPress={() => toggleAccordion(0)}
            content={
              <View>
                <View style={styles.contentBox}>
                  <Text style={styles.course_text}>{scholarDetails?.course}</Text>
                  <Text style={styles.courseLabel}>Course</Text>
                </View>
                <View style={styles.contentBox}>
                  <Text style={styles.college_name}>{scholarDetails?.college}</Text>
                  <Text style={styles.college_label}>College</Text>
                </View>
                <View>
                  <Text style={styles.category_name}>{scholarDetails?.category}</Text>
                  <Text style={styles.category_label}>Category</Text>
                </View>
              </View>
            }
          />

          <Accordion
            title="Scholarship Details"
            expanded={expandedIndex === 1}
            onPress={() => toggleAccordion(1)}
            content={
              <View style={styles.scholarshipDetails}>
                <View style={{ width: '50%' }}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>₹ {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(scholarShipDetails?.amountRequired)}</Text>
                    <Text style={styles.detailDescription}>Amount Required</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{scholarShipDetails?.frequency}</Text>
                    <Text style={styles.detailDescription}>Frequency</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>₹ {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(scholarShipDetails?.amountSanctioned)}</Text>
                    <Text style={styles.detailDescription}>Amount Sanctioned</Text>
                  </View>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={styles.contentDescription}>
                    You are a partial donor for this scholarship. An amount of Rs ₹ {donationAmount} from your donation was utilized in conjunction with funds from other donors.
                  </Text>
                </View>
              </View>
            }
          />

          <Accordion
            title="Background Information"
            expanded={expandedIndex === 2}
            onPress={() => toggleAccordion(2)}
            content={
              <Text style={styles.Informationcontentcontent}>{backgroundInformationDetails?.enquiryDetails}</Text>
            }
          />

          {/* <Accordion
            title="Documents Submitted"
            expanded={expandedIndex === 3}
            onPress={() => toggleAccordion(3)}
            content={
              <View style={styles.documentSection}>
                <Image style={{ width: 25, height: 25 }} source={require('../../assets/images/dashboard/document_icon.png')} />
                <TouchableOpacity>
                  <Text style={styles.documentLink}> Certificate</Text>
                </TouchableOpacity>
              </View>
            }
          /> */}

          {/* <Accordion
            title="Payment Details"
            expanded={expandedIndex === 4}
            onPress={() => toggleAccordion(4)}
            content={
              <View style={styles.paymentDetails}>
                <View style={styles.paymentRow}>
                  <View style={styles.paymentColumn}>
                    <Text style={styles.paymentAmount}>₹ {donationAmount}</Text>                    
                    <Text style={styles.paymentSubLabel}>Amount Paid</Text>
                  </View>
                  <View style={styles.paymentColumn}>
                    <Text style={styles.paymentDate}>{Created_at}</Text>
                    <Text style={styles.paymentSubLabel}>Date</Text>
                  </View>
                </View>
              </View>
            }
          /> */}


        </View>
        ) : (
          // 🔹 "No Records Found" Message
          <View style={styles.noRecordsContainer}>
            <Text style={styles.noRecordsText}>No Records Found</Text>
          </View>
        )}
      </ScrollView>
         <View>
          <View>
              <Text style={styles.impactText}>To contribute more for this student</Text>
            </View>

            <TouchableOpacity style={styles.donateButton} activeOpacity={0.8} onPress={handleOpenDetails}>
              <Text style={styles.donateButtonText}>Donate Now</Text>
            </TouchableOpacity>
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
              {/* <FontAwesome name="check-circle" size={16} color="green" /> */}
              <Text style={styles.label}>Account Name:</Text>
              <Text style={styles.value}>SUPPORTIVE SOULS CHARITABLE TRUST</Text>
            </View>
            
            <View style={styles.detailRow}>
              {/* <FontAwesome name="check-circle" size={16} color="green" /> */}
              <Text style={styles.label}>IFSC:</Text>
              <Text style={styles.value}>UJVN0001169</Text>
            </View>

            <View style={styles.detailRow}>
              {/* <FontAwesome name="check-circle" size={16} color="green" /> */}
              <Text style={styles.label}>Account Type:</Text>
              <Text style={styles.value}>Current Account</Text>
            </View>

            <View style={styles.detailRow}>
              {/* <FontAwesome name="check-circle" size={16} color="green" /> */}
              <Text style={styles.label}>UPI ID:</Text>
              <Text style={[styles.value, styles.upiId]}>ujjbb8398972371@ujjivan</Text>
            </View>
          </View>

          {/* QR Code
          <Image 
            source={require('../../assets/qr-code.png')} 
            style={styles.qrCode} 
            resizeMode="contain"
          /> */}
        </View>

        {/* Payment Icons */}
        <View style={styles.paymentContainer}>
          <Text style={styles.heading}>Donate via UPI</Text>
          <View style={styles.iconContainer}>
            {/* PhonePe */}
            <TouchableOpacity onPress={() => openPaymentApp('ujjbb8398972371@upi', 'PhonePe')}>
              <Image source={require('../../assets/images/amount-icon/google-pay.png')} style={styles.icon} />
            </TouchableOpacity>

            {/* Google */}
            <TouchableOpacity onPress={() => openPaymentApp('ujjbb8398972371@paytm', 'Paytm')}>
              <Image source={require('../../assets/images/amount-icon/phone-pe.png')} style={styles.icon} />
            </TouchableOpacity>

            {/*Paytm Pay */}
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

const Accordion = ({ title, content, expanded, onPress }) => (
  <View style={styles.accordionItem}>
    <TouchableOpacity onPress={onPress} style={styles.dropheader}>
      <Text style={[styles.title, expanded ? styles.activeTitle : null]}>{title}</Text>
      <Ionicons
        name={expanded ? 'chevron-up' : 'chevron-forward'}
        size={20}
        color="#4caf50"
        style={styles.icon}
      />
    </TouchableOpacity>
    {expanded && <View style={styles.underline} />}
    {expanded && <View style={styles.contentContainer}>{content}</View>}
  </View>
);

const styles = StyleSheet.create({
  container:{
    // flex:1,
    height:'100%',
    backgroundColor:'#fff',
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
userContent:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'flex-end',
    paddingBottom:30,
    },
    iconback:{
        flexDirection: "row",
        zIndex: 1,
        width: "20%",
        alignItems:'center',
    
      },
      headerContainer: {
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        paddingBottom:32,
        width: '100%',
        paddingHorizontal: 10, 
        height: '100%', 
      },
      iconfav: {
        backgroundColor: 'rgba(233, 233, 233, 0.7)',
        borderRadius: 25,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      },
    username: {
    color: '#fff',
    fontSize: 24, 
    fontFamily: 'PN_BoldItalic',
    flex: 1,
    textAlign: 'center', 
    justifyContent:'center',
    alignItems:'center', 
    },
    header: {
        padding: 15,
        // borderWidth:1,
        // paddingBottom: 20,
        // paddingHorizontal: 20,
      },
      supportText: {
        fontSize: 18,
        marginBottom:25,
        color: '#525252',
        fontFamily:'PP_Medium',
      },
      highlightText: {
        fontSize: 18,
        color: '#85B336',
        fontFamily:'PP_Medium',
      },
    // 
    accordionItem: {
    borderWidth:1,
    borderColor:'#E0E0E0',
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    // marginTop: 50,
    overflow: "hidden",
    // // Shadow for iOS
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 2 }, 
    // shadowRadius: 4,
    // // Shadow for Android
    // elevation: 1,
    ...Platform.select({
          ios: {
            shadowColor: '#E0E0E0',
            // shadowOffset: { width: 0, height: 2 },
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          android: {
            elevation: 1,
          },
        }),
  },
  dropheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  underline: {
    backgroundColor: "#E5E5E6",
    height: 1,
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  activeTitle: {
    color: '#85B336', // Green color for active state
  },
  icon: {
    marginLeft: 10,
  },
  contentContainer: {
    padding: 15,
    paddingVertical:10,
  },
    content: {
        fontSize: 14,
        fontFamily:'RB_Regular',
        color: "#6D6D6D",
        marginBottom: 17,
        letterSpacing:1,
        lineHeight:18,
      },
      button: {
        borderWidth:1,
        borderColor:'#85B336',
        // padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent:'center',
        margin:'auto',
        width:150,
        height:36,
      },
      buttonText: {
        color:'#85B336',
        fontSize: 14,
        fontWeight: "bold",
      },
    //   
    contentBox:{
        marginBottom:15,
    },
    course_text:{
        fontSize:14,
        color:'#000000',
        fontFamily:'PP_Medium',
        letterSpacing:1,
    },
    courseLabel:{
        fontSize:10,
        color:'#666',
        fontFamily:'RB_Regular',
        // letterSpacing:1,
    },
    college_name:{
        fontSize:14,
        color:'#000000',
        fontFamily:'PP_Medium',
        letterSpacing:1,
    },     
    college_label:{
        fontSize:10,
        color:'#666',
        fontFamily:'RB_Regular',
    }, 
    category_name:{
        fontSize:14,
        color:'#000000',
        fontFamily:'PP_Medium',
        letterSpacing:1,
    },
    category_label:{
        fontSize:10,
        color:'#666',
        fontFamily:'RB_Regular',
    },
    scholarshipDetails: {
        flexDirection:'row',
        // padding:15,
    },

    detailRow: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        marginBottom: 16,
    },

    detailLabel: {
        fontSize: 14,
        fontFamily:'PP_Medium',
        // fontWeight: '600',
        color: '#000000', 
    },

    detailDescription: {
        fontSize: 10,
        fontFamily:'RB_Regular',
        color: '#666666',
    },

    contentDescription: {
        fontSize: 14,
        color: '#555555',
        lineHeight: 22,
        fontFamily:'RB_Regular',
    },
    Informationcontentcontent:{
        fontSize: 13,
        color: '#555555',
        lineHeight: 22,
        fontFamily:'RB_Regular',
        letterSpacing:0.8,
        // display:block,
        // width:150px;
        // word-wrap:'break-word',
        wordWrap:'break',
    },
    // 
documentSection: {
flexDirection:'row',
},
documentLabel: {
fontSize: 16,
fontWeight: "bold",
color: "#333", // Dark gray text
marginBottom: 5,
},
documentLink: {
fontSize: 16,
color: "#4CAF50", // Green text for the link
textDecorationLine: "underline", // Underlined to indicate a link
},
paymentDetails: {
// flexDirection: "row",

// backgroundColor: "#f9f9f0", // Light background similar to the image
// borderRadius: 8,
// padding: 15,
// borderWidth: 1,
// borderColor: "#e0e0e0",
// marginVertical: 10,
},
paymentLabel: {
fontSize: 16,
fontWeight: "bold",
color: "#4CAF50", 
// marginBottom: 10,
},
paymentRow: {
flexDirection: "row",
justifyContent:'space-between',
flexWrap:'wrap',
// marginBottom: 10,
},
paymentColumn: {
width:'50%',
},
paymentAmount: {
fontSize: 14,
color: "#000", 
fontFamily:'PP_Medium',
},
paymentDate: {
fontSize: 14,
fontFamily:'PP_Medium',
color: "#000", 
},
paymentSubLabel: {
fontSize: 10,
color: "#999", 
fontFamily:'RB_Regular',
},
nextPayment: {
fontSize: 14,
fontFamily:'PP_Medium',
color: "#7C6554",
marginTop:25,
},   
impactText: {
fontSize: 18,
fontFamily:'PP_Regular',
color: '#000000',
textAlign: 'center',
marginBottom:20,
marginTop:50,
letterSpacing:1,
},
donateButton: {
width:288,
height:42,
backgroundColor: '#85B336',
borderRadius: 10,
alignItems: 'center',
justifyContent:'center',
margin:'auto',
marginBottom:30,
},
donateButtonText: {
color: '#fff',
fontSize: 15,
fontFamily:'PP_SemiBold',
},
skeletonCard: { padding: 16, marginVertical: 8, backgroundColor: '#e0e0e0', borderRadius: 8 },
  skeletonText: { height: 20, backgroundColor: '#d6d6d6', marginBottom: 10, borderRadius: 5 },
  
  noRecordsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  noRecordsText: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
  },
  bottomSheetContainer:{
    padding: 16,
  },
  heading:{
    fontSize: 18,
    fontFamily:'PP_Bold',
    color: '#000000',
    marginBottom: 16,
  },
  // content:{
  //   fontSize: 14,
  //   fontFamily:'PP_Regular',
  //   color: '#333',
  //   textAlign: 'justify',
  //   lineHeight: 20,
  // },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 10,
  },
  // detailRow: {
  //   // flexDirection: 'row',
  //   // alignItems: 'center',
  //   marginBottom: 8,
  // },
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
    marginBottom: '20%',
  },
  iconContainer: {
    marginRight: 6,
    // display:'flex',
    flexDirection:'row',
  },

  // icon: {
  //   width: 50,
  //   height: 50,
  //   marginHorizontal: 10,
  //   resizeMode: 'contain',
  // },
});

export default ScholarsDetails;
