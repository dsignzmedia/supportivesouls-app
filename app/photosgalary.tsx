import { View, Text, StyleSheet, ScrollView, Pressable, Image, ActivityIndicator, Modal, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from "expo-router";
import HeadersImage from '@/components/Admin/HeadersImage';
import { getGalary } from '@/app/services/service';

const PhotosGalary = () => {
  const [AllGalary, setAllGalary] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const getGalarys = async () => {
      try {
        const res = await getGalary();
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

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(scrollY > 300); // Show button after scrolling 300px
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const openModal = (imageUri) => {
    setIsLoading(true);
    setSelectedImage(imageUri);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSelectedImage(null));
  };

  return (
    <View style={styles.container}>
      <HeadersImage>
        <View style={styles.headerContainer}>
          <Pressable style={styles.iconfav}>
            <Link href={'/More'}>
              <Image style={{ width: 25, height: 25 }} source={require('../assets/images/dashboard/properties-backarrow.png')} />
            </Link>
          </Pressable>
          <Text style={styles.username}>Photos Gallery</Text>
        </View>
      </HeadersImage>

      <View style={{ padding: 15, marginBottom: '40%' }}>
        {AllGalary.length > 0 ? (
          <ScrollView 
            ref={scrollViewRef} 
            onScroll={handleScroll} 
            scrollEventThrottle={16} 
            showsVerticalScrollIndicator={false}
          >
            {AllGalary.map((image, index) => (
              <Pressable key={index} onPress={() => openModal(`https://supportivesouls.com/admin/src/assets/gallery/${image.image_url}`)}>
                <ImageWithSkeleton imageUri={`https://supportivesouls.com/admin/src/assets/gallery/${image.image_url}`} imageText={image.image_text} />
              </Pressable>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noImagesText}></Text>
        )}
      </View>

      {showScrollTop && (
        <TouchableOpacity style={styles.scrollToTop} onPress={scrollToTop}>
          <MaterialIcons name="arrow-upward" size={30} color="#fff" />
        </TouchableOpacity>
      )}

      {selectedImage && (
        <Modal transparent={true} animationType="none">
          <View style={styles.modalBackground}>
            <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>  
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <MaterialIcons name="cancel" size={30} color="#000" />
              </TouchableOpacity>
              {isLoading && <ActivityIndicator size="large" color="#000" style={styles.loadingIndicator} />}
              <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" onLoad={() => setIsLoading(false)} />
              <Text style={styles.imageText}>{AllGalary.find(img => `https://supportivesouls.com/admin/src/assets/gallery/${img.image_url}` === selectedImage)?.image_text}</Text>
            </Animated.View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const ImageWithSkeleton = ({ imageUri, imageText }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={styles.imageContainer}>
      {isLoading && (
        <View style={styles.skeleton}>
          <ActivityIndicator size="large" color="#cccccc" />
        </View>
      )}
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" onLoad={() => setIsLoading(false)} />
      <Text style={styles.imageText}>{imageText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: { flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 32, width: '100%', paddingHorizontal: 10, height: '100%' },
  iconfav: { backgroundColor: 'rgba(233, 233, 233, 0.7)', borderRadius: 25, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  username: { color: '#fff', fontSize: 24, fontFamily: 'PN_BoldItalic', flex: 1, textAlign: 'center' },
  imageContainer: { width: '100%', marginBottom: 16, borderRadius: 8, overflow: 'hidden' },
  skeleton: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0e0e0', zIndex: 1 },
  image: { width: '100%', height: 200, borderRadius: 8 },
  imageText: { textAlign: 'center', marginTop: 8, fontSize: 12, color: '#555' },
  noImagesText: { textAlign: 'center', fontSize: 16, marginTop: 50, color: '#888' },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '90%', backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center' },
  closeButton: { position: 'absolute', top: 10, right: 10, zIndex: 2 },
  fullImage: { width: '100%', height: 300 },
  loadingIndicator: { position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -15 }, { translateY: -15 }] },
  scrollToTop: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#83B624', padding: 12, borderRadius: 50, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3, elevation: 5 },
});

export default PhotosGalary;
