import React from "react";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LogIn, Mail, Lock } from "lucide-react-native";
import { Button, Input } from "@/components/common";
import { useAuthStore } from "@/store/slices/auth.slice";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginScreen = () => {
  const { login, isLoading, setLoading } = useAuthStore();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(
        {
          id: "1",
          name: "Admin User",
          email: data.email,
          role: "admin",
        },
        "fake-jwt-token"
      );
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-12">
        <View className="items-center mb-12 mt-10">
          <View className="w-20 h-20 bg-primary rounded-2xl items-center justify-center mb-6 shadow-lg shadow-primary/50">
            <LogIn size={40} color="#0F172A" />
          </View>
          <Text className="text-primary text-3xl font-bold mb-2">GoldAdmin</Text>
          <Text className="text-slate-400 text-base text-center">
            Login to your admin dashboard
          </Text>
        </View>

        <View className="space-y-4">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email Address"
                placeholder="admin@goldapp.com"
                icon={Mail}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="••••••••"
                icon={Lock}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
                secureTextEntry
              />
            )}
          />

          <Button
            title="Sign In"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            className="mt-6"
          />
        </View>

        <View className="mt-auto items-center">
          <Text className="text-slate-500 text-sm">
            Gold Saving Application v1.0.0
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
