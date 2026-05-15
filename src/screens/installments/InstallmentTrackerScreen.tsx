import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { ChevronLeft, Calendar, CheckCircle2, Clock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { MOCK_ACTIVE_SCHEMES } from '../../constants/mockData';
import { LinearGradient } from 'expo-linear-gradient';

const InstallmentTrackerScreen = () => {
  const navigation = useNavigation<any>();
  const scheme = MOCK_ACTIVE_SCHEMES[0];

  const installments = Array.from({ length: scheme.totalMonths }, (_, i) => ({
    id: i + 1,
    status: i < scheme.monthsPaid ? 'paid' : i === scheme.monthsPaid ? 'pending' : 'future',
    date: `Month ${i + 1}`,
  }));

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <View className="px-6 py-4 flex-row items-center">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="bg-dark-card w-10 h-10 rounded-full items-center justify-center mr-4"
        >
          <ChevronLeft color={COLORS.primary} size={24} />
        </TouchableOpacity>
        <Text variant="h2" weight="bold">Installment Tracker</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="mt-4 bg-dark-card border border-border p-5 rounded-2xl mb-8">
          <Text variant="body" weight="bold" color={COLORS.primary}>{scheme.name}</Text>
          <View className="flex-row justify-between mt-4">
            <View>
              <Text variant="small" color={COLORS.textMuted}>Total Paid</Text>
              <Text variant="h3" weight="bold">₹{scheme.paidAmount.toLocaleString()}</Text>
            </View>
            <View className="items-end">
              <Text variant="small" color={COLORS.textMuted}>Target</Text>
              <Text variant="h3" weight="bold">₹{scheme.totalAmount.toLocaleString()}</Text>
            </View>
          </View>
          <View className="mt-4 h-2 bg-dark rounded-full overflow-hidden">
            <View className="h-full bg-primary" style={{ width: `${(scheme.paidAmount / scheme.totalAmount) * 100}%` }} />
          </View>
        </View>

        <Text variant="h3" weight="bold" className="mb-6">Payment Timeline</Text>

        <View className="mb-10">
          {installments.map((item, index) => (
            <View key={item.id} className="flex-row mb-6">
              <View className="items-center mr-6">
                <View className={`w-10 h-10 rounded-full items-center justify-center z-10 ${
                  item.status === 'paid' ? 'bg-success' : item.status === 'pending' ? 'bg-primary' : 'bg-dark-card border border-border'
                }`}>
                  {item.status === 'paid' ? <CheckCircle2 size={20} color="white" /> : 
                   item.status === 'pending' ? <Clock size={20} color="white" /> : 
                   <Text variant="small" color={COLORS.textMuted}>{item.id}</Text>}
                </View>
                {index < installments.length - 1 && (
                  <View className={`w-[2px] flex-1 mt-2 ${item.status === 'paid' ? 'bg-success/30' : 'bg-border'}`} />
                )}
              </View>
              <View className={`flex-1 p-4 rounded-2xl border ${
                item.status === 'pending' ? 'bg-primary/5 border-primary/30' : 'bg-dark-card border-border'
              }`}>
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text weight="bold" color={item.status === 'future' ? COLORS.textMuted : COLORS.text}>
                      {item.date} Installment
                    </Text>
                    <Text variant="small" color={COLORS.textMuted} className="mt-1">
                      {item.status === 'paid' ? 'Paid on May 05, 2026' : item.status === 'pending' ? 'Due by June 05, 2026' : 'Upcoming'}
                    </Text>
                  </View>
                  <Text weight="bold" color={item.status === 'future' ? COLORS.textMuted : COLORS.text}>₹5,000</Text>
                </View>
                {item.status === 'pending' && (
                  <TouchableOpacity className="mt-4 bg-primary py-2 rounded-lg items-center">
                    <Text variant="small" weight="bold" color={COLORS.white}>Pay Now</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InstallmentTrackerScreen;