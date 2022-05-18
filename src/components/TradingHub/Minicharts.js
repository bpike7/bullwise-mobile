import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../styles';

const symbols = ['QQQ', 'QQQ', 'QQQ'];

const TESTSUMMARY = {
  QQQ: {
    above: [
      { type: 'open', percent_from: .4 },
      { type: 'high', percent_from: 2 },
    ],
    below: [
      { type: 'close_previous', percent_from: -.1 },
      { type: 'low', percent_from: -.6 },
    ]
  }
}

export default function ({ indices }) {
  const openAbove = TESTSUMMARY.QQQ.above.find(({ type }) => type === 'open');
  const openBelow = TESTSUMMARY.QQQ.below.find(({ type }) => type === 'open');
  const openPercentFrom = openAbove?.percent_from || openBelow.percent_from;

  function resolveColor(type) {
    switch (type) {
      case 'open': return colors.yellow;
      case 'close_previous': return colors.orange;
      case 'high': return colors.green;
      case 'low': return colors.red;
      default: return colors.white;
    }
  }

  return (
    <View style={styles.container}>
      {symbols.map((symbol, i) =>
        <View style={{ flexDirection: 'row', flex: 1 }} key={i}>
          <View style={{ marginRight: 10, alignSelf: 'center' }}>
            <Text style={{ fontSize: 22, color: colors.white, fontWeight: 'bold' }}>{symbol}</Text>
            <Text style={{ fontSize: 16, color: colors.whiteOff }}>{289.32}</Text>
            <Text style={{ fontSize: 12, color: colors.green }}>+2.4%</Text>
          </View>
          <View style={{ flexDirection: 'row', height: '90%', marginTop: 5 }}>
            <View style={{ position: 'absolute', top: '50%', bottom: '50%', width: 50, height: 2, backgroundColor: colors.blue0, justifyContent: 'center' }}>
              <View style={{ position: 'absolute', right: 0, backgroundColor: colors.blue0, height: 6, width: 6, borderRadius: 100 }}></View>
            </View>

            <View style={{ height: openPercentFrom > 0 ? `${Math.floor(openPercentFrom / 3 * 100)}%` : `${100 - Math.floor(openPercentFrom / 3 * 100)}%`, width: 2, backgroundColor: colors.green }}></View>
            <View style={{ height: openPercentFrom < 0 ? `${Math.abs(Math.floor(openPercentFrom / 3 * 100))}%` : `${100 - Math.abs(Math.floor(openPercentFrom / 3 * 100))}%`, width: 2, backgroundColor: colors.red }}></View>
            <View>
              {/* Above current price */}
              <View style={{ height: '50%' }}>
                {TESTSUMMARY[symbol].above.map(({ type, percent_from }, i) =>
                  <View key={i} style={{ position: 'absolute', bottom: `${Math.floor(percent_from / 3 * 100)}%`, width: 45, height: 2, backgroundColor: resolveColor(type) }}></View>)}
              </View>
              {/* Below current price */}
              <View style={{ position: 'relative', height: '50%' }}>
                {TESTSUMMARY[symbol].below.map(({ type, percent_from }, i) =>
                  <View key={i} style={{ position: 'absolute', top: `${Math.abs(Math.floor(percent_from / 3 * 100))}%`, width: 45, height: 2, backgroundColor: resolveColor(type) }}></View>)}
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
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
