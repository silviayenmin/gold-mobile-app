import React, { useEffect, useRef, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, Bell, Wallet, History, BadgePercent, ChevronRight } from 'lucide-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ROUTES } from '../../constants/routes';
import { MOCK_GOLD_RATE } from '../../constants/mockData';
import { schemeService } from '../../services/scheme.service';
import { useAuthStore } from '../../store/useAuthStore';

const { width } = Dimensions.get('window');

const HomeDashboardScreen = () => {
  const navigation = useNavigation();
  const user = useAuthStore(state => state.user);
  const [activeSchemes, setActiveSchemes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  const activeScheme = activeSchemes.length > 0 ? activeSchemes[0] : null;
  
  // Animation values using standard react-native Animated
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await schemeService.getActiveSchemes();
      if (response && response.data) {
        setActiveSchemes(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <View className="px-6 py-4 flex-row justify-between items-center">
        <View>
          <Text variant="caption" color={COLORS.textMuted}>Good Morning,</Text>
          <Text variant="h2" weight="bold">{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity className="bg-dark-card p-2 rounded-full border border-border">
          <Bell size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
          className="mt-4"
        >
          <LinearGradient
            colors={GRADIENTS.gold as any}
            className="p-6 rounded-3xl"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View className="flex-row justify-between items-start">
              <View>
                <Text variant="small" weight="bold" color={COLORS.white} style={{ opacity: 0.8 }}>LIVE GOLD RATE (22K)</Text>
                <Text variant="h1" weight="bold" color={COLORS.white} style={{ fontSize: 36 }}>₹{MOCK_GOLD_RATE.price.toLocaleString()}</Text>
              </View>
              <View className="bg-white/20 px-3 py-1 rounded-full flex-row items-center">
                {MOCK_GOLD_RATE.isUp ? <TrendingUp size={16} color="white" /> : <TrendingDown size={16} color="white" />}
                <Text variant="small" weight="bold" color={COLORS.white} className="ml-1">+{MOCK_GOLD_RATE.change}%</Text>
              </View>
            </View>
            <View className="mt-4 pt-4 border-t border-white/20">
              <Text variant="small" color={COLORS.white} style={{ opacity: 0.6 }}>Last Updated: {MOCK_GOLD_RATE.lastUpdated}</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        <View className="flex-row justify-between mt-8">
          <QuickAction 
            icon={<Wallet color={COLORS.primary} />} 
            label="Pay Due" 
            onPress={() => navigation.navigate(ROUTES.PAY_DUE)}
          />
          <QuickAction 
            icon={<History color={COLORS.primary} />} 
            label="History" 
            onPress={() => navigation.navigate(ROUTES.PAYMENT_HISTORY)}
          />
          <QuickAction 
            icon={<BadgePercent color={COLORS.primary} />} 
            label="Offers" 
            onPress={() => navigation.navigate(ROUTES.OFFERS)}
          />
        </View>

        <View className="mt-8 mb-4 flex-row justify-between items-end">
          <Text variant="h3" weight="bold">Active Schemes</Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SCHEME_LIST)}>
            <Text variant="small" color={COLORS.primary} weight="semibold">View All</Text>
          </TouchableOpacity>
        </View>

        {activeScheme ? (
          <Animated.View
            style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
            className="bg-dark-card border border-border p-5 rounded-2xl mb-6"
          >
            <View className="flex-row justify-between items-start">
              <View>
                <Text variant="body" weight="bold">{activeScheme.scheme?.name || activeScheme.name}</Text>
                <Text variant="small" color={COLORS.textMuted} className="mt-1">
                  ID: {activeScheme.schemeNumber}
                </Text>
              </View>
              <View className="bg-primary/10 px-3 py-1 rounded-full">
                <Text variant="small" color={COLORS.primary} weight="bold">{activeScheme.status}</Text>
              </View>
            </View>

            <View className="mt-6">
              <View className="flex-row justify-between mb-2">
                <Text variant="small" color={COLORS.textMuted}>Savings Progress</Text>
                <Text variant="small" weight="bold" color={COLORS.primary}>
                  {Number(activeScheme.totalGrams) > 0 
                    ? Number(activeScheme.totalGrams).toFixed(3) 
                    : (Number(activeScheme.totalPaidAmount || 0) / MOCK_GOLD_RATE.price).toFixed(3)}g / {(Number(Number(activeScheme.totalPaidAmount || 0) + Number(activeScheme.pendingAmount || 0)) / MOCK_GOLD_RATE.price).toFixed(3)}g
                </Text>
              </View>
              <View className="h-2 bg-dark rounded-full overflow-hidden">
                <View 
                  className="h-full bg-primary" 
                  style={{ 
                    width: `${Math.min(100, Math.max(0, (Number(activeScheme.totalPaidAmount || 0) / (Number(activeScheme.totalPaidAmount || 0) + Number(activeScheme.pendingAmount || 1))) * 100))}%` 
                  }} 
                />
              </View>
            </View>

            <View className="mt-6 flex-row justify-between items-center">
              <View>
                <Text variant="small" color={COLORS.textMuted}>Pending Amount</Text>
                <Text variant="h3" weight="bold">₹{Number(activeScheme.pendingAmount).toLocaleString()}</Text>
              </View>
              <TouchableOpacity 
                className="bg-primary px-5 py-2 rounded-xl"
                onPress={() => navigation.navigate(ROUTES.PAY_DUE)}
              >
                <Text variant="small" weight="bold" color={COLORS.white}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ) : (
          <View className="bg-dark-card border border-border border-dashed p-10 rounded-2xl mb-6 items-center">
            <Text color={COLORS.textMuted} className="text-center">No active schemes found.</Text>
            <TouchableOpacity 
              className="mt-4"
              onPress={() => navigation.navigate(ROUTES.SCHEME_LIST)}
            >
              <Text color={COLORS.primary} weight="bold">Join a Scheme</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => navigation.navigate(ROUTES.OFFERS)}
        >
          <LinearGradient
            colors={['#1e293b', '#0f172a']}
            className="p-6 rounded-2xl border border-border mb-10 flex-row items-center justify-between"
          >
            <View className="flex-1 pr-4">
              <Text variant="body" weight="bold" color={COLORS.primary}>Akshaya Tritiya Special</Text>
              <Text variant="small" color={COLORS.textMuted} className="mt-1">Get 0.5% extra gold on new scheme enrollment.</Text>
            </View>
            <ChevronRight color={COLORS.primary} size={20} />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const QuickAction = ({ icon, label, onPress }: { icon: React.ReactNode, label: string, onPress: () => void }) => (
  <TouchableOpacity className="items-center" onPress={onPress}>
    <View className="w-16 h-16 bg-dark-card border border-border rounded-2xl justify-center items-center mb-2">
      {icon}
    </View>
    <Text variant="small" weight="semibold">{label}</Text>
  </TouchableOpacity>
);

export default HomeDashboardScreen;