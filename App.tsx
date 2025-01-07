import './global.css';
import 'react-native-gesture-handler';
import { StatusBar, SafeAreaView } from 'react-native';
import RootStack from './navigation';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <SafeAreaView style={{ flex: 1 }}>
        <RootStack />
      </SafeAreaView>
    </>
  );
}
