import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { Button } from '../../components/common/Button';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { ChevronLeft, CheckCircle2, CreditCard, Landmark, Smartphone } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ROUTES } from '../../constants/routes';

const PaymentScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { amount = 5000 } = route.params || {};
  
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    // Simulate Payment Process
    setTimeout(() => {
      setLoading(false);
      navigation.replace(ROUTES.PAYMENT_HISTORY);
    }, 2500);
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
        <Text variant="h2" weight="bold">Make Payment</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* Payment Summary Card */}
        <LinearGradient
          colors={GRADIENTS.dark as any}
          className="p-6 rounded-3xl border border-border items-center mb-8"
        >
          <Text variant="small" color={COLORS.textMuted} className="mb-2">AMOUNT TO PAY</Text>
          <Text variant="h1" weight="bold" color={COLORS.primary} style={{ fontSize: 40 }}>₹{amount.toLocaleString()}</Text>
          <View className="mt-4 bg-primary/10 px-4 py-1 rounded-full">
            <Text variant="small" color={COLORS.primary} weight="bold">Installment #10</Text>
          </View>
        </LinearGradient>

        <Text variant="h3" weight="bold" className="mb-6">Select Payment Method</Text>

        <PaymentMethod 
          id="upi"
          title="UPI (PhonePe, GPay, Paytm)"
          icon={<Smartphone size={24} color={selectedMethod === 'upi' ? COLORS.white : COLORS.primary} />}
          selected={selectedMethod === 'upi'}
          onSelect={() => setSelectedMethod('upi')}
        />

        <PaymentMethod 
          id="card"
          title="Credit / Debit Card"
          icon={<CreditCard size={24} color={selectedMethod === 'card' ? COLORS.white : COLORS.primary} />}
          selected={selectedMethod === 'card'}
          onSelect={() => setSelectedMethod('card')}
        />

        <PaymentMethod 
          id="netbanking"
          title="Net Banking"
          icon={<Landmark size={24} color={selectedMethod === 'netbanking' ? COLORS.white : COLORS.primary} />}
          selected={selectedMethod === 'netbanking'}
          onSelect={() => setSelectedMethod('netbanking')}
        />

        <View className="mt-8 bg-dark-card border border-border p-5 rounded-2xl">
          <View className="flex-row justify-between mb-3">
            <Text color={COLORS.textMuted}>Subtotal</Text>
            <Text weight="semibold">₹{amount.toLocaleString()}</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text color={COLORS.textMuted}>GST (3%)</Text>
            <Text weight="semibold">₹{(amount * 0.03).toLocaleString()}</Text>
          </View>
          <View className="h-[1px] bg-border my-2" />
          <View className="flex-row justify-between mt-2">
            <Text weight="bold">Total Amount</Text>
            <Text variant="h3" weight="bold" color={COLORS.primary}>₹{(amount * 1.03).toLocaleString()}</Text>
          </View>
        </View>

        <View className="mt-10 mb-10">
          <Button 
            title={`Pay ₹${(amount * 1.03).toLocaleString()}`} 
            onPress={handlePayment}
            loading={loading}
          />
          <View className="flex-row items-center justify-center mt-4">
            <ShieldCheck size={16} color={COLORS.success} />
            <Text variant="small" color={COLORS.textMuted} className="ml-2">100% Secure Payment Powered by Razorpay</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const PaymentMethod = ({ id, title, icon, selected, onSelect }: any) => (
  <TouchableOpacity 
    onPress={onSelect}
    className={`flex-row items-center p-5 rounded-2xl border mb-4 ${
      selected ? 'bg-primary border-primary' : 'bg-dark-card border-border'
    }`}
  >
    <View className={`w-12 h-12 rounded-xl items-center justify-center ${
      selected ? 'bg-white/20' : 'bg-primary/10'
    }`}>
      {icon}
    </View>
    <Text 
      weight="semibold" 
      className="ml-4 flex-1"
      color={selected ? COLORS.white : COLORS.text}
    >
      {title}
    </Text>
    {selected && <CheckCircle2 size={20} color={COLORS.white} />}
  </TouchableOpacity>
);

const ShieldCheck = ({ size, color, className }: any) => (
  <View className={className}>
    <CheckCircle2 size={size} color={color} />
  </View>
);

export default PaymentScreen;