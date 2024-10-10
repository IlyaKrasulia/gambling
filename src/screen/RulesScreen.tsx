import { useNavigation } from '@react-navigation/native';
import { Header } from 'components/Header';
import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

export const RulesScreen = () => {

  const { goBack } = useNavigation();

  return (
    <LinearGradient
      start={{ x: 1, y: -0.2 }}
      locations={[0, 1]}
      angle={135}
      colors={['#471280', '#43BCF0']}
      style={styles.container}
    >
      <Header
        handleLeftBtn={goBack}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Rules</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur. A ut sit pellentesque vel. Sit tincidunt praesent adipiscing in magna erat enim nec urna. Aliquet volutpat id arcu fames varius mus ultricies mollis. Adipiscing blandit cursus faucibus vel ullamcorper dignissim at...
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'semibold',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});