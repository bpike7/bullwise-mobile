import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { colors } from '../../styles';


export default function ({ orders = [], stockInFocus = {}, findAndHandleFocusFromOrder }) {
  useEffect(() => {
  }, [orders]);
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.white, marginBottom: 5, marginLeft: 10 }}>Orders</Text>
      <View style={{ flexDirection: 'row' }}>
        {orders.map((order, i) =>
          <TouchableOpacity key={i}
            onPress={() => findAndHandleFocusFromOrder(order)}
            style={{
              ...styles.card,
              backgroundColor: colors.blue2,
              borderColor: stockInFocus.symbol === order.symbol ? colors.blue0 : null
            }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={{
                fontSize: 8,
                color: order.action === 'buy' ? colors.green : colors.red
              }}>{`${order.type} ${order.action}`.toUpperCase()}</Text>
              <Text style={{
                fontSize: 8,
                color: order.status === 'open' ? colors.white : colors.green
              }}>{order.status}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text style={{ ...styles.text, color: stockInFocus.symbol === order.symbol ? colors.blue0 : colors.white }}>{order.symbol}</Text>
                <Text style={styles.text}>${order.strike}{order.option_type === 'call' ? 'C' : 'P'}</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}>
                <Text style={styles.text}>x{order.size}</Text>
              </View>
            </View>

          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100
  },
  card: {
    flex: .25,
    padding: 10,
    margin: 3,
    marginRight: 0,
    justifyContent: 'space-evenly',
    borderRadius: 8,
    borderWidth: 1
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.white
  },
});
