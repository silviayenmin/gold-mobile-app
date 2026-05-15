import React, { useEffect, useRef, useState } from 'react';
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
import { promotionService } from '../../services/promotion.service';

const { width } = Dimensions.get('window');

const OffersScreen = () => {
  const navigation = useNavigation();
  const [offers, setOffers] = useState(MOCK_OFFERS);
  const [banners, setBanners] = useState(MOCK_OFFERS.filter(o => o.type === 'Featured'));
  const [loading, setLoading] = useState(false);
  const [activeBanner, setActiveBanner] = useState(0);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    fetchData();
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
      const [bannersRes, offersRes] = await Promise.all([
        promotionService.getBanners(),
        promotionService.getOffers()
      ]);
      
      if (bannersRes && bannersRes.data) {
        setBanners(bannersRes.data.map((b: any) => ({
          ...b,
          validity: b.expiryDate ? new Date(b.expiryDate).toLocaleDateString() : 'Limited Time',
          bonus: '10%', // Default bonus for banners
          type: b.type || 'Featured'
        })));
      }
      
      if (offersRes && offersRes.data) {
        setOffers(offersRes.data.map((o: any) => ({
          ...o,
          validity: o.expiryDate ? new Date(o.expiryDate).toLocaleDateString() : 'Limited Time',
          bonus: '5%', // Default bonus for offers
          type: o.type || 'Promo'
        })));
      }
    } catch (error) {
      console.error('Failed to fetch promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredOffers = banners.length > 0 ? banners : offers.filter(o => o.type === 'Featured' || o.type === 'Festival');

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
            keyExtractor={(item) => item.id.toString()}
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              const index = Math.round(x / (width - 48));
              setActiveBanner(index);
            }}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.9} style={{ width: width - 48, marginHorizontal: 24 }} className="mt-4 mb-2">
                <View className="rounded-3xl overflow-hidden h-44 bg-dark-card border border-border">
                  {item.image ? (
                    <Image 
                      source={{ uri: item.image }} 
                      className="absolute inset-0 w-full h-full" 
                      resizeMode="cover" 
                    />
                  ) : null}
                  <LinearGradient
                    colors={item.image ? ['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)'] : GRADIENTS.gold as any}
                    className="flex-1 p-6 flex-row"
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
                    {!item.image && (
                      <View className="w-1/3 items-center justify-center">
                        <Gift size={80} color="white" style={{ opacity: 0.3 }} />
                      </View>
                    )}
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            )}
          />
          {/* Pagination Dots */}
          {featuredOffers.length > 1 && (
            <View className="flex-row justify-center mb-6">
              {featuredOffers.map((_, index) => (
                <View 
                  key={index}
                  className={`h-1.5 rounded-full mx-1 ${
                    activeBanner === index ? 'w-6 bg-primary' : 'w-1.5 bg-border'
                  }`}
                />
              ))}
            </View>
          )}
        </Animated.View>

        <View className="px-6">
          <SectionHeader title="Available Offers" showViewAll={false} />
          {offers.length > 0 ? (
            offers.map((offer, index) => (
              <OfferCard key={offer.id} offer={offer} index={index} />
            ))
          ) : (
            <View className="items-center justify-center py-10">
              <Text color={COLORS.textMuted}>No offers available currently</Text>
            </View>
          )}
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
