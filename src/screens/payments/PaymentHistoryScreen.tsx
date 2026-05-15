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
import { paymentService } from '../../services/payment.service';

const PaymentHistoryScreen = () => {
  const navigation = useNavigation();
  const [payments, setPayments] = useState(MOCK_PAYMENTS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    fetchHistory(searchQuery, selectedFilter);
    
    // Restore entry animations
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
  }, [searchQuery, selectedFilter]);

  const fetchHistory = async (search?: string, status?: string) => {
    try {
      setLoading(true);
      const response = await paymentService.getPaymentHistory(search, status);
      if (response && response.data) {
        setPayments(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  const filters = ['All', 'Paid', 'Pending', 'Failed'];

  const filteredTransactions = useMemo(() => {
    return (payments || []).filter(item => {
      const schemeName = item.schemeName || item.customerScheme?.scheme?.name || '';
      const txId = item.transactionId || '';
      const status = item.status || item.paymentStatus || '';

      const matchesSearch = schemeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           txId.toLowerCase().includes(searchQuery.toLowerCase());
      const rawStatus = (item.status || item.paymentStatus || '').toLowerCase();
      const normalizedStatus = rawStatus === 'success' ? 'paid' : rawStatus;
      
      const matchesFilter = selectedFilter === 'All' || 
                           normalizedStatus === selectedFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter, payments]);

  const totalPaid = useMemo(() => {
    return (payments || [])
      .filter(p => (p.status || p.paymentStatus || '').toLowerCase() === 'paid' || (p.status || p.paymentStatus || '').toLowerCase() === 'success')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0);
  }, [payments]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHistory(searchQuery, selectedFilter).then(() => setRefreshing(false));
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
        keyExtractor={(item) => (item.id || item.transactionId).toString()}
        renderItem={({ item }) => (
          <TransactionCard 
            transaction={{
              ...item,
              schemeName: item.schemeName || item.customerScheme?.scheme?.name || 'Gold Scheme',
              status: item.status || (item.paymentStatus === 'SUCCESS' ? 'Paid' : item.paymentStatus) || 'Pending',
              date: item.date || item.paymentDate,
              method: item.method || item.paymentMethod || 'UPI'
            }} 
          />
        )}
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