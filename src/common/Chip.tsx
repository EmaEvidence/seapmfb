import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextStyle,
  ViewStyle,
  FlatList,
} from 'react-native';
import {Paragraph} from './Text';
import {colors} from '../utils/theme';

interface Props {
  chips: Array<string>;
  onPress: (chip: string) => void;
  overrideContainerStyle?: ViewStyle;
  overrideWrapperStyle?: ViewStyle;
  overrideChipStyle?: ViewStyle;
  overrideChipTextStyle?: TextStyle;
  selected: string;
}

export const Expenses = ({
  chips,
  onPress,
  overrideContainerStyle,
  overrideWrapperStyle,
  overrideChipStyle,
  overrideChipTextStyle,
  selected,
}: Props) => {
  if (!chips || !chips.length) {
    return null;
  }
  return (
    <View style={[styles.durationChipWrapper, overrideWrapperStyle]}>
      <FlatList
        data={chips}
        contentContainerStyle={[styles.scrollContainer, overrideContainerStyle]}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              key={item}
              style={[
                // styles.chip,
                item === selected ? styles.chip : styles.selectedChip,
                overrideChipStyle,
              ]}
              onPress={() => {
                onPress(item);
              }}>
              <Paragraph text={item} overrideStyle={overrideChipTextStyle} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  durationChipWrapper: {
    height: 50,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  selectedChip: {
    paddingHorizontal: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: colors.tfaintgrey,
    height: 35,
  },
  chip: {
    paddingHorizontal: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: colors.tgrey,
    height: 35,
  },
});
