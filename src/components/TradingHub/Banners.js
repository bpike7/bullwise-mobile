import { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles';

export default function ({ notification, handleCreateNotification }) {
  const [message, setMessage] = useState();
  const translateXDefault = -500;
  const translateX = useRef(new Animated.Value(translateXDefault)).current;  // Initial value
  const opacity = useRef(new Animated.Value(1)).current;  // Initial value

  function resetAnimationValues() {
    translateX.setValue(translateXDefault);
    opacity.setValue(1);
  }

  useEffect(() => {
    if (!notification) return;
    resetAnimationValues();
    Animated.timing(translateX, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true
    }).start(() => {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true
        }).start(resetAnimationValues);
      }, 3000);
    });
  }, [notification]);

  return (
    <View style={styles.container}>
      <Animated.View style={{
        height: '100%',
        width: '100%',
        backgroundColor: notification?.color || colors.blue0,
        borderRadius: 10,
        paddingLeft: 10,
        transform: [{ translateX }],
        opacity
      }}>
        <View style={{
          height: '100%',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* <View style={{ height: 15, width: 15, backgroundColor: colors.blue3 }}></View> */}
          <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', transform: [{ translateX: -15 }] }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.blue3 }}>{notification?.message}</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: '100%'
  }
});
