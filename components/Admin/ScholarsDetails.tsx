import { View, Text,StyleSheet,Image,ScrollView,Pressable,TouchableOpacity ,Platform} from 'react-native'
import React, { useState } from 'react';
import HeadersImage from '@/components/Admin/HeadersImage';
import { Link } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
// import  ScholarsData from '../Data/ScholarsData';

const ScholarsData = [
    {
      index: 0,
      title: "Scholar Details",
      name: "Karthick N",
      course: "B. Voc Banking Stock and Insurance",
      college: "PSG College of Arts & Science",
      category :"Single Parent",
    //   amount: "₹ 5,000.00",
    //   date: "05 Sep 2024",
    },
    {
      index: 1,
      title: "Scholarship Details",
      AmountRequired: "₹ 10,000.00",
      Frequency: "6-months",
      AmountSanctioned: "₹ 10,000.00",
      Scholarshipcontent:
        "You are a partial donor for this scholarship. An amount of Rs. 5,000.00 from your donation was utilized in conjunction with funds from other donors.",
    },
    {
      index: 2,
      title: "Background Information",
      Informationcontent:
        "08-May-2024: Student applied for scholarship. Single Parent. He is currently studying his 4th semester in PSG CAS. He is looking for financial assistance for the next 2 semesters of his course. Informed student to appear in person with his mom.24-Jun-2024: Student and his Mom appeared in person. Mom works as cleaning assistant in PSG Canteen with an income of 11K per month. Her husband passed away one year before (2023) and since then it has been difficult to manage expenses and college fees. Student's mom requested for 10K assistance as the total fees for the student is about 22K and she can pay the remaining. Death certificate of her husband has been submitted. We have informed that we will complete background verifications and process the scholarship if qualified.13-Jun-2024: Documents verified. Also spoke to PSG authorities about the employment of the Student's mother and her monthly income. All information is verified and application is approved. We will process the payment of 10K once the student's mother has arranged for 50% fees from their end.05-Aug-2024: Student and his Mother appeared in person and they had arranged the fees of 11500 from their end and we will paying 10K from our end for each of the upcoming semesters. Payment processed and fees payment receipt is attached.",
    },
    {
      index: 3,
      title: "Documents Submitted",
      content: "Karthick Dad Death Certificate",
      image: "../../assets/images/adaptive-icon.png",
    },
    {
      index: 4,
      title: "Payment Details",
      Amountpaid: "₹ 5,000.00",
      Date: "05 Sep, 2024",
      NextPayment: "05 June, 2025",
    },
  ];

  
