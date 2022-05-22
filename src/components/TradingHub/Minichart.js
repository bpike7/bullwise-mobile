import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../styles';

const maxRangePercentage = 5;

export default function ({ stock, symbol, stockInFocus = {}, handleSetFocus }) {
  if (!stock) return <View style={{ height: 125, flex: 1, borderWidth: 2, borderColor: colors.blue1, borderRadius: 8, margin: 5, padding: 3 }}></View>
  if (!stock.symbol) stock.symbol = symbol;

  function resolveLineColor(type) {
    switch (type) {
      case 'open': return colors.white;
      case 'prevclose': return colors.orange;
      case 'high': return colors.green;
      case 'low': return colors.red;
      case 'close': return colors.blue3;
      default: return colors.white;
    }
  }
  const changePercentageText = `${stock.change_percentage >= 0 ? '+' : ''}${stock.change_percentage}`;
  const changePercentageColor = stock.change_percentage >= 0 ? colors.green : colors.orange;

  const isInFocus = stockInFocus.symbol === stock.symbol;
  const symbolTextColor = isInFocus ? colors.blue0 : colors.white;
  const borderColor = isInFocus ? colors.blue0 : colors.blue1;
  return (
    <TouchableOpacity
      onPress={() => { handleSetFocus(stock) }}
      style={{ height: 125, flex: 1, borderWidth: 2, borderColor, borderRadius: 8, margin: 5, padding: 3 }}>
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 22, color: symbolTextColor, fontWeight: 'bold' }}>{stock.symbol}</Text>


          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderLeftWidth: 2, borderColor: colors.white, margin: 5 }}>
            {/* Price Now */}
            <View style={{ position: 'absolute', top: '50%', bottom: '50%', width: 65, height: 2, backgroundColor: colors.blue0, justifyContent: 'center' }}>
              <View style={{ position: 'absolute', right: 0, backgroundColor: colors.blue0, height: 6, width: 6, borderRadius: 100 }}></View>
            </View>
            <View>
              {/* Above current price */}
              <View style={{ height: '50%' }}>
                {stock.key_levels.above.filter(({ percent_from }) => percent_from <= maxRangePercentage).map(({ type, percent_from }, i) =>
                  <View key={i} style={{ position: 'absolute', bottom: `${Math.floor(percent_from / maxRangePercentage * 100)}%`, width: 60, height: 2, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: resolveLineColor(type) }}></View>)}
              </View>
              {/* Below current price */}
              <View style={{ height: '50%' }}>
                {stock.key_levels.below.filter(({ percent_from }) => percent_from >= maxRangePercentage * -1).map(({ type, percent_from }, i) =>
                  <View key={i} style={{ position: 'absolute', top: `${Math.abs(Math.floor(percent_from / maxRangePercentage * 100))}%`, width: 60, height: 2, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: resolveLineColor(type) }}></View>)}
              </View>
            </View>
          </View>

        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 12, color: colors.whiteOff }}>{stock.price_now}</Text>
          <Text style={{ fontSize: 12, color: colors.white }}>{stock.volume_relative}</Text>
          <Text style={{ fontSize: 12, color: changePercentageColor }}>{changePercentageText}</Text>
        </View>
      </View>
    </TouchableOpacity >
  )
}
