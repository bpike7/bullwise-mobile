import { View, Text } from 'react-native';
import { colors } from '../../styles';


export default function ({ account }) {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View>
        <Text style={{ fontWeight: 'bold', color: colors.whiteOff, fontSize: 14 }}>Total Account Value</Text>
        <Text style={{ fontWeight: 'bold', color: colors.white, fontSize: 20 }}>$5,203</Text>
      </View>
    </View>
  );
}
