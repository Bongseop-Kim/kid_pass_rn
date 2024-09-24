/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import RootRoute from './src/RootRoute';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <RootRoute />
    </>
  );
}
