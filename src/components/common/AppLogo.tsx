import React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';

export interface AppLogoProps {
  size?: number;
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
  source?: any;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 48,
  width,
  height,
  style,
  source,
}) => {
  const imgSource = source ?? require('../../../assets/images/logo.png');
  const targetWidth = width ?? size;
  const targetHeight = height ?? size;

  return (
    <Image
      source={imgSource}
      style={[
        styles.logo,
        { width: targetWidth, height: targetHeight },
        style,
      ]}
      resizeMode="contain"
      accessibilityLabel="DOHI Logo"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
  },
});

export default AppLogo;
