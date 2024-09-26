/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {StripeProvider} from '@stripe/stripe-react-native';
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import StripeButton from './StripeButton';

const publishableKey =
  'pk_test_51JedD5K9J4PxnSUFI93MF1ZC9s1gcGXChyyhCajAlfmE8HikgbVZEyZguZ6eGlESAENQUMAi5QSPaS714v1y2dKp00fNE2MKqH';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <StripeProvider
      publishableKey={publishableKey}
      urlScheme="stripe-example"
      setReturnUrlSchemeOnAndroid>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <StripeButton />
          </View>
        </ScrollView>
      </SafeAreaView>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
