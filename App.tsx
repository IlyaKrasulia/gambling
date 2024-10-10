import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PermissionsAndroid, Platform } from 'react-native';
import { ScreenEnum } from 'utils/types';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from 'navigation/AppNavigation';
import messaging from '@react-native-firebase/messaging';
import appsFlyer from 'react-native-appsflyer';
import { LogLevel, OneSignal } from 'react-native-onesignal';

export const App = () => {

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    };
    getMessagingToken();
  }, []);

  useEffect(() => {
    appsFlyer.initSdk(
      {
        devKey: 'K2***********99',
        isDebug: false,
        appId: '41*****44',
        onInstallConversionDataListener: true,
        onDeepLinkListener: true,
        timeToWaitForATTUserAuthorization: 10
      },
      (result) => {
        console.log(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    OneSignal.initialize("ONESIGNAL_APP_ID");

    OneSignal.Notifications.requestPermission(true);

    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('OneSignal: notification clicked:', event);
    });
  }, []);

  const getMessagingToken = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        const msgToken = await messaging().getToken();
        console.log(msgToken, ' => msgToken');
      }
    } catch (error) {
      console.log('[firebase_messageToken error]', error);
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigation
          initialRoute={ScreenEnum.Start}
        />
      </NavigationContainer>        
    </SafeAreaProvider>
  );
};
