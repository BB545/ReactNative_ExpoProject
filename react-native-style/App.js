import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import InlineStyle from './src/InlineStyle';
import ClassStyle from './src/ClassStyle';

export default function App() {
  return (
    <View style={styles.container}>
      <InlineStyle />
      <ClassStyle />
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
