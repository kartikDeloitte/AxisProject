/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModule,
  NativeModules,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ReduxProvider from './store';
import {useDispatch, useSelector} from 'react-redux';
import Comments from './Comments';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [deviceDetails, setDeviceDetails] = useState<Object>({});
  const [visisble, setVisible] = useState<boolean>(true);
  const backgroundStyle = {
    flex: 1,
  };
  const {AxisModule} = NativeModules;
  useEffect(() => {
    AxisModule.myCallBack(item => {
      setDeviceDetails(JSON.parse(item));
    });
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <ReduxProvider>
        {visisble ? (
          <>
            {Object.keys(deviceDetails).map(item => {
              return (
                <Text key={item} style={{fontSize: 24, fontWeight: '800'}}>
                  {item} - {deviceDetails[item]}
                </Text>
              );
            })}
            <Text
              onPress={() => setVisible(!visisble)}
              style={{color: 'blue', fontSize: 24, textAlign: 'center'}}>
              NEXT
            </Text>
          </>
        ) : (
          <Comments goBack={() => setVisible(!visisble)} />
        )}
      </ReduxProvider>
    </SafeAreaView>
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
