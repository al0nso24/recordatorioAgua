import { StyleSheet, View } from 'react-native';
import Agua from './src/components/Agua';

export default function App() {
  return (
    <View style={styles.container}>
      <Agua></Agua>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
