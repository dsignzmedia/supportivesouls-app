import { View, Text, StyleSheet, ScrollView, Pressable,TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { Link } from "expo-router";
import { getAllScholars } from '@/app/services/service';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Scholarship = () => {
    const [allScholars, setAllScholars] = useState([]);
    const scrollViewRef = useRef(null);
    const [isScrollVisible, setIsScrollVisible] = useState(false); 
    const flatListRef = useRef(null); // Ref for FlatList
    // flter 
    const [filteredScholars, setFilteredScholars] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getScholarDetail = async () => {
            const res = await getAllScholars();
            setAllScholars(res.Allscholars);
            setFilteredScholars(res.Allscholars);
            console.warn('Allscholars => ', res.Allscholars.length)
            setLoading(false); 
        };       
        getScholarDetail();
    }, []);

    const scrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        } else {
            console.warn('FlatList ref is undefined or not working');
        }
    };
    
    const handleScroll = (event) => {
        const contentOffsetY = event.nativeEvent.contentOffset.y;
        setIsScrollVisible(contentOffsetY > 200);
    };

    // Function to filter data
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query) {
            const filtered = allScholars.filter((scholar) =>
                scholar.name.toLowerCase().includes(query.toLowerCase()) ||
                scholar.course.toLowerCase().includes(query.toLowerCase()) ||
                scholar.college.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredScholars(filtered);
        } else {
            setFilteredScholars(allScholars); // Reset when query is empty
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
                                style={{ width: 25, height: 25 }}
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
            {/* Scholars count */}
            <Text style={styles.supportText}>
            Scholarships awarded{' '}
                <Text style={styles.highlightText}>
                    {filteredScholars?.length || 0}
                </Text>{' '}
            </Text>

                {/* Search Input with Button */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search name"
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={handleSearch} // Update the state when typing
                />
                {/* <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchQuery)}>
                    <FontAwesome5 name="search" size={20} color="#fff" />
                </TouchableOpacity> */}
            </View>


<ScrollView
        contentContainerStyle={{ flexGrow: 1, margin: 20 }}
        ref={scrollViewRef}
        horizontal={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
    >
        {/* Skeleton Loader or Scholars List */}
                    {loading ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <View key={index} style={styles.skeletonCard}>
                          <View style={styles.skeletonLine} />
                          <View style={styles.skeletonRow}>
                            <View style={styles.skeletonBox} />
                            <View style={styles.skeletonBox} />
                          </View>
                          <View style={styles.skeletonButton} />
                        </View>
                      ))
                    ) : (
                        
                        filteredScholars.length === 0 ? (
                <View style={styles.noRecordsContainer}>
                    <Text style={styles.noRecordsText}>No records found</Text>
                </View>
            ) : (

        <FlatList
            data={filteredScholars || []}
            extraData={filteredScholars}
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
            contentContainerStyle={{ flexGrow: 1 }}
            ref={flatListRef}
        />
    ))
}
    </ScrollView>


            {/* {isScrollVisible && (
                <TouchableOpacity onPress={scrollToTop} style={styles.scrollToTopButton}>
                    <Text style={styles.scrollToTopText}><Feather name="arrow-up" size={15} color="#fff" /></Text>
                </TouchableOpacity>
            )} */}
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
  supportText: {
    fontSize: 18,
    marginTop:10,
    color: '#000000',
    fontFamily:'PP_Medium',
    paddingHorizontal:10,
  },
  highlightText: {
    color: '#85B336',
    fontFamily:'PP_Medium',
  },
searchContainer: {
        marginTop: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 28,
        paddingHorizontal: 10,
        marginRight: 8,
    },
    searchButton: {
        height: 40,
        paddingHorizontal: 16,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    skeletonCard: { backgroundColor: '#e0e0e0', marginBottom: 16, padding: 16, borderRadius: 8 },
    skeletonLine: { height: 20, backgroundColor: '#ccc', marginBottom: 8, borderRadius: 4 },
    skeletonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    skeletonBox: { width: '45%', height: 20, backgroundColor: '#ccc', borderRadius: 4 },
    skeletonButton: { height: 40, backgroundColor: '#ddd', borderRadius: 8, marginTop: 8 },
   
});

export default Scholarship;
