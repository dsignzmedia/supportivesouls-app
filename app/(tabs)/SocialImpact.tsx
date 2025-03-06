import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Modal,Image ,Platform,Animated} from 'react-native';
import React , { useRef, useState,useCallback,useEffect }from "react";
import HeadersImage from '@/components/Admin/HeadersImage';
import { router } from 'expo-router';
import DateTimePicker from "@react-native-community/datetimepicker";
// import Modal from "react-native-modal";
import { getAsyncData, socialImpact } from '../services/service';
import CustomBottomsheetModel from "@/components/common/CustomBottomsheetModel";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const SocialImpact = () => {

// State to control the modal visibility
const [modalVisible, setModalVisible] = useState(false);

 const [totallyBenifited, setTotallyBenifited] = useState(0);
  const [scholarsData, setsocialImpact] = useState([]);
  // const [scholarsData, setScholarsData] = useState([]);
  // const [selectedImpactId, setSelectedImpactId] = useState(null);
  const [selectedImpact, setSelectedImpact] = useState(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0.3)).current;
  const secondSheetRef = useRef<BottomSheetModal>(null);

  // useEffect(() => {
  //   const init = async () => {
  //     const user = await getAsyncData('userDetails'); // Fetch user details from storage
  //     const data = await socialImpact(user.id); // Fetch social impact data
  
  //     if (data.success && data.socialImpact.length) {
  //       console.log('Fetched Data:', data.socialImpact);
  //       setsocialImpact(data.socialImpact); // Store fetched data
  //     } else {
  //       console.log('No social impact data available.');
  //     }
  //   };
  
  //   init();
  // }, []);

  

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

    setLoading(false); 
  };

  useEffect(() => {
    init();
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [fadeAnim]);
  
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

    // const bottomSheetRef = useRef<BottomSheetModal>(null);

    // const handlePresentModalPress = useCallback((impact) => {
    //   setSelectedImpact(impact);
    //   secondSheetRef.current?.present();
    //   console.log("Bottom sheet opened");
    // }, []);
    // const handlePresentModalPress = useCallback((impact) => {
    //   setSelectedImpact(impact); 
    //   secondSheetRef.current?.present();
    // }, []);

    const handleOpenDetails = (impact: any) => {
      setSelectedImpact(impact);
      secondSheetRef.current?.present();
    };
  
    // const handleDismiss = useCallback(() => {
    //   secondSheetRef.current?.close();
    //   console.log("Dismiss button pressed");
    // }, []);
 

  // useEffect(() => {
  //   const init = async () => {
  //     const user = await getAsyncData('userDetails');
  //     const data = await socialImpact(user.id);
  
  //     if (data.success && data.socialImpact.length) {
  //       console.log('Fetched Social Impact Data:', data.socialImpact);
  //       setsocialImpact(data.socialImpact);
  //       setTotallyBenifited(data.socialImpact.length);
  //     }
  //   };
  
  //   init();
  // }, []);

  

  return (
    <BottomSheetModalProvider>

    <View style={styles.container}>
      <HeadersImage>
        <View style={styles.scholarsContent}>
          <Text style={styles.scholarsname}>Social Impact</Text>
        </View>
      </HeadersImage> 

      <ScrollView>
              <View style={styles.content}>
      
              {/* Social count */}
              {loading ? (
                <Animated.View style={[styles.skeletonText, { opacity: fadeAnim }]} />
              ) : (
                <Text style={styles.supportText}>
                  You have supported <Text style={styles.highlightText}>{totallyBenifited} Scholars</Text>
                </Text>
              )}
      
              {/* Skeleton Loader or Scholars List */}
            {loading ? (
              // Skeleton Loader
              Array.from({ length: 5 }).map((_, index) => (
                <Animated.View key={index} style={[styles.skeletonCard, { opacity: fadeAnim }]}>
                  <View style={styles.skeletonLine} />
                  <View style={styles.skeletonRow}>
                    <View style={styles.skeletonBox} />
                    <View style={styles.skeletonBox} />
                  </View>
                  <View style={styles.skeletonButton} />
                </Animated.View>
              ))
            ) : scholarsData.length > 0 ? (

              scholarsData.map((scholar: any, index) => (
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


                  {/* More details button onPress={openModal} activeOpacity={0.5}  onPress={() => openModal(scholar)} */}
                    <TouchableOpacity style={styles.button}  activeOpacity={0.5}
                     onPress={() => handleOpenDetails(scholar)}>
                      <Text style={styles.buttonText}>More Details</Text>
                    </TouchableOpacity>

                </View>
              ))
              ) : (
                <Text style={styles.noDataText}>No records found.</Text>
              )}
              </View>
            </ScrollView>
            {/* Custom Bottom sheetModel */}
            
            <CustomBottomsheetModel
              bottomSheetRef={secondSheetRef}
              snapPoints={['75%', '100%']}
              initialIndex={0}
              showHandleIndicator={true}
            >
              {selectedImpact ? (
                <View style={styles.bottomSheetContainer}>
                  {/* Impact Details */}
                  <Text style={styles.impactHeading}>Impact Details</Text>
                  {selectedImpact.impact_name || selectedImpact.amount_required || selectedImpact.amount_spent || selectedImpact.details ? (
                    <View style={{ marginBottom: 16 }}>
                      {/* <Text style={styles.bottomTextBox}>
                        Scholar Name: {selectedImpact.impact_name || 'N/A'}
                      </Text> */}
                      <View style={styles.labelGroup}>
                        <Text style={styles.label}>Scholar Name</Text>
                        <Text style={styles.name}>{selectedImpact.impact_name || 'N/A'}</Text>
                      </View>

                      <View style={styles.labelGroup}>
                        <Text style={styles.label}>Amount Required:</Text>
                        <Text style={styles.name}>₹ {selectedImpact.amount_required
                  ? new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(selectedImpact.amount_required)
                  : 'N/A'}</Text>
                      </View>

                      <View style={styles.labelGroup}>
                        <Text style={styles.label}>Amount Spent:</Text>
                        <Text style={styles.name}>₹ {selectedImpact.amount_spent
                  ? new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(selectedImpact.amount_spent)
                  : 'N/A'}</Text>
                      </View>

                      <View style={styles.labelGroup}>
                        <Text style={styles.label}>Details:</Text>
                        <Text style={styles.name}>{selectedImpact.details || 'N/A'}</Text>
                      </View>


                      {/* <Text style={styles.bottomTextBox}>
                        Amount Spent: ₹ {selectedImpact.amount_spent || 'N/A'}
                      </Text>
                      <Text style={styles.bottomTextBox}>
                        Details: {selectedImpact.details || 'N/A'}
                      </Text> */}
                    </View>
                  ) : (
                    <Text style={styles.noDataText}>No Impact Details available.</Text>
                  )}

                  {/* Partial Donor Information */}
                  <View style={{ marginBottom: 16 }}>
                  <Text style={styles.bottomContent}>
                      You are a partial donor for this Impact. An amount of Rs. ₹{' '}
                      {selectedImpact.donation_amount !== undefined
                        ? new Intl.NumberFormat('en-IN', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(selectedImpact.donation_amount)
                        : 'N/A'}{' '}
                      from your donation was utilized in conjunction with funds from other donors.
                    </Text>
                  </View>

                  <View style={styles.horizontalLine}></View>

                  {/* Documents Submitted */}
                  <View>
                  <Text style={styles.documentsHeading}>Documents Submitted</Text>
                      {selectedImpact.documents && selectedImpact.documents.length > 0 ? (
                        selectedImpact.documents.map((document, index) => (
                          <View key={index} style={styles.documentItemContainer}>
                          <Text style={styles.documentItem}>{document.document_title}</Text>
                          <Text style={styles.documentItem}>Uploaded on: {document.document_uploaded || 'N/A'}</Text>
                          
                          {/* Check if an image exists for the document */}
                          {document.image_url && (
                            <Image 
                              source={{ uri: document.image_url }} 
                              style={styles.documentImage} 
                              resizeMode="cover"
                            />
                          )}
                        </View>
                        ))
                      ) : (
                        <Text style={styles.noDataText}>No documents available.</Text>
                      )}
                    </View>
                  </View>
                ) : (
                  <Text style={styles.noDataText}>No details available.</Text>
                )}
            </CustomBottomsheetModel>

             
    </View>
    </BottomSheetModalProvider>

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
    // 
    bottomSheetContainer:{
      padding: 16,
    },
    impactHeading:{
      fontSize: 18,
      fontFamily:'RB_Bold',
      marginBottom: 16,
    },
    bottomTextBox:{
      fontSize: 16,
      fontFamily:'RB_Regular',
      color:'#000000',
      marginBottom: 10,
    },  
    bottomContent:{
      fontSize: 16,
      fontFamily:'PP_Regular',
      color:'#000000',
    },
    horizontalLine:{
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
      marginBottom: 16,
      justifyContent:'center',
      alignSelf:'center',
      width: '80%',
      borderRadius: 10,
    },
    documentsHeading:{
      fontSize: 18,
      fontFamily:'RB_Bold',
      marginBottom: 16,
    },
    documentItemContainer: {
      backgroundColor: '#f9f9f9', // Light background
      padding: 12,
      marginBottom: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd', // Light border
    },
    documentItem: {
      fontSize: 16,
      color: '#555', // Medium-dark text
      marginBottom: 4,
    },
    
    noDataText:{
      fontSize: 16,
      fontFamily:'RB_Regular',
      color:'#666',
      textAlign:'center',
      marginTop: 16,
    },
    skeletonCard: { backgroundColor: '#e0e0e0', marginBottom: 16, padding: 16, borderRadius: 8 },
    skeletonLine: { height: 20, backgroundColor: '#ccc', marginBottom: 8, borderRadius: 4 },
    skeletonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    skeletonBox: { width: '45%', height: 20, backgroundColor: '#ccc', borderRadius: 4 },
    skeletonButton: { height: 40, backgroundColor: '#ddd', borderRadius: 8, marginTop: 8 },
   
    documentImage: {
      width: 100,
      height: 100,
      marginTop: 10,
    },
    skeletonText: { height: 20, backgroundColor: '#d6d6d6', marginBottom: 10, borderRadius: 5 },

});
export default SocialImpact