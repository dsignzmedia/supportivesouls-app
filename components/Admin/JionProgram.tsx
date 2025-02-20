import { View, Text, TouchableOpacity, StyleSheet ,Image,Pressable, Dimensions,KeyboardAvoidingView,Platform,Keyboard,TextInput,Alert } from 'react-native';
import React, { useState } from 'react';
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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pan, setPan] = useState('');
    // const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const [birthday, setBirthday] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = async () => {
        if (!name || !email || !phone || !address || !city || !state || !selected) {
        // if (!name || !email || !phone || !pan || !address || !city || !state || !selected) {
            alert('Please fill in all required fields.');
            return;
          }
        
          try {
            const response = await axios.post('https://your-server-url/submit-form.php', {
              name,
              email,
              phone: formattedNumber, // Ensure the number is in international format
              // pan,
              // age: selectedDate,
              // gender,
              address,
              city,
              state,
              country: selected.label,
            });
        
            if (response.data.success) {
              alert('Form submitted successfully!');
            } else {
              alert('Form submission failed.');
            }
          } catch (error) {
            console.error(error);
            alert('An error occurred while submitting the form.');
          }
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
            <View style={{padding:15,marginBottom:'15%'}}>

            <View>
                {/* <Text style={styles.formHeader}>
                    Please fill the below form to join the Guardian Angels Program
                </Text> */}
                <Text style={styles.formHeader}>Please fill the below form to join the <Text style={styles.highlightText}>Guardian Angels</Text> Program</Text>
            </View>

            {/* Name Field */}
            <FloatingLabelInput
                label="Name*"
                value={name}
                style={styles.inputStyles}
                containerStyles={styles.containerStyles}
                labelStyles={styles.labelStyles}
                onChangeText={value => setName(value)}
            />
            {/* Email Field */}
            <FloatingLabelInput
                label="Email*"
                value={email}
                keyboardType="email-address"
                style={styles.inputStyles}
                containerStyles={styles.containerStyles}
                labelStyles={styles.labelStyles}
                onChangeText={value => setEmail(value)}
            />
            

            {/* PAN Field */}
            {/* <FloatingLabelInput
                label="PAN"
                value={pan}
                style={styles.inputStyles}
                containerStyles={styles.containerStyles}
                labelStyles={styles.labelStyles}
                onChangeText={value => setPan(value)}
            /> */}
            {/* Age Section */}
            {/* <View style={styles.ageContainer}> */}
                {/* <Text style={styles.agelabel}>Age</Text> */}
                {/* <View style={styles.row}> */}
                    {/* Day Dropdown */}
                    {/* <DropDownPicker
                    listMode='SCROLLVIEW'
                    open={dayOpen}
                    value={selectedDay}
                    items={days}
                    setOpen={setDayOpen}
                    setValue={setSelectedDay}
                    placeholder="Day"
                    style={styles.agedropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    /> */}

                    {/* Month Dropdown */}
                    {/* <DropDownPicker
                    listMode='SCROLLVIEW'
                    open={monthOpen}
                    value={selectedMonth}
                    items={months}
                    setOpen={setMonthOpen}
                    setValue={setSelectedMonth}
                    placeholder="Month"
                    style={styles.agedropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    /> */}

                    {/* Year Dropdown */}
                    {/* <DropDownPicker
                    listMode='SCROLLVIEW'
                    open={yearOpen}
                    value={selectedYear}
                    items={years}
                    setOpen={setYearOpen}
                    setValue={setSelectedYear}
                    placeholder="Year"
                    style={styles.agedropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    /> */}
                {/* </View> */}
            {/* </View> */}

            {/* Age Section */}
                {/* <Text style={styles.agelabel}>Age</Text> */}

            {/* <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                style={styles.textInput}
                value={selectedDate} 
                editable={false} 
                pointerEvents="none"
                />
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            /> */}


            {/* Gender Section */}
            {/* <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Gender</Text>
                    <View style={styles.genderContainer}>
                        
                        <TouchableOpacity
                            style={[styles.radioButton, gender === 'Male' && styles.radioSelected]}
                            onPress={() => setGender('Male')}
                        >
                            <View style={styles.radioCircle}>
                                {gender === 'Male' && <View style={styles.radioInnerCircle} />}
                            </View>
                            <Text style={styles.radioText}>Male</Text>
                        </TouchableOpacity>

                        
                        <TouchableOpacity
                            style={[styles.radioButton, gender === 'Female' && styles.radioSelected]}
                            onPress={() => setGender('Female')}
                        >
                            <View style={styles.radioCircle}>
                                {gender === 'Female' && <View style={styles.radioInnerCircle} />}
                            </View>
                            <Text style={styles.radioText}>Female</Text>
                        </TouchableOpacity>

                        
                        <TouchableOpacity
                            style={[styles.radioButton, gender === 'Others' && styles.radioSelected]}
                            onPress={() => setGender('Others')}
                        >
                            <View style={styles.radioCircle}>
                                {gender === 'Others' && <View style={styles.radioInnerCircle} />}
                            </View>
                            <Text style={styles.radioText}>Others</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View> */}
                

                {/* Mobile Number Field */}
                {/* <FloatingLabelInput
                    label="Mobile Number"
                    value={mobileNumber}
                    keyboardType="phone-pad"
                    maxLength={10}
                    style={styles.inputStyles}
                    containerStyles={styles.containerStyles}
                    labelStyles={styles.labelStyles}
                    onChangeText={value => setMobileNumber(value)}
                /> */}

                <View style={styles.numContainer}>
                    <PhoneInput
                        defaultValue={phone}
                        defaultCode="IN" 
                        layout="first" 
                        onChangeText={(text) => setMobileNumber(text)} 
                        onChangeFormattedText={(text) => setFormattedNumber(text)} 
                        onChangeCountry={(country) => setCountryCode(country.callingCode[0])} 
                        placeholder="Enter your phone number*"
                        containerStyle={[styles.inputContainer, styles.noShadow]}
                        textContainerStyle={styles.textContainer}
                        textInputStyle={styles.textInputNum}
                        flagButtonStyle={styles.flagButton}
                        textInputProps={{
                            placeholderTextColor: '#AFAFAF',
                          }}
                          withDarkTheme={false} 
                          withShadow={false} 
                    />
                </View>


                {/* Address Number Field */}
                <FloatingLabelInput
                    label="Address"
                    value={address}
                    multiline={true} // Enable multiline
                    numberOfLines={4} // Adjust height
                    style={[styles.inputStyles, { height: 100 }]} // Add height to the input
                    containerStyles={styles.containerStyles}
                    labelStyles={styles.labelStyles}
                    onChangeText={value => setAddress(value)}
                />
                {/* City Field */}
                <FloatingLabelInput
                    label="City"
                    value={city}
                    style={styles.inputStyles}
                    containerStyles={styles.containerStyles}
                    labelStyles={styles.labelStyles}
                    onChangeText={value => setCity(value)}
                />

                {/* State Field */}
                <FloatingLabelInput
                    label="State"
                    value={state}
                    style={styles.inputStyles}
                    containerStyles={styles.containerStyles}
                    labelStyles={styles.labelStyles}
                    onChangeText={value => setState(value)}
                />
               

                <View>
                    <View style={styles.countryContainer}>
                    {!!selected && (
                        <Text>
                        {/* Selected: label = {selected.label}, value = {selected.value} */}
                        </Text>
                    )}
                    <Dropdown
                        style={styles.dropdown}
                        containerStyle={{
                            maxHeight: Dimensions.get('window').height * 0.4, // Limit dropdown height to 40% of screen height
                          }}
                        data={data}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Country"
                        value={selected?.value}
                        onChange={(item) => setSelected(item)}
                    />
                    </View>
                </View> 
            </View>
            
                

        </ScrollView>
        {/* Submit Button */}
        <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => router.replace('/(tabs)/Dashboard')}>
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
});
export default Jionprogram