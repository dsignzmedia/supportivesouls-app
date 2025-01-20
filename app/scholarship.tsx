import { View, Text, StyleSheet, ScrollView, Pressable, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { Link } from "expo-router";
import { getAllScholars } from '@/app/services/service';
import Feather from '@expo/vector-icons/Feather';


const Scholarship = () => {
    const [allScholars, setAllScholars] = useState();
    const scrollViewRef = useRef(null);
    const [isScrollVisible, setIsScrollVisible] = useState(false); // Track scroll position

    useEffect(() => {
        const getScholarDetail = async () => {
            const res = await getAllScholars();
            setAllScholars(res.Allscholars);
            console.warn('Allscholars => ', res.Allscholars.length)
        };
        getScholarDetail();
    }, []);

    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    const handleScroll = (event) => {
        const contentOffsetY = event.nativeEvent.contentOffset.y;
        if (contentOffsetY > 200) { // Show the scroll button after scrolling 200px
            setIsScrollVisible(true);
        } else {
            setIsScrollVisible(false);
        }
    };

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
                    <Text style={styles.username}>Scholarship</Text>
                </View>
            </HeadersImage>

            {/* <ScrollView
                contentContainerStyle={{ flexGrow: 1, margin: 20 }}
                ref={scrollViewRef}
                horizontal={false}
                onScroll={handleScroll}
                scrollEventThrottle={16} // Throttle the scroll event for better performance
            >
                <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>S.NO</Text>
                    <Text style={styles.headerText}>CANDIDATE NAME</Text>
                    <Text style={styles.headerText}>INSTITUTION</Text>
                    <Text style={styles.headerText}>COURSE</Text>
                    <Text style={styles.headerText}>AMOUNT PAID</Text>
                </View>

                <FlatList
                    data={allScholars}
                    extraData={allScholars}
                    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.tableRow} key={item.id || index}>
                            <Text style={styles.cell}>{index + 1}</Text>
                            <Text style={styles.cell}>{item.name}</Text>
                            <Text style={styles.cell}>{item.college}</Text>
                            <Text style={styles.cell}>{item.course}</Text>
                            <Text style={styles.cell}>{item.amount_sanctioned}</Text>
                        </View>
                    )}
                />
            </ScrollView> */}

<ScrollView
        contentContainerStyle={{ flexGrow: 1, margin: 20 }}
        ref={scrollViewRef}
        horizontal={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
    >
        <FlatList
            data={allScholars}
            extraData={allScholars}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
            renderItem={({ item, index }) => (
                <View style={styles.cardContainer} key={item.id || index}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.label}>Name</Text>

                    <Text style={styles.infoText}>{item.course}</Text>
                    <Text style={styles.label}>Course</Text>

                    <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="tail">
                        {item.college}
                    </Text>
                    <Text style={styles.label}>Institution</Text>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.infoText}>₹ {item.amount_sanctioned}</Text>
                            <Text style={styles.label}>Amount Paid</Text>
                        </View>
                    </View>
                </View>
            )}
        />
    </ScrollView>


            {isScrollVisible && (
                <TouchableOpacity onPress={scrollToTop} style={styles.scrollToTopButton}>
                    <Text style={styles.scrollToTopText}><Feather name="arrow-up" size={15} color="#fff" /></Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 32,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        padding: 10,
    },
    headerText: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 12,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 10,
    },
    cell: {
        flex: 1,
        textAlign: "center",
        fontSize: 12,
    },
    // scrollToTopButton: {
    //     position: 'absolute',
    //     bottom: 20,
    //     right: 20,
    //     backgroundColor: '#95C639',
    //     padding: 15,
    //     borderRadius: 80,
    //     width:45,
    //     height:45,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // scrollToTopText: {
        // color: '#fff',
        // fontSize: 20,
    // },
    // 
    cardContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 16,
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      borderWidth:1,
      borderColor:'#E0E0E0',
      marginVertical: 10,
  },
  nameText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 4,
  },
  infoText: {
      fontSize: 14,
      color: '#000',
      marginBottom: 2,
  },
  label: {
      fontSize: 12,
      color: '#888',
      marginBottom: 10,
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
  },
  column: {
      alignItems: 'flex-start',
  },
  scrollToTopButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#95C639',
      padding: 10,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
  },
  scrollToTopText: {
      fontSize: 14,
      color: '#fff',
  },
});

export default Scholarship;
