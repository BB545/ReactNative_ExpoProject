import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ButtonComponent from './src/ButtonComponent';
import MyButton from './components/MyButton';

export default function App() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          marginBottom: 10,
        }}
      >My Button Component</Text>
      <MyButton />
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
  text: {
    fontSize: 30,
    marginBottom: 10,
  },
});
