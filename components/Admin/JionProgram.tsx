import { View, Text, TouchableOpacity, StyleSheet ,Image,Pressable, Dimensions,KeyboardAvoidingView,Platform,Keyboard,TextInput,Alert } from 'react-native';
import React , { useRef, useState,useCallback, useEffect }from "react";
import HeadersImage from '@/components/Admin/HeadersImage';
import { FloatingLabelInput } from "react-native-floating-label-input";
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';
import { Link } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PhoneInput from 'react-native-phone-number-input';   
import axios from 'axios';
import { useRouter } from "expo-router";
import { JionWithUsForm, getAsyncData, isAlreadyLoggedIn} from '@/app/services/service';
import { useNavigation } from '@react-navigation/native'; 


const {width,height} = Dimensions.get('window');
const Jionprogram = ({children}:any) => {

    // date picker

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState("Select a DOB");

    const showDatePicker = () => {
        Keyboard.dismiss(); 
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date:any) => {
        const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        });
  
    setSelectedDate(formattedDate); 
    hideDatePicker();
  };

  

    // form 
    const [flashMessage, setFlashMessage] = useState({ type: '', message: '' });

    useEffect(() => {
      if (flashMessage.message) {
        setTimeout(() => {
          setFlashMessage({ type: '', message: '' });
        }, 2000);
      }
    }, [flashMessage]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pan, setPan] = useState('');
    // const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalcode, setPostalcode] = useState('');
    const [birthday, setBirthday] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState('');

    // date picker
         const [errors, setErrors] = useState({
          name: { status: false, message: '' },
          email: { status: false, message: '' },
          phone: { status: false, message: '' },
          address: { status: false, message: '' },
          city: { status: false, message: '' },
          state: { status: false, message: '' },
          selected: { status: false, message: '' },
          postalcode: { status: false, message: '' },
        });

        const handleCancel = () => {
          // Clear form fields
          resetFormFields();
          
          // Redirect to Dashboard
          router.replace('/(tabs)/Dashboard');
        };

        
    const navigation = useNavigation(); 
            
            const validateEmail = (email) => {
              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              return emailRegex.test(email);
            };

    const handleSubmit = async () => {
              let newErrors = {
                name: { status: !name },
                email: { status: !email },
                phone: { status: !formattedNumber },
                address: { status: !address },
                city: { status: !city },
                state: { status: !state },
                selected: { status: !selected },
                postalcode: { status: !postalcode },
              };
            
              setErrors(newErrors);
            
              if (Object.values(newErrors).some(error => error.status)) {
                return;
              }
            
              // Proceed with form submission if no errors
              try {
                const formData = { name, email, phone: formattedNumber, address, city, state, country: selected?.label, postal_code: postalcode };
            
                console.warn('formData => ', formData);
                const response = await JionWithUsForm(formData);
            
                if (response && response.success) {
                  setFlashMessage({ type: 'success', message: 'Form submitted successfully!' });
                
                  setTimeout(() => {
                    setFlashMessage({ type: '', message: '' });
                
                    // Navigate to Dashboard
                    // navigation.navigate('(tabs)/Dashboard');
                    router.replace('/(tabs)/Dashboard');
                    // Reset form fields
                    resetFormFields();
                  }, 2000); // Short delay before redirecting
                }else {
                  setFlashMessage({ type: 'error', message: response.message || 'Unexpected response. Please try again.' });
                }
              } catch (error) {
                console.error('Error submitting form:', error);
                setFlashMessage({ type: 'error', message: `An error occurred. Please try again. ${error.message}` });
              }
            };
            // const handleCancel = () => {
            //   // Reset the input value
            //   // Close the bottom sheet
            //   setName('');
            //   setEmail('');
            //   setMobileNumber('');
            //   setAddress('');
            //   setCity('');
            //   setState('');
            //   setSelected(null);
            //   setPostalcode('');
            
            //   // secondSheetRef.current?.close();
            // };

            const resetFormFields = () => {
              setName('');
              setEmail('');
              setMobileNumber('');
              setAddress('');
              setCity('');
              setState('');
              setSelected(null);
              setPostalcode('');
              setErrors({
                name: { status: false, message: '' },
                email: { status: false, message: '' },
                phone: { status: false, message: '' },
                address: { status: false, message: '' },
                city: { status: false, message: '' },
                state: { status: false, message: '' },
                selected: { status: false, message: '' },
                postalcode: { status: false, message: '' },
              });
            };
            
    // age select funtion
    const router = useRouter();
    const [dayOpen, setDayOpen] = useState(false);
    const [monthOpen, setMonthOpen] = useState(false);
    const [yearOpen, setYearOpen] = useState(false);
  
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
  
    const days = Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }));
    const months = [
      { label: 'January', value: '1' },
      { label: 'February', value: '2' },
      { label: 'March', value: '3' },
      { label: 'April', value: '4' },
      { label: 'May', value: '5' },
      { label: 'June', value: '6' },
      { label: 'July', value: '7' },
      { label: 'August', value: '8' },
      { label: 'September', value: '9' },
      { label: 'October', value: '10' },
      { label: 'November', value: '11' },
      { label: 'December', value: '12' },
    ];
    const years = Array.from({ length: 100 }, (_, i) => ({
      label: `${new Date().getFullYear() - i}`,
      value: `${new Date().getFullYear() - i}`,
    }));

    // age select funtion end

    // country select funtion
  const [selected, setSelected] = useState(null);

  const data = [
    { label: 'India', value: 'IN' },
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Canada', value: 'CA' },
    { label: 'Australia', value: 'AU' },
    { label: 'Germany', value: 'DE' },
    { label: 'France', value: 'FR' },
    { label: 'Japan', value: 'JP' },
    { label: 'China', value: 'CN' },
    { label: 'Brazil', value: 'BR' },
  ];


    const [selectedCountry, setSelectedCountry] = useState('India');
    const countries = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia'];
    // country select funtion end

    const [text, setText] = useState('');

    const [phone, setMobileNumber] = useState('');
    const [formattedNumber, setFormattedNumber] = useState('');
    const [countryCode, setCountryCode] = useState('');

    const handleVerify = () => {
        if (!formattedNumber) {
          Alert.alert('Error', 'Please enter a valid phone number.');
          return;
        }
        Alert.alert('Success', `Phone Number: ${formattedNumber}\nCountry Code: +${countryCode}`);
    };


  return (

    <View style={styles.container}>
            {/* Header Component */}
            <HeadersImage>
                <View style={styles.headerContainer}>
                    {/* Back Arrow */}
                    <Pressable style={styles.iconfav}>
                        <Link href={'/(tabs)/Dashboard'}>
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../assets/images/dashboard/properties-backarrow.png')}
                        />
                        </Link>
                    </Pressable>

                    {/* Text */}
                    <Text style={styles.username}>Join the Program</Text>
                </View>
            </HeadersImage>
            <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}>

        <ScrollView>

          

           <View style={{padding:15}}>
           {flashMessage.message && (
                  <View
                    style={[
                      styles.flashMessage,
                      flashMessage.type === 'success' ? styles.success : styles.error,
                    ]}
                  >
                    <Text style={styles.flashText}>{flashMessage.message}</Text>
                  </View>
                )}
                         
                                     <View>
                                         {/* <Text style={styles.formHeader}>
                                             Please fill the below form to join the Guardian Angels Program
                                         </Text> */}
                                         {/* <Text style={styles.formHeader}>Jion With Us </Text> */}
                                         <Text style={styles.formHeader}>Please fill the below form to join the <Text style={styles.highlightText}>Guardian Angels</Text> Program</Text>

                                     </View>
                         
                                     {/* Name Field */}
                                     <FloatingLabelInput
                                       label="Name*"
                                       value={name}
                                       style={[styles.inputStyles, errors.name.status ? styles.errorInput : null]}
                                       containerStyles={[styles.containerStyles,errors.email.status && styles.errorInput]}
                                       labelStyles={styles.labelStyles}
                                       onChangeText={(value) => {
                                         setName(value);
                                         if (errors.name.status) setErrors({ ...errors, name: { status: false, message: '' } });
                                       }}
                                     />
                                     {/* Email Field */}
                                     {/* <View style={[styles.inputContainer, errors.email.status && styles.errorInput]}> */}
                                       <FloatingLabelInput
                                       label="Email*"
                                       value={email}
                                       keyboardType="email-address"
                                       style={styles.inputStyles}
                                       containerStyles={[styles.containerStyles, errors.email.status ? styles.errorInput : null]}
                                       labelStyles={styles.labelStyles}
                                       onChangeText={(value) => {
                                         setEmail(value);
           
                                         if (!validateEmail(value)) {
                                           setErrors({
                                             ...errors,
                                             email: { status: true, message: 'Invalid email format (e.g., example@gmail.com)' },
                                           });
                                         } else {
                                           setErrors({ ...errors, email: { status: false, message: '' } });
                                         }
                                       }}
                                     />
                                     {/* </View> */}
           
                                         <View style={[styles.numContainer, errors.phone.status ? styles.errorInput : null]}>
                                           <PhoneInput
                                             defaultValue={phone}
                                             defaultCode="IN"
                                             layout="first"
                                             onChangeFormattedText={(text) => {
                                               setFormattedNumber(text);
                                               if (errors.phone.status) setErrors({ ...errors, phone: { status: false } });
                                             }}
                                             placeholder="Enter your phone number*"
                                             containerStyle={[
                                               styles.inputContainer,
                                               styles.noShadow,
                                               errors.phone.status ? styles.errorInput : null, // ✅ Apply error border directly to PhoneInput container
                                             ]}
                                             textContainerStyle={styles.textContainer}
                                             textInputStyle={styles.textInputNum}
                                             flagButtonStyle={styles.flagButton}
                                             textInputProps={{
                                               placeholderTextColor: '#AFAFAF',
                                             }}
                                           />
                                         </View>
           
           
                         
                         
                                         {/* Address Number Field */}
                                         <FloatingLabelInput
                                           label="Address"
                                           value={address}
                                           multiline
                                           numberOfLines={4}
                                           style={[styles.inputStyles, { height: 100 }, errors.address.status ? styles.errorInput : null]}
                                           containerStyles={[styles.containerStyles, errors.address.status && styles.errorInput]}
                                           labelStyles={styles.labelStyles}
                                           onChangeText={(value) => {
                                             setAddress(value);
                                             if (errors.address.status) setErrors({ ...errors, address: { status: false } });
                                           }}
                                         />
           
                                         {/* City Field */}
                                         <FloatingLabelInput 
                                           label="City"
                                           value={city}
                                           style={[styles.inputStyles, errors.city.status ? styles.errorInput : null]}
                                           containerStyles={[styles.containerStyles, errors.city.status && styles.errorInput]}
                                           labelStyles={styles.labelStyles}
                                           onChangeText={(value) => {
                                             setCity(value);
                                             if (errors.city.status) setErrors({ ...errors, city: { status: false } });
                                           }}
                                         />
           
                         
                                         {/* State Field */}
                                         <FloatingLabelInput
                                           label="State"
                                           value={state}
                                           style={[styles.inputStyles, errors.state.status ? styles.errorInput : null]}
                                           containerStyles={[styles.containerStyles, errors.state.status && styles.errorInput]}
                                           labelStyles={styles.labelStyles}
                                           onChangeText={(value) => {
                                             setState(value);
                                             if (errors.state.status) setErrors({ ...errors, state: { status: false } });
                                           }}
                                         />
           
                                        
                                         {/* postal Code */}
                                         <FloatingLabelInput
                                           label="Postal Code"
                                           value={postalcode}
                                           style={[styles.inputStyles, errors.postalcode.status ? styles.errorInput : null]}
                                           containerStyles={[styles.containerStyles, errors.postalcode.status && styles.errorInput]}
                                           labelStyles={styles.labelStyles}
                                           onChangeText={(value) => {
                                             setPostalcode(value);
                                             if (errors.postalcode.status) setErrors({ ...errors, postalcode: { status: false } });
                                           }}
                                         />

                                         