const ScholarsDetails = () => {


    const [selectedTab, setSelectedTab] = useState('Financial Support');
    // Set the default expanded accordion to index 0 (Guardian Angels)
    const [expandedIndexes, setExpandedIndexes] = useState([0]);

    const handleToggle = (index) => {
        // Toggle the accordion; if already expanded, remove it from the list
        setExpandedIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };
    const navigation = useNavigation();
       

    // const truncatedContent = (text, maxLines, lineHeight) => {
    //     const maxChars = maxLines * 20; // Adjust based on average characters per line
    //     return text.length > maxChars ? `${text.slice(0, maxChars)}...` : text;
    //   };
    
      

  return (
    <View style={styles.container}>
        <HeadersImage>
            <View style={styles.headerContainer}>
                {/* Back Arrow */}
                <Pressable style={styles.iconfav}>
                    <Link href={'/Scholars'}>
                    <Image
                        style={{ width: 20, height: 20 }}
                        source={require('../../assets/images/dashboard/properties-backarrow.png')}/>
                    </Link>
                </Pressable>
                {/* Text */}
                <Text style={styles.username}>Scholars Informations</Text>
            </View>
        </HeadersImage>
  
        <ScrollView>
            <View style={styles.header}>
              {/* Scholars count */}
                    <View style={{marginBottom:20}}>
                      <Text style={styles.highlightText}>
                      Karthick N <Text style={styles.supportText}> Details</Text>
                      </Text>
                    </View>
                          
                          {ScholarsData.map((item, index) => (
                            <AccordionItem
                                key={index}
                                title={item.title}
                                content={
                                <View>
                                    {/* Scholar Details */}
                                    {item.course && (
                                    <View style={styles.contentBox}>
                                        <Text style={styles.course_text}>{item.course}</Text>
                                        <Text style={styles.courseLabel}>Course</Text>
                                    </View>
                                    )}
                                    {item.college && (
                                    <View style={styles.contentBox}>
                                        <Text style={styles.college_name}>{item.college}</Text>
                                        <Text style={styles.college_label}>College</Text>
                                    </View>
                                    )}
                                    {item.category && (
                                    <View>
                                        <Text style={styles.category_name}>{item.category}</Text>
                                        <Text style={styles.category_label}>Category</Text>
                                    </View>
                                    )}
                                    {/* Scholarship Details */}
                                    <View style={styles.scholarshipDetails}>
                                        <View style={{width:'50%'}}>
                                            {item.AmountRequired && (
                                                <View style={styles.detailRow}>
                                                <Text style={styles.detailLabel}>{item.AmountRequired}</Text>
                                                <Text style={styles.detailDescription}>Amount Required</Text>
                                                </View>
                                            )}
                                            {item.Frequency && (
                                                <View style={styles.detailRow}>
                                                <Text style={styles.detailLabel}>{item.Frequency}</Text>
                                                <Text style={styles.detailDescription}>Frequency</Text>
                                                </View>
                                            )}
                                            {item.AmountSanctioned && (
                                                <View style={styles.detailRow}>
                                                <Text style={styles.detailLabel}>{item.AmountSanctioned}</Text>
                                                <Text style={styles.detailDescription}>Amount Sanctioned</Text>
                                                </View>
                                            )}
                                        </View>
                                        {item.Scholarshipcontent && (
                                            <View style={{width:'50%'}}>
                                                <Text style={styles.contentDescription}>{item.Scholarshipcontent}</Text>
                                            </View>
                                        )}
                                    </View>
                                    {/*  */}
                                    {item.Informationcontent && (
                                            <View>
                                                <Text style={styles.Informationcontentcontent}>{item.Informationcontent}</Text>
                                            </View>
                                        )}
                                        {/* Documents Submitted */}
                                          {item.content && (
                                            <View style={styles.documentSection}>
                                              <Image style={{ width: 25, height: 25 }} source={require('../../assets/images/dashboard/document_icon.png')}/>
                                              <TouchableOpacity onPress={() => console.log(`View Document: ${item.fileUrl}`)}>
                                                <Text style={styles.documentLink}>{item.content}</Text>
                                              </TouchableOpacity>
                                            </View>
                                          )}

                                          {/* Payment Details */} 
                                          {item.Amountpaid && (
                                            <View style={styles.paymentDetails}>

                                            <View style={styles.paymentRow}>
                                              <View style={styles.paymentColumn}>
                                                <Text style={styles.paymentAmount}>{item.Amountpaid}</Text>
                                                <Text style={styles.paymentSubLabel}>Amount paid</Text>
                                              </View>
                                              <View style={styles.paymentColumn}>
                                                <Text style={styles.paymentDate}>{item.Date}</Text>
                                                <Text style={styles.paymentSubLabel}>Date</Text>
                                              </View>
                                              <View>
                                                <Text style={styles.nextPayment}>{item.NextPayment}</Text>
                                                <Text style={styles.paymentSubLabel}>Next Payment</Text>
                                              </View>
                                            </View>

                                            
                                          </View>
                                          )}
                                </View>
                                }
                                expanded={expandedIndexes.includes(index)}
                                onPress={() => handleToggle(index)}
                            />
                            ))}
            
                        
                        <View>
                            <Text style={styles.impactText}>To contribute more for this student</Text>
                        </View>

                        {/* Donate More Button */}
                              <TouchableOpacity style={styles.donateButton}>
                                <Text style={styles.donateButtonText}>Donate Now</Text>
                              </TouchableOpacity>

                        </View>
                        
        </ScrollView>
    </View>
  )
}

const AccordionItem = ({ title, content, expanded, onPress }:any) => (
    <View style={styles.accordionItem}>
      <TouchableOpacity onPress={onPress} style={styles.dropheader}>
        {/* <Text style={styles.title}>{title}</Text> */}
        <Text style={[styles.title,expanded ? styles.activeTitle : null,]}>{title}</Text>
        
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-forward'}
          size={20}
          color="#4caf50"
          style={styles.icon}
        />
      </TouchableOpacity>
      {expanded && <View style={styles.underline} />}
      {expanded && (
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{content}</Text>
        </View>
      )}
    </View>
  );
  
