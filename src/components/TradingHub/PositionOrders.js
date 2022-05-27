import { useEffect } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { colors } from '../../styles';


export default function ({ positions = [], orders = [], stockInFocus = {}, findAndHandleFocusFromPosition, findAndHandleFocusFromOrder }) {
  useEffect(() => { }, [positions]);
  const emptySlots = 3 - positions.length - orders.length;
  return (
    <View style={styles.container}>
      {positions.map((position, i) =>
        <View key={i} style={{ flexDirection: 'row' }}>
          <TouchableHighlight
            onPress={() => {
              if (stockInFocus.symbol === position.symbol) return;
              findAndHandleFocusFromPosition(position)
            }}
            style={{ ...styles.card, flex: 1, borderColor: stockInFocus.symbol === position.symbol ? colors.blue0 : colors.blue2, backgroundColor: colors.blue2 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ ...styles.text, fontSize: 24, color: stockInFocus.symbol === position.symbol ? colors.blue0 : colors.white }}>{position.symbol}</Text>
                <Text style={{ ...styles.text, fontSize: 16, opacity: .9, color: position.option_type === 'call' ? colors.green : colors.orange }}>{position.strike} {position.option_type.toUpperCase()}</Text>
              </View>
              <View style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Text style={styles.text}>{position.price_avg}</Text>
                <Text style={styles.text}>{position.quantity}</Text>
              </View>
            </View>
          </TouchableHighlight>
          {position.orders.map((order, i) =>
            <TouchableHighlight
              key={i}
              onPress={() => { }}
              style={{
                ...styles.card,
                borderColor: stockInFocus.symbol === position.symbol ? colors.blue0 : colors.blue2,
                backgroundColor: colors.blue2,
                width: 60,
                marginLeft: 10
              }}>
              <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ ...styles.text, color: colors.whiteOff, fontSize: 12 }}>{order.price}</Text>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: order.type === 'market' ? order.side === 'buy_to_open' ? colors.green : colors.red : colors.red
                }}>{order.type === 'market' ? order.side === 'buy_to_open' ? 'BUY' : 'SELL' : order.type.toUpperCase()}</Text>
                <Text style={{ ...styles.text, color: colors.white, fontSize: 14 }}>{order.quantity}</Text>
              </View>
            </TouchableHighlight>
          )}
        </View>
      )}
      {orders.map((order, i) =>
        <TouchableHighlight
          key={i}
          onPress={() => {
            if (stockInFocus.symbol === order.symbol) return;
            findAndHandleFocusFromOrder(order)
          }}
          style={{ ...styles.card, width: '55%', borderWidth: stockInFocus.symbol === order.symbol ? 1 : 0, backgroundColor: colors.blue2 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.text, fontSize: 8, color: colors.white }}>{order.type.toUpperCase()} ORDER - {order.state}</Text>
              <Text style={{ ...styles.text, fontSize: 14, color: stockInFocus.symbol === order.symbol ? colors.blue0 : colors.white }}>{order.symbol}</Text>
              <Text style={{ ...styles.text, fontSize: 12, opacity: .9, color: order.option_type === 'call' ? colors.green : colors.orange }}>{order.strike} {order.option_type.toUpperCase()}</Text>
            </View>
            <View style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Text style={{ ...styles.text, fontSize: 14 }}>{order.price}</Text>
              <Text style={{ ...styles.text, fontSize: 14 }}>{order.quantity}</Text>
            </View>
          </View>
        </TouchableHighlight>
      )}
      {emptySlots > 0 ? [...Array(emptySlots)].map((_, i) => <View key={i} style={{ ...styles.card, minHeight: 55, flex: 1, borderColor: colors.blue2 }}></View>) : null}
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
    color: colors.white,
    fontSize: 20
  },
  card: {
    height: 55,
    padding: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.blue0,
    borderRadius: 8,
    borderWidth: 1
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonBase: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
});
