import Toast from 'react-native-toast-message';

const toaster = (text1: string, text2: string, type = 'success') => {
  return Toast.show({
    type,
    text1,
    text2,
  });
};

export default toaster;