const styles = StyleSheet.create({
    container:{
        // flex:1,
        height:'100%',
        backgroundColor:'#fff',
    },
scholarsContent:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'flex-end',
    paddingBottom:30,
    },
    scholarsname:{
      color:'#fff',
      fontSize:24,
      fontFamily:'PN_BoldItalic',
      justifyContent:'center',
      textAlign:'center',
      alignItems:'center',
      // marginTop:70,
    },
    userContent:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingBottom:30,
        },
        iconback:{
            flexDirection: "row",
            zIndex: 1,
            width: "20%",
            alignItems:'center',
        
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
        header: {
            padding: 15,
            // borderWidth:1,
            // paddingBottom: 20,
            // paddingHorizontal: 20,
          },
          supportText: {
            fontSize: 18,
            marginBottom:25,
            color: '#525252',
            fontFamily:'PP_Medium',
          },
          highlightText: {
            fontSize: 18,
            color: '#85B336',
            fontFamily:'PP_Medium',
          },
        // 
        accordionItem: {
        borderWidth:1,
        borderColor:'#E0E0E0',
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
        // marginTop: 50,
        overflow: "hidden",
        // // Shadow for iOS
        // shadowColor: '#000',
        // shadowOpacity: 0.1,
        // shadowOffset: { width: 0, height: 2 }, 
        // shadowRadius: 4,
        // // Shadow for Android
        // elevation: 1,
        ...Platform.select({
              ios: {
                shadowColor: '#E0E0E0',
                // shadowOffset: { width: 0, height: 2 },
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.1,
                shadowRadius: 3,
              },
              android: {
                elevation: 1,
              },
            }),
      },
      dropheader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
      },
      underline: {
        backgroundColor: "#E5E5E6",
        height: 1,
        width: '90%',
        alignSelf: 'center',
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
      },
      activeTitle: {
        color: '#85B336', // Green color for active state
      },
      icon: {
        marginLeft: 10,
      },
      contentContainer: {
        padding: 15,
        paddingVertical:10,
      },
        content: {
            fontSize: 14,
            fontFamily:'RB_Regular',
            color: "#6D6D6D",
            marginBottom: 17,
            letterSpacing:1,
            lineHeight:18,
          },
          button: {
            borderWidth:1,
            borderColor:'#85B336',
            // padding: 10,
            borderRadius: 5,
            alignItems: "center",
            justifyContent:'center',
            margin:'auto',
            width:150,
            height:36,
          },
          buttonText: {
            color:'#85B336',
            fontSize: 14,
            fontWeight: "bold",
          },
        //   
        contentBox:{
            marginBottom:15,
        },
        course_text:{
            fontSize:14,
            color:'#000000',
            fontFamily:'PP_Medium',
            letterSpacing:1,
        },
        courseLabel:{
            fontSize:10,
            color:'#666',
            fontFamily:'RB_Regular',
            // letterSpacing:1,
        },
        college_name:{
            fontSize:14,
            color:'#000000',
            fontFamily:'PP_Medium',
            letterSpacing:1,
        },     
        college_label:{
            fontSize:10,
            color:'#666',
            fontFamily:'RB_Regular',
        }, 
        category_name:{
            fontSize:14,
            color:'#000000',
            fontFamily:'PP_Medium',
            letterSpacing:1,
        },
        category_label:{
            fontSize:10,
            color:'#666',
            fontFamily:'RB_Regular',
        },
        scholarshipDetails: {
            flexDirection:'row',
            // padding:15,
        },

        detailRow: {
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            marginBottom: 16,
        },

        detailLabel: {
            fontSize: 14,
            fontFamily:'PP_Medium',
            // fontWeight: '600',
            color: '#000000', 
        },

        detailDescription: {
            fontSize: 10,
            fontFamily:'RB_Regular',
            color: '#666666',
        },

        contentDescription: {
            fontSize: 14,
            color: '#555555',
            lineHeight: 22,
            fontFamily:'RB_Regular',
        },
        Informationcontentcontent:{
            fontSize: 13,
            color: '#555555',
            lineHeight: 22,
            fontFamily:'RB_Regular',
            letterSpacing:0.8,
            // display:block,
            // width:150px;
            // word-wrap:'break-word',
            wordWrap:'break',
        },
        // 
  documentSection: {
    flexDirection:'row',
  },
  documentLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Dark gray text
    marginBottom: 5,
  },
  documentLink: {
    fontSize: 16,
    color: "#4CAF50", // Green text for the link
    textDecorationLine: "underline", // Underlined to indicate a link
  },
  paymentDetails: {
    // flexDirection: "row",

    // backgroundColor: "#f9f9f0", // Light background similar to the image
    // borderRadius: 8,
    // padding: 15,
    // borderWidth: 1,
    // borderColor: "#e0e0e0",
    // marginVertical: 10,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50", 
    // marginBottom: 10,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent:'space-between',
    flexWrap:'wrap',
    // marginBottom: 10,
  },
  paymentColumn: {
    width:'50%',
  },
  paymentAmount: {
    fontSize: 14,
    color: "#000", 
    fontFamily:'PP_Medium',
  },
  paymentDate: {
    fontSize: 14,
    fontFamily:'PP_Medium',
    color: "#000", 
  },
  paymentSubLabel: {
    fontSize: 10,
    color: "#999", 
    fontFamily:'RB_Regular',
  },
  nextPayment: {
    fontSize: 14,
    fontFamily:'PP_Medium',
    color: "#7C6554",
    marginTop:25,
  },   
  impactText: {
    fontSize: 18,
    fontFamily:'PP_Regular',
    color: '#000000',
    textAlign: 'center',
    marginBottom:20,
    marginTop:50,
    letterSpacing:1,
  },
 donateButton: {
    width:288,
    height:42,
    backgroundColor: '#85B336',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    margin:'auto',
    marginBottom:30,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily:'PP_SemiBold',
  },
                
});
export default ScholarsDetails