<View
                                           style={[
                                             styles.countryContainer,
                                             errors.selected.status ? styles.errorInput : null,
                                           ]}
                                         >
                                           <Dropdown
                                             style={[styles.dropdown, errors.selected.status && styles.errorInput]}
                                             containerStyle={{
                                               maxHeight: Dimensions.get('window').height * 0.4,
                                             }}
                                             data={data}
                                             labelField="label"
                                             valueField="value"
                                             placeholder="Select Country"
                                             value={selected?.value}
                                             onChange={(item) => {
                                               setSelected(item);
                                               if (errors.selected.status) {
                                                 setErrors({ ...errors, selected: { status: false } });
                                               }
                                             }}
                                           />
                                         </View>
           
                                     </View>
            
                

        </ScrollView>
        {/* Submit Button */}
        <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton}  onPress={handleCancel}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
        </KeyboardAvoidingView>
           
        </View>
  )
}
const styles = StyleSheet.create({
    numContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom:15,
        // paddingHorizontal: 20,
        // backgroundColor: '#f5f5f5',
      },
      noShadow: {
        shadowColor: 'transparent', 
        elevation: 0, 
      },
      inputContainer: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#AFAFAF',
        backgroundColor: '#fff',
        padding: 0,
      },
      textContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        height: 45, 
        paddingVertical: 0,
      },
      textInputNum: {
        fontSize: 15,
        color: '#333',
        paddingVertical: 0, // Adjust padding to fit text within the height
        height: 45,
        // borderWidth: 1,
      },
      flagButton: {
        marginRight: 0,
        // borderWidth: 1,
      },

    container:{
        backgroundColor:'#fff',
        height:'100%',
        // flex:1,
        // borderWidth:1,
        // borderColor:'red',
        // alignItems:'center',
        // justifyContent:'center',
    },
    ProgramContent: {
        width:width-20,
        margin:'auto',
        height:height-130,
        // flex:1,
        // borderWidth:5,
        // paddingHorizontal: 25,
        // paddingVertical: 20,
    },
    highlightText: {
        color: '#85B336',
        fontFamily:'PP_SemiBold',
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
    formHeader: {
        fontSize: 16,
        fontFamily:'PP_Regular',
        marginBottom: 20,
        color: '#525252',
        lineHeight:25,
        letterSpacing:0.7,
    },
    containerStyles: {
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#AFAFAF',
        borderRadius: 5,
        height: 47,
        marginBottom: 20,
    },
    labelStyles: {
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        fontSize: 17,
        color:'#00000',
    },
    inputStyles: {
        color: '#000000',
        borderRadius: 5,
        fontSize:16,
        textDecorationLine:'none',
    },
    // submitButton: {
    //     backgroundColor: '#4CAF50',
    //     paddingVertical: 12,
    //     borderRadius: 5,
    //     alignItems: 'center',
    //     marginTop: 20,
    // },
    // submitButtonText: {
    //     color: '#fff',
    //     fontSize: 16,
    //     fontWeight: 'bold',
    // },
    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        // width: 250,
        backgroundColor: "#fff",
      },

    section: {
        marginBottom: 20,
        marginTop:17,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    ageContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    // picker: {
    //     flex: 1,
    //     marginHorizontal: 5,
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     borderRadius: 5,
    //     backgroundColor: '#f9f9f9',
    // },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#85B336',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioInnerCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#85B336',
    },
    radioText: {
        color: '#333',
    },
    radioSelected: {
        borderColor: '#85B336',
    },
    buttonContainer:{
        paddingVertical:20,
        // marginBottom:30,
        flexDirection:'row',
        justifyContent:'space-evenly',
        borderTopWidth:1,
        borderColor: '#6666',
    },
    cancelButton:{
        borderWidth:1,
        borderColor:'#85B336',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        width:155,
        backgroundColor: '#fff', 
    },
    cancelButtonText: {
        color: '#85B336',
        fontSize: 16,
        fontWeight: 'bold',
    },

    submitButton: {
        backgroundColor: '#85B336',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        width:155,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // countryContainer: {
    //     marginVertical: 10,
    //   },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
      },
      pickerWrapper: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
      },
      picker: {
        height: 50,
        color: '#6E6E6E',
      },
      countryContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom:20,
      },
      dropdown: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        // backgroundColor: '#f9f9f9',
      },
      selectedText: {
        marginBottom: 10,
        fontSize: 16,
        color: '#333',
      },
      infoText: {
        // marginTop: 20,
        fontSize: 14,
        color: '#555',
      },
    //   
    // container: {
    //     width:100,
    //   },
      agelabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      row: {
        // marginRight:32,
        width:'30%',
        flexDirection: 'row',
        gap:20,
        // justifyContent: 'space-between',
      },
      agedropdown: {
        flex: 1,
        // marginHorizontal: 5,
        // backgroundColor: '#f9f9f9',
        borderColor: '#ccc',
        borderRadius: 8,
        marginRight:10,
        // width:'100%',
      },
      dropdownContainer: {
        // backgroundColor: '#f9f9f9',
        // marginRight:10,
        borderWidth:1,
        borderColor:'#E0E0E0',
        zIndex:99,
      },
      flashMessage: {
        position: 'absolute',
        top: 50, // Position below the header
        left: 20,
        right: 20,
        zIndex: 1000,
        padding: 15,
        borderRadius: 10,
      },
      success: {
        backgroundColor: '#85e085',
      },
      error: {
        backgroundColor: '#ff6666',
      },
      flashText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      errorInput: {
        // borderColor: 'red',
        borderColor :'#DC143C',
      },
      errorText: {
        color: 'orange', // Orange text for error message
        fontSize: 12,
        marginLeft: 5,
      },
});
export default Jionprogram