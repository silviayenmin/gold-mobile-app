import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { COLORS } from '../../constants/colors';
import { ChevronLeft, Upload, User, MapPin, CreditCard, Users } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ROUTES } from '../../constants/routes';

const schema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  address: z.string().min(10, 'Please enter a valid address'),
  aadhaar: z.string().length(12, 'Aadhaar must be 12 digits'),
  pan: z.string().length(10, 'PAN must be 10 characters').regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, 'Invalid PAN format'),
  nomineeName: z.string().min(3, 'Nominee name is required'),
  nomineeRelation: z.string().min(2, 'Relation is required'),
});

type FormData = z.infer<typeof schema>;

const JoinSchemeScreen = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Enrollment Successful',
        'You have successfully joined the scheme. Please proceed to pay your first installment.',
        [
          { 
            text: 'Proceed to Payment', 
            onPress: () => navigation.replace(ROUTES.PAYMENT, { amount: 5000 }) 
          }
        ]
      );
    }, 2000);
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
        <Text variant="h2" weight="bold">Join Scheme</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        <Text variant="body" weight="bold" color={COLORS.primary} className="mb-6">KYC & Personal Details</Text>
        
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Full Name (as per Aadhaar)"
              placeholder="John Doe"
              value={value}
              onChangeText={onChange}
              error={errors.fullName?.message}
              icon={<User size={20} color={COLORS.primary} />}
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Communication Address"
              placeholder="House No, Street, City, Pincode"
              multiline
              numberOfLines={3}
              value={value}
              onChangeText={onChange}
              error={errors.address?.message}
              icon={<MapPin size={20} color={COLORS.primary} />}
            />
          )}
        />

        <View className="flex-row space-x-4">
          <View className="flex-1">
            <Controller
              control={control}
              name="aadhaar"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Aadhaar Number"
                  placeholder="1234 5678 9012"
                  keyboardType="number-pad"
                  maxLength={12}
                  value={value}
                  onChangeText={onChange}
                  error={errors.aadhaar?.message}
                  icon={<CreditCard size={20} color={COLORS.primary} />}
                />
              )}
            />
          </View>
        </View>

        <Controller
          control={control}
          name="pan"
          render={({ field: { onChange, value } }) => (
            <Input
              label="PAN Card Number"
              placeholder="ABCDE1234F"
              autoCapitalize="characters"
              maxLength={10}
              value={value}
              onChangeText={onChange}
              error={errors.pan?.message}
              icon={<CreditCard size={20} color={COLORS.primary} />}
            />
          )}
        />

        <Text variant="body" weight="bold" color={COLORS.primary} className="mt-6 mb-6">Nominee Details</Text>

        <Controller
          control={control}
          name="nomineeName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nominee Name"
              placeholder="Jane Doe"
              value={value}
              onChangeText={onChange}
              error={errors.nomineeName?.message}
              icon={<Users size={20} color={COLORS.primary} />}
            />
          )}
        />

        <Controller
          control={control}
          name="nomineeRelation"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Relation with Nominee"
              placeholder="Spouse / Parent"
              value={value}
              onChangeText={onChange}
              error={errors.nomineeRelation?.message}
            />
          )}
        />

        <Text variant="body" weight="bold" color={COLORS.primary} className="mt-6 mb-4">Document Upload</Text>
        
        <View className="flex-row space-x-4 mb-10">
          <DocumentUploader label="Aadhaar Front" />
          <DocumentUploader label="PAN Card" />
        </View>

        <Button 
          title="Complete Enrollment" 
          onPress={handleSubmit(onSubmit)} 
          loading={loading}
        />
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

const DocumentUploader = ({ label }: { label: string }) => (
  <TouchableOpacity className="flex-1 bg-dark-card border border-dashed border-primary/40 rounded-2xl p-4 items-center justify-center aspect-square">
    <View className="bg-primary/10 p-3 rounded-full mb-2">
      <Upload size={24} color={COLORS.primary} />
    </View>
    <Text variant="small" weight="semibold" align="center">{label}</Text>
    <Text variant="small" color={COLORS.textMuted} align="center" className="mt-1">Tap to upload</Text>
  </TouchableOpacity>
);

export default JoinSchemeScreen;