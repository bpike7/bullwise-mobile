import { View, Text, StyleSheet } from 'react-native';
import VerticalSlider from 'rn-vertical-slider';
import { colors } from '../../styles';


export default function ({ stockInFocus = {}, handlePriceSliderChange, priceSliderPrice }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{priceSliderPrice || 0}</Text>
      <VerticalSlider
        min={stockInFocus.strike_min || 0}
        max={stockInFocus.strike_max || 100}
        onChange={val => handlePriceSliderChange(val)}
        width={40}
        height={305}
        step={stockInFocus.strike_diff}
        borderRadius={5}
        maximumTrackTintColor={colors.blue1}
        minimumTrackTintColor={colors.blue0}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 5,
    marginLeft: 10,
  },
  text: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e3e1e1'
  }
})
