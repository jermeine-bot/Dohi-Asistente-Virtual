import React from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle, ImageStyle } from 'react-native';

export type DohiPose = 'happy' | 'talking' | 'doctor' | 'thinking' | 'waving';
export type DohiSize = 'sm' | 'md' | 'lg' | 'xl';
export type DohiVariant = 'avatar' | 'hero' | 'home' | 'welcome';

export interface DohiCharacterProps {
  pose?: DohiPose;
  size?: DohiSize | number;
  variant?: DohiVariant;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  source?: any;
}

export const DohiCharacter: React.FC<DohiCharacterProps> = ({
  pose = 'happy',
  size = 'md',
  variant = 'avatar',
  style,
  imageStyle,
  source,
}) => {
  let dimension = 120;
  if (typeof size === 'number') {
    dimension = size;
  } else {
    switch (size) {
      case 'sm':
        dimension = 48;
        break;
      case 'lg':
        dimension = 160;
        break;
      case 'xl':
        dimension = 220;
        break;
      case 'md':
      default:
        dimension = 120;
        break;
    }
  }

  // Choose the PNG image based on variant or custom source
  const isHero = variant === 'hero' || variant === 'home' || variant === 'welcome';
  const defaultImage = isHero
    ? require('../../../assets/images/dohi-home.png')
    : require('../../../assets/images/dohi-avatar.png');

  const imgSource = source ?? defaultImage;

  return (
    <View style={[styles.container, { width: dimension, height: dimension }, style]}>
      <Image
        source={imgSource}
        style={[
          styles.image,
          { width: dimension, height: dimension },
          imageStyle,
        ]}
        resizeMode="contain"
        accessibilityLabel={`Asistente Dohi (${pose})`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
});

export default DohiCharacter;
