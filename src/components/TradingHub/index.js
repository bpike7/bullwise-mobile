import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OptionManager from './OptionManager';
import Watchlist from './Watchlist';
import Positions from './Positions';
import PriceSlider from './PriceSlider';
import SettingsBar from './SettingsBar';
import Orders from './Orders';
import Banners from './Banners';
import { colors } from '../../styles.js'
import api from '../../api.js';
import Minicharts from './Minicharts';


export default function () {
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistOrderRef, setWatchlistOrderRef] = useState();
  const [orders, setOrders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [stockInFocus, setFocus] = useState();
  const [priceSliderPrice, setPriceSliderPrice] = useState(0);
  const [relativeSize, setRelativeSize] = useState(1);
  const [buySellPoint, handleSetBuySellPoint] = useState('bid-ask');
  const [notification, createNotification] = useState();
  const [indices, setIndices] = useState();

  useEffect(() => {
    api._ws.onmessage = (e) => {
      console.log('message')
      const parsed = JSON.parse(e.data);

      if (parsed.indices) setIndices(parsed.indices);

      // Look for changes in the watchlist and append volume_relative_changed and order_changed
      if (parsed.watchlist) setWatchlist(prev => {
        return parsed.watchlist.slice(0, 4).map((wl, i) => {
          const match = prev.slice(0, 4).find(p => p.symbol === wl.symbol);
          const previousMatchIndex = match ? prev.indexOf(match) : null;
          if (!match || (previousMatchIndex && previousMatchIndex !== i)) wl.order_changed = true;
          else wl.order_changed = false;
          if (match && match.volume_relative !== wl.volume_relative) wl.volume_relative_changed = true;
          else wl.volume_relative_changed = false
          return wl;
        });
      });

      if (parsed.orders) {
        setOrders(prev => {
          const { fresh, completed, cancelled, unchanged } = parsed.orders.reduce((acc, o) => {
            if (prev.some(po => po.id === o.id && po.status === o.status)) {
              acc.unchanged.push(o);
              return acc;
            }
            if (o.status === 'filled') acc.completed.push(o);
            if (o.status === 'open') acc.fresh.push(o);
            if (o.status === 'cancelled') acc.cancelled.push(o);
            return acc;
          }, { fresh: [], completed: [], cancelled: [], unchanged: [] });

          if (fresh.length > 0) handleCreateNotification({
            message: `Order created: ${fresh.map(({ symbol, option_type, strike, size }) => `${symbol} ${option_type === 'call' ? 'C' : 'P'} $${strike} x${size}`).join(', ')}`,
            color: colors.white
          });

          if (completed.length > 0) {
            (async function () {
              // const positions = await api.getAllPositions();
            }());
            handleCreateNotification({
              message: `Order filled!: ${completed.map(({ symbol, option_type, strike, size }) => `${symbol} ${option_type === 'call' ? 'C' : 'P'} $${strike} x${size}`).join(', ')}`,
              color: colors.green
            });
          }

          return [...unchanged, ...fresh];
        });
      }
    }
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
  }, []);

  useEffect(() => {
    const watchlistSymbols = watchlist.slice(0, 4).map(({ symbol }) => symbol);
    const newWatchlistOrderRef = watchlistSymbols.join(',');
    if (newWatchlistOrderRef !== watchlistOrderRef) {
      handleCreateNotification({
        message: 'Watchlist changed!',
        color: colors.yellow
      });
      console.log('watchlist changed')
    }
    setWatchlistOrderRef(newWatchlistOrderRef);
  }, [watchlist]);

  function handleSetFocus(inFocus) {
    if (inFocus === stockInFocus) return setFocus();
    const position = inFocus.postions || positions.find(({ symbol }) => inFocus.symbol === symbol);
    if (position) setPriceSliderPrice(position.strike);
    inFocus.position = position;
    const orders = inFocus.orders || (orders || []).filter(({ symbol }) => inFocus.symbol === symbol);
    inFocus.orders = orders;
    setPriceSliderPrice(inFocus.strike_close);
    setFocus(inFocus);
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
    setFocus(inFocus);
  }

  function handlePriceSliderChange(value) {
    return setPriceSliderPrice(value);
  }

  function handleSetRelativeSize(rs) {
    return setRelativeSize(rs);
  }

  function handleCreateNotification({ color, message }) {
    createNotification((prev) => prev === message ? ({ message: `${message} `, color }) : ({ message: message, color }));
  }

  async function handleCreateOrder(option_type) {
    await api.createOrder({
      symbol: stockInFocus.symbol,
      option_type,
      strike: priceSliderPrice,
      size_relative: relativeSize,
      buy_sell_point: buySellPoint
    });
  }

  return (
    <View style={styles.container}>

      <Minicharts
        indices={indices}
      />
      <View>
        <Banners
          notification={notification}
          handleCreateNotification={handleCreateNotification}
        />

        <View style={styles.containerMiddle}>
          <View style={{ flex: 1 }}>
            <Positions
              positions={positions}
              stockInFocus={stockInFocus}
              findAndHandleFocusFromPosition={findAndHandleFocusFromPosition}
            />
            <Orders
              orders={orders}
              stockInFocus={stockInFocus}
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

        <View style={styles.containerBottom}>
          <OptionManager
            priceSliderPrice={priceSliderPrice}
            stockInFocus={stockInFocus}
            handleCreateOrder={handleCreateOrder}
          />
          <Watchlist
            watchlist={watchlist}
            stockInFocus={stockInFocus}
            positions={positions}
            handleSetFocus={handleSetFocus}
          />
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
