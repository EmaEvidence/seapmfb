import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = (label: string, value: string) => {
  return AsyncStorage.setItem(label, value);
};

export const loadItem = async (label: string) => {
  const item = await AsyncStorage.getItem(label);
  return item;
};

export const removeItem = (label: string) => {
  return AsyncStorage.removeItem(label);
};
