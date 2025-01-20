import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Platform,Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { getAsyncData, getUserById } from '../services/service';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

const SectionsData = [
  {
    index: 2, 
    title: 'About Us',
    content: 'This is the About Us content. Here you can describe your organization or mission.',
  },
  {
    index: 3,
    title: 'Focus',
    content: 'This is the Focus content. Highlight the areas you prioritize or aim to achieve.',
  },
  {
    index: 4,
    title: 'Scholarship',
    content: 'This is the Scholarship content. Provide details about scholarships and eligibility.',
  },
  {
    index: 5,
    title: 'Photo Gallery',
    content: 'This is the Photo Gallery content. Showcase photos related to your initiatives.',
  },
  {
    index: 6,
    title: 'Contact Us',
    content: 'This is the Contact Us content. Provide contact details and support information.',
  },
];

const ProfileData = [
  {
    index: 1,
    title: 'Profile',
    content: (
      <View>
        {/* <Text style={styles.course_text}>B. Voc Banking Stock and Insurance</Text>
        <Text style={styles.courseLabel}>Course</Text>
        <Text style={styles.course_text}>PSG College of Arts & Science</Text>
        <Text style={styles.courseLabel}>College</Text>
        <Text style={styles.course_text}>Single Parent</Text>
        <Text style={styles.courseLabel}>Category</Text> */}
      </View>
    ),
  },
];


const handleInstagramPress = (name:any) => {
  const url = `https://www.instagram.com/supportive.souls?igsh=MXJvY3Z6d2RwbWhldg===${encodeURIComponent(name)}`;
  Linking.openURL(url);
};

const handleYouTubePress = (name:any) => {
  const url = `https://www.youtube.com/@SupportiveSouls=${encodeURIComponent(name)}`;
  Linking.openURL(url);
};


const handleLinkedInPress = (name:any) => {
  const url = `https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A90635745&keywords=supportive%20souls&origin=RICH_QUERY_SUGGESTION&position=0&searchId=778eac2c-6e8b-4f48-9b0c-93a9a77fdd95&sid=Y4j&spellCorrectionEnabled=false'=${encodeURIComponent(name)}`;
  Linking.openURL(url);
};

// const openProfile = async () => {
//     const userDetails = await getUserById(17); //NOTE: need to get user id from async storage when user logged in
//     console.warn('userDetails => ', userDetails)
//     // router.push('/userProfile');
//     if (userDetails?.user) {
//       router.push({
//         pathname: '/userProfile',
//         params: { userDetails: userDetails.user }, 
//       });
//     } else {
//       console.error('Failed to fetch user details!');
//     }
    
// }
const openProfile = async () => {
  const data = await getAsyncData('userDetails')
  if(data){
    const userDetails = await getUserById(data.id);
    console.warn('userDetails => ', userDetails);
  
    if (userDetails?.user) {
      router.push({
        pathname: '/userProfile',
        params: { userDetails: JSON.stringify(userDetails.user) }, 
      });
    } else {
      console.error('Failed to fetch user details!');
    }
  }
  else{
    console.log('userDtails is empty')
  }
  
};

  const openAboutUs = ()=>{
    router.push('/about');
  }
  const openFocus = ()=>{
    router.push('/focus');
  }
  const openScholars = ()=>{
    router.push('/scholarship');
  }
  const openPhotoGalary = ()=>{
    router.push('/photosgalary');
  }
  const openContact = ()=>{
    router.push('/contactus');
  }
  
