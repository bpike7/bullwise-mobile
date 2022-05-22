
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
  </TouchableOpacity>

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
