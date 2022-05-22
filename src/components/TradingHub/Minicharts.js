import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../styles';

const maxRangePercentage = 2;

export default function ({ indices = {} }) {
  function resolveColor(type) {
    switch (type) {
      case 'open': return colors.yellow;
      case 'prevclose': return colors.orange;
      case 'high': return colors.green;
      case 'low': return colors.red;
      case 'close': return colors.blue3;
      default: return colors.white;
    }
  }

  return (
    <View style={styles.container}>
      {Object.entries(indices).map(([symbol, { above, below, change_percentage, change_percentage_open }], i) =>
        <View style={{ flexDirection: 'row', flex: 1 }} key={i}>
          <View style={{ marginRight: 10, alignSelf: 'center' }}>
            <Text style={{ fontSize: 22, color: colors.white, fontWeight: 'bold' }}>{symbol}</Text>
            <Text style={{ fontSize: 16, color: colors.whiteOff }}>{289.32}</Text>
            <Text style={{ fontSize: 12, color: change_percentage >= 0 ? colors.green : colors.orange }}>{`${change_percentage >= 0 ? '+' : ''}${change_percentage}`}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
            <View style={{ height: '60%' }}>
              <View style={{ height: `${100 - change_percentage_open / maxRangePercentage * 100}%`, width: 2, backgroundColor: colors.green }}></View>
              {/* <View style={{ height: `${100 - change_percentage_open / maxRangePercentage * 100}%`, width: 2, backgroundColor: colors.orange }}></View> */}
              {/* <View style={{ height: `${100}%`, width: 2, backgroundColor: colors.whiteOff }}></View> */}
            </View>
            {/* Price Now */}
            <View style={{ position: 'absolute', top: '50%', bottom: '50%', width: 50, height: 2, backgroundColor: colors.blue0, justifyContent: 'center' }}>
              <View style={{ position: 'absolute', right: 0, backgroundColor: colors.blue0, height: 6, width: 6, borderRadius: 100 }}></View>
            </View>
            <View>
              {/* Above current price */}
              <View style={{ height: '50%' }}>
                {above.map(({ type, percent_from }, i) =>
                  <View key={i} style={{ position: 'absolute', bottom: `${Math.floor(percent_from / maxRangePercentage * 100)}%`, width: 45, height: 2, backgroundColor: resolveColor(type) }}></View>)}
              </View>
              {/* Below current price */}
              <View style={{ height: '50%' }}>
                {below.map(({ type, percent_from }, i) =>
                  <View key={i} style={{ position: 'absolute', top: `${Math.abs(Math.floor(percent_from / maxRangePercentage * 100))}%`, width: 45, height: 2, backgroundColor: resolveColor(type) }}></View>)}
              </View>
            </View>
          </View>
        </View>
      )
      }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row'
  }
});