const More = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [userDetails, setUserDetails] = useState({name: '', email: ''});
  const setDetails = async () => {
    const data:any = await getAsyncData('userDetails');
    setUserDetails(data);
    console.warn('data => ', data);
  }

  useEffect(() => {
    setDetails();
  }, []);

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };
  

  return (
    
    <View style={styles.container}>
      <HeadersImage>
        <View style={styles.scholarsContent}>
          <Text style={styles.scholarsname}>Menus</Text>
        </View>
      </HeadersImage>

      <ScrollView>
        <View style={{ padding: 20 }}>
          {/* Profile Section */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Image style={styles.mapMedia} source={require('../../assets/images/dashboard/profileimage.png')} />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.profileName}>{userDetails.name}</Text>
              <Text style={styles.profileEmail}>{userDetails.email}</Text>
            </View>
          </View>

          {/* Accordions for Supportive Souls and Scholar Details */}
          <View>
          <Text  style={styles.sectionHeader}>account</Text>
            {/* {[...ProfileData].map((item, index) => (
              <TouchableOpacity onPress={openProfile}>
              <AccordionItem
                key={index}
                title={item.title}
                content={item.content}
                expanded={expandedIndex === item.index}
                onPress={() => handleToggle(item.index)}
                styleType="profile" 
              />
              </TouchableOpacity>
            ))} */}

            <TouchableOpacity onPress={openProfile}>
                <View style={{borderWidth:1,padding:15,borderRadius:8,borderColor:'#E0E0E0',flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row',}}>
                  <Ionicons name="person-circle-outline" size={20} color="black" />
                  <Text style={{fontSize:15,marginLeft:10,}}>Profile</Text>
                  </View>
                
                    <Ionicons
                      name={ "chevron-forward" }
                      size={20}
                      color="#525252"
                      style={styles.icon}
                    />
                </View>
            </TouchableOpacity>


            <Text  style={styles.sectionHeader}>Supportive souls</Text>
            {/* <View style={styles.sectionContent}>
            {[...SectionsData].map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                content={item.content}
                expanded={expandedIndex === item.index}
                onPress={() => handleToggle(item.index)}
                styleType="supportive" // Separate style for Supportive Souls
              />
            ))}
            </View> */}
            <TouchableOpacity onPress={openAboutUs}>
                <View style={styles.supportive_content}>
                  <View style={{flexDirection:'row',}}>
                    <AntDesign name="exclamationcircleo" size={20} color="black" />
                    <Text style={{fontSize:15,marginLeft:10,}}>About Us</Text>
                  </View>
                    <Ionicons name={ "chevron-forward" } size={20} color="#525252" style={styles.icon}/>
                </View>
            </TouchableOpacity>

            {/* Focus */}
            <TouchableOpacity onPress={openFocus}>
            <View style={styles.supportive_content}>
                <View style={{flexDirection:'row',}}>
                    {/* <AntDesign name="exclamationcircleo" size={20} color="black" /> */}
                    <MaterialIcons name="center-focus-weak" size={20} color="black" />
                    <Text style={{fontSize:15,marginLeft:10,}}>Focus</Text>
                  </View>
                    <Ionicons name={ "chevron-forward" } size={20} color="#525252" style={styles.icon}/>
                </View>
            </TouchableOpacity>
            {/* Scholarship */}
            <TouchableOpacity onPress={openScholars}>
            <View style={styles.supportive_content}>
                <View style={{flexDirection:'row',}}>
                  <MaterialIcons name="cast-for-education" size={20} color="black" />
                    <Text style={{fontSize:15,marginLeft:10,}}>Scholarship</Text>
                  </View>
                    <Ionicons name={ "chevron-forward" } size={20} color="#525252" style={styles.icon}/>
                </View>
            </TouchableOpacity>

            {/* Photo Gallery */}
            <TouchableOpacity onPress={openPhotoGalary}>
            <View style={styles.supportive_content}>
                <View style={{flexDirection:'row',}}>
                  <Fontisto name="photograph" size={20} color="black" />
                  <Text style={{fontSize:15,marginLeft:10,}}>Photo Gallery</Text>
                  </View>
                    <Ionicons name={ "chevron-forward" } size={20} color="#525252" style={styles.icon}/>
              </View>
            </TouchableOpacity>
            {/* Contact Us */}
            <TouchableOpacity onPress={openContact}>
                <View style={{borderBottomWidth:1,padding:15,borderRadius:8,borderColor:'#E0E0E0',flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row',}}>
                  <MaterialIcons name="contact-support" size={20} color="black" />
                  <Text style={{fontSize:15,marginLeft:10,}}>Contact Us</Text>
                  </View>
                    <Ionicons name={ "chevron-forward" } size={20} color="#525252" style={styles.icon}/>
                </View>
            </TouchableOpacity>
          </View>

        {/* socail media  */}
        <View>
            <Text style={styles.socialHeading}>Social Media Links</Text>
            <View style={styles.socialMedia}>
              
            <TouchableOpacity onPress={handleInstagramPress}>
              <Image style={styles.socialIcon} source={require('../../assets/images/dashboard/instagram_icon.png')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleYouTubePress}>
              <Image style={styles.socialIcon} source={require('../../assets/images/dashboard/youtube_icon.png')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLinkedInPress}>
              <Image style={styles.socialIcon} source={require('../../assets/images/dashboard/linkedin_icon.png')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('Facebook clicked')}>
              <Image style={styles.socialIcon} source={require('../../assets/images/dashboard/facebook_icon.png')}/>
            </TouchableOpacity>

            </View>
        </View>
        </View>
      </ScrollView>
    </View>
  );
};

const AccordionItem = ({ title, content, expanded, onPress, styleType }: any) => {
  const containerStyle =
    styleType === "profile" ? styles.profileAccordion : styles.supportiveAccordion;

  return (
    <View style={styles.accordioncontainer}>
      <View style={[styles.accordionItem, containerStyle,]}>
        <TouchableOpacity onPress={onPress} style={styles.dropheader}>
          <Text style={styles.title}>{title}</Text>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-forward"}
            size={20}
            color="#525252"
            style={styles.icon}
          />
        </TouchableOpacity>
        {expanded && <View style={styles.underline} />}
         {/* <View style={styles.underline} /> */}
        {expanded && (
          <View style={styles.contentContainer}>
            <Text style={styles.content}>{content}</Text>
          </View>
        )}
      </View>
    </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scholarsContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  scholarsname: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'PN_BoldItalic',
    textAlign: 'center',
  },
  // Profile Section
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  mapMedia: {
    width: 70, // Circular Image
    height: 70,
    borderRadius: 35,
  },
  profileDetails: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 25,
    fontFamily:'PP_Medium',
    color: '#000000',
  },
  profileEmail: {
    fontFamily:'RB_Regular',
    fontSize: 14,
    color: '#525252',
  },
  // Accordion Item
  accordioncontainer:{
    // borderWidth:1,
    borderColor: '#E0E0E0',
    // borderRadius:10,
  },
  accordionItem: {
    // borderWidth: 1,
    // borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  containerStyle:{
    // borderWidth: 1,
    // borderColor: '#E0E0E0',
    backgroundColor: 'red',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  dropheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  underline: {
    backgroundColor: '#E5E5E6',
    height: 1,
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily:'RB_Regular',
    color: '#525252',
  },
  icon: {
    marginLeft: 10,
  },
  contentContainer: {
    padding: 15,
  },
  content: {
    fontSize: 14,
    color: '#6D6D6D',
    lineHeight: 18,
  },
  // General Section for Alignment
  contentBox: {
    marginBottom: 15,
  },
  course_text: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'PP_Medium',
    letterSpacing: 1,
  },
  courseLabel: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'RB_Regular',
  },
  // 
  profileAccordion: {
    padding:10,
    borderWidth:1,
    borderColor:'#E0E0E0',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  supportiveAccordion: {
    // backgroundColor: '#ffe6e6', // Light red for Supportive Souls
    borderRadius: 5,
    // borderWidth:1,
    marginBottom: 10,
    // padding: 10,
  },
  sectionHeader: {
    fontSize: 12,
    fontFamily:'PP_Regular',
    marginVertical: 10,
    color: '#525252',
    textTransform:"uppercase",
  },
  supportive_content:{
    borderBottomWidth:1,
    padding:15,
    borderRadius:8,
    borderColor:'#E0E0E0',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:10
  },
  sectionContent:{
    borderWidth:1,
    borderColor:'#E0E0E0',
    borderRadius:8,
    padding:15,
  },
  socialHeading:{
    fontSize:12,
    fontFamily:'PP_Regular',
    color: '#525252',
    textTransform:"uppercase",
    marginTop:20,
    marginBottom:15,
  },
  socialMedia:{
    flexDirection:'row',
  },
  socialIcon:{
    width:32,
    height:32,
    marginRight:25,
  },
  
});


export default More;
