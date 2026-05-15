import React from 'react';
import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { Input } from '../../components/common/Input';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { Search, Filter, Info, ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants/routes';
import { LinearGradient } from 'expo-linear-gradient';
import { schemeService } from '../../services/scheme.service';

const SchemeListingScreen = () => {
  const navigation = useNavigation();
  const [schemes, setSchemes] = React.useState<any[]>([]);
  const [mySchemes, setMySchemes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const [schemesRes, mySchemesRes] = await Promise.all([
        schemeService.getSchemes(),
        schemeService.getActiveSchemes()
      ]);
      
      if (schemesRes && schemesRes.data) {
        setSchemes(schemesRes.data);
      }
      if (mySchemesRes && mySchemesRes.data) {
        setMySchemes(mySchemesRes.data);
      }
    } catch (error) {
      console.error('Failed to fetch schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSchemeItem = ({ item }) => {
    const isJoined = mySchemes.some(s => s.schemeId === item.id);
    
    return (
      <View className="mb-4">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate(ROUTES.SCHEME_DETAILS, { schemeId: item.id })}
          className="bg-dark-card border border-border rounded-2xl overflow-hidden"
        >
          <View className="p-5">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text variant="h3" weight="bold">{item.name}</Text>
                <Text variant="small" color={COLORS.textMuted} className="mt-1">{item.description}</Text>
              </View>
              <Info size={20} color={COLORS.textMuted} />
            </View>

            <View className="flex-row mt-6 pt-4 border-t border-border justify-between items-center">
              <View className="flex-row space-x-6">
                <View>
                  <Text variant="small" color={COLORS.textMuted}>Monthly</Text>
                  <Text variant="body" weight="bold">₹{Number(item.monthlyAmount).toLocaleString()}</Text>
                </View>
                <View>
                  <Text variant="small" color={COLORS.textMuted}>Duration</Text>
                  <Text variant="body" weight="bold">{item.durationMonths} Months</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                disabled={isJoined}
                onPress={() => navigation.navigate(ROUTES.JOIN_SCHEME, { schemeId: item.id })}
                className={`px-4 py-2 rounded-xl justify-center ${isJoined ? 'bg-success/20' : 'bg-primary'}`}
              >
                <Text variant="small" weight="bold" color={isJoined ? COLORS.success : COLORS.white}>
                  {isJoined ? 'Joined' : 'Join'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <View className="px-6 py-4">
        <Text variant="h2" weight="bold">Gold Schemes</Text>
        <Text variant="body" color={COLORS.textMuted} className="mt-1">Choose the best plan for your savings</Text>
      </View>

      <View className="px-6 flex-row items-center space-x-3 mb-2">
        <View className="flex-1">
          <Input 
            placeholder="Search schemes..." 
            icon={<Search size={20} color={COLORS.textMuted} />}
          />
        </View>
        <TouchableOpacity className="bg-dark-card p-3 rounded-xl border border-border mb-4">
          <Filter size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={schemes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSchemeItem}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchSchemes}
        ListEmptyComponent={
          !loading ? (
            <View className="bg-dark-card p-10 rounded-2xl items-center">
              <Text color={COLORS.textMuted}>No schemes available at the moment.</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default SchemeListingScreen;