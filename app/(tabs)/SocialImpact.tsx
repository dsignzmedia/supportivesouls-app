import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Modal,Image ,Platform} from 'react-native';
import React, { useState, useEffect } from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { router } from 'expo-router';
import DateTimePicker from "@react-native-community/datetimepicker";
// import Modal from "react-native-modal";
import { getAsyncData, socialImpact } from '../services/service';

const SocialImpact = () => {

// State to control the modal visibility
const [modalVisible, setModalVisible] = useState(false);

 const [totallyBenifited, setTotallyBenifited] = useState(0);
  const [scholarsData, setsocialImpact] = useState([]);

  const init = async () => {
    const user = await getAsyncData('userDetails');
    const data = await socialImpact(user.id);

    // console.warn('data => ', data);
    if(data.success && data.socialImpact.length) {
       let {socialImpact} = data;
       socialImpact = socialImpact.filter(e => e.donation_type == 'social_impact');
       setsocialImpact(socialImpact);
        setTotallyBenifited(socialImpact.length); 
    }
  };

  useEffect(() => {
    init();
  }, []);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid Date'; // Fallback if date is not available
    const date = new Date(dateString.replace(' ', 'T')); // Ensure proper parsing
    if (isNaN(date)) return 'Invalid Date'; // Handle invalid date formats
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date); // Format as "20 Apr 2024"
  };

  
  // Function to open the modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <HeadersImage>
        <View style={styles.scholarsContent}>
          <Text style={styles.scholarsname}>Social Impact</Text>
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
                    <Text style={styles.name}>{scholar.impact_name}</Text>
                    <Text style={styles.label}>Name</Text>
                  </View>
      
                  {/* Amount and Date row */}
                  <View style={styles.row}>
                    <View style={styles.labelGroup}>
                      <Text style={styles.amount}>₹ {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(scholar.donation_amount)}</Text>
                      <Text style={styles.label}>Amount</Text>
                    </View>
                    <View style={styles.labelGroup}>
                      <Text style={styles.date}>{scholar.formatted_date}</Text>
                      <Text style={styles.label}>Date</Text>
                    </View>
                  </View>


                  {/* More details button onPress={openModal} activeOpacity={0.5}*/}
                    <TouchableOpacity style={styles.button} >
                      <Text style={styles.buttonText}>More Details</Text>
                    </TouchableOpacity>

                </View>
              ))}
              </View>
            </ScrollView>
            {/* Modal Component */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={closeModal}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Scholar Details</Text>
                  {/* Add more details you want to display here */}
                  <Text style={styles.modalText}>Here you can display more information about the scholar.</Text>

                  {/* Close Button */}
                  <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
      fontSize: 15,
      fontWeight: '500',
      color: '#333',
    },
    date: {
      fontSize: 15,
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
    // model 
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: 300,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: '#e74c3c',
      padding: 10,
      borderRadius: 5,
    },
   
});
export default SocialImpact