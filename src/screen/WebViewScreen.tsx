import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { screenHeight, screenWidth } from 'utils/styles';

export const WebViewScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
    <WebView
      source={{ uri: 'https://reactnative.dev' }}
      style={{ width: screenWidth, height: screenHeight }}
    />
    </View>
  )
};