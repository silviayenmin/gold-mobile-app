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
import { schemeService } from '../../services/scheme.service';

const { width } = Dimensions.get('window');

const SchemeDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { schemeId } = route.params || { schemeId: 1 };
  
  const [scheme, setScheme] = React.useState<any>(null);
  const [isJoined, setIsJoined] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchSchemeDetails();
  }, [schemeId]);

  const fetchSchemeDetails = async () => {
    try {
      setLoading(true);
      const [schemesRes, mySchemesRes] = await Promise.all([
        schemeService.getSchemes(),
        schemeService.getActiveSchemes()
      ]);
      
      if (schemesRes && schemesRes.data) {
        const found = schemesRes.data.find((s: any) => s.id.toString() === schemeId.toString());
        setScheme(found);
      }
      
      if (mySchemesRes && mySchemesRes.data) {
        setIsJoined(mySchemesRes.data.some((s: any) => s.schemeId.toString() === schemeId.toString()));
      }
    } catch (error) {
      console.error('Failed to fetch scheme details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-dark items-center justify-center">
        <Text color={COLORS.primary}>Loading details...</Text>
      </View>
    );
  }

  if (!scheme) {
    return (
      <View className="flex-1 bg-dark items-center justify-center">
        <Text color={COLORS.textMuted}>Scheme not found</Text>
      </View>
    );
  }

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
          
          <Text variant="h1" weight="bold" color={COLORS.white}>{scheme.name}</Text>
          <View className="bg-white/30 self-start px-3 py-1 rounded-full mt-2">
            <Text variant="small" weight="bold" color={COLORS.white}>Premium Plan</Text>
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
              value={`${scheme.durationMonths} Months`} 
            />
            <DetailItem 
              icon={<ShieldCheck size={20} color={COLORS.primary} />} 
              label="Security" 
              value="100% Insured" 
            />
            <DetailItem 
              icon={<Award size={20} color={COLORS.primary} />} 
              label="Benefit" 
              value="Bonus Gold" 
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
              <Text weight="bold">₹{Number(scheme.monthlyAmount).toLocaleString()}</Text>
            </View>
            <View className="flex-row justify-between py-3 border-b border-border">
              <Text color={COLORS.textMuted}>Total Installments</Text>
              <Text weight="bold">{scheme.durationMonths}</Text>
            </View>
            <View className="flex-row justify-between py-3">
              <Text color={COLORS.textMuted}>Total Accumulation</Text>
              <Text weight="bold" color={COLORS.primary}>₹{Number(scheme.monthlyAmount * scheme.durationMonths).toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Button */}
      <View className="px-6 pb-8 pt-4 bg-dark border-t border-border">
        <Button 
          title={isJoined ? "Already Enrolled" : "Join Scheme Now"} 
          onPress={() => isJoined ? navigation.navigate(ROUTES.DASHBOARD) : navigation.navigate(ROUTES.JOIN_SCHEME, { schemeId: scheme.id })}
          variant={isJoined ? "outline" : "primary"}
          style={isJoined ? { borderColor: COLORS.success } : {}}
          textStyle={isJoined ? { color: COLORS.success } : {}}
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