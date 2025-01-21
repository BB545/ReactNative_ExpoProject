import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import InlineStyle from './src/InlineStyle';
import ClassStyle from './src/ClassStyle';
import { Contents, Footer, Header } from './src/components/Layout';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Contents />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
