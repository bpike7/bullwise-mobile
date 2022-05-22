import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OptionManager from './OptionManager';
import Watchlist from './Watchlist';
import PositionOrders from './PositionOrders';
import PriceSlider from './PriceSlider';
import SettingsBar from './SettingsBar';
import Orders from './Orders';
import Banners from './Banners';
import { colors } from '../../styles.js'
import api from '../../api.js';
import Minichart from './Minichart';


export default function () {
  const [indices, setIndices] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [stockInFocus, setFocus] = useState();
  const [priceSliderPrice, setPriceSliderPrice] = useState(0);
  const [relativeSize, setRelativeSize] = useState(1);
  const [buySellPoint, handleSetBuySellPoint] = useState('bid-ask');
  const [notification, createNotification] = useState();

  useEffect(() => {
    (async function () {
      try {
        const data = await api.getInitialData();
        setIndices(data.indices);
        setWatchlist(data.watchlist);
        setPositions(data.positions);
        setOrders(data.orders);
      } catch (err) {
        console.log('Initial bootup failure: ', err.response);
      }
    }());
    api._ws.onmessage = (e) => {
      const parsed = JSON.parse(e.data);
      if (parsed.notification) createNotification({ message: parsed.notification.message, color: parsed.notification.color });
      if (parsed.indices) setIndices(parsed.indices);
      if (parsed.watchlist) setWatchlist(parsed.watchlist);
      if (parsed.orders) setOrders(parsed.orders);
      if (parsed.positions) setPositions(parsed.positions);
    }
  }, []);

  function handleSetFocus(inFocus) {
    if (inFocus === stockInFocus) return setFocus();
    const strikeMap = {};
    // Find positions matching touched symbol
    const positionsMatchingSymbolInFocus = inFocus.positions || positions.filter(({ symbol }) => inFocus.symbol === symbol);
    positionsMatchingSymbolInFocus.forEach(({ strike, option_type }) => {
      strikeMap[strike] = option_type;
    });
    inFocus.strike_map = strikeMap;
    setFocus(inFocus);
    setPriceSliderPrice(positionsMatchingSymbolInFocus && positionsMatchingSymbolInFocus.length > 0 ? positionsMatchingSymbolInFocus[0].strike : inFocus.strike_close);
  }

  function findAndHandleFocusFromOrder(order) {
    const inFocus = watchlist.find(({ symbol }) => symbol === order.symbol);
    if (!inFocus) console.log('Unable to find in focus!');
    const ordersForSymbol = orders.filter(({ symbol }) => inFocus.symbol === symbol);
    if (ordersForSymbol.length > 0) inFocus.orders = ordersForSymbol;
    handleSetFocus(inFocus)
  }

  function findAndHandleFocusFromPosition(position) {
    const inFocus = watchlist.find(({ symbol }) => symbol === position.symbol);
    if (!inFocus) console.log('Unable to find in focus!');
    inFocus.position = position;
    handleSetFocus(inFocus);
  }

  function handlePriceSliderChange(value) {
    return setPriceSliderPrice(value);
  }

  function handleSetRelativeSize(rs) {
    return setRelativeSize(rs);
  }

  async function handleCreateBuyOrder(option_type) {
    await api.createBuyOrder({
      symbol: stockInFocus.symbol,
      option_type,
      strike: priceSliderPrice,
      size_relative: relativeSize,
      buy_sell_point: buySellPoint
    });
  }

  async function handleCreateSellOrder(option_type) {
    await api.createSellOrder({
      symbol: stockInFocus.symbol,
      option_type,
      strike: priceSliderPrice,
      size_relative: relativeSize,
      buy_sell_point: buySellPoint
    });
  }

  return (
    <View style={styles.container}>

      <Banners
        notification={notification}
      />
      <View style={styles.containerMiddle}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <PositionOrders
            positions={positions}
            orders={orders}
            stockInFocus={stockInFocus}
            findAndHandleFocusFromPosition={findAndHandleFocusFromPosition}
            findAndHandleFocusFromOrder={findAndHandleFocusFromOrder}
          />
          <SettingsBar
            buySellPoint={buySellPoint}
            relativeSize={relativeSize}
            handleSetBuySellPoint={handleSetBuySellPoint}
            handleSetRelativeSize={handleSetRelativeSize}
          />
        </View>
        <PriceSlider
          handlePriceSliderChange={handlePriceSliderChange}
          priceSliderPrice={priceSliderPrice}
          stockInFocus={stockInFocus}
        />
      </View>

      <View>
        <OptionManager
          positions={positions}
          priceSliderPrice={priceSliderPrice}
          stockInFocus={stockInFocus}
          handleCreateBuyOrder={handleCreateBuyOrder}
          handleCreateSellOrder={handleCreateSellOrder}
        />
        {/* <Watchlist
            watchlist={watchlist}
            stockInFocus={stockInFocus}
            positions={positions}
            handleSetFocus={handleSetFocus}
          /> */}
        <View style={{ flexDirection: 'row' }}>
          <Minichart stock={{ ...indices.QQQ, symbol: 'QQQ' }} />
          <Minichart stock={{ ...indices.SPY, symbol: 'SPY' }} />
          <Minichart stock={{ ...indices.DIA, symbol: 'DIA' }} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          {watchlist.map((wl, i) =>
            <Minichart key={i} stock={wl} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 30,
    padding: 8,
    backgroundColor: colors.blue3,
  },
  containerMiddle: {
    flexDirection: 'row',
    marginBottom: 15
  },
  containerBottom: {
  },
  containerInfo: {
    flex: 1,
    backgroundColor: colors.white
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  text: {
    color: '#E3E3E3', fontSize: 30, fontWeight: 'bold'
  }
});
