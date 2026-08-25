import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from '../common/AppText';

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const getTabIcon = (routeName: string, isFocused: boolean) => {
    const iconColor = isFocused ? colors.primary : colors.gray400;
    const size = 22;

    switch (routeName) {
      case 'index':
      case 'home':
        return <Feather name="home" size={size} color={iconColor} />;
      case 'appointments':
        return <Feather name="calendar" size={size} color={iconColor} />;
      case 'health':
        return <Feather name="heart" size={size} color={iconColor} />;
      case 'dohi':
        return <MaterialCommunityIcons name="robot-happy-outline" size={size + 2} color={iconColor} />;
      case 'profile':
        return <Feather name="user" size={size} color={iconColor} />;
      default:
        return <Feather name="circle" size={size} color={iconColor} />;
    }
  };

  const getTabLabel = (routeName: string) => {
    switch (routeName) {
      case 'index':
      case 'home':
        return 'Home';
      case 'appointments':
        return 'Citas';
      case 'health':
        return 'Salud';
      case 'dohi':
        return 'Dohi';
      case 'profile':
        return 'Perfil';
      default:
        return routeName;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const routeName = route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <View style={[styles.iconWrapper, isFocused && styles.iconWrapperActive]}>
                {getTabIcon(routeName, isFocused)}
              </View>
              <AppText
                variant="xs"
                weight={isFocused ? 'semiBold' : 'regular'}
                color={isFocused ? colors.primary : colors.gray400}
                style={styles.tabLabel}
              >
                {getTabLabel(routeName)}
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
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    ...shadows.lg,
  },
  tabBar: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 84 : 64,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
    backgroundColor: colors.white,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    transform: [{ scale: 1.05 }],
  },
  tabLabel: {
    marginTop: 2,
    fontSize: 11,
  },
});
