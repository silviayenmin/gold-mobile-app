import React from 'react';
import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { Input } from '../../components/common/Input';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { Search, Filter, Info, ChevronRight } from 'lucide-react-native';
import { MOCK_AVAILABLE_SCHEMES } from '../../constants/mockData';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants/routes';
import { LinearGradient } from 'expo-linear-gradient';

const SchemeListingScreen = () => {
  const navigation = useNavigation<any>();

  const renderSchemeItem = ({ item }: { item: typeof MOCK_AVAILABLE_SCHEMES[0], index: number }) => (
    <View className="mb-4">
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate(ROUTES.SCHEME_DETAILS, { schemeId: item.id })}
        className="bg-dark-card border border-border rounded-2xl overflow-hidden"
      >
        <View className="p-5">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text variant="h3" weight="bold">{item.title}</Text>
              <View className="bg-primary/10 self-start px-2 py-1 rounded-md mt-2">
                <Text variant="small" color={COLORS.primary} weight="bold">{item.bonus}</Text>
              </View>
            </View>
            <Info size={20} color={COLORS.textMuted} />
          </View>

          <View className="flex-row mt-6 pt-4 border-t border-border justify-between">
            <View>
              <Text variant="small" color={COLORS.textMuted}>Monthly</Text>
              <Text variant="body" weight="bold">₹{item.monthlyAmount.toLocaleString()}</Text>
            </View>
            <View>
              <Text variant="small" color={COLORS.textMuted}>Duration</Text>
              <Text variant="body" weight="bold">{item.duration} Months</Text>
            </View>
            <TouchableOpacity 
              onPress={() => navigation.navigate(ROUTES.JOIN_SCHEME, { schemeId: item.id })}
              className="bg-primary px-4 py-2 rounded-xl justify-center"
            >
              <Text variant="small" weight="bold" color={COLORS.white}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <View className="px-6 py-4">
        <Text variant="h2" weight="bold">Gold Schemes</Text>
        <Text variant="body" color={COLORS.textMuted} className="mt-1">Choose the best plan for your savings</Text>
      </View>

      <View className="px-6 flex-row items-center space-x-3 mb-2">
        <View className="flex-1">
          <Input 
            placeholder="Search schemes..." 
            icon={<Search size={20} color={COLORS.textMuted} />}
          />
        </View>
        <TouchableOpacity className="bg-dark-card p-3 rounded-xl border border-border mb-4">
          <Filter size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_AVAILABLE_SCHEMES}
        keyExtractor={(item) => item.id}
        renderItem={renderSchemeItem}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SchemeListingScreen;