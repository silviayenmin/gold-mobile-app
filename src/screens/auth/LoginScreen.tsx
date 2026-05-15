import React, { useState, useRef, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Typography';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { COLORS } from '../../constants/colors';
import { Phone, ArrowRight } from 'lucide-react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { authService } from '../../services/auth.service';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = useAuthStore((state) => state.login);

  // Standard Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleSendOtp = async () => {
    if (phoneNumber.length === 10) {
      try {
        setLoading(true);
        setError('');
        const response = await authService.sendOtp(phoneNumber);
        if (response) {
          setShowOtp(true);
          // For POC: In development, OTP is logged in backend console
          console.log('OTP response:', response);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to send OTP. Is user registered?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter a valid 10-digit number');
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) return;
    try {
      setLoading(true);
      setError('');
      const response = await authService.verifyOtp(phoneNumber, otp);
      console.log('Login Response:', response);
      if (response && response.data) {
        const token = response.data.accessToken;
        console.log('Extracted Token:', token ? 'Success' : 'Missing');
        await login(
          { 
            id: response.data.user.id.toString(), 
            name: response.data.user.fullName || 'User', 
            phoneNumber: response.data.user.mobileNumber, 
            isKycVerified: response.data.user.isKycVerified || false 
          },
          token
        );
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
          <Animated.View
            style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
            className="mt-12 mb-10"
          >
            <Text variant="h1" weight="bold" color={COLORS.primary}>
              Welcome back
            </Text>
            <Text variant="body" color={COLORS.textMuted} className="mt-2">
              Login to your gold savings account
            </Text>
          </Animated.View>

          <View className="flex-1">
            {error ? (
              <View className="bg-danger/10 p-3 rounded-xl mb-4 border border-danger/20">
                <Text variant="small" color={COLORS.danger}>{error}</Text>
              </View>
            ) : null}

            {showOtp ? (
               <View key="otp-input">
                <Input
                  label="Enter OTP"
                  placeholder="4 digit OTP"
                  keyboardType="number-pad"
                  maxLength={4}
                  value={otp}
                  onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ''))}
                />
                <Button
                  title="Verify & Login"
                  onPress={handleVerifyOtp}
                  loading={loading}
                  // disabled={otp.length < 4}
                />
                <TouchableOpacity 
                  onPress={() => setShowOtp(false)}
                  className="mt-4 items-center"
                >
                  <Text color={COLORS.primary} variant="small" weight="semibold">
                    Change Mobile Number
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (

              <View key="phone-input">
                <Input
                  label="Mobile Number"
                  placeholder="Enter 10 digit number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
                  icon={<Phone size={20} color={COLORS.primary} />}
                />
                <Button
                  title="Send OTP"
                  onPress={handleSendOtp}
                  loading={loading}
                  // disabled={phoneNumber.length < 10}
                  icon={<ArrowRight size={20} color={COLORS.white} />}
                />
              </View>
             
            ) }
          </View>

          <View className="pb-8 items-center">
            <Text variant="small" color={COLORS.textMuted}>
              By continuing, you agree to our
            </Text>
            <TouchableOpacity>
              <Text variant="small" color={COLORS.primary} weight="semibold">
                Terms of Service & Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;