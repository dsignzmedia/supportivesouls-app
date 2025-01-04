import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import React from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { router } from 'expo-router';

const Scholars = ({children}:any) => {
  const openScholarsDetails =()=>{
    // alert('ok');
    router.push('/Scholarsdetails')
  }
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
          You have supported <Text style={styles.highlightText}>2 Scholars</Text>
        </Text>

        {/* Scholars list */}
        {scholarData.map((scholar, index) => (
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
                <Text style={styles.amount}>{scholar.amount}</Text>
                <Text style={styles.label}>Amount</Text>
              </View>
              <View style={styles.labelGroup}>
                <Text style={styles.date}>{scholar.date}</Text>
                <Text style={styles.label}>Date</Text>
              </View>
            </View>

            {/* More Information button */}
            <TouchableOpacity style={styles.button} onPress={openScholarsDetails}>
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