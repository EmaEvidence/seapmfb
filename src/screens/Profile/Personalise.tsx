import React, {useEffect, useState} from 'react';
import {Switch, View} from 'react-native';
import {Paragraph} from '../../common/Text';
import {CustomPicker, Header} from '../../common';
import styles from './Profile.styles';
import {colors} from '../../utils/theme';
import {langType} from '../../app/slices/language';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {updateLanguage} from '../../app/actions/language';
// import useLanguage from '../../hooks/useLanguage';
import {loadItem, saveItem} from '../../utils/localStorage';
export const langObj: Record<string, langType> = {
  English: 'en',
  Yoruba: 'yr',
  Hausa: 'hu',
  Igbo: 'ig',
};

const langObj2: Record<string, string> = {
  en: 'English',
  yr: 'Yoruba',
  hu: 'Hausa',
  ig: 'Igbo',
};

export const Personalize = ({navigation}: any) => {
  const selectedLang = useAppSelector(state => state.lang.selectedLang);
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState<
    Record<string, boolean | string>
  >({
    'General Notification': true,
    Sound: false,
    Vibration: false,
    'App Updates': false,
    'Font Family': 'Trebuchet MS',
    'Font Size': 'Default',
    Transactions: false,
    'New Services': false,
    Loans: false,
    'Change Language': 'English',
  });
  const personaliseTypes = [
    // {title: 'Dark mode'},
    // {
    //   title: 'Font Size',
    //   options: ['Smaller', 'Default', 'Bigger'],
    //   onChange: (value: string) => {
    //     saveItem('fontSize', value);
    //     RNRestart.restart();
    //     setNotifications(b => ({
    //       ...b,
    //       'Font Size': value,
    //     }));
    //   },
    // },
    // {
    //   title: 'Font Family',
    //   options: ['Trebuchet MS', 'Poppins', 'Lato', 'Rubik'],
    //   onChange: (value: string) => {
    //     saveItem('fontFamily', value);
    //     RNRestart.restart();
    //     setNotifications(b => ({
    //       ...b,
    //       'Font Family': value,
    //     }));
    //   },
    // },
    // {title: 'Font Theme', options: ['Blue', 'Yellow', 'Mix']},
    {
      title: 'Change Language',
      options: [
        '',
        'English',
        'Yoruba',
        // 'Hausa', 'Igbo'
      ],
      onChange: (value: string) => {
        saveItem('lang', langObj[value]);
        updateLanguage(langObj[value], dispatch);
      },
    },
  ];
  // const lang = useLanguage();

  useEffect(() => {
    const getFontStyle = async () => {
      const fontSize = await loadItem('fontSize');
      const fontFamily = await loadItem('fontFamily');
      setNotifications(b => ({
        ...b,
        'Font Family': fontFamily || 'Trebuchet MS',
        'Font Size': fontSize || 'Default',
      }));
    };
    getFontStyle();
  }, []);

  const handleSetNotifcation = (notType: string) => {
    setNotifications(prevState => ({
      ...prevState,
      [notType]: !notifications[notType],
    }));
  };

  useEffect(() => {
    setNotifications(prevState => ({
      ...prevState,
      'Change Language': langObj2[selectedLang],
    }));
  }, [selectedLang]);

  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.navigate('Profile')}
        showBackBtn
        title={'Personalise App'}
        navigation={navigation}
      />
      <View style={styles.content}>
        <View style={styles.notifications}>
          {personaliseTypes.map(item => (
            <View key={item.title} style={styles.notificationWrapper}>
              {!item.options ? (
                <Switch
                  trackColor={{
                    false: colors.tlightgrey,
                    true: colors.sMainBlue,
                  }}
                  thumbColor={
                    notifications[item.title] ? colors.sYellow : colors.twhite
                  }
                  ios_backgroundColor={colors.tlightgrey}
                  onValueChange={() => handleSetNotifcation(item.title)}
                  value={notifications[item.title] as boolean}
                />
              ) : (
                <CustomPicker
                  label={''}
                  subLabel={''}
                  data={item.options || []}
                  value={(notifications[item.title] as string) || ''}
                  onChange={(_name: string, _text: string) => {
                    item.onChange ? item.onChange(_text) : null;
                  }}
                  name={''}
                  inValid={false}
                  error={''}
                  overrideStyle={styles.pickerWrapper}
                  overridePickerStyle={styles.pickerStyle}
                  pickerItemStyle={styles.pickerItem}
                />
              )}
              <Paragraph
                text={item.title}
                overrideStyle={styles.notificationLabel}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Personalize;
