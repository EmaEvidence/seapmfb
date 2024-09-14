import {Dimensions, StyleSheet} from 'react-native';
import { colors, fontSizes } from './utils/theme';

export const generalStyles = StyleSheet.create({
    blueText: {
        color: colors.sMainBlue
    },
    leftText: {
        textAlign: 'left'
    },
    rightText: {
        textAlign: 'right'
    },
    halfBtn: {
        width: '48%'
    },
    transparentBtn: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.sMainBlue
    },
    transparentBtnLabel: {
        color: colors.sMainBlue
    },
});

export default generalStyles;
