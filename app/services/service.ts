import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';
const PRODUCTION_URL = 'https://supportivesouls.com' ;
// const API_URL = 'http://192.168.29.5:80/supportiveSouls-web/admin/api'; 
// export const API_URL = 'http://127.0.0.1:80/supportiveSouls-web/admin/api';
const API_URL = `${PRODUCTION_URL}/admin/api`;

export const AssetsUrl ='https://supportivesouls.com/admin/src/assets/gallery';

console.log("API_URL" , API_URL);
// export const getScholars = async () => {
    
//   try {
//     const response = await axios.get(`${BASE_URL}/admin/api/scholors`);  
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching scholars:', error);
//     throw error;
//   }
// };

// {AllGalary.length > 0 ? (
//           AllGalary.map((image, index) => (
//             <Image
//               key={index}
//               source={{ uri: image }} // Each image is now a fully constructed URL
//               style={styles.image}
//               resizeMode="cover"
//             />
//           ))
//         ) : (
//           <Text style={styles.noImagesText}>No images to display.</Text>
//         )}

const apiClient = axios.create({
    baseURL: API_URL,
    headers:{
        'Content-Type': 'application/json',
    },
});

// login funtion 
export const signin = async (formData: any) => {
  console.warn('API_URL => ', API_URL)
    try {
        const res = await apiClient.post(`${API_URL}/login`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': '*',
            }
        });
        const success = res.data && res.data.success;
        if(success){
            const token = res.data.token;
            await storeAsyncData('authToken', token);
            apiClient.interceptors.request.use(
                async (config) => {
                    if (token) {
                        config.headers['Authorization'] = `Bearer ${token}`;
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        }
        return res.data;
    }catch(err) {

    }
}

export const getUserById = async (userId:any) => {
    try {
      const response = await apiClient.get(`${API_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };
  
export const storeAsyncData = async (key: string, value:any) => {
    try {
        if(typeof value === 'object') {
            value = JSON.stringify(value);
        }
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
};

export const getAsyncData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          return JSON.parse(value);
        }
      } catch (e) {
        // error reading value
      }
}


export const yourDonation = async (userId:any) => {
    try {
      const response = await apiClient.get(`${API_URL}/yourDonation/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };

  export const scholarDetails = async (userId:any) => {
    try {
        const response = await apiClient.get(`${API_URL}/scholarDetails/${userId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
  };

  export const socialImpact = async (userId:any) => {
    try {
        const response = await apiClient.get(`${API_URL}/socialImpact/${userId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
     
  };



  export const getScholarDetails = async (scholarId: any) => {
    try {
      const response = await apiClient.get(`${API_URL}/getScholar/${scholarId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
  export const getAllScholars = async () => {
    try {
      const response = await apiClient.get(`${API_URL}/getAllScholar`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  
  export const getGalary = async () => {
    try {
      const response = await apiClient.get(`${API_URL}/getGallery`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  
// other function
  