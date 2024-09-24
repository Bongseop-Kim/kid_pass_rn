import React, {useState} from 'react';
import WebView from 'react-native-webview';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../constants/uri';
// import {SafeAreaView} from 'react-native-safe-area-context';

const injectedJavaScript = `
    // WebView에서 React Native로 메시지 보내기
    function sendMessageToReactNative(message) {
      window.ReactNativeWebView.postMessage(message);
    }

    // React Native에서 보낸 메시지 받기
    window.addEventListener('message', function(event) {
      console.log('Message from React Native:', event.data);
      // 여기서 받은 메시지를 처리
    });

    window.addEventListener('reactNativeWebViewMessage', function(event) {
        window.ReactNativeWebView.postMessage(JSON.stringify(event.detail));
      });
    true;
  `;

const WebviewScreen = ({uri, onMessage}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const navigation = useNavigation();

  const handleWebViewMessage = event => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      switch (message.type) {
        case 'NAV':
          console.log(message.data.uri);
          navigation.navigate(SCREEN.AUTH);
          break;
        case 'FUNC':
          onMessage(message.data);
          break;
        default:
          console.log('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView
        source={{uri}}
        style={styles.webview}
        onMessage={handleWebViewMessage}
        injectedJavaScript={injectedJavaScript}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        // 기타 공통 설정
      />
      {hasError && (
        <View style={styles.errorContainer}>
          {/* 에러 메시지나 컴포넌트를 여기에 추가 */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
});

export default WebviewScreen;
