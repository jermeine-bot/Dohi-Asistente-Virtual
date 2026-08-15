import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from '../common/AppText';
import { WeightRecord } from '../../types/Weight';

export interface WeightChartProps {
  history: WeightRecord[];
  targetWeight?: number;
}

export const WeightChart: React.FC<WeightChartProps> = ({
  history,
  targetWeight = 66.0,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(history.length - 1);
  const selectedItem = history[selectedIndex] || history[history.length - 1];

  const chartWidth = Math.min(Dimensions.get('window').width - 64, 340);
  const chartHeight = 160;
  const paddingHorizontal = 24;
  const paddingVertical = 20;

  const weights = history.map((h) => h.weightKg);
  const minWeight = Math.floor(Math.min(...weights, targetWeight) - 1);
  const maxWeight = Math.ceil(Math.max(...weights) + 1);

  const getX = (index: number) => {
    return (
      paddingHorizontal +
      (index / (history.length - 1)) * (chartWidth - paddingHorizontal * 2)
    );
  };

  const getY = (weight: number) => {
    const ratio = (weight - minWeight) / (maxWeight - minWeight);
    return chartHeight - paddingVertical - ratio * (chartHeight - paddingVertical * 2);
  };

  // Build SVG path
  const points = history.map((h, i) => `${getX(i)},${getY(h.weightKg)}`);
  const linePath = `M ${points.join(' L ')}`;
  const areaPath = `${linePath} L ${getX(history.length - 1)},${chartHeight - paddingVertical} L ${getX(0)},${chartHeight - paddingVertical} Z`;

  const targetY = getY(targetWeight);

  return (
    <View style={styles.container}>
      {/* Header Info */}
      <View style={styles.headerRow}>
        <View>
          <AppText variant="xs" color={colors.textMuted}>
            PESO REGISTRADO ({selectedItem.date})
          </AppText>
          <View style={styles.weightValueRow}>
            <AppText variant="3xl" weight="bold" color={colors.navy}>
              {selectedItem.weightKg.toFixed(1)}
            </AppText>
            <AppText variant="sm" color={colors.textSecondary} style={styles.unitText}>
              kg
            </AppText>
          </View>
        </View>

        <View style={styles.badgeCol}>
          <View style={styles.imcBadge}>
            <AppText variant="xs" weight="semiBold" color={colors.primary}>
              IMC {selectedItem.imc.toFixed(1)} • {selectedItem.category}
            </AppText>
          </View>
          <AppText variant="xs" color={colors.textMuted} align="right" style={styles.targetText}>
            Meta: {targetWeight} kg
          </AppText>
        </View>
      </View>

      {/* SVG Chart */}
      <View style={styles.svgContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          <Defs>
            <LinearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#167FD1" stopOpacity="0.25" />
              <Stop offset="100%" stopColor="#167FD1" stopOpacity="0.0" />
            </LinearGradient>
          </Defs>

          {/* Target Weight Dashed Line */}
          <Line
            x1={paddingHorizontal}
            y1={targetY}
            x2={chartWidth - paddingHorizontal}
            y2={targetY}
            stroke="#10B981"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Area under curve */}
          <Path d={areaPath} fill="url(#chartAreaGrad)" />

          {/* Main trend line */}
          <Path
            d={linePath}
            stroke={colors.primary}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {history.map((item, index) => {
            const cx = getX(index);
            const cy = getY(item.weightKg);
            const isSelected = index === selectedIndex;

            return (
              <Circle
                key={item.id}
                cx={cx}
                cy={cy}
                r={isSelected ? 6 : 4}
                fill={isSelected ? colors.primary : colors.white}
                stroke={colors.primary}
                strokeWidth={isSelected ? 3 : 2}
              />
            );
          })}
        </Svg>
      </View>

      {/* Date selector pills at bottom */}
      <View style={styles.datesRow}>
        {history.map((item, index) => {
          const isSelected = index === selectedIndex;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedIndex(index)}
              style={[styles.datePill, isSelected && styles.datePillActive]}
              activeOpacity={0.7}
            >
              <AppText
                variant="xs"
                weight={isSelected ? 'bold' : 'regular'}
                color={isSelected ? colors.primary : colors.textMuted}
              >
                {item.date}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  weightValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  unitText: {
    marginLeft: 4,
  },
  badgeCol: {
    alignItems: 'flex-end',
  },
  imcBadge: {
    backgroundColor: colors.lightBlue,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginBottom: 2,
  },
  targetText: {
    fontSize: 11,
  },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xs,
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  datePill: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: radius.sm,
  },
  datePillActive: {
    backgroundColor: colors.lightBlue,
  },
});
