import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { colors } from '../../styles';


export default function ({ stockInFocus = {}, priceSliderPrice, handleCreateBuyOrder, handleCreateSellOrder }) {
  const { strike_map = {}, calls = [], puts = [], symbol } = stockInFocus;

  const matchingCall = calls.find(({ strike }) => strike === priceSliderPrice);
  const matchingPut = puts.find(({ strike }) => strike === priceSliderPrice);

  const existingPositionOptionType = strike_map[priceSliderPrice];

  useEffect(() => {
  }, [stockInFocus]);

  function resolveBidAskColor({ bid_ask_spread }) {
    if (bid_ask_spread >= .2 && bid_ask_spread < .35) return colors.yellow;
    if (bid_ask_spread >= .35) return colors.red;
    return colors.white;
  }

  function resolveButton(option_type) {
    if (!existingPositionOptionType && !matchingCall && !matchingPut) {
      return <ButtonNoOption option_type={option_type} />
    }
    if (existingPositionOptionType && existingPositionOptionType !== option_type) {
      return <Button
        text={'SELL'}
        color={colors.red}
        optionType={option_type}
        resolveBidAskColor={resolveBidAskColor}
        handleCreateOrder={handleCreateSellOrder}
      />
    }
    if (existingPositionOptionType === option_type) {
      return <Button
        text={'BUY'}
        color={option_type === 'call' ? colors.green : colors.orange}
        option_type={option_type}
        contract={option_type === 'call' ? matchingCall : matchingPut}
        resolveBidAskColor={resolveBidAskColor}
        handleCreateOrder={handleCreateBuyOrder}
      />
    }
    if (matchingCall && option_type === 'call') {
      return <Button
        text={'BUY'}
        color={colors.green}
        option_type={option_type}
        contract={matchingCall}
        resolveBidAskColor={resolveBidAskColor}
        handleCreateOrder={handleCreateBuyOrder}
      />
    }
    if (matchingPut && option_type === 'put') {
      return <Button
        text={'BUY'}
        color={colors.orange}
        option_type={option_type}
        contract={matchingPut}
        resolveBidAskColor={resolveBidAskColor}
        handleCreateOrder={handleCreateBuyOrder}
      />
    }
    return <ButtonNoOption option_type={option_type} />
  }

  return (
    <View style={{ flexDirection: 'row', height: 80, marginBottom: 20, marginTop: 20, borderRadius: 8 }}>
      {resolveButton('call')}
      <View style={{ ...styles.center }}>
        <TouchableOpacity>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', opacity: .7, color: colors.blue0 }}>{symbol}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', opacity: .7, color: colors.white }}>{priceSliderPrice > 0 ? `$${priceSliderPrice}` : ''}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {resolveButton('put')}
    </View>
  );
}

function Button({ option_type, text, color, handleCreateOrder, contract, resolveBidAskColor }) {
  const borderRadius = option_type === 'call' ? { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 } : { borderTopRightRadius: 8, borderBottomRightRadius: 8 };
  return (
    <TouchableOpacity
      onPress={() => handleCreateOrder(option_type)}
      style={{ flex: 1, borderColor: color, borderWidth: 1, ...borderRadius }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color }}>{text}</Text>
          {/* Bid ask spread */}
          {contract ? <View style={{ position: 'absolute', bottom: 2, left: 0, right: 0, height: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: resolveBidAskColor(contract) }}>{contract.bid_ask_spread}</Text>
          </View> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ButtonNoOption({ option_type }) {
  const borderRadius = option_type === 'call' ? { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 } : { borderTopRightRadius: 8, borderBottomRightRadius: 8 };
  return (
    <TouchableOpacity
      onPress={() => { }}
      disabled
      style={{ flex: 1, borderColor: colors.blue2, borderWidth: 1, ...borderRadius }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.blue2 }}>---</Text>
        </View>
      </View>
    </TouchableOpacity>
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

