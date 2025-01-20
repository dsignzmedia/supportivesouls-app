import React , { useState }from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image,KeyboardAvoidingView, SafeAreaView,ImageBackground,Platform ,Dimensions,Modal,TextInput} from "react-native";
import { navigate } from 'expo-router/build/global-state/routing';
import { router } from "expo-router";
import { FloatingLabelInput } from "react-native-floating-label-input";
import HeadersImage from '@/components/Admin/HeadersImage';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const { width, height } = Dimensions.get('window');

const openLogin = ()=> {
  router.push('/login');
}


// Adjust height based on platform
const adjustedHeight = Platform.OS === "ios" ? height - 285 : height - 80;

export default function LoadingPage() {

  const [isModalVisible, setModalVisible] = useState(false);

  const openJoinWithUs = () => {
    setModalVisible(true);
  };

  const closeJoinWithUs = () => {
    setModalVisible(false);
  };

    // form 
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [pan, setPan] = useState('');
      const [mobileNumber, setMobileNumber] = useState('');
      const [address, setAddress] = useState('');
      const [birthday, setBirthday] = useState('');
      const [day, setDay] = useState('');
      const [month, setMonth] = useState('');
      const [year, setYear] = useState('');
      const [gender, setGender] = useState('');

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
      
      
          const [selectedCountry, setSelectedCountry] = useState('India');
          const countries = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia'];
          // country select funtion end
      
          const [text, setText] = useState('');
          // 
          const handleSubmit = () => {
            // Handle form submission logic here
            console.log('Form Data:', {
                name,
                email,
                pan,
                mobileNumber,
                address,
                birthday: `${day}/${month}/${year}`,
                gender,
            });
            alert('Form submitted successfully!');
        };
  return (
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
            <TouchableOpacity style={styles.joinButton} >
              <Text style={styles.joinButtonText}>Join With Us</Text>
            </TouchableOpacity>
            
          </View>
          </ImageBackground>

          {/* Modal */}
          <Modal
              transparent={true}
              visible={isModalVisible}
              animationType="slide"
              onRequestClose={closeJoinWithUs}
            >
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={{ flex: 1 }}>
              
              <View style={styles.modalOverlay}>
              
                <View style={styles.modalContent}>
                  <Text>Join With Us</Text>
                  <ScrollView>
            <View style={{padding:15}}>

            <View>
                {/* <Text style={styles.formHeader}>
                    Please fill the below form to join the Guardian Angels Program
                </Text> */}
                <Text style={styles.formHeader}>Please fill the below form to join the <Text style={styles.highlightText}>Guardian Angels</Text> Program</Text>
            </View>

            {/* Name Field */}
            <FloatingLabelInput
                label="Name"
                value={name}
                style={styles.inputStyles}
                containerStyles={styles.containerStyles}
                labelStyles={styles.labelStyles}
                onChangeText={value => setName(value)}
            />
            {/* Email Field */}
            <FloatingLabelInput
                label="Email"
                value={email}
                keyboardType="email-address"
                style={styles.inputStyles}
                containerStyles={styles.containerStyles}
                labelStyles={styles.labelStyles}
                onChangeText={value => setEmail(value)}
            />
            

            {/* PAN Field */}
            <FloatingLabelInput
                label="PAN"
                value={pan}
                style={styles.inputStyles}
                containerStyles={styles.containerStyles}
                labelStyles={styles.labelStyles}
                onChangeText={value => setPan(value)}
            />
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
                <Text style={styles.agelabel}>Age</Text>

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
            />


            {/* Gender Section */}
            <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Gender</Text>
                    <View style={styles.genderContainer}>
                        {/* Male */}
                        <TouchableOpacity
                            style={[styles.radioButton, gender === 'Male' && styles.radioSelected]}
                            onPress={() => setGender('Male')}
                        >
                            <View style={styles.radioCircle}>
                                {gender === 'Male' && <View style={styles.radioInnerCircle} />}
                            </View>
                            <Text style={styles.radioText}>Male</Text>
                        </TouchableOpacity>

                        {/* Female */}
                        <TouchableOpacity
                            style={[styles.radioButton, gender === 'Female' && styles.radioSelected]}
                            onPress={() => setGender('Female')}
                        >
                            <View style={styles.radioCircle}>
                                {gender === 'Female' && <View style={styles.radioInnerCircle} />}
                            </View>
                            <Text style={styles.radioText}>Female</Text>
                        </TouchableOpacity>

                        {/* Others */}
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
                </View>
                {/* Conditionally Render Input Field */}
                {gender === 'Others' && (
                    <View>
                    <FloatingLabelInput
                        label="Specify"
                        value={text}
                        keyboardType="default"
                        maxLength={50}
                        style={styles.inputStyles}
                        containerStyles={styles.containerStyles}
                        labelStyles={styles.labelStyles}
                        onChangeText={(value) => setText(value)}
                    />
                    </View>
                )}

                {/* Mobile Number Field */}
                <FloatingLabelInput
                    label="Mobile Number"
                    value={mobileNumber}
                    keyboardType="phone-pad"
                    maxLength={10}
                    style={styles.inputStyles}
                    containerStyles={styles.containerStyles}
                    labelStyles={styles.labelStyles}
                    onChangeText={value => setMobileNumber(value)}
                />

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
            
                {/* Submit Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>

        </ScrollView>
                  <TouchableOpacity style={styles.closeButton} onPress={closeJoinWithUs}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </KeyboardAvoidingView>
            </Modal>
            
        </View>
      </View>
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
  // model 
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  // 
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
    textDecorationLine:'none',
},
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
  marginBottom:30,
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
