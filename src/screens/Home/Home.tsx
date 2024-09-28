import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {ScrollView} from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Button, TransactionCard, Header, Loader} from '../../common';
import {Paragraph} from '../../common/Text';
import {categories} from '../../store';
import styles from './Home.styles';
import TransferIcon from '../../assets/images/transfer.png';
import MenuIcon from '../../assets/images/accountIcon.png';
import ShowIcon from '../../assets/images/show.png';
import HideIcon from '../../assets/images/hide.png';
import AcctMore from '../../assets/images/acctmore.png';
import RequestIcon from '../../assets/images/request.png';
import useLanguage from '../../hooks/useLanguage';
import {useAppSelector} from '../../app/hooks';
import {
  getAccounts,
  getDebits,
  getHistory,
  getSummary,
} from '../../app/actions/account';
// import {getDate} from '../../utils/constants';
import {INavigation} from '../../types';
import {advertContents} from '../../utils/constants';
import { formatAmount } from '../../utils/formatAmount';
import { useFocusEffect } from '@react-navigation/native';

dayjs.extend(relativeTime);

export const Home = ({navigation}: {navigation: any}) => {
  const {lang} = useLanguage();
  const [contentIndex, setIndex] = useState(0);
  const {summary, history, accounts, debits} = useAppSelector(
    state => state.account,
  );
  // @ts-ignore
  const {user} = useAppSelector(state => state.auth);
  // @ts-ignore
  const {Name} = user && JSON.parse(user);

  const handleScrollIndex = (offset: number) => {
    const pageWidth = Dimensions.get('screen').width;
    return Math.round(offset / pageWidth);
  };

  const handleOnScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent> | null) => {
      let ind = 0;
      if (event) {
        ind = handleScrollIndex(event.nativeEvent.contentOffset.x);
      }
      const acc = summary && summary[ind].accountNumber;
      // @ts-ignore
      setIndex(acc);
    },
    [summary],
  );

  useEffect(() => {
    handleOnScroll(null);
  }, [handleOnScroll]);

  useEffect(() => {
    if (!summary) {
      getSummary();
    }
    if (!accounts) {
      getAccounts();
    }
    if (!debits) {
      const today = dayjs();
      const end = today.subtract(7, 'day');
      getDebits({
        startDate: today.toISOString(),
        endDate: end.toISOString(),
      });
    }
    if (summary) {
      // @ts-ignore
      setIndex(summary[0].accountNumber);
    }
  }, [summary, accounts, debits]);

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        getSummary(false);
        contentIndex && getHistory(contentIndex, '', '', false);
      }, 180000)

      // Return a cleanup function (optional)
      return () => {
        clearInterval(interval);
      };
    }, [])
  );

  useEffect(() => {
    if (
      contentIndex &&
      (!history[contentIndex] || history[contentIndex]?.length === 0)
    ) {
      getHistory(contentIndex);
    }
  }, [history, contentIndex]);
  // @ts-ignore
  const accountSummary = summary || [];
  const selectedHistory = history[contentIndex];

  if (!summary && !accounts) {
    return <Loader showLoader />
  }

  return (
    <View style={styles.wrapper}>
      <Header
        title={`${lang.hello} ${Name.split(' ')[0]}`}
        navigation={navigation}
        renderLeftIcon={() => {
          return (
            <TouchableOpacity
              style={styles.menu}
              onPress={() => navigation.navigate('Settings')}>
              <Image style={styles.menuIcon} source={MenuIcon} />
            </TouchableOpacity>
          );
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.subheader} />
          <ScrollView
            horizontal
            scrollEventThrottle={0}
            decelerationRate="fast"
            snapToOffsets={categories.map(
              (x, i) => i * (Dimensions.get('screen').width * 0.7 + 15),
            )}
            pagingEnabled={true}
            snapToAlignment="start"
            contentContainerStyle={{
              width: `${90 * advertContents.length}%`,
            }}
            showsHorizontalScrollIndicator={false}>
            {advertContents.map(item => (
              <AdvertCard item={item} key={item.text} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.section}>
          {accountSummary && (
            <ScrollView
              onScroll={handleOnScroll}
              horizontal
              scrollEventThrottle={0}
              decelerationRate="fast"
              contentContainerStyle={{
                width: `${96.5 * accountSummary.length || 1}%`,
              }}
              // @ts-ignore
              snapToOffsets={accountSummary?.map(
                (_: any, i: number) =>
                  i * (Dimensions.get('screen').width * 0.87 + 10),
              )}
              pagingEnabled={true}
              snapToAlignment="start"
              showsHorizontalScrollIndicator={false}>
              {/* @ts-ignore */}
              {accountSummary.map((item: any, index: number) => (
                <DetailsCard
                  key={index.toString()}
                  summary={item}
                  navigation={navigation}
                />
              ))}
            </ScrollView>
          )}
        </View>
        <View style={styles.section}>
          <View style={styles.subheader}>
            <Paragraph
              text={lang.transactions}
              overrideStyle={styles.subheaderText}
            />
            <Button
              label={lang.viewAll}
              onPress={() => {
                navigation.navigate('Transactions', {isSheduled: true});
              }}
              overrideStyle={styles.actionBtn}
              overrideLabelStyle={styles.actionText}
            />
          </View>
          <View>
            {!selectedHistory || selectedHistory?.length === 0 ? (
              <Paragraph
                text={lang.noTransactions}
                overrideStyle={styles.noTransaction}
              />
            ) : (
              selectedHistory &&
              selectedHistory?.slice(0, 4).map((item: any, index: number) => (
                <TransactionCard
                  key={`${item.id} - ${index}`}
                  onPress={() =>
                    navigation.navigate('Transaction', {transaction: item})
                  }
                  // @ts-ignore
                  transaction={{
                    id: item.id,
                    title: item.narration,
                    date: item.transactionDate,
                    amount: parseFloat(item.amount),
                  }}
                  type={item.recordType}
                />
              ))
            )}
          </View>
        </View>
        {debits && debits.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.subheader}>
              <Paragraph
                text={`${lang.debit}`}
                overrideStyle={styles.subheaderText}
              />
              <Button
                label={lang.viewAll}
                onPress={() => {
                  navigation.navigate('Debits', {isSheduled: true});
                }}
                overrideStyle={styles.actionBtn}
                overrideLabelStyle={styles.actionText}
              />
            </View>
            <View>
              {!selectedHistory || selectedHistory?.length === 0 ? (
                <Paragraph
                  text={lang.noTransactions}
                  overrideStyle={styles.noTransaction}
                />
              ) : (
                selectedHistory.slice(0, 4).map((item: any, index: number) => (
                  <TransactionCard
                    key={`${item.id} - ${index}`}
                    onPress={() =>
                      navigation.navigate('Transaction', {transaction: item})
                    }
                    // @ts-ignore
                    transaction={{
                      id: item.id,
                      title: item.narration,
                      date: item.transactionDate,
                      amount: parseFloat(item.amount),
                    }}
                    type={item.recordType}
                  />
                ))
              )}
            </View>
          </View>
        ) : null}
        {/* <View style={styles.section}>
          <View style={styles.subheader}>
            <Paragraph
              text={lang.financialArticles}
              overrideStyle={styles.subheaderText}
            />
          </View>
          <ScrollView
            horizontal
            scrollEventThrottle={0}
            decelerationRate="fast"
            snapToOffsets={categories.map(
              (x, i) => i * (Dimensions.get('screen').width * 0.3 + 20),
            )}
            pagingEnabled={true}
            snapToAlignment="start"
            contentContainerStyle={{
              width: `${100 * durationCategories.length}%`,
            }}
            showsHorizontalScrollIndicator={false}>
            {durationCategories.map(item => (
              <View style={styles.articleCard} key={item}>
                <View style={styles.articleCardTitle}>
                  <Paragraph
                    text={`${item}`}
                    overrideStyle={styles.limitLabel}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View> */}
        <View style={styles.nuggetWrapper}>
          <Paragraph
            overrideStyle={styles.nugget}
            text={
              "Everyday is a bank account, and time is our currency. No one is rich, no one is poor, we've got 24 hours each."
            }
          />
          <Paragraph
            overrideStyle={styles.nuggetSource}
            text={'Christopher Rice'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const DetailsCard = ({
  summary,
  navigation,
}: {
  summary: Record<string, any>;
  navigation: INavigation;
}) => {
  const {lang} = useLanguage();
  const [showDetail, setShowDetails] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.account}>{summary.accountNumber}</Text>
      </View>
      <View style={styles.cardMiddle}>
        <Text style={styles.balanceLabel}>{lang.yourBalance}</Text>
        <Text style={styles.balance}>
          {showDetail ? `₦ ${formatAmount(summary.withdrawableAmount)}` : '*** **** ****'}
        </Text>
      </View>
      <View style={styles.cardBottom}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Transfer')}
          style={styles.cardAction}>
          <View style={styles.imgWrapper}>
            <Image
              style={styles.actionImg}
              resizeMode="contain"
              source={TransferIcon}
            />
          </View>
          <Text style={styles.actionCardText}>{lang.transfer}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AccountRequests')}
          style={styles.cardAction}>
          <View style={styles.imgWrapper}>
            <Image
              style={styles.actionImg}
              resizeMode="contain"
              source={RequestIcon}
            />
          </View>
          <Text style={styles.actionCardText}>{lang.requests}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Transactions')}
          // onPress={() => navigation.navigate('AccountOthers')}
          style={styles.cardAction}>
          <View style={styles.imgWrapper}>
            <Image
              style={styles.actionImg}
              resizeMode="contain"
              source={AcctMore}
            />
          </View>
          {/* <Text style={styles.actionCardText}>{lang.others}</Text> */}
          <Text style={styles.actionCardText}>{'History'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => setShowDetails(!showDetail)}
        style={styles.hideBtn}>
        <Image source={showDetail ? HideIcon : ShowIcon} />
      </TouchableOpacity>
    </View>
  );
};

const AdvertCard = ({item}: {item: {img: any; text: string}}) => {
  return (
    <View style={styles.advertCard} key={item.text}>
      <View style={styles.advertImgWrapper}>
        <Image source={item.img} style={styles.advertImg} />
      </View>
      <View style={styles.advertTextWrapper}>
        <Paragraph text={item.text} overrideStyle={styles.advertText} />
      </View>
    </View>
  );
};
