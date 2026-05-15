import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, Modal, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { COLORS } from '../../constants/colors';
import { ChevronLeft, Smartphone, CreditCard, Landmark, CheckCircle, AlertCircle } from 'lucide-react-native';
import { MOCK_ACTIVE_SCHEMES } from '../../constants/mockData';
import { useNavigation } from '@react-navigation/native';
import SummaryCard from '../../components/cards/SummaryCard';
import GradientButton from '../../components/common/GradientButton';
import PaymentMethodCard from '../../components/cards/PaymentMethodCard';
import SectionHeader from '../../components/common/SectionHeader';
import StatusChip from '../../components/common/StatusChip';

const PayDueScreen = () => {
  const navigation = useNavigation();
  const activeScheme = MOCK_ACTIVE_SCHEMES[0];
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failure'>('success');

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

  const handlePayment = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setPaymentStatus(Math.random() > 0.1 ? 'success' : 'failure');
      setShowStatusModal(true);
    }, 2000);
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    if (paymentStatus === 'success') {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <View className="px-6 py-4 flex-row items-center">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="bg-dark-card w-10 h-10 rounded-full items-center justify-center mr-4"
        >
          <ChevronLeft color={COLORS.primary} size={24} />
        </TouchableOpacity>
        <Text variant="h2" weight="bold">Pay Due</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <SummaryCard 
            title="Pending Amount" 
            amount={activeScheme.nextDueAmount * activeScheme.pendingInstallments} 
            subtitle={`Includes ${activeScheme.pendingInstallments} pending installments`}
          >
            <View className="flex-row justify-between items-center mt-2">
              <View className="bg-white/20 px-3 py-1 rounded-full">
                <Text variant="caption" weight="bold" color={COLORS.white}>DUE DATE: {activeScheme.nextDueDate}</Text>
              </View>
              {activeScheme.pendingInstallments > 1 && (
                <StatusChip status="OVERDUE" variant="outline" />
              )}
            </View>
          </SummaryCard>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }} className="mt-8">
          <SectionHeader title="Active Scheme" showViewAll={false} />
          <View className="bg-dark-card border border-border p-5 rounded-3xl">
            <View className="flex-row justify-between items-center mb-4">
              <Text weight="bold" style={{ fontSize: 18 }}>{activeScheme.name}</Text>
              <StatusChip status="ACTIVE" />
            </View>
            <View className="flex-row justify-between border-t border-border/50 pt-4">
              <View>
                <Text variant="small" color={COLORS.textMuted}>Installment</Text>
                <Text weight="bold" className="mt-1">#{activeScheme.monthsPaid + 1}</Text>
              </View>
              <View className="items-end">
                <Text variant="small" color={COLORS.textMuted}>Total Months</Text>
                <Text weight="bold" className="mt-1">{activeScheme.totalMonths}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }} className="mt-8">
          <SectionHeader title="Select Payment Method" showViewAll={false} />
          
          <PaymentMethodCard 
            id="upi"
            name="UPI Payment"
            description="Google Pay, PhonePe, Paytm"
            icon={<Smartphone color={COLORS.primary} size={24} />}
            selected={selectedMethod === 'upi'}
            onSelect={setSelectedMethod}
          />
          
          <PaymentMethodCard 
            id="card"
            name="Credit / Debit Card"
            description="Visa, Mastercard, RuPay"
            icon={<CreditCard color={COLORS.primary} size={24} />}
            selected={selectedMethod === 'card'}
            onSelect={setSelectedMethod}
          />
          
          <PaymentMethodCard 
            id="netbanking"
            name="Net Banking"
            description="All major banks supported"
            icon={<Landmark color={COLORS.primary} size={24} />}
            selected={selectedMethod === 'netbanking'}
            onSelect={setSelectedMethod}
          />
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }} className="mt-6">
          <View className="bg-dark-card border border-border p-5 rounded-3xl mb-6">
            <View className="flex-row justify-between mb-3">
              <Text color={COLORS.textMuted}>Subtotal</Text>
              <Text weight="bold">₹{(activeScheme.nextDueAmount * activeScheme.pendingInstallments).toLocaleString()}</Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text color={COLORS.textMuted}>Processing Fee</Text>
              <Text weight="bold" color={COLORS.success}>₹0.00</Text>
            </View>
            <View className="h-px bg-border/50 my-2" />
            <View className="flex-row justify-between mt-1">
              <Text variant="body" weight="bold">Total Amount</Text>
              <Text variant="h3" weight="bold" color={COLORS.primary}>₹{(activeScheme.nextDueAmount * activeScheme.pendingInstallments).toLocaleString()}</Text>
            </View>
          </View>

          <GradientButton 
            title={loading ? "Processing..." : `Pay ₹${(activeScheme.nextDueAmount * activeScheme.pendingInstallments).toLocaleString()}`} 
            onPress={handlePayment}
            loading={loading}
          />
        </Animated.View>
      </ScrollView>

      {/* Success/Failure Modal */}
      <Modal
        visible={showStatusModal}
        transparent
        animationType="fade"
      >
        <View className="flex-1 bg-black/80 items-center justify-center px-6">
          <View 
            className="bg-dark-card w-full p-8 rounded-3xl border border-border items-center"
          >
            <View className={`w-20 h-20 rounded-full items-center justify-center mb-6 ${paymentStatus === 'success' ? 'bg-success/20' : 'bg-danger/20'}`}>
              {paymentStatus === 'success' ? (
                <CheckCircle size={48} color={COLORS.success} />
              ) : (
                <AlertCircle size={48} color={COLORS.danger} />
              )}
            </View>
            
            <Text variant="h2" weight="bold" className="text-center">
              {paymentStatus === 'success' ? 'Payment Successful!' : 'Payment Failed'}
            </Text>
            
            <Text color={COLORS.textMuted} className="text-center mt-3 leading-6">
              {paymentStatus === 'success' 
                ? 'Your gold installment has been successfully processed. Gold weight will be added to your account shortly.'
                : 'Something went wrong with your transaction. Please check your payment method and try again.'}
            </Text>

            <View className="w-full mt-8 bg-dark p-4 rounded-2xl border border-border/50">
              <View className="flex-row justify-between mb-2">
                <Text variant="small" color={COLORS.textMuted}>Transaction ID</Text>
                <Text variant="small" weight="bold">TXN{Math.floor(Math.random() * 1000000000)}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text variant="small" color={COLORS.textMuted}>Amount Paid</Text>
                <Text variant="small" weight="bold">₹{(activeScheme.nextDueAmount * activeScheme.pendingInstallments).toLocaleString()}</Text>
              </View>
            </View>

            <TouchableOpacity 
              onPress={closeStatusModal}
              className={`w-full py-4 rounded-2xl mt-8 items-center ${paymentStatus === 'success' ? 'bg-success' : 'bg-danger'}`}
            >
              <Text weight="bold" color={COLORS.white}>
                {paymentStatus === 'success' ? 'Done' : 'Try Again'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PayDueScreen;
