import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles';


export default function ({ relativeSize, handleSetRelativeSize, buySellPoint, handleSetBuySellPoint }) {
  return (
    <View style={styles.container}>

      {/* Buy / Sell amount */}
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TouchableOpacity onPress={() => handleSetRelativeSize(1)} style={{
          ...styles.button,
          backgroundColor: relativeSize === 1 ? colors.blue1 : colors.blue2,
          borderBottomLeftRadius: 8,
          borderTopLeftRadius: 8
        }}>
          <Text style={{
            ...styles.text,
            color: relativeSize === 1 ? colors.blue0 : colors.whiteOff
          }}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSetRelativeSize(.5)} style={{
          ...styles.button,
          backgroundColor: relativeSize === .5 ? colors.blue1 : colors.blue2,
          borderBottomRightRadius: 8, borderTopRightRadius: 8
        }}>
          <Text style={{
            ...styles.text,
            color: relativeSize === .5 ? colors.blue0 : colors.whiteOff
          }}>1/2</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TouchableOpacity onPress={() => handleSetBuySellPoint('bid-ask')} style={{
          ...styles.button,
          backgroundColor: buySellPoint === 'bid-ask' ? colors.blue1 : colors.blue2,
          borderBottomLeftRadius: 8,
          borderTopLeftRadius: 8
        }}>
          <Text style={{
            ...styles.text,
            color: buySellPoint === 'bid-ask' ? colors.blue0 : colors.whiteOff
          }}>B/A</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSetBuySellPoint('mid')} style={{
          ...styles.button,
          backgroundColor: buySellPoint === 'mid' ? colors.blue1 : colors.blue2,
          borderBottomRightRadius: 8, borderTopRightRadius: 8
        }}>
          <Text style={{
            ...styles.text,
            color: buySellPoint === 'mid' ? colors.blue0 : colors.whiteOff
          }}>Mid</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    maxWidth: 190,
    marginRight: 10,
    marginTop: 15,
    borderRadius: 8
  },
  text: {
    fontWeight: 'bold',
    color: colors.whiteOff
  },
  button: {
    borderColor: colors.blue0,
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue2
  },
});
