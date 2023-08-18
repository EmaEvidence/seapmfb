import React from 'react';
import {View} from 'react-native';
import {Button, Header} from '../../common';
// import InputText from '../../common/InputText';
import styles from './Loans.styles';
// import toaster from '../../utils/toaster';
import {Header3, Header4} from '../../common/Text';
import {LoanWrapper} from './Loans';

export const LoanForm = ({navigation}: {navigation: any}) => {
  // const [userData, setData] = useState({
  //   email: '',
  //   amount: '',
  // });

  // const [userError, setError] = useState({
  //   email: false,
  //   amount: false,
  // });

  // const handleTextChange = (label: string, value: string) => {
  //   setData(prevState => ({
  //     ...prevState,
  //     [label]: value,
  //   }));
  // };

  // const handleSubmit = () => {
  //   if (userData.amount && !isNaN(parseInt(userData.amount, 10))) {
  //     toaster(
  //       'Success',
  //       'Your intent has being registered, our staff will reach out to you as soon as possible, You can also visit our branch closest to you.',
  //       'custom',
  //     );
  //     userError.amount &&
  //       setError(prevData => ({
  //         ...prevData,
  //         amount: false,
  //       }));
  //     return;
  //   }
  //   setError(prevData => ({
  //     ...prevData,
  //     amount: true,
  //   }));
  // };
  return (
    <LoanWrapper>
      <View style={styles.wrapper}>
        <Header
          showBackBtn
          overrideGoBack={() => navigation.goBack()}
          title={'Apply for a Loan'}
          navigation={navigation}
        />
        <View style={styles.subwrapper}>
          {/* <InputText
          label="What amount do you want?"
          overrideStyle={styles.textInput}
          name="amount"
          onChange={handleTextChange}
          value={userData.amount}
          errorText="Please an amount!"
          inValid={userError.amount}
          placeholder="e.g 100000"
        />
        <View style={styles.buttonWrapper}>
          <Button
            overrideStyle={styles.button}
            label={'Apply'}
            onPress={handleSubmit}
          />
        </View> */}
          <Header3
            text="Service coming soon..."
            overrideStyle={styles.comingSoon}
          />
          {/* <Header4
            overrideStyle={styles.comingSoon}
            text="You can visit any of our branches to apply in person when apply is clicked for loans."
          /> */}
          <View style={styles.buttonWrapper}>
            <Button
              overrideStyle={styles.button}
              label={'Go Back'}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </View>
    </LoanWrapper>
  );
};

export default LoanForm;
