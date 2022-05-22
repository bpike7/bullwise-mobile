import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { colors } from '../../styles';


export default function ({ positions = [], stockInFocus = {}, findAndHandleFocusFromPosition }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.white, marginBottom: 10, marginLeft: 10 }}>Positions</Text>
      {positions.map((position, i) =>
        <TouchableHighlight
          key={i}
          onPress={() => findAndHandleFocusFromPosition(position)}
          style={{ ...styles.card, borderWidth: stockInFocus.symbol === position.symbol ? 1 : 0, backgroundColor: colors.blue2 }}>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.text, fontSize: 24, color: stockInFocus.symbol === position.symbol ? colors.blue0 : colors.white }}>{position.symbol}</Text>
              <Text style={{ ...styles.text, opacity: .9 }}>${position.strike} {position.type.toUpperCase()}</Text>
            </View>
            <View style={{ justifyContent: 'space-between' }}>
              <Text style={styles.text}>{position.price_entry}</Text>
              <Text style={styles.text}>x{position.size}</Text>
            </View>
          </View>

        </TouchableHighlight>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    marginBottom: 5,
    marginTop: 5
  },
  inner: {
    flexDirection: 'row'
  },
  text: {
    fontWeight: 'bold',
    color: colors.white
  },
  card: {
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.blue0,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonBase: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
});
