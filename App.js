import { StyleSheet, Text, View } from 'react-native';
import TradingHub from './src/components/TradingHub';
import { colors } from './src/styles.js'

export default function App() {
  return (
    <View style={styles.container}>
      <TradingHub />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue2,
    paddingTop: 10,
    paddingBottom: 15
  },
});
