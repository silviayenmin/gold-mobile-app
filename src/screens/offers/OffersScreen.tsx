import React, { useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList, Dimensions, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { ChevronLeft, Gift, Award, Star, Zap } from 'lucide-react-native';
import { MOCK_OFFERS } from '../../constants/mockData';
import { useNavigation } from '@react-navigation/native';
import OfferCard from '../../components/cards/OfferCard';
import SectionHeader from '../../components/common/SectionHeader';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const OffersScreen = () => {
  const navigation = useNavigation();

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

  const featuredOffers = MOCK_OFFERS.filter(o => o.type === 'Featured' || o.type === 'Festival');

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
          <Text variant="h2" weight="bold">Special Offers</Text>
        </View>
        <TouchableOpacity className="bg-dark-card p-2 rounded-full border border-border">
          <Gift size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Carousel */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <FlatList
            data={featuredOffers}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.9} style={{ width: width - 48, marginHorizontal: 24 }} className="mt-4 mb-8">
                <LinearGradient
                  colors={GRADIENTS.gold as any}
                  className="rounded-3xl overflow-hidden p-6 h-44 flex-row"
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View className="flex-1 justify-center">
                    <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-2">
                      <Text variant="caption" weight="bold" color={COLORS.white}>LIMITED TIME</Text>
                    </View>
                    <Text variant="h2" weight="bold" color={COLORS.white}>{item.title}</Text>
                    <Text variant="small" color={COLORS.white} className="mt-1 opacity-80" numberOfLines={1}>
                      {item.description}
                    </Text>
                    <TouchableOpacity className="bg-white px-4 py-2 rounded-xl self-start mt-4">
                      <Text variant="small" weight="bold" color={COLORS.primaryDark}>Claim Offer</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="w-1/3 items-center justify-center">
                    <Gift size={80} color="white" style={{ opacity: 0.3 }} />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </Animated.View>

        <View className="px-6">
          {/* Quick Stats */}
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }} className="flex-row justify-between mb-8">
            <OfferStat icon={<Zap size={20} color={COLORS.primary} />} label="Instant" />
            <OfferStat icon={<Award size={20} color={COLORS.primary} />} label="Bonus" />
            <OfferStat icon={<Star size={20} color={COLORS.primary} />} label="Exclusive" />
          </Animated.View>

          <SectionHeader title="Featured Offers" showViewAll={false} />
          {MOCK_OFFERS.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} />
          ))}

          <SectionHeader title="Recommended for You" showViewAll={false} />
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }} className="mb-10">
            <LinearGradient
              colors={['#1e293b', '#0f172a']}
              className="p-6 rounded-3xl border border-border flex-row items-center justify-between"
            >
              <View className="flex-1 pr-4">
                <Text variant="h3" weight="bold" color={COLORS.primary}>Join Gold Plus</Text>
                <Text variant="body" color={COLORS.textMuted} className="mt-1">
                  Upgrade to premium membership and get 1% extra gold on every purchase.
                </Text>
                <TouchableOpacity className="mt-4 flex-row items-center">
                  <Text weight="bold" color={COLORS.white}>Learn More</Text>
                  <ChevronLeft size={16} color={COLORS.white} style={{ transform: [{ rotate: '180deg' }], marginLeft: 4 }} />
                </TouchableOpacity>
              </View>
              <View className="bg-primary/20 p-4 rounded-2xl">
                <Star size={32} color={COLORS.primary} />
              </View>
            </LinearGradient>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const OfferStat = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <View className="items-center bg-dark-card border border-border rounded-2xl p-4 flex-1 mx-1.5">
    <View className="mb-2 bg-dark p-2 rounded-xl">
      {icon}
    </View>
    <Text variant="caption" weight="bold" color={COLORS.textMuted}>{label.toUpperCase()}</Text>
  </View>
);

export default OffersScreen;
