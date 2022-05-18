import { Text, StyleSheet } from 'react-native';
import { colors } from '../../styles';


export default function ({ children }) {
  return (
    <Text style={styles.text}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.white
  }
});
