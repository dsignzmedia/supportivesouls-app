import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking,Pressable,Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HeadersImage from '@/components/Admin/HeadersImage';
import { Link } from "expo-router";

const contactus = () => {
  const latitude = 11.0168333;
  const longitude = 76.9998611;

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open Google Maps", err)
    );
  };

  const openEmailApp = () => {
    const email = 'contact@supportivesouls.com';
    const subject = 'Hello from Supportive Souls'; // Optional
    const body = ''; // Optional
    const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(emailUrl).catch((err) => {
      console.error('Failed to open email app:', err);
    });
  };

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
                    <Text style={styles.username}>Contact Us</Text>
                </View>
            </HeadersImage>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* MapView */}
        {/* <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.01, // Zoom level
              longitudeDelta: 0.01, // Zoom level
            }}
            onPress={openGoogleMaps} // Open Google Maps when map is pressed
          >
            <Marker
              coordinate={{ latitude: latitude, longitude: longitude }}
              title="Supportive Souls"
            />
          </MapView>
        </View> */}

        {/* Address */}

        <View style={styles.contactCard}>
          <View style={styles.contactRow}>
            <SimpleLineIcons name="location-pin" size={15} color="#94C53E" /> 
            <Text style={styles.heading}>Address:</Text>
          </View>
          <Text style={styles.addressText}>66, 7th Cross, Thirumagal Nagar, Peelamedu, Coimbatore - 641004</Text>
        </View>

        {/* Phone */}

        <View style={styles.contactCard}>
          <View style={styles.contactRow}>
          <Feather name="phone-call" size={15} color="#94C53E" />
            <Text style={styles.heading}>Phone:</Text>
          </View>
          <Text style={styles.addressText}>+91 9840217047</Text>
        </View>

        {/* Email */}

        <View style={styles.contactCard}>
          <View style={styles.contactRow}>
          <MaterialCommunityIcons name="email-outline" size={15} color="#94C53E" /> 
          <Text style={styles.heading}>E-mail:</Text>
          </View>
          <TouchableOpacity onPress={openEmailApp}>
        <Text style={[styles.addressText, { color: '#686868', textDecorationLine: 'none' }]}>
          contact@supportivesouls.com
        </Text>
      </TouchableOpacity>
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
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  address: {
    marginTop: 5,
    fontSize: 14,
    fontFamily:'RB_Regular',
    color: "#6D6D6D",
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
    addressText:{
      fontSize: 14,
      fontFamily:'RB_Regular',
      color: "#6D6D6D",
    },
    contactRow:{
      flexDirection:'row',
      marginBottom:10,
    },
    contactCard:{
      marginBottom:15,
    },
    heading:{
      fontSize: 15,
      fontWeight: 'bold',
      color:'#686868',
      marginLeft:5,
    },
});

export default contactus;
