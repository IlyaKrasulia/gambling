import { useEffect } from "react";
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenEnum } from "utils/types";

export const useGeo = () => {

    const { navigate } = useNavigation();

    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
              if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  {
                    title: 'Location Permission',
                    message: 'This app needs access to your location to determine your country.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                  }
                );
      
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                  Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
                  return false;
                }
              }
              return true;
            } catch (err) {
              return false;
            }
        };
        
        const getGeoLocation = async () => {

          const permissionGranted = await requestLocationPermission();

          if (!permissionGranted) {
            navigate(ScreenEnum.WebView);
          }

          Geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
              const userCountry = response.data.countryName;
              if (userCountry === 'Ukraine') {
                navigate(ScreenEnum.Start);
              }
            },
            (error) => {
              navigate(ScreenEnum.WebView);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        };
    
        getGeoLocation();
      }, []);
};