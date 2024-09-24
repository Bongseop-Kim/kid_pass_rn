import React from 'react';
import {URI} from '../../constants/uri';
import WebviewScreen from '../../components/WebviewScreen';

const App = () => {
  return <WebviewScreen uri={URI + '/auth'} />;
};

export default App;
