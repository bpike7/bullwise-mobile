import { View, Text, TouchableHighlight, StyleSheet, Animated, AnimatedInterpolation } from 'react-native';
import { useEffect, useRef } from 'react';
import { colors } from '../../styles';


export default function ({ watchlist = [], positions = [], stockInFocus = {}, handleSetFocus }) {
  if (watchlist.length < 1) return <Blank />

  // assign has_position
  watchlist = watchlist.map(s => positions.some(p => p.symbol === s.symbol) ? ({ ...s, has_position: true }) : ({ ...s, has_position: false }));

  const refsByIndices = {
    0: new Animated.Value(0),
    1: new Animated.Value(0),
    2: new Animated.Value(0),
    3: new Animated.Value(0)
  };

  // TODO nail down this text animation

  useEffect(() => {
    Promise.all(watchlist.filter(({ volume_relative_changed }) => volume_relative_changed).map((_, i) => {
      Animated.timing(refsByIndices[i], {
        toValue: 0,
        duration: 5000,
        useNativeDriver: false
      }).start(() => { });
    }));
  }, [watchlist]);

  return (
    <View style={styles.container}>
      {watchlist.slice(0, 4).map((stock, i) =>
        <TouchableHighlight
          key={i}
          onPress={() => handleSetFocus(stock)}
          style={{
            ...styles.button,
            borderColor: stockInFocus.symbol === stock.symbol ? colors.blue0 : null
          }}>
          <View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                ...styles.text,
                color: stockInFocus.symbol === stock.symbol ? colors.blue0 : colors.white
              }}>{stock.symbol}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Animated.Text style={{
                ...styles.text,
                color: refsByIndices[i].interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [colors.white, colors.red, colors.red]
                })
              }}>{stock.volume_relative}</Animated.Text>
            </View>
          </View>
        </TouchableHighlight>
      )}
    </View>
  );
}

function Blank() {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.button, opacity: .5 }}></View>
      <View style={{ ...styles.button, opacity: .5 }}></View>
      <View style={{ ...styles.button, opacity: .5 }}></View>
      <View style={{ ...styles.button, opacity: .5 }}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10
  },
  optionManager: {
    flexDirection: 'row',
    backgroundColor: '#BCE6E1',
    margin: 5,
    marginBottom: 10,
    borderRadius: 8
  },
  text: {
    fontWeight: 'bold',
    color: colors.white
  },
  button: {
    flex: 1,
    height: 40,
    padding: 3,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.blue2,
    borderWidth: 1
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonBase: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
});
