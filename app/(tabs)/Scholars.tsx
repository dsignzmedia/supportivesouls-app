import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Modal,Image ,Platform} from 'react-native';
import React, { useState, useEffect } from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { router } from 'expo-router';
import axios from 'axios';
import { getAsyncData, scholarDetails } from '../services/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


const Scholars = ({children}:any) => {

  const [modalVisible, setModalVisible] = useState(false);
  // db value show 
  const [totallyBenifited, setTotallyBenifited] = useState(0);
  const [scholarsData, setScholarsData] = useState([]);
  const init = async () => {
    const user = await getAsyncData('userDetails');
    const data = await scholarDetails(user.id);

    // console.warn('data => ', data);
    if(data.success && data.scholarDetails.length) {
       let {scholarDetails} = data;
       scholarDetails = scholarDetails.filter(e => e.donation_type != 'social_impact');
        setScholarsData(scholarDetails);
        setTotallyBenifited(scholarDetails.length);
    }
  };

  useEffect(() => {
    init();
  }, []);

  // scholars date
  // Format the date using Intl.DateTimeFormat
  const formatDate = (dateString) => {
    if (!dateString) return ''; // Handle empty or undefined date
    const date = new Date(dateString); // Parse the date
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

  // const openScholarsDetails =()=>{
  //   // alert('ok');
  //   router.push('/Scholarsdetails')
  // }
  const scholarData = [
    {
      name: 'Karthick N',
      course: 'B. Voc Banking Stock and Insurance',
      college: 'PSG College of Arts & Science',
      amount: '₹ 5,000.00',
      date: '05 Sep 2024'
    },
    {
      name: 'Sneka J',
      course: 'B.Sc. Catering Science & Hotel Mgmt',
      college: 'CSI Bishop Appasamy College of Arts...',
      amount: '₹ 5,000.00', 
      date: '25 Jul 2024'
    },
    {
      name: 'Karthir S',
      course: 'B. Voc Banking Stock and Insurance',
      college: 'PSG College of Arts & Science',
      amount: '₹ 5,000.00',
      date: '05 Sep 2024'
    },
  ];

  return (
    <View style={styles.container}>
      <HeadersImage>
        <View style={styles.scholarsContent}>
          <Text style={styles.scholarsname}>Scholars Benefited</Text>
        </View>
      </HeadersImage>

      <ScrollView>
        <View style={styles.content}>

        {/* Scholars count */}
        <Text style={styles.supportText}>
          You have supported <Text style={styles.highlightText}>{totallyBenifited} Scholars</Text>
        </Text>

        {/* Scholars list */}
        {scholarsData.map((scholar: any, index) => (
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
        ))}
        </View>
      </ScrollView>

       

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
 
});

export default Scholars;