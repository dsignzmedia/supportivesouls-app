import { View, Text,StyleSheet,ScrollView,Pressable,Image,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { Link } from "expo-router";
import { getGalary } from '@/app/services/service';

const photosgalary = () => {

  // const [AllGalary, setAllGalary] = useState();
      
  
  //     useEffect(() => {
  //         const getGalarys = async () => {
  //             const res = await getGalary();
  //             setAllGalary(res.result);
  //             // console.warn('getGalarys => ', res.result.length)
  //         };
  //         getGalarys();
  //     }, []);


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
                    <Text style={styles.username}>Photos Galary</Text>
                </View>
            </HeadersImage>
            <View>
                <Text style={{fontSize:15,textAlign:'center',marginTop:50,}}>Coming Soon...!</Text>
          {/* {AllGalary.length > 0 ? (
          AllGalary.map((image, index) => (*/}
            {/* <Image 
              source={{ uri: '	https://supportivesouls.com/admin/src/assets/galle…-05-2023-1682920298-volunteers_shelfing_books.png' }} // Each image is now a fully constructed URL
              style={styles.image}
              resizeMode="cover"
            /> */}
          {/* ))
        ) : (
          <Text style={styles.noImagesText}>No images to display.</Text>
        )} */}
            </View>
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
        iconImage:{
           width:50,
           height:50,
        },
        image:{
           width:100,
           height:100,
        },

    });
export default photosgalary