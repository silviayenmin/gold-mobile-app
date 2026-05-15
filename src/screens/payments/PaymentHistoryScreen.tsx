import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { COLORS } from '../../constants/colors';
import { ChevronLeft, Download, Filter, Search } from 'lucide-react-native';
import { MOCK_PAYMENTS } from '../../constants/mockData';
import { useNavigation } from '@react-navigation/native';

const PaymentHistoryScreen = () => {
  const navigation = useNavigation<any>();

  const renderTransaction = ({ item }: any) => (
    <View className="bg-dark-card border border-border p-4 rounded-2xl mb-4">
      <View className="flex-row justify-between items-start">
        <View>
          <Text weight="bold">{item.schemeName}</Text>
          <Text variant="small" color={COLORS.textMuted} className="mt-1">{item.date}</Text>
        </View>
        <View className="items-end">
          <Text weight="bold" color={COLORS.primary}>₹{item.amount.toLocaleString()}</Text>
          <View className="bg-success/10 px-2 py-1 rounded-md mt-1">
            <Text variant="small" color={COLORS.success} weight="bold">{item.status}</Text>
          </View>
        </View>
      </View>
      <View className="mt-4 pt-4 border-t border-border flex-row justify-between items-center">
        <Text variant="small" color={COLORS.textMuted}>ID: {item.transactionId}</Text>
        <TouchableOpacity className="flex-row items-center">
          <Download size={14} color={COLORS.primary} />
          <Text variant="small" color={COLORS.primary} weight="semibold" className="ml-1">Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <View className="px-6 py-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="bg-dark-card w-10 h-10 rounded-full items-center justify-center mr-4"
          >
            <ChevronLeft color={COLORS.primary} size={24} />
          </TouchableOpacity>
          <Text variant="h2" weight="bold">Transactions</Text>
        </View>
        <TouchableOpacity className="bg-dark-card p-2 rounded-full border border-border">
          <Filter size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View className="flex-row px-6 mt-4 mb-6">
        <View className="flex-1 bg-dark-card border border-border px-4 py-3 rounded-2xl flex-row items-center">
          <Search size={18} color={COLORS.textMuted} />
          <Text color={COLORS.textMuted} className="ml-3">Search transactions...</Text>
        </View>
      </View>

      <FlatList
        data={MOCK_PAYMENTS}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="mt-20 items-center justify-center">
            <Text color={COLORS.textMuted}>No transactions found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default PaymentHistoryScreen;