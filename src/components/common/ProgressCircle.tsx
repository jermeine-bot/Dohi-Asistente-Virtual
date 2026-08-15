import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, typography } from '../../theme';
import { AppText } from './AppText';

export interface ProgressCircleProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  centerText?: string;
  centerSubtext?: string;
  style?: ViewStyle;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  size = 110,
  strokeWidth = 10,
  progressColor = colors.primary,
  backgroundColor = colors.lightBlue,
  showPercentage = true,
  centerText,
  centerSubtext,
  style,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Background track circle */}
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress active circle */}
        <Circle
          stroke={progressColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.contentContainer}>
        {showPercentage && !centerText && (
          <AppText variant="xl" weight="bold" color={colors.primary}>
            {Math.round(clampedProgress)}%
          </AppText>
        )}
        {centerText && (
          <AppText variant="lg" weight="bold" color={colors.navy}>
            {centerText}
          </AppText>
        )}
        {centerSubtext && (
          <AppText variant="xs" color={colors.textMuted}>
            {centerSubtext}
          </AppText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
