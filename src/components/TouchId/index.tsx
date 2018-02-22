import * as React from 'react';
import ReactNativeHaptic from 'react-native-haptic';

import { Icon } from 'react-native-elements';
import { Alert, Button, View, Platform, Vibration } from 'react-native';

import TouchID from 'react-native-touch-id';

import styles from './styles';

interface ITouchIdProps {
  touchIdSupport?: Boolean,
  iconStyle?: Object,
}

class TouchId extends React.Component<ITouchIdProps> {

  render() {
    console.log(Platform, 'plf')
    return (
      // <View>
      //   <Button
      //     title="notification"
      //     onPress={() => this.kek(1)}/>
      //   <Button
      //     title="impact"
      //     onPress={() => this.kek(2)}/>
      //   <Button
      //     title="selection"
      //     onPress={() => this.kek(3)}/>
      // </View>
      <Icon
        type="material-icons"
        name="fingerprint"
        size={66}
        {...this.props.iconStyle}
        onPress={this.handlePrint}
      />
    );
  }

  private kek = (type: number) => {
    console.log(ReactNativeHaptic, 'bl')
    // switch(type) {
    //   case 1:
    //     ReactNativeHaptic.generate('notification');
    //     break;
    //   case 2:
    //     ReactNativeHaptic.generate('impact');
    //     break;
    //   case 3:
    //     ReactNativeHaptic.generate('selection');
    //     break;
    //   default:
    //     return null;
    // }
  }

  private handlePrint = (): void => {
    console.log('there will be saga... probably');
    TouchID.authenticate().then((r: Object) => {
      if (Platform.OS === 'android') {
        Vibration.vibrate(100, false);
      } else {
        ReactNativeHaptic.generate('notification');
      }
      Alert.alert(
        `Button added just for make testing of Face / Touch ID available. Will be removed later.`
      );
    }).catch((err: Object) => {
      if (Platform.OS === 'android') {
        Vibration.vibrate(400, false);
      } else {
        ReactNativeHaptic.generate('notification');
      }
      console.log('error');
    })
  }
}

export default TouchId;