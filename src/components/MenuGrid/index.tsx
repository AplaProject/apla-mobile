import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, FlatList, Button } from 'react-native';
import { isEmpty } from 'ramda';
import { Icon, ListItem } from 'react-native-elements';

import RevertHistroyButtonContainer from 'containers/RevertHistroyButtonContainer';
import Item, { MENU_TYPE_GROUP } from './Item';
import { extractIconParams } from '../utils/icon';
import styles from './styles';

const normalizeBoolean = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return false;
  }
};

export interface IMenuProps {
  pageName: string;
  menu: object[];
  columnsCount: number;

  receivePageParams(params: any): void;
  navigateToSubMenu(subMenu: any): void;
}

class MenuGrid extends React.Component<IMenuProps> {
  static defaultProps = {
    columnsCount: 2,
  }

  public render() {
    const { columnsCount } = this.props;

    return (
      <View>
        <Button title={"require password modal"} onPress={this.props.reqPwd} />
        <Button title={"signing contract modal"} onPress={this.props.signContract} />
      </View>
      // <FlatList
      //   style={styles.flatList}
      //   contentContainerStyle={columnsCount === 2 ? styles.container : styles.singleContainer}
      //   numColumns={this.props.columnsCount}
      //   data={this.props.menu}
      //   renderItem={this.renderRow}
      //   keyExtractor={this.key}
      // />
    );
  }

  private key = (item, index) => {
    return `${index}_${item.attr.title}_${item.attr.page}`
  }

  private renderRow = ({
    item,
    index
  }: {
    item: any;
    index: number;
  }): React.ReactElement<any> => {
    return (
      <Item
        onPress={this.handleButtonPress}
        title={item.attr.title}
        icon={item.attr.icon}
        index={index}
        columnsCount={this.props.columnsCount}
      />
    );
  }

  private handleButtonPress = (index: number): void => {
    const item = this.props.menu[index];

    if (!item) {
      return;
    }

    if (item.tag === MENU_TYPE_GROUP) {
      this.props.navigateToSubMenu(item.children);
    } else {
      const params = {
        page: item.attr.page,
        pageparams: item.attr.pageparams
      };

      if (item.vde !== undefined) {
        params.vde = normalizeBoolean(item.vde);
      }

      this.props.receivePageParams(params);
    }
  }
}

export default MenuGrid;
