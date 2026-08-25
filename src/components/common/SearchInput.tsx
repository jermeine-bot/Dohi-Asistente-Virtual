import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../../theme';

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  containerStyle?: ViewStyle;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Buscar médicos, especialidades, centros...',
  onClear,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Feather name="search" size={18} color={colors.gray400} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray400}
        style={styles.input}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            onChangeText('');
            onClear?.();
          }}
          style={styles.clearButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="x-circle" size={16} color={colors.gray400} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    height: 46,
    width: '100%',
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.sizes.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: spacing.xs,
  },
});
