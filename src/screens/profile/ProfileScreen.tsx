import React from 'react';
import { View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { COLORS } from '../../constants/colors';
import { 
  User, 
  ChevronRight, 
  ShieldCheck, 
  Bell, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  Camera,
  CheckCircle2,
  AlertCircle
} from 'lucide-react-native';
import { useAuthStore } from '../../store/useAuthStore';

const ProfileScreen = () => {
  const { user, logout } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <View className="px-6 py-4">
        <Text variant="h2" weight="bold">My Profile</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="items-center mb-8">
          <View className="relative">
            <View className="w-28 h-28 bg-dark-card rounded-full border-2 border-primary items-center justify-center overflow-hidden">
              <User size={60} color={COLORS.primary} />
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-2 border-dark">
              <Camera size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text variant="h3" weight="bold" className="mt-4">{user?.name || 'John Doe'}</Text>
          <Text variant="body" color={COLORS.textMuted}>{user?.phoneNumber || '+91 9876543210'}</Text>
          
          <View className={`mt-4 px-4 py-1 rounded-full flex-row items-center ${user?.isKycVerified ? 'bg-success/10' : 'bg-danger/10'}`}>
            {user?.isKycVerified ? (
              <>
                <CheckCircle2 size={14} color={COLORS.success} />
                <Text variant="small" weight="bold" color={COLORS.success} className="ml-2">KYC Verified</Text>
              </>
            ) : (
              <>
                <AlertCircle size={14} color={COLORS.danger} />
                <Text variant="small" weight="bold" color={COLORS.danger} className="ml-2">KYC Pending</Text>
              </>
            )}
          </View>
        </View>

        {/* Settings Groups */}
        <SettingsGroup title="Account Settings">
          <SettingsItem icon={<User size={20} color={COLORS.primary} />} label="Personal Information" />
          <SettingsItem icon={<ShieldCheck size={20} color={COLORS.primary} />} label="Security & Password" />
          <SettingsItem icon={<CreditCard size={20} color={COLORS.primary} />} label="Bank Account Details" />
        </SettingsGroup>

        <SettingsGroup title="Notifications">
          <View className="flex-row items-center justify-between py-4 border-b border-border">
            <View className="flex-row items-center">
              <View className="bg-primary/10 p-2 rounded-lg mr-4">
                <Bell size={20} color={COLORS.primary} />
              </View>
              <Text weight="semibold">Push Notifications</Text>
            </View>
            <Switch 
              value={true} 
              onValueChange={() => {}} 
              trackColor={{ false: COLORS.card, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </SettingsGroup>

        <SettingsGroup title="Support & Legal">
          <SettingsItem icon={<HelpCircle size={20} color={COLORS.primary} />} label="Help Center" />
          <SettingsItem icon={<ShieldCheck size={20} color={COLORS.primary} />} label="Privacy Policy" />
        </SettingsGroup>

        <TouchableOpacity 
          onPress={logout}
          className="mt-6 mb-10 flex-row items-center justify-center p-4 bg-danger/10 rounded-2xl"
        >
          <LogOut size={20} color={COLORS.danger} />
          <Text weight="bold" color={COLORS.danger} className="ml-3">Logout</Text>
        </TouchableOpacity>
        
        <View className="items-center pb-10">
          <Text variant="small" color={COLORS.textMuted}>App Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingsGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <View className="mb-6">
    <Text variant="small" weight="bold" color={COLORS.textMuted} className="mb-2 px-2 uppercase tracking-widest">{title}</Text>
    <View className="bg-dark-card border border-border rounded-2xl px-4">
      {children}
    </View>
  </View>
);

const SettingsItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-border last:border-0">
    <View className="flex-row items-center">
      <View className="bg-primary/10 p-2 rounded-lg mr-4">
        {icon}
      </View>
      <Text weight="semibold">{label}</Text>
    </View>
    <ChevronRight size={18} color={COLORS.textMuted} />
  </TouchableOpacity>
);

export default ProfileScreen;