import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenEnum, StackParamList } from 'utils/types';
import { StartScreen } from 'screen/StartScreen';
import { useGeo } from 'hooks/useGeo';
import { LevelsScreen } from 'screen/LevelsScreen';
import { GameScreen } from 'screen/GameScreen';
import { RulesScreen } from 'screen/RulesScreen';
import { WebViewScreen } from 'screen/WebViewScreen';

interface IProps {
  initialRoute: ScreenEnum;
}

const Stack = createStackNavigator<StackParamList>();

export const AppNavigation = ({ initialRoute }: IProps) => {

  useGeo();

  return (
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={ScreenEnum.Start}
          component={StartScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={ScreenEnum.WebView}
          component={WebViewScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={ScreenEnum.Levels}
          component={LevelsScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={ScreenEnum.Game}
          component={GameScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={ScreenEnum.Rules}
          component={RulesScreen}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
  );
};


declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
