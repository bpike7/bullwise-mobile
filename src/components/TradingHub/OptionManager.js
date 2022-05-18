import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { colors } from '../../styles';


export default function ({ stockInFocus = {}, priceSliderPrice, handleCreateOrder }) {
  const { position, calls = [], puts = [], symbol } = stockInFocus;


  const matchingCall = calls.find(({ strike }) => strike === priceSliderPrice);
  const matchingPut = puts.find(({ strike }) => strike === priceSliderPrice);


  useEffect(() => {
  }, [stockInFocus])

  function resolveBidAskColor({ bid_ask_spread }) {
    if (bid_ask_spread >= .2 && bid_ask_spread < .35) return colors.yellow;
    if (bid_ask_spread >= .35) return colors.red;
    return colors.white;
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => handleCreateOrder('call')}
        disabled={calls.length === 0}
        style={{ ...styles.buyCallButton, borderWidth: matchingCall ? 1 : 0 }}
      >
        <View style={{ ...styles.buttonInnerContainer }}>
          {position?.type === 'call' ?
            <View style={styles.positionContainerCall}>
              <Text style={{ ...styles.buttonText, fontSize: 14, color: colors.green }}>{position.size}</Text>
            </View> : null}
          <View style={styles.addButtonContainerCall}>
            <Text style={{ ...styles.buttonText, color: matchingCall ? colors.green : colors.blue3 }}>
              {position?.type === 'put' ? 'SELL' : 'BUY'}
            </Text>
          </View>
          {/* Bid ask spread */}
          {matchingCall ? <View style={{ ...styles.bidAskSpread }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: resolveBidAskColor(matchingCall) }}>{matchingCall.bid_ask_spread}</Text>
          </View> : null}
        </View>
      </TouchableOpacity >

      <View style={{ ...styles.center }}>
        <TouchableOpacity>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', opacity: .7, color: colors.blue0 }}>{symbol}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', opacity: .7, color: colors.white }}>{priceSliderPrice > 0 ? `$${priceSliderPrice}` : ''}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => handleCreateOrder('put')}
        disabled={puts.length === 0}
        style={{ ...styles.buyPutButton, borderWidth: matchingPut ? 1 : 0 }}
      >
        <View style={styles.buttonInnerContainer}>
          <View style={styles.addButtonContainerPut}>
            <Text style={{ ...styles.buttonText, color: matchingPut ? colors.orange : colors.blue3 }}>
              {position?.type === 'call' ? 'SELL' : 'BUY'}
            </Text>
          </View>
          {position?.type === 'put' ? <View style={styles.positionContainerPut}>
            <Text style={{ ...styles.buttonText, color: matchingPut ? colors.green : colors.blue3 }}>{position.size}</Text>
          </View> : null}
          {/* Bid ask spread */}
          {matchingPut ? <View style={{ ...styles.bidAskSpread }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: resolveBidAskColor(matchingPut) }}>{matchingPut.bid_ask_spread}</Text>
          </View> : null}
        </View>
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    marginBottom: 10,
    borderRadius: 8
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: colors.blue0
  },
  center: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue2
  },
  buyCallButton: {
    flex: 1,
    borderColor: colors.blue0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  buyPutButton: {
    flex: 1,
    borderColor: colors.blue0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  buttonInnerContainer: {
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
  },
  positionContainerCall: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 5,
    backgroundColor: colors.blue2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  addButtonContainerCall: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionContainerPut: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 5,
    backgroundColor: colors.blue2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  addButtonContainerPut: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  bidAskSpread: {
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
