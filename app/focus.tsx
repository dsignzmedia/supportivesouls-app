
import { View, Text,StyleSheet,ScrollView,Pressable,Image,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { Link } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const focus = () => {
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
                    <Text style={styles.username}>Focus</Text>
                </View>
            </HeadersImage>

      <ScrollView style={{padding:15}}>

            <View style={styles.cardContent}>
                <View style={styles.focusCard}>
                  <MaterialIcons name="lunch-dining" size={20} color="#94C53E"/>
                  <Text style={styles.heading}>Serving Food</Text>
                </View>
                <View>
                  <Text style={styles.content}>A warm meal can provide much more than just nourishment for those who are struggling to make ends meet. It can be a source of comfort and hope in times of uncertainty and hardship. Primarily we are focusing in distributing everyday meals at different locations based on the needs we hear about. We welcome volunteers who are willing to help distribute meals in their geographic areas. Please write to us on the required number of meals in a specific area and the plan to distribute and we can arrange the packed meals at your preferred location.</Text>
                </View>
            </View>
            <View style={styles.cardContent}>
                <View style={styles.focusCard}>
                  <MaterialCommunityIcons name="book-education-outline" size={20} color="#94C53E" />
                  <Text style={styles.heading}>Education</Text>
                </View>
                <View>
                <Text style={styles.content}>Providing financial assistance for education can have a profound and life-changing impact on individuals and their communities. Access to education can be a significant factor in breaking the cycle of poverty and achieving upward mobility. Financial assistance can help to alleviate the burden of tuition fees, textbooks, and other associated costs, enabling students to focus on their studies and achieve their academic goals. Furthermore, education is essential for broadening perspectives, and acquiring new abilities.</Text>
                </View>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.focusCard}>
                  <FontAwesome6 name="hotel" size={20} color="#94C53E"/>
                  <Text style={styles.heading}>Infrastructure</Text>
                </View>
                <View>
                <Text style={styles.content}>Helping to improve the infrastructure in schools can be a critical step in providing students from poor backgrounds with the resources they need to succeed. Poor infrastructure can create significant barriers to education, hindering students' ability to learn and achieve their full potential. Improving infrastructure in schools can take many forms, and providing good washrooms, improving language skills, and providing more tools to access resources such as computers, educational materials, etc are all crucial steps in creating a supportive learning environment.</Text>
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
        heading:{
          fontSize:15,
          color:'#525252',
          fontFamily:'PP_SemiBold',
          marginBottom:10,
          marginLeft:10,
        },
        cardContent:{
          borderWidth:1 ,
          borderColor:'#DCE1E8',
          padding:10,
          borderRadius:8,
          marginBottom:15,
        },
        focusCard:{
          flexDirection:'row',
        },
        content:{
          fontSize:13,
          color:'#525252',
          fontFamily:'PP_Regular',
          lineHeight:20,
          letterSpacing:0.5,
        },
    });
export default focus