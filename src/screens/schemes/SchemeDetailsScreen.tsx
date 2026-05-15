import React from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { Button } from '../../components/common/Button';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { ChevronLeft, CheckCircle2, ShieldCheck, Clock, Award } from 'lucide-react-native';
import { MOCK_AVAILABLE_SCHEMES } from '../../constants/mockData';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ROUTES } from '../../constants/routes';

const { width } = Dimensions.get('window');

const SchemeDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { schemeId } = route.params || { schemeId: 's1' };
  
  const scheme = MOCK_AVAILABLE_SCHEMES.find(s => s.id === schemeId) || MOCK_AVAILABLE_SCHEMES[0];

  return (
    <View className="flex-1 bg-dark">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={GRADIENTS.gold as any}
          className="pt-16 pb-10 px-6 rounded-b-[40px]"
        >
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="bg-white/20 w-10 h-10 rounded-full items-center justify-center mb-6"
          >
            <ChevronLeft color={COLORS.white} size={24} />
          </TouchableOpacity>
          
          <Text variant="h1" weight="bold" color={COLORS.white}>{scheme.title}</Text>
          <View className="bg-white/30 self-start px-3 py-1 rounded-full mt-2">
            <Text variant="small" weight="bold" color={COLORS.white}>{scheme.bonus}</Text>
          </View>
        </LinearGradient>

        <View className="px-6 py-8">
          <Text variant="h3" weight="bold">Scheme Overview</Text>
          <Text variant="body" color={COLORS.textMuted} className="mt-4 leading-6">
            {scheme.description} This premium gold saving scheme is designed to help you accumulate gold weight gradually with regular monthly installments. 
            Enjoy the benefit of price averaging and zero making charges.
          </Text>

          <View className="flex-row flex-wrap justify-between mt-8">
            <DetailItem 
              icon={<Clock size={20} color={COLORS.primary} />} 
              label="Duration" 
              value={`${scheme.duration} Months`} 
            />
            <DetailItem 
              icon={<ShieldCheck size={20} color={COLORS.primary} />} 
              label="Security" 
              value="100% Insured" 
            />
            <DetailItem 
              icon={<Award size={20} color={COLORS.primary} />} 
              label="Bonus" 
              value={scheme.bonus.split(' ')[0]} 
            />
          </View>

          <View className="mt-10 bg-dark-card border border-border p-6 rounded-2xl">
            <Text variant="body" weight="bold" className="mb-4">Benefits</Text>
            <BenefitItem text="Zero making charges on jewelry purchase" />
            <BenefitItem text="Price lock facility available" />
            <BenefitItem text="Flexible payment options (UPI, Card)" />
            <BenefitItem text="Instant digital receipt for every payment" />
            <BenefitItem text="Option to convert to 24K gold coins" />
          </View>

          <View className="mt-8 mb-10">
            <Text variant="h3" weight="bold">Installment Details</Text>
            <View className="flex-row justify-between mt-4 py-3 border-b border-border">
              <Text color={COLORS.textMuted}>Monthly Amount</Text>
              <Text weight="bold">₹{scheme.monthlyAmount.toLocaleString()}</Text>
            </View>
            <View className="flex-row justify-between py-3 border-b border-border">
              <Text color={COLORS.textMuted}>Total Installments</Text>
              <Text weight="bold">{scheme.duration}</Text>
            </View>
            <View className="flex-row justify-between py-3">
              <Text color={COLORS.textMuted}>Total Accumulation</Text>
              <Text weight="bold" color={COLORS.primary}>₹{(scheme.monthlyAmount * scheme.duration).toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Button */}
      <View className="px-6 pb-8 pt-4 bg-dark border-t border-border">
        <Button 
          title="Join Scheme Now" 
          onPress={() => navigation.navigate(ROUTES.JOIN_SCHEME, { schemeId: scheme.id })} 
        />
      </View>
    </View>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <View className="w-[30%] items-center mb-6">
    <View className="w-12 h-12 bg-dark-card border border-border rounded-xl items-center justify-center mb-2">
      {icon}
    </View>
    <Text variant="small" color={COLORS.textMuted} align="center">{label}</Text>
    <Text variant="small" weight="bold" align="center" className="mt-1">{value}</Text>
  </View>
);

const BenefitItem = ({ text }: { text: string }) => (
  <View className="flex-row items-center mb-3">
    <CheckCircle2 size={18} color={COLORS.success} />
    <Text variant="small" className="ml-3 flex-1">{text}</Text>
  </View>
);

export default SchemeDetailsScreen;