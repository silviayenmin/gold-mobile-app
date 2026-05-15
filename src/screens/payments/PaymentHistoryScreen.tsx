import React, { useState, useMemo } from 'react';
import { View, FlatList, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { COLORS } from '../../constants/colors';
import { ChevronLeft, Filter } from 'lucide-react-native';
import { MOCK_PAYMENTS } from '../../constants/mockData';
import { useNavigation } from '@react-navigation/native';
import TransactionCard from '../../components/cards/TransactionCard';
import SearchBar from '../../components/common/SearchBar';
import EmptyState from '../../components/common/EmptyState';
import SummaryCard from '../../components/cards/SummaryCard';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const PaymentHistoryScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const filters = ['All', 'Paid', 'Pending', 'Failed'];

  const filteredTransactions = useMemo(() => {
    return MOCK_PAYMENTS.filter(item => {
      const matchesSearch = item.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilter === 'All' || item.status === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  const totalPaid = useMemo(() => {
    return MOCK_PAYMENTS
      .filter(p => p.status === 'Paid')
      .reduce((sum, p) => sum + p.amount, 0);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

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
          <Text variant="h2" weight="bold">History</Text>
        </View>
        <TouchableOpacity className="bg-dark-card p-2 rounded-full border border-border">
          <Filter size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <TransactionCard transaction={item} index={index} />}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
        }
        ListHeaderComponent={
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <View className="mb-8">
              <SummaryCard 
                title="Total Savings" 
                amount={totalPaid} 
                subtitle="Total amount paid across all schemes"
              />
            </View>

            <View className="mb-6">
              <SearchBar 
                value={searchQuery} 
                onChangeText={setSearchQuery} 
                placeholder="Search by ID or Scheme"
              />
            </View>

            <View className="flex-row mb-6">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-grow-0">
                {filters.map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    onPress={() => setSelectedFilter(filter)}
                    className={`px-6 py-2.5 rounded-full mr-3 border ${
                      selectedFilter === filter 
                        ? 'bg-primary border-primary' 
                        : 'bg-dark-card border-border'
                    }`}
                  >
                    <Text 
                      variant="small" 
                      weight="bold" 
                      color={selectedFilter === filter ? COLORS.white : COLORS.textMuted}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View className="mb-4">
              <Text variant="small" weight="bold" color={COLORS.textMuted} style={{ letterSpacing: 1 }}>
                RECENT TRANSACTIONS
              </Text>
            </View>
          </Animated.View>
        }
        ListEmptyComponent={
          <EmptyState 
            title="No Transactions Found" 
            message="We couldn't find any transactions matching your search or filters." 
          />
        }
      />
    </SafeAreaView>
  );
};

export default PaymentHistoryScreen;