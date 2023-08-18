import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {colors, flexCol} from '../utils/theme';
import {height, width} from '../utils/constants';
import {useAppSelector} from '../app/hooks';

interface LoaderProps {
  showLoader: boolean;
}

export const Loader = ({}: LoaderProps) => {
  const {isLoading} = useAppSelector(state => state.loader);
  if (!isLoading) {
    return null;
  }
  return (
    <View style={[styles.loader, flexCol.style]}>
      <ActivityIndicator size="large" animating color={colors.tblue} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    width: width,
    height: height,
    backgroundColor: colors.twhite,
    opacity: 0.7,
  },
});
