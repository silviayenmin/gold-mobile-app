import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onPressFilter?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search...", 
  value, 
  onChangeText,
  onPressFilter 
}) => {
  return (
    <View className="flex-row items-center">
      <View className="flex-1 bg-dark-card border border-border px-4 py-3 rounded-2xl flex-row items-center shadow-sm">
        <Search size={18} color={COLORS.textMuted} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          className="flex-1 ml-3 text-white font-medium"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {onPressFilter && (
        <TouchableOpacity 
          onPress={onPressFilter}
          className="ml-3 bg-dark-card border border-border p-3.5 rounded-2xl shadow-sm"
        >
          <SlidersHorizontal size={20} color={COLORS.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
