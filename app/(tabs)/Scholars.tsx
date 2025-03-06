import { View, Text, StyleSheet,TextInput, TouchableOpacity,ScrollView,Modal,Image ,Platform,Animated} from 'react-native';
import React, { useState, useEffect,useRef } from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { router } from 'expo-router';
import axios from 'axios';
import { getAsyncData, scholarDetails } from '../services/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


const Scholars = () => {

  const [modalVisible, setModalVisible] = useState(false);
  // db value show 
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0.5)).current;
  const [totallyBenifited, setTotallyBenifited] = useState(0);
  const [scholarsData, setScholarsData] = useState([]);
  const scrollViewRef = useRef(null);
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const [filteredScholars, setFilteredScholars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current; // Animated scroll value

  const init = async () => {
    const user = await getAsyncData('userDetails');
    const data = await scholarDetails(user.id);

    // console.warn('data => ', data);
    if(data.success && data.scholarDetails.length) {
       let {scholarDetails} = data;
       scholarDetails = scholarDetails.filter(e => e.donation_type != 'social_impact');
        setScholarsData(scholarDetails);
        setTotallyBenifited(scholarDetails.length);
        setFilteredScholars(scholarDetails);
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  // Format the date using Intl.DateTimeFormat
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString); 
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date); // Format as "23 May 2024"
  }; 
  // Function to open the modal
  const openScholarsDetails = (id: any) => {
    console.warn('id =>',id)
    return router.push(`/Scholarsdetails?id=${id}`);
  
    // setModalVisible(true);
  };

  // Function to close the modal
  const closeScholarsDetails = () => {
    setModalVisible(false);
  };

   const [selectedTab, setSelectedTab] = useState('Financial Support');
      // Set the default expanded accordion to index 0 (Guardian Angels)
      const [expandedIndexes, setExpandedIndexes] = useState([0]);
  
      const handleToggle = (index) => {
          // Toggle the accordion; if already expanded, remove it from the list
          setExpandedIndexes((prev) =>
          prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
          );
      };
      // const navigation = useNavigation();

 
  const SkeletonLoader = () => (
    <Animated.View style={[styles.skeletonCard, { opacity: fadeAnim }]}> 
      <View style={styles.skeletonText} />
      <View style={styles.skeletonText} />
      <View style={styles.skeletonText} />
    </Animated.View>
  );

  // Function to track scroll position
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScrollVisible(offsetY > 200);
};

// Function to smoothly scroll to the top
const scrollToTop = () => {
    if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
};

// Search functionality
useEffect(() => {
  const filtered = scholarsData.filter((scholar) =>
    scholar.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredScholars(filtered);
}, [searchQuery, scholarsData]);




  return (
    <View style={styles.container}>
      <HeadersImage>
        <View style={styles.scholarsContent}>
          <Text style={styles.scholarsname}>Scholars Benefited</Text>
        </View>
      </HeadersImage>
      
      <View style={{padding: 10}}>
        {/* Scholars count */}
        {loading ? (
          <Animated.View style={[styles.skeletonText, { opacity: fadeAnim }]} />
        ) : (
          <Text style={styles.supportText}>
            You have supported <Text style={styles.highlightText}>{filteredScholars?.length || 0} Scholars</Text>
          </Text>
        )}
        <View style={styles.searchContainer}>
          {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name"
           placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        </View>
      </View>

      <Animated.ScrollView  
      ref={scrollViewRef} 
      onScroll={handleScroll} 
      scrollEventThrottle={16}
      >
        <View style={styles.content}>

        

        {loading ? (
            <>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </>
          ) : filteredScholars.length > 0 ? (
            filteredScholars.map((scholar: any, index) => (
          <View key={index} style={styles.card}>
            {/* Scholar name */}
            <View style={styles.labelGroup}>
              <Text style={styles.name}>{scholar.name}</Text>
              <Text style={styles.label}>Name</Text>
            </View>

            {/* Course */}
            <View style={styles.labelGroup}>
              <Text style={styles.details}>{scholar.course}</Text>
              <Text style={styles.label}>Course</Text>
            </View>

            {/* College */}
            <View style={styles.labelGroup}>
              <Text style={styles.details}>{scholar.college}</Text>
              <Text style={styles.label}>College</Text>
            </View>

            {/* Amount and Date row */}
            <View style={styles.row}>
              <View style={styles.labelGroup}>
                <Text style={styles.amount}>₹ {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(scholar.total_scholar_amount)}</Text>
                <Text style={styles.label}>Amount</Text>
              </View>
              <View style={styles.labelGroup}>
                <Text style={styles.date}>{formatDate(scholar.latest_donation_date)}</Text>
                <Text style={styles.label}>Date</Text>
              </View>
            </View>

            {/* More Information button */}
            <TouchableOpacity style={styles.button} onPress={() => openScholarsDetails(scholar.user_id)} activeOpacity={0.5}>
              <Text style={styles.buttonText}>More Information</Text>
            </TouchableOpacity>
          </View>
          ))
        ) : (
          // 🔹 "No Records Found" Message
          <View style={styles.noRecordsContainer}>
            <Text style={styles.noRecordsText}>No Records Found</Text>
          </View>
        )}
        </View>
      </Animated.ScrollView>

      {isScrollVisible && (
                <TouchableOpacity onPress={scrollToTop} style={styles.scrollToTopButton}>
                    <Ionicons name="arrow-up" size={24} color="white" />
                </TouchableOpacity>
            )}


    </View>
  );
};


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
  content:{
    padding: 25,
  },
  supportText: {
    fontSize: 18,
    marginBottom:25,
    color: '#000000',
    fontFamily:'PP_Medium',
  },
  highlightText: {
    color: '#85B336',
    fontFamily:'PP_Medium',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderWidth:1,
    borderColor:'#E0E0E0',
  },
  labelGroup: {
    marginBottom: 16,
  },
  name: {
    fontSize: 16,    
    fontFamily:'PP_SemiBold',
    color: '#000000',
  },
  details: {
    fontSize: 14,
    fontFamily:'PP_Medium',
    color: '#000000',
  },
  label: {
    fontSize: 10,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    width:155,
    height:36,
    borderWidth: 1,
    borderColor: '#85B336',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent:'center',
    margin:'auto',
  },
  buttonText: {
    color: '#85B336',
    fontSize: 14,
    fontWeight: '500',
  },
  skeletonCard: { padding: 16, marginVertical: 8, backgroundColor: '#e0e0e0', borderRadius: 8 },
  skeletonText: { height: 20, backgroundColor: '#d6d6d6', marginBottom: 10, borderRadius: 5 },
  noRecordsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noRecordsText: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4caf50',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
},
// searchBar: {
//   height: 40,
//   borderColor: '#ddd',
//   borderWidth: 1,
//   borderRadius: 8,
//   paddingHorizontal: 10,
//   marginBottom: 10,
// },
searchInput: {
  flex: 1,
  height: 40,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 28,
  paddingHorizontal: 10,
  marginRight: 8,
},
searchContainer: {
  marginBottom: 15,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
},
});

export default Scholars;