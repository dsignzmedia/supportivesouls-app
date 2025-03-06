import React , { useRef, useState,useCallback, useEffect }from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image,KeyboardAvoidingView,Keyboard, SafeAreaView,ImageBackground,Platform ,Dimensions,Modal,TextInput,Alert} from "react-native";
import { navigate } from 'expo-router/build/global-state/routing';
import { useNavigation } from '@react-navigation/native'; 
import { router } from "expo-router";
import { FloatingLabelInput } from "react-native-floating-label-input";
import HeadersImage from '@/components/Admin/HeadersImage';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomBottomsheetModel from "@/components/common/CustomBottomsheetModel";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import PhoneInput from 'react-native-phone-number-input';   
import axios from 'axios';
import { JionWithUsForm, getAsyncData, isAlreadyLoggedIn} from '@/app/services/service';

const { width, height } = Dimensions.get('window');

const openLogin = ()=> {
  router.push('/login');
}


// Adjust height based on p
// latform
const adjustedHeight = Platform.OS === "ios" ? height - 285 : height - 80;


export default  function LoadingPage() {
// export default async function LoadingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      try {
        isAlreadyLoggedIn().then(() => {
          // setIsLoaded(true);
        }).catch(() => {
          // setIsLoaded(true)
        }).finally(() => {
          setIsLoaded(true);
        });
      }catch(err) {
        console.error(err)
      }
    }), [];


    // form 
    const [flashMessage, setFlashMessage] = useState({ type: '', message: '' });

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
      //  const [errors, setErrors] = useState({});
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
      // 
      // age select funtion
      
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
              setTimeout(() => setFlashMessage({ type: '', message: '' }), 1000);
        // Redirect after a short delay to show the message
        setTimeout(() => {
              secondSheetRef.current?.close();
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
              }, 1000);
            } else {
              setFlashMessage({ type: 'error', message: response.message || 'Unexpected response. Please try again.' });
            }
          } catch (error) {
            console.error('Error submitting form:', error);
            setFlashMessage({ type: 'error', message: `An error occurred. Please try again. ${error.message}` });
          }
        };
        
        
        

  const handleCancel = () => {
    // Reset the input value
    // Close the bottom sheet
    setName('');
    setEmail('');
    setMobileNumber('');
    setAddress('');
    setCity('');
    setState('');
    setSelected(null);
    setPostalcode('');
  
    secondSheetRef.current?.close();
  };


  const secondSheetRef = useRef<BottomSheetModal>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    secondSheetRef.current?.present();
    console.log("Bottom sheet opened");
  }, []);

  const handleDismiss = useCallback(() => {
    secondSheetRef.current?.close();
    console.log("Dismiss button pressed");
  }, []);

  // phone number
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
  


  return ( isLoaded && (
    
    <BottomSheetModalProvider>

{/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1, padding: 16 }}> */}


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


      <View style={styles.container}>
        

        <View style={styles.logoContainer}>
          <Image
              source={require('../assets/images/dashboard/supportive_souls_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
        </View>

        <View style={styles.bottomContainer}>

          {/* bottom image */}
          <ImageBackground source={require('../assets/images/dashboard/bottom_image.png')} style={styles.bottomImage}>

          {/* Semi-transparent Overlay */}
          <View style={styles.overlay} />

          <Text style={styles.heading}>Empowering Futures Through Education</Text>
          <Text style={styles.description}>
            Education is the foundation for a brighter tomorrow, and Supportive Souls Charitable Trust
            is dedicated to making it accessible to every child. With your support, we have helped 190+
            students pursue education, opening doors to endless opportunities.
            {"\n"}Join us in transforming lives and make a difference.
          </Text>

          {/* Buttons */}
          <View style={styles.buttoncontainer}>
            <TouchableOpacity style={styles.donorButton} onPress={openLogin}>
              <Text style={styles.buttonText}>Donor Login</Text>
            </TouchableOpacity>

            {/* onPress={openJoinWithUs} */}
            <TouchableOpacity style={styles.joinButton} onPress={handlePresentModalPress}>
              <Text style={styles.joinButtonText}>Join With Us</Text>
            </TouchableOpacity>
            
          </View>
          </ImageBackground>

          {/* Modal */}
           
        </View>
        {/* Custom Bottom Sheet */}
          <CustomBottomsheetModel
            bottomSheetRef={secondSheetRef}
            snapPoints={['90%']}
            initialIndex={0}
            showHandleIndicator={true}
          >
        <ScrollView>
            <View>
              <View style={{padding:15}}>
              
                          <View>
                              {/* <Text style={styles.formHeader}>
                                  Please fill the below form to join the Guardian Angels Program
                              </Text> */}
                              <Text style={styles.formHeader}>Jion With Us </Text>
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
                              {/* <Text style={styles.agelabel}>Age</Text>
              
                          <TouchableOpacity onPress={showDatePicker}>
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
                                    errors.phone.status ? styles.errorInput : null,
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
          </CustomBottomsheetModel>
      </View>
      {/* </KeyboardAvoidingView> */}

      </BottomSheetModalProvider>)
  );

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "space-between",
  },
  bottomLoadingImage:{
    width:'100%',
    height:600,
    objectFit:'cover',
  },
  logoContainer: {
    alignItems: "center",
    borderColor:'red',
    marginTop: Platform.OS === "ios"?80:80,
    width:260,
    height:135,
    marginBottom:40,
    alignSelf:'center',
  },
  logo: {
    width:'100%',
    height:'100%',
  },
  bottomContainer:{
    flex:1,
  },
  bottomImage:{
    width:width,
    height:'100%',
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    overflow:'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "#83B624",
    opacity: 0.8,
    borderTopRightRadius:50,
    borderTopLeftRadius:50,
  },
  heading: {
    fontSize: 30,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 25,
    fontFamily:'PN_BoldItalic',
    marginTop:30,
    letterSpacing:2,
  },
  description: {
    fontSize: 14,
    fontFamily:'PP_Regular',
    letterSpacing:1,
    color: "#ffffff",
    textAlign: "center",
    paddingHorizontal:10,
    marginBottom: 20,
    // maxWidth:390,
    lineHeight:21,
  },
  buttoncontainer:{
    alignItems: "center",
  },
  donorButton: {
    backgroundColor: "#557C0B",
    borderRadius: 10,
    width: 288,
    height:42,
    justifyContent:'center',
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily:'PP_SemiBold',
    letterSpacing:1,
  },
  joinButton: {
    backgroundColor: '#557C0B4D',
    borderRadius: 10,
    borderWidth: 1,
    width: 288,
    height:42,
    justifyContent:'center',
    borderColor: "#608913",
    alignItems: "center",
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily:'PP_SemiBold',
    letterSpacing:1,
  },
  // jion css
  formHeader: {
    fontSize: 16,
    fontFamily:'PP_SemiBold',
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
    // color: '#000000',
    // borderRadius: 5,
    // textDecorationLine:'none',
    // borderWidth: 1,
    // borderColor: '#ccc', // Default border color
    padding: 10,
    borderRadius: 5,
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

  numContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom:15,
    // paddingHorizontal: 20,
    // backgroundColor: '#f5f5f5',
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
    paddingVertical: 0,
    height: 45,
    // borderWidth: 1,
  },
  flagButton: {
    marginRight: 0,
    // borderWidth: 1,
  },
  noShadow: {
    shadowColor: 'transparent', 
    elevation: 0, 
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
