import { View, Text, TouchableOpacity, StyleSheet ,ScrollView,Image,Platform,Pressable} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import HeadersImage from '@/components/Admin/HeadersImage';
import { router } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { Link } from "expo-router";
import { scholarDetails } from '../services/service';
import { getAsyncData, yourDonation } from '../services/service';



const Dashboard = ({children}:any) => {

  const [selectedTab, setSelectedTab] = useState('Financial Support');
  const [expandedIndexes, setExpandedIndexes] = useState([0]);
  const [yourTotalDonation , setYourTotalDonation] = useState('');
  const [scholarsBenefited, setScholarsBenefited] = useState(0);
  const [userDetails, setUserDetails] = useState({name: '', email: ''});

  const setDetails = async () => {
      const data:any = await getAsyncData('userDetails');
      setUserDetails(data);
      console.warn('data => ', data);
    }
    useEffect(() => {
        setDetails();
      }, []);

  const yourDonationInit = async () => {
    const data = await getAsyncData('userDetails')
    const donationDetails = await yourDonation(data.id); 
    if (donationDetails) {
      console.warn('Donation Details => ', donationDetails);
      setYourTotalDonation(donationDetails.total); // Set the total donation amount
      setScholarsBenefited(donationDetails.totalScholars); // Set the total scholars benefited
    }

    if(data){
      const total = await yourDonation(data.id);
      const donationDetails = await yourDonation(data.id);
      console.warn('total => ', total);
      setYourTotalDonation(total.total)
    }
    else{
      console.log('total is empty')
    }
  };
  
    useEffect(() => {
      yourDonationInit();
    }, []);

   const handleToggle = (index) => {
      setExpandedIndexes((prev) =>
       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
   };
   const openProgramSheet = ()=>{
    router.push('/JionProgram');
  }
  const openTheDonation = ()=>{
    router.push('/(tabs)/Donations');
  }
  
  const openTheScholars = async ()=>{

    const data = await getAsyncData('userDetails'); // Get user details from async storage or context
    if (data) {
      const userDetails = await scholarDetails(data.id);  // Pass user ID to scholarDetails function
      console.warn('userDetails => ', userDetails);
  
      if (userDetails?.success) {  // Check if the data is successfully fetched
        // Pass user details to the next page
        router.push({
          pathname: '/(tabs)/Scholars',
          params: { userDetails: JSON.stringify(userDetails.scholarDetails) },
        });
      } else {
        console.error('Failed to fetch user details!');
      }
    } else {
      console.log('userDetails is empty');
    }
  }

  
//   useEffect(() => {
//     const getScholors = async () => {
//       try {
//         const response = await getScholars();
//         const parsedResponse = JSON.parse(response);
// console.log("parsedResponse" , parsedResponse);


//         // The response is already a JavaScript object, no need to parse it again
//         console.log('Total Donation:', response.total_donation);
        
//         if (response && response.total_donation !== undefined) {
//           setYourDonation(response.total_donation);
//         } else {
//           console.error('Error: Donation data is missing or invalid.');
//         }
//       } catch (error: any) {
//         console.error('Error fetching team details:', error.message);
//       }
//     };
    
//     getScholors();
//   }, []);
  
const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good Morning,';
  } else if (currentHour < 18) {
    return 'Good Afternoon,';
  } else {
    return 'Good Evening,';
  }
};

  return (
    <View style={styles.accordaincontainer}>
      <HeadersImage>
        <View style={styles.userContent}>
          <Text style={styles.username}>{getGreeting()} {'\n'} {userDetails.name}</Text>
        </View>
      </HeadersImage>
      
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">

              <View style={styles.header}>
              <View style={styles.statsContainer}>
                
                {/* Your Donation Box */}
                <TouchableOpacity style={[styles.statBox,{marginRight:16}]} onPress={openTheDonation}>
                  <Image
                    source={require('../../assets/images/dashboard/donation_image.png')}
                    style={styles.iconImage}
                    resizeMode="contain"
                  />
                  <View style={styles.donationContent}>
                    <Text style={styles.donationAmount}>₹ {yourTotalDonation}</Text>
                    <Text style={styles.donationLabel}>Your Donation</Text>
                  </View>
                  </TouchableOpacity>
      
                {/* Scholars Benefited Box */}
                <TouchableOpacity style={styles.statBox} onPress={openTheScholars}>
                  <Image
                    source={require('../../assets/images/dashboard/scholars_image.png')}
                    style={styles.iconImage}
                    resizeMode="contain"
                  />
                  <View style={styles.scholarContent}>
                    <Text style={styles.scholarAmount}>{scholarsBenefited}</Text>
                    <Text style={styles.scholarLabel}>Scholars Benefited</Text>
                  </View>
                  </TouchableOpacity>
              </View>
              <Text style={styles.heading}>Programs for you to contribute</Text>
              {/* Tabs */}
                  <View style={styles.tabs}>

                  <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'Financial Support' && styles.activeTab]}
                    onPress={() => setSelectedTab('Financial Support')}
                  >
                    <Text style={[styles.tabText, selectedTab === 'Financial Support' && styles.activeTabText]}>
                      Financial Support
                    </Text>
                  </TouchableOpacity>


                  <TouchableOpacity
                    style={[styles.tabButtontime, selectedTab === 'Need your Time' && styles.activeTab]}
                    onPress={() => setSelectedTab('Need your Time')}
                  >
                    <Text style={[styles.tabText, selectedTab === 'Need your Time' && styles.activeTabText]}>
                      Need your Time
                    </Text>
                  </TouchableOpacity>
                  
                  </View>
        {/* Content Based on Selected Tab */}
        {selectedTab === 'Financial Support' ? (
            <View>
              {/* Guardian Angels */}
              <AccordionItem
                  title="Guardian Angels"
                  expanded={expandedIndexes.includes(0)}
                  onPress={() => handleToggle(0)}
                  ctaTitle='Join the Program'
                  content='Guardian Angels is a heartfelt initiative dedicated to supporting children who have lost their parents. By sponsoring their education and providing essential resources, this program ensures that these children are not defined by their loss but empowered to create a brighter future. Be their angel and help them spread their wings.'
                  goToJoinProgram={()=>openProgramSheet()}
                />

               {/* Hope for Stars */}
                <AccordionItem
                  title="Hope for Stars"
                  expanded={expandedIndexes.includes(1)}
                  onPress={() => handleToggle(1)}
                  ctaTitle='Join the Program'
                  content='Hope for Stars provides mentorship and scholarships for underprivileged children aiming for excellence in academics and the arts.'
                  goToJoinProgram={()=>openProgramSheet()}
                />

                {/* Pave the Way */}
                <AccordionItem
                  title="Pave the Way"
                  expanded={expandedIndexes.includes(2)}
                  onPress={() => handleToggle(2)}
                  ctaTitle='Join the Program'
                  content='Pave the Way focuses on building sustainable infrastructure for schools in rural areas, ensuring every child has access to quality education.'
                  goToJoinProgram={()=>openProgramSheet()}
                />
              
            </View>
          ) : (
            <View>
              {/* Content for 'Need your Time' */}
              {/* Path to Passion */}
            <AccordionItem
              title="Path to Passion"
              expanded={expandedIndexes.includes(3)}
              onPress={() => handleToggle(3)}
              ctaTitle='Join the Program'
              content='Path to Passion is about more than financial aid—it’s about mentorship and guidance. This program connects students with resources, mentorship, and opportunities to pursue their passions, whether in arts, sports, or other fields. Be the guiding light that helps a child move closer to their dreams.'
              goToJoinProgram={()=>openProgramSheet()}
            />

            {/* Mentorship Program */}
            <AccordionItem
              title="Health and Wellness Camps"
              expanded={expandedIndexes.includes(4)}
              onPress={() => handleToggle(4)}
              ctaTitle='Join the Program'
              content='Be a mentor for children, guiding them in academics and life skills to help them achieve their dreams.'
              goToJoinProgram={()=>openProgramSheet()}
            />

            {/* Mentorship Program */}
            <AccordionItem
              title="Campus to Career Program"
              expanded={expandedIndexes.includes(5)}
              onPress={() => handleToggle(5)}
              content='Be a mentor for children, guiding them in academics and life skills to help them achieve their dreams.'
              goToJoinProgram={()=>openProgramSheet()}
              ctaTitle='Join the Program'
            />
            </View>
          )}
            
      </View>
      
      </ScrollView>
    </View>
    
  );
};

