import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ViewProps,
} from 'react-native';
import {colors, fontSizes} from '../utils/theme';
import {Paragraph} from './Text';
import DebitIcon from '../assets/images/debit.png';
import CreditIcon from '../assets/images/credit.png';
import {formatAmount} from '../utils/formatAmount';
import {ITransaction} from '../types';
import dayjs from 'dayjs';

interface CardsProps {
  overrideStyle?: ViewProps;
  selected?: boolean;
  type?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  data: {
    icon: string;
    title: string;
    subTitle: string;
  };
}

interface TransactionCardsProps {
  overrideStyle?: ViewProps;
  selected?: boolean;
  type?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  transaction: ITransaction;
}

export const Card = ({
  overrideStyle,
  selected,
  type,
  children,
  onPress,
  data,
}: CardsProps) => {
  const withChildrenStyle = {
    height: children ? 200 : 58,
  };



  return (
    <View style={[styles.card, withChildrenStyle, overrideStyle]}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <Paragraph
              overrideStyle={styles.text}
              text={data.icon || '#20000'}
            />
          </View>
          <View style={styles.textWrapper}>
            <Paragraph
              numberOfLines={2}
              ellipsizeMode="tail"
              overrideStyle={styles.title}
              text={data.title || 'Recharge Card'}
            />
            <Paragraph
              overrideStyle={styles.subTitle}
              text={data.subTitle || 'today'}
            />
          </View>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.moreBtn}>
          <Image
            source={
              type?.toLocaleLowerCase() === 'credit' ? CreditIcon : DebitIcon
            }
            style={styles.type}
          />
        </TouchableOpacity>
      </View>
      {children && selected ? (
        <View style={styles.childrenWrapper}>{children}</View>
      ) : null}
    </View>
  );
};

export const TransactionCard = ({
  overrideStyle,
  selected,
  type,
  children,
  onPress,
  transaction,
}: TransactionCardsProps): JSX.Element => {
  console.log(transaction.date, '=-=-=-date=-=-')
  const data = {
    icon: `${formatAmount(parseInt(transaction?.amount.toString(), 10))}`,
    title: transaction?.title,
    subTitle: dayjs(transaction.date).fromNow(),
  };
  return (
    <Card
      data={data}
      overrideStyle={overrideStyle}
      onPress={onPress}
      type={type}
      selected={selected}>
      {children ? children : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 10,
    height: 58,
    marginBottom: '5%',
    marginRight: '2%',
    backgroundColor: colors.sLightBlue,
    padding: 10,
    paddingHorizontal: 14,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 38,
  },
  headerLeft: {
    flexDirection: 'row',
    width: '80%',
  },
  headerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.sMainBlue,
    borderRadius: 5,
    minWidth: 38,
    marginRight: 10,
    paddingHorizontal: 5,
  },
  title: {
    maxWidth: '100%',
    height: '80%',
    fontFamily: 'Trebuchet MS',
  },
  subTitle: {
    fontSize: fontSizes.bodyText,
    fontFamily: 'Trebuchet MS',
  },
  textWrapper: {
    width: '75%',
    height: '58%',
  },
  childrenWrapper: {
    height: 140,
  },
  moreBtn: {
    backgroundColor: colors.sYellow,
    width: 20,
    height: 20,
    borderRadius: 5,
  },
  text: {
    color: colors.twhite,
    fontWeight: '600',
    fontFamily: 'Trebuchet MS',
  },
  type: {
    width: 20,
    height: 20,
  },
});
