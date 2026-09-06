import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Svg, {
  Path,
  Circle,
  Line,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

import {
  colors,
  radius,
  spacing,
  shadows,
} from '../../theme';

import { AppText } from '../common/AppText';
import { WeightRecord } from '../../types/Weight';

export interface WeightChartProps {
  history: WeightRecord[];
  targetWeight?: number;
}

export const WeightChart: React.FC<WeightChartProps> = ({
  history,
  targetWeight,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(
    Math.max(history.length - 1, 0)
  );

  useEffect(() => {
    if (history.length > 0) {
      setSelectedIndex(history.length - 1);
    }
  }, [history.length]);

  if (history.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <AppText
          variant="sm"
          weight="semiBold"
          color={colors.navy}
          align="center"
        >
          Aún no tienes registros de peso
        </AppText>

        <AppText
          variant="xs"
          color={colors.textSecondary}
          align="center"
          style={styles.emptySubtitle}
        >
          Calcula tu IMC y guarda tu primera medición
          para comenzar a ver tu evolución.
        </AppText>
      </View>
    );
  }

  const selectedItem =
    history[selectedIndex] || history[history.length - 1];

  const chartWidth = Math.min(
    Dimensions.get('window').width - 64,
    340
  );

  const chartHeight = 160;

  const paddingHorizontal = 24;
  const paddingVertical = 20;

  const weights = history.map(
    (record) => record.weightKg
  );

  const chartWeights = targetWeight !== undefined
    ? [...weights, targetWeight]
    : weights;

  const minWeight =
    Math.floor(Math.min(...chartWeights) - 1);

  const maxWeight =
    Math.ceil(Math.max(...chartWeights) + 1);

  const weightRange =
    maxWeight - minWeight === 0
      ? 1
      : maxWeight - minWeight;

  const getX = (index: number) => {
    if (history.length === 1) {
      return chartWidth / 2;
    }

    return (
      paddingHorizontal +
      (index / (history.length - 1)) *
        (chartWidth - paddingHorizontal * 2)
    );
  };

  const getY = (weight: number) => {
    const ratio =
      (weight - minWeight) / weightRange;

    return (
      chartHeight -
      paddingVertical -
      ratio *
        (chartHeight - paddingVertical * 2)
    );
  };

  const points = history.map(
    (record, index) =>
      `${getX(index)},${getY(record.weightKg)}`
  );

  const linePath =
    points.length === 1
      ? `M ${points[0]}`
      : `M ${points.join(' L ')}`;

  const areaPath =
    history.length > 1
      ? `${linePath} L ${getX(
          history.length - 1
        )},${chartHeight - paddingVertical} L ${getX(
          0
        )},${chartHeight - paddingVertical} Z`
      : '';

  const targetY =
    targetWeight !== undefined
      ? getY(targetWeight)
      : null;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <AppText
            variant="xs"
            color={colors.textMuted}
          >
            PESO REGISTRADO
          </AppText>

          <View style={styles.weightValueRow}>
            <AppText
              variant="3xl"
              weight="bold"
              color={colors.navy}
            >
              {selectedItem.weightKg.toFixed(1)}
            </AppText>

            <AppText
              variant="sm"
              color={colors.textSecondary}
              style={styles.unitText}
            >
              kg
            </AppText>
          </View>
        </View>

        <View style={styles.badgeCol}>
          <View style={styles.imcBadge}>
            <AppText
              variant="xs"
              weight="semiBold"
              color={colors.primary}
            >
              IMC {selectedItem.imc.toFixed(1)} •{' '}
              {selectedItem.category}
            </AppText>
          </View>

          {targetWeight !== undefined && (
            <AppText
              variant="xs"
              color={colors.textMuted}
              align="right"
              style={styles.targetText}
            >
              Meta: {targetWeight} kg
            </AppText>
          )}
        </View>
      </View>

      <View style={styles.svgContainer}>
        <Svg
          width={chartWidth}
          height={chartHeight}
        >
          <Defs>
            <LinearGradient
              id="chartAreaGrad"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <Stop
                offset="0%"
                stopColor="#167FD1"
                stopOpacity="0.25"
              />

              <Stop
                offset="100%"
                stopColor="#167FD1"
                stopOpacity="0.0"
              />
            </LinearGradient>
          </Defs>


          {targetY !== null && (
            <Line
              x1={paddingHorizontal}
              y1={targetY}
              x2={chartWidth - paddingHorizontal}
              y2={targetY}
              stroke="#10B981"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          )}

          {areaPath !== '' && (
            <Path
              d={areaPath}
              fill="url(#chartAreaGrad)"
            />
          )}

          <Path
            d={linePath}
            stroke={colors.primary}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {history.map((item, index) => {
            const cx = getX(index);
            const cy = getY(item.weightKg);

            const isSelected =
              index === selectedIndex;

            return (
              <Circle
                key={item.id}
                cx={cx}
                cy={cy}
                r={isSelected ? 6 : 4}
                fill={
                  isSelected
                    ? colors.primary
                    : colors.white
                }
                stroke={colors.primary}
                strokeWidth={
                  isSelected ? 3 : 2
                }
              />
            );
          })}
        </Svg>
      </View>

      <View style={styles.datesRow}>
        {history.map((item, index) => {
          const isSelected =
            index === selectedIndex;

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                setSelectedIndex(index)
              }
              style={[
                styles.datePill,
                isSelected &&
                  styles.datePillActive,
              ]}
              activeOpacity={0.7}
            >
              <AppText
                variant="xs"
                weight={
                  isSelected
                    ? 'bold'
                    : 'regular'
                }
                color={
                  isSelected
                    ? colors.primary
                    : colors.textMuted
                }
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

  emptyContainer: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },

  emptySubtitle: {
    marginTop: spacing.xs,
    lineHeight: 18,
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