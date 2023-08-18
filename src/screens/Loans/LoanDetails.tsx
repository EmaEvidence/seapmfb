import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Header3, Paragraph} from '../../common/Text';
import styles from './Loans.styles';
import {Button, Header} from '../../common';
import {useRoute} from '@react-navigation/native';
import {LoanWrapper} from './Loans';

export const LoanDetails = ({navigation}: any) => {
  const [loan, setLoan] = useState<Record<string, any>>({});
  const route = useRoute();

  useEffect(() => {
    // @ts-ignore
    setLoan(route.params?.state.loan);
    // @ts-ignore
  }, [route.params?.state.loan]);

  return (
    <LoanWrapper>
      <View style={styles.wrapper}>
        <Header
          showBackBtn
          title={loan.name}
          navigation={navigation}
          overrideGoBack={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.loanWrapper}>
          <Paragraph
            text={loan.description}
            overrideStyle={styles.description}
          />
          <View style={styles.section}>
            <Header3 text="Requirements" />
            <View>
              {loan?.requirements &&
                loan?.requirements.map((text: string, index: number) => (
                  <Paragraph
                    text={`${(index + 1).toString()}. ${text}`}
                    key={index}
                    overrideStyle={styles.listItem}
                  />
                ))}
            </View>
          </View>
          <View style={styles.section}>
            <Header3 text="Repayment Plan" />
            <View>
              {loan?.repayment &&
                loan?.repayment.map((text: string, index: number) => (
                  <Paragraph
                    text={`${(index + 1).toString()}. ${text}`}
                    key={index}
                    overrideStyle={styles.listItem}
                  />
                ))}
            </View>
          </View>
          <View style={styles.section}>
            <Header3 text="How to Apply" />
            <View>
              {loan?.howToApply &&
                loan?.howToApply.map((text: string, index: number) => (
                  <Paragraph
                    text={`${(index + 1).toString()}. ${text}`}
                    key={index}
                    overrideStyle={styles.listItem}
                  />
                ))}
            </View>
          </View>
        </ScrollView>
        <Button
          label="Apply"
          onPress={function (): void {
            navigation.navigate('LoanForm');
          }}
          overrideStyle={styles.applyBtn}
        />
      </View>
    </LoanWrapper>
  );
};

export default LoanDetails;
