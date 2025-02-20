import { View, Text, StyleSheet, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { Link } from "expo-router";
import { getGalary } from '@/app/services/service';

const PhotosGalary = () => {
  const [AllGalary, setAllGalary] = useState([]);
  
  useEffect(() => {
    const getGalarys = async () => {
      try {
        const res = await getGalary(); // Fetch gallery data from API
        if (res.success && res.result) {
          setAllGalary(res.result);
        } else {
          console.warn("No images found.");
        }
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
      }
    };
    getGalarys();
  }, []);

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

          {/* Header Title */}
          <Text style={styles.username}>Photos Gallery</Text>
        </View>
      </HeadersImage>

      <View style={{ padding: 15 ,marginBottom: '40%'}}>
        {/* Check if images are available */}
        {AllGalary.length > 0 ? (
          <ScrollView contentContainerStyle={styles.imagesContainer}
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}
          >
            {AllGalary.map((image, index) => (
              <ImageWithSkeleton
                key={index}
                imageUri={`https://supportivesouls.com/admin/src/assets/gallery/${image.image_url}`}
                imageText={image.image_text}
              />
            ))}
          </ScrollView>
        ) : (
          // Display a message if no images are available
          <Text style={styles.noImagesText}>No images to display.</Text>
        )}
      </View>
    </View>
  );
};

const ImageWithSkeleton = ({ imageUri, imageText }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.imageContainer}>
      {/* Skeleton Loader */}
      {isLoading && (
        <View style={styles.skeleton}>
          <ActivityIndicator size="large" color="#cccccc" />
        </View>
      )}

      {/* Render the image */}
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
        onLoad={() => setIsLoading(false)} // Hide skeleton when the image loads
      />
      
      {/* Render image description */}
      <Text style={styles.imageText}>{imageText}</Text>
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
        iconImage:{
           width:50,
           height:50,
        },
        
        imagesContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: 20,
        },
        imageContainer: {
          width: '48%',
          marginBottom: 16,
          borderRadius: 8,
          overflow: 'hidden',
        },
        skeleton: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e0e0e0', // Light gray for skeleton
          zIndex: 1,
        },
        image: {
          width: '100%',
          height: 200,
          borderRadius: 8,
        },
        imageText: {
          textAlign: 'center',
          marginTop: 8,
          fontSize: 12,
          color: '#555',
        },
        noImagesText: {
          textAlign: 'center',
          fontSize: 16,
          marginTop: 50,
          color: '#888',
        },

    });
export default PhotosGalary;