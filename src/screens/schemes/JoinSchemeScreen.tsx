import React, { useEffect, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { View, ScrollView, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { Camera, Image as ImageIcon, X, CheckCircle, AlertCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { COLORS } from '../../constants/colors';
import { ChevronLeft, Upload, User, MapPin, CreditCard, Users } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ROUTES } from '../../constants/routes';
import { schemeService } from '../../services/scheme.service';

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
  const [aadhaarDoc, setAadhaarDoc] = useState<any>(null);
  const [panDoc, setPanDoc] = useState<any>(null);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [activeUploadType, setActiveUploadType] = useState<'aadhaar' | 'pan' | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [schemeDetails, setSchemeDetails] = useState<any>(null);
  const [newCustomerSchemeId, setNewCustomerSchemeId] = useState<number | null>(null);

  const route = useRoute<any>();
  const { schemeId } = route.params || {};

  useEffect(() => {
    fetchScheme();
  }, [schemeId]);

  const fetchScheme = async () => {
    try {
      const response = await schemeService.getSchemes();
      if (response && response.data) {
        const found = response.data.find((s: any) => s.id.toString() === schemeId?.toString());
        setSchemeDetails(found);
      }
    } catch (error) {
      console.error('Failed to fetch scheme details:', error);
    }
  };

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleDocumentPick = (type: 'aadhaar' | 'pan') => {
    setActiveUploadType(type);
    setShowUploadPopup(true);
  };

  const pickImage = async (useCamera: boolean) => {
    try {
      let result;
      if (useCamera) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Camera access is required to take photos');
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          quality: 0.8,
          allowsEditing: true,
        });
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Gallery access is required to pick photos');
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          quality: 0.8,
          allowsEditing: true,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        // Create a display name
        const fileName = file.uri.split('/').pop() || 'image.jpg';
        const docInfo = { ...file, name: fileName };
        
        if (activeUploadType === 'aadhaar') {
          setAadhaarDoc(docInfo);
        } else {
          setPanDoc(docInfo);
        }
        setShowUploadPopup(false);
      }
    } catch (error) {
      console.error('Image picking error:', error);
      Alert.alert('Error', 'Failed to capture document');
    }
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        if (activeUploadType === 'aadhaar') {
          setAadhaarDoc(file);
        } else {
          setPanDoc(file);
        }
        setShowUploadPopup(false);
      }
    } catch (error) {
      console.error('Document picking error:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!aadhaarDoc || !panDoc) {
      Alert.alert('Required', 'Please upload both Aadhaar and PAN documents');
      return;
    }
    try {
      setLoading(true);
      const kycData = {
        address: data.address,
        aadhaarNumber: data.aadhaar,
        panNumber: data.pan,
        nomineeName: data.nomineeName,
        nomineeRelationship: data.nomineeRelation,
      };

      const response = await schemeService.joinScheme(schemeId, kycData);
      if (response && response.data) {
        setNewCustomerSchemeId(response.data.id);
        setShowSuccessModal(true);
      }
    } catch (error: any) {
      console.error('Join scheme error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to join scheme');
    } finally {
      setLoading(false);
    }
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
          <DocumentUploader 
            label="Aadhaar Front" 
            onPress={() => handleDocumentPick('aadhaar')}
            fileName={aadhaarDoc?.name}
          />
          <DocumentUploader 
            label="PAN Card" 
            onPress={() => handleDocumentPick('pan')}
            fileName={panDoc?.name}
          />
        </View>

        <Button 
          title="Complete Enrollment" 
          onPress={handleSubmit(onSubmit)} 
          loading={loading}
        />
        <View className="h-10" />
      </ScrollView>

      {/* Upload Popup Modal */}
      <Modal
        visible={showUploadPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowUploadPopup(false)}
      >
        <Pressable 
          className="flex-1 bg-black/60 justify-end" 
          onPress={() => setShowUploadPopup(false)}
        >
          <View 
            className="bg-dark-card rounded-t-[40px] p-8 border-t border-border"
          >
            <View className="flex-row justify-between items-center mb-8">
              <Text variant="h2" weight="bold">Upload Document</Text>
              <TouchableOpacity onPress={() => setShowUploadPopup(false)}>
                <X size={24} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between">
              <UploadOption 
                icon={<Camera size={28} color={COLORS.primary} />}
                label="Take Photo"
                onPress={() => pickImage(true)}
              />
              <UploadOption 
                icon={<ImageIcon size={28} color={COLORS.primary} />}
                label="Gallery"
                onPress={() => pickImage(false)}
              />
              <UploadOption 
                icon={<Upload size={28} color={COLORS.primary} />}
                label="Files"
                onPress={pickFile}
              />
            </View>
            
            <TouchableOpacity 
              onPress={() => setShowUploadPopup(false)}
              className="mt-8 py-4 bg-dark rounded-2xl border border-border items-center"
            >
              <Text weight="bold" color={COLORS.textMuted}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
      >
        <View className="flex-1 bg-black/80 items-center justify-center px-6">
          <View 
            className="bg-dark-card w-full p-8 rounded-3xl border border-border items-center"
          >
            <View className="w-20 h-20 rounded-full bg-success/20 items-center justify-center mb-6">
              <CheckCircle size={48} color={COLORS.success} />
            </View>
            
            <Text variant="h2" weight="bold" className="text-center">Enrollment Successful!</Text>
            
            <Text color={COLORS.textMuted} className="text-center mt-3 leading-6">
              You have successfully joined the scheme. Please proceed to pay your first installment to activate your plan.
            </Text>

            <TouchableOpacity 
              onPress={() => {
                setShowSuccessModal(false);
                navigation.replace(ROUTES.PAY_DUE, { 
                  customerSchemeId: newCustomerSchemeId,
                  isInitial: true,
                  amount: schemeDetails?.monthlyAmount
                });
              }}
              className="w-full py-4 bg-primary rounded-2xl mt-8 items-center"
            >
              <Text weight="bold" color={COLORS.white}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const UploadOption = ({ icon, label, onPress }: { icon: React.ReactNode, label: string, onPress: () => void }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="items-center w-[30%]"
  >
    <View className="w-16 h-16 bg-dark border border-border rounded-2xl justify-center items-center mb-3">
      {icon}
    </View>
    <Text variant="small" weight="semibold" color={COLORS.textMuted}>{label}</Text>
  </TouchableOpacity>
);

const DocumentUploader = ({ label, onPress, fileName }: { label: string, onPress: () => void, fileName?: string }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="flex-1 bg-dark-card border border-dashed border-primary/40 rounded-2xl p-4 items-center justify-center aspect-square"
  >
    <View className={`p-3 rounded-full mb-2 ${fileName ? 'bg-success/10' : 'bg-primary/10'}`}>
      {fileName ? (
        <View className="items-center justify-center">
          <Upload size={24} color={COLORS.success} />
        </View>
      ) : (
        <Upload size={24} color={COLORS.primary} />
      )}
    </View>
    <Text variant="small" weight="semibold" align="center">{label}</Text>
    <Text variant="small" color={fileName ? COLORS.success : COLORS.textMuted} align="center" className="mt-1" numberOfLines={1}>
      {fileName || 'Tap to upload'}
    </Text>
  </TouchableOpacity>
);

export default JoinSchemeScreen;