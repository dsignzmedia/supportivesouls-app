import { View, Text,StyleSheet,ScrollView,Pressable,Image,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import HeadersImage from '@/components/Admin/HeadersImage';

import { Link } from "expo-router";

const UserProfile = () => {
  const { userDetails: userDetailsParam } = useLocalSearchParams(); 
  const [userDetails, setUserDetails] = useState({name: '', email: '', phone: null,pan_number:'',status:'',address:'',city:'',postal_code:'',country:''});

  useEffect(() => {
    if (userDetailsParam) {
      try {
        const parsedDetails = JSON.parse(userDetailsParam); 
        setUserDetails(parsedDetails); 
      } catch (error) {
        console.error('Failed to parse user details:', error);
      }
    }
  }, [userDetailsParam]);

  if (!userDetails) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading user details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeadersImage>
                <View style={styles.headerContainer}>
                    {/* Back Arrow */}
                    <Pressable style={styles.iconfav}>
                        <Link href={'/More'}>
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../assets/images/dashboard/properties-backarrow.png')}
                        />
                        </Link>
                    </Pressable>

                    {/* Text */}
                    <Text style={styles.username}>Personal information</Text>
                </View>
            </HeadersImage>

            <ScrollView>

                <View style={styles.profilecontainer}>
                <Text style={styles.title}>Personal info</Text>
                
                <View style={styles.infoRow}>
                    
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{userDetails.name ? userDetails.name : '_'}</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{userDetails.email ? userDetails.email : '_'}</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.label}>Phone number</Text>
                    <Text style={styles.value}>{userDetails.phone ? userDetails.phone : '_'}</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.label}>Pan Number</Text>
                    <Text style={styles.value}>{userDetails.pan_number ? userDetails.pan_number : '_'}</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.label}>Status</Text>
                    <Text style={styles.value}>{userDetails.status ? userDetails.status : '_'}</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.value}>{userDetails.address ? userDetails.address : '_'}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.label}>City</Text>
                    <Text style={styles.value}>{userDetails.city ? userDetails.city : '_'}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.label}>Country</Text>
                    <Text style={styles.value}>{userDetails.country ? userDetails.country : '_'}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.label}>Postal Code</Text>
                    <Text style={styles.value}>{userDetails.postal_code ? userDetails.postal_code : '_'}</Text>                
                    </View>
                </View>
            </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
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
        // 
        profilecontainer: {
            padding: 20,
          },
          title: {
            fontSize: 20,
            fontWeight: 'bold',
            color:'#686868',
          },
          infoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          },
          profileImage: {
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
          },
          infoItem: {
            marginBottom: 20,
            borderBottomWidth:1,
            borderColor:'#E0E0E0',
          },
          label: {
            fontSize: 14,
            color: '#555',
            marginBottom:8,
          },
          value: {
            fontSize: 16,
            fontWeight: 'semibold',
            marginBottom: 20,
          },
          editButton: {
            color: '#007bff',
            fontWeight: 'bold',
          },
          addButton: {
            color: '#28a745',
            fontWeight: 'bold',
          },
});
export default UserProfile;
