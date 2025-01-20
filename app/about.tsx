import { View, Text,StyleSheet,ScrollView,Pressable,Image,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

const about = () => {
  return (
    <View style={styles.container}>
      <HeadersImage>
                <View style={styles.headerContainer}>
                    {/* Back Arrow */}
                    <Pressable style={styles.iconfav}>
                        <Link href={'/More'}>
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../assets/images/dashboard/properties-backarrow.png')}
                        />
                        </Link>
                    </Pressable>

                    {/* Text */}
                    <Text style={styles.username}>About</Text>
                </View>
            </HeadersImage>
        {/* <View>
            <Text style={{fontSize:15,textAlign:'center',marginTop:50,}}>Coming Soon...!</Text>
        </View> */}
            <ScrollView>
      
        <View style={styles.aboutContianer}>

            <Text style={styles.heading}>Who Are We?</Text>
            <Text style={styles.content}>    Supportive Souls is a growing network of like minded individuals dedicated to making a positive impact on the world through our various charitable initiatives. We strive to create meaningful change by supporting those in need and investing in programs that address critical social and environmental issues.</Text>
            <Text style={styles.content}>    We believe that everyone should have access to basic necessities such as food, shelter, education, and healthcare, and we are willing to work tirelessly to ensure that these fundamental needs are met.</Text>
            <View style={{marginTop:20,}}>
               <Text style={styles.content}>    We aim to focus on the below and believe this could be a good start in bringing a positive change.</Text>
            </View>
            <View style={{marginTop:10}}>
            <Text style={styles.content}> <AntDesign name="checkcircle" size={15} color="green" style={{marginRight:5}}/>Help fight hunger.</Text>
              <Text style={styles.content}> <AntDesign name="checkcircle" size={15} color="green" />Access to education can be a game-changer.</Text>
              <Text style={styles.content}> <AntDesign name="checkcircle" size={15} color="green" />Support senior-friendly policies.</Text>
              <Text style={styles.content}> <AntDesign name="checkcircle" size={15} color="green" />Offer practical help and emotional support for Single Mothers & Widows.</Text>
            </View>
        </View>
        </ScrollView>

    </View>
  )
}
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
        borderRadius: 15,
        width: 30,
        height: 30,
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
        aboutContianer:{
          padding:10,
        },
        heading:{
          fontSize:20,
          fontFamily:'RB_Regular',
          marginBottom:25,
       },
       content: {
        fontSize: 14,
        fontFamily:'RB_Regular',
        color: "#6D6D6D",
        letterSpacing:1,
        lineHeight:18,
        marginBottom:15,
      },
    });
export default about