const AccordionItem = ({ title, content, ctaTitle, expanded, onPress , goToJoinProgram}:any) => (
  <View style={styles.accordionItem}>
    <TouchableOpacity onPress={onPress} style={styles.dropheader}>
    <Text style={[styles.title,expanded ? styles.activeTitle : null,]}>{title}</Text>

      <Ionicons
        name={expanded ? 'chevron-up' : 'chevron-forward'}
        size={20}
        color="#4caf50"
        style={styles.icon}
      />
    </TouchableOpacity>
    {expanded && <View style={styles.underline} />}
    {expanded && (
      <View style={styles.contentContainer}>
        {expanded && 
        <View style={styles.contentContainer}>
          <View>
              <Text style={styles.content}>
                {content}
              </Text>
                <TouchableOpacity
                  style={[styles.button,{marginTop:16}]}
                  onPress={()=>goToJoinProgram()}
                  activeOpacity={0.8}>
                  <Text style={styles.buttonText}>{ctaTitle}</Text>
                </TouchableOpacity>
            </View>
        </View>
        }
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  accordaincontainer: {
    // padding: 20,
    backgroundColor: "#fff",
    height:'100%',
  },
  userContent:{
  width:'100%',
  height:'100%',
  alignItems:'center',
  justifyContent:'flex-end',
  paddingBottom:30,
  },
  username:{
    color:'#fff',
    fontSize:24,
    fontFamily:'PN_BoldItalic',
    justifyContent:'center',
    textAlign:'center',
    alignItems:'center',
    // marginTop:70,
  },
  header: {
    padding: 15,
    // borderWidth:1,
    // paddingBottom: 20,
    // paddingHorizontal: 20,
  },
  greetingText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent:'space-around',
    marginBottom:35
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFFFFF',
    // iOS Shadow (Bottom only)
    shadowColor: '#E0E0E0',
    shadowOffset: { width: 0, height: 4 }, // Shadow at the bottom
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent:'space-between',
    // Android Shadow (Bottom only)
    elevation: 1, // Increase elevation fo
  },
  iconImage: {
    width: 42,
    height: 42,
  },

  /* Styles for Donation Box */
  donationContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'flex-end',
    objectFit:'cover',
  },
  donationAmount: {
    color: '#000000',
    fontSize: 18,
    fontFamily:'RB_Bold',
  },
  donationLabel: {
    color: '#888888',
    fontFamily:'RB_Regular',
    fontSize: 10,
  },

  /* Styles for Scholars Box */
  scholarContent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scholarAmount: {
    color: '#000000',
    fontSize: 18,
    fontFamily:'RB_Bold',
    textAlign:'right',
  },
  scholarLabel: {
    color: '#888888',
    fontFamily:'RB_Regular',
    fontSize: 10,
    textAlign:'right',
  },
  scholars_image:{
    width:42,
    height:42,
  },
  donation_image:{
    width:42,
    height:42,
  },
  heading:{
    fontSize:20,
    fontFamily:'PP_SemiBold',
    marginBottom:20,
    color:'#525252',
    letterSpacing:1,
    textAlign:'center',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom:17,
    height:42,
  },
  tabButton: {
    flex: 1,
    // paddingVertical: 10,
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#BEC2C7',
    borderTopLeftRadius:8,
    borderBottomLeftRadius:8,
    alignItems: 'center',
  },
  tabButtontime:{
    flex: 1,
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#BEC2C7',
    borderTopRightRadius:8,
    borderBottomRightRadius:8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#85B336',
    borderColor:'#85B336',
    justifyContent:'center',
  },
  tabText: {
    fontSize: 16,
    color: '#6D6D6D',
    fontFamily:'PP_Regular',
  },
  activeTabText: {
    color: '#fff',
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
    padding: 15,

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
    borderRadius: 10,
  },
  underline: {
    backgroundColor: "#E5E5E6",
    height: 1,
    width: '100%',
    alignSelf: 'center',
    marginTop:10,
    marginBottom:6
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#363C45",
  },
  activeTitle: {
    color: '#85B336',
  },
  icon: {
    marginLeft: 10,
  },
  contentContainer: {
    // padding: 15,
    // paddingVertical:10,
    // paddingBottom:10,
  },
  content: {
    fontSize: 14,
    fontFamily:'RB_Regular',
    color: "#6D6D6D",
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
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default Dashboard;
