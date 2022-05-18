import { View, StyleSheet } from 'react-native';
import { colors } from '../../styles.js';

export default function ({ styles: propStyles = {}, children }) {
  return (
    <View style={{ ...styles.container, ...propStyles }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: colors.blue2,
    borderRadius: 8,
  }
});
