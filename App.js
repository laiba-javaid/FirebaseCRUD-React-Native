
import { StyleSheet, Text, View } from 'react-native';
import Fetch from './firebase-crud';

export default function App() {
  return (
    <View style={styles.container}>
      <Fetch/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
