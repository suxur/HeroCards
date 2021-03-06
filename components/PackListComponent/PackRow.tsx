import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import { t } from 'ttag';
import { Pack } from '../../actions/types';
import PackIcon from '../../assets/PackIcon';
import Switch from '../core/Switch';
import { PackCardsProps } from '../PackCardsView';

interface Props {
  componentId: string;
  pack: Pack;
  setChecked?: (pack_code: string, checked: boolean) => void;
  checked?: boolean;
  whiteBackground?: boolean;
  baseQuery?: string;
  compact?: boolean;
  nameOverride?: string;
}

export default class PackRow extends React.Component<Props> {
  _onPress = () => {
    const {
      pack,
      componentId,
      baseQuery,
    } = this.props;
    Navigation.push<PackCardsProps>(componentId, {
      component: {
        name: 'Pack',
        passProps: {
          pack_code: pack.code,
          baseQuery,
        },
        options: {
          topBar: {
            title: {
              text: pack.name,
            },
            backButton: {
              title: t`Back`,
            },
          },
        },
      },
    });
  };

  _onCheckPress = () => {
    const {
      pack,
      checked,
      setChecked,
    } = this.props;
    const value = !checked;
    setChecked && setChecked(pack.code, value);
  };

  render() {
    const {
      pack,
      checked,
      setChecked,
      whiteBackground,
      compact,
      nameOverride,
    } = this.props;

    const backgroundColor = whiteBackground ? '#FFFFFF' : '#f0f0f0';
    const textColor = '#222222';
    const fontSize = (compact) ? 16 : 22;
    const rowHeight = 60;
    return (
      <View style={[styles.row,
        { backgroundColor, height: rowHeight },
        compact ? { height: 40 } : styles.bottomBorder,
      ]}>
        <TouchableOpacity style={styles.touchable} onPress={this._onPress}>
          <View style={styles.touchableContent}>
            <Text
              style={[styles.title, { color: textColor, fontSize }]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              { nameOverride || pack.name }
            </Text>
          </View>
        </TouchableOpacity>
        { !!setChecked && (
          <View style={[styles.checkbox, { height: rowHeight }]}>
            <Switch
              value={checked}
              onValueChange={this._onCheckPress}
            />
          </View>
        ) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomBorder: {
    borderBottomWidth: 1,

  },
  touchable: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  touchableContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    marginLeft: 8,
    fontSize: 20,
    fontFamily: 'System',
    flex: 1,
  },
  checkbox: {
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
