import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './Dashboard';
import Scholars from './Scholars';
import Donations from './Donations';
import SocialImpact from './SocialImpact';
import More from './More';
import index from '..';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const [isHomeSearchVisible, setHomeSearchVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let imageSource;
            if (route.name === "Favorites" || route.name === "Tickets") {
                // Use the same image for Favorites and Tickets
                imageSource = require('../../assets/images/dashboard/dashboard.png');
            } else {
                switch (route.name) {
                case 'Dashboard':
                  imageSource = require('../../assets/images/dashboard/dashboard.png');
                  break;
                  case 'Donations':
                    imageSource = require('../../assets/images/dashboard/donations.png');
                    break;
                case 'Scholars':
                  imageSource = require('../../assets/images/dashboard/scholars.png');
                  break;
                case 'SocialImpact':
                  imageSource = require('../../assets/images/dashboard/socialImpact.png');
                  break;
                case 'More':
                  imageSource = require('../../assets/images/dashboard/more.png');
                  break;
            }
          }
            return (
              <View style={styles.tabscontainer}>
                <Image
                source={imageSource}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#95C639' : '#484C52',
                }}
              />
              </View>
            );
          },
          tabBarLabel: ({ focused }) => (
            <View style={styles.labelContainer}>
              {focused && <View style={styles.topLine} />}
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '800',
                      color: focused ? '#95C639' : '#484C52',
                    }}
                  >
              {route.name}
            </Text>
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '800',
            color:'#000000',
          },
          tabBarActiveTintColor: '#3366CC',
          tabBarInactiveTintColor: '#3366CC',
          fontSize:15,
          tabBarStyle: {
            height: 80,
            width:'100%',
            backgroundColor:'#fff',
          },
          headerShown: false,
        })}
        // 
        
      > 
      
        <Tab.Screen name="Dashboard"  component={Dashboard}/>
        <Tab.Screen name="Donations"  component={Donations}/>
        <Tab.Screen name="Scholars"  component={Scholars}/>
        <Tab.Screen name="SocialImpact"  component={SocialImpact}/>
        <Tab.Screen name="More"  component={More}/>
      </Tab.Navigator>
      </View>
  );
}
const styles = StyleSheet.create({
     
      container:{
        flex: 1,
      },
      tabscontainer:{
        // marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        position: 'relative',
      },
  
    arrow: {
      fontSize: 14,
      color: '#333',
    },
    selectEmailContainer:{
      marginTop:20,
    },
    searchText: {
      color: '#6A6A6A',
      fontSize: 15,
      fontWeight:'light',
      marginBottom: 20,
      letterSpacing:1,
    // borderWidth:1,
    },
    input: {
      width: 'auto',
      borderColor:'#EAEAEA',
      borderRadius:5,
      height: 40,
      borderWidth: 1,
      padding: 10,
    },
    selectEmail:{
      marginBottom:15,
    },
    radioItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioText:{
      color:'#00000',
      fontWeight:'semibold',
      fontSize:14,
    },
    optionHeadings:{
      marginBottom:20,
      color:'#000000',
      fontSize:17,
      fontWeight:'semibold',
      fontFamily:'LatoSemiBold'
    },
    saveFooter:{
      height:'auto',
      alignItems:'center',
      justifyContent:'center',
      borderTopColor:'#EDEDED',
      borderTopWidth:1,
      paddingVertical:15,
      shadowColor:'#000',elevation:1
    },
    labelContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    topLine: {
      position: 'absolute',
      top: -35, 
      width: '70%', 
      height: 2, 
      backgroundColor: '#95C639', 
      borderRadius: 2,
    },
});




