import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Switch, View, Image} from 'react-native';
import {Paragraph} from './Text';
import {colors} from '../utils/theme';
import {Button} from '.';
import Delete from '../assets/images/delete.png';

interface Props {
  source: string;
  quote: string;
  isActive: boolean;
  id: string;
  handleQuoteDelete: (id: string) => void;
  handleQuoteActivity: (id: string, val: boolean) => void;
}

export const Quote = ({
  quote,
  id,
  source,
  isActive,
  handleQuoteActivity,
  handleQuoteDelete,
}: Props) => {
  const [internalIsActive, setIsActive] = useState(false);
  const handleActivityChange = (val: boolean) => {
    setIsActive(val);
    handleQuoteActivity(id, val);
  };

  useEffect(() => {
    setIsActive(isActive);
  }, [isActive]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.quoteWrapper}>
        <Paragraph text={quote} />
      </View>
      <View style={styles.btnWrapper}>
        <Paragraph text={source} />
        <View style={styles.atnWrapper}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={internalIsActive ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => {
              handleActivityChange(value);
            }}
            value={internalIsActive}
          />
          <Button
            label="Delete"
            onPress={() => handleQuoteDelete(id)}
            overrideStyle={styles.btn}
            renderContent={() => <Image source={Delete} />}
          />
        </View>
      </View>
    </View>
  );
};

export default Quote;

const styles = StyleSheet.create({
  wrapper: {
    height: 150,
    width: Dimensions.get('screen').width * 0.9,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: colors.tlightgrey,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  atnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: colors.tgrey,
    borderRadius: 10,
    marginLeft: 10,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    width: 35,
    height: 35,
  },
  quoteWrapper: {
    width: '100%',
    height: '70%',
    justifyContent: 'space-between',
  },
  btnWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 35,
    width: '100%',
  },
});
