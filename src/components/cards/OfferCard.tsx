import React, { useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Text } from '../common/Typography';
import { COLORS } from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Timer, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface OfferCardProps {
  offer: {
    id: string;
    title: string;
    description: string;
    validity: string;
    bonus: string;
    type: string;
    image: string;
  };
  index: number;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 150,
      useNativeDriver: true,
    }).start();
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      delay: index * 150,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View 
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      className="mb-6"
    >
      <TouchableOpacity activeOpacity={0.9} className="rounded-3xl overflow-hidden bg-dark-card border border-border shadow-2xl">
        <View className="h-48 w-full relative">
          <Image 
            source={{ uri: offer.image }} 
            className="w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(15, 23, 42, 0.95)']}
            className="absolute inset-0"
          />
          <View className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full">
            <Text variant="caption" weight="bold" color={COLORS.white}>
              {offer.type.toUpperCase()}
            </Text>
          </View>
        </View>

        <View className="p-5">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-4">
              <Text variant="h3" weight="bold">
                {offer.title}
              </Text>
              <Text variant="small" color={COLORS.textMuted} className="mt-2" numberOfLines={2}>
                {offer.description}
              </Text>
            </View>
            <View className="bg-primary/10 border border-primary/20 p-2 rounded-2xl items-center justify-center">
              <Text variant="h3" weight="bold" color={COLORS.primary}>
                {offer.bonus}
              </Text>
              <Text variant="caption" color={COLORS.primary} weight="semibold">
                BONUS
              </Text>
            </View>
          </View>

          <View className="mt-6 flex-row justify-between items-center">
            <View className="flex-row items-center bg-dark/50 px-3 py-1.5 rounded-full">
              <Timer size={14} color={COLORS.primary} />
              <Text variant="caption" color={COLORS.textMuted} className="ml-2" weight="semibold">
                {offer.validity}
              </Text>
            </View>
            
            <TouchableOpacity className="flex-row items-center">
              <Text weight="bold" color={COLORS.primary} className="mr-1">Claim Now</Text>
              <ArrowRight size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default OfferCard;
