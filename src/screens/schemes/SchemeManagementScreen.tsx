import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Plus, TrendingUp, Clock, Users, Edit3, Trash2 } from "lucide-react-native";
import { Header, Card, Badge, Button } from "@/components/common";
import { formatCurrency } from "@/helpers";
import { Scheme } from "@/interfaces";

const MOCK_SCHEMES: Scheme[] = [
  {
    id: "1",
    name: "Golden Future 11",
    description: "Save for 11 months and get the 12th month free.",
    durationMonths: 11,
    monthlyAmount: 5000,
    status: "active",
    totalMembers: 450,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Jewel Flexi",
    description: "Flexible installments for gold jewelry purchase.",
    durationMonths: 12,
    monthlyAmount: 2000,
    status: "active",
    totalMembers: 120,
    createdAt: "2024-02-15",
  },
  {
    id: "3",
    name: "Retired Gold",
    description: "Special savings for senior citizens.",
    durationMonths: 24,
    monthlyAmount: 10000,
    status: "inactive",
    totalMembers: 0,
    createdAt: "2023-11-20",
  },
];

export const SchemeManagementScreen = () => {
  return (
    <View className="flex-1 bg-background">
      <Header title="Schemes" rightIcon={Plus} onRightPress={() => {}} />

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <View className="mt-4 space-y-4">
          {MOCK_SCHEMES.map((scheme) => (
            <Card key={scheme.id} className="mb-4">
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="text-primary text-lg font-bold">{scheme.name}</Text>
                  <Text className="text-slate-400 text-xs mt-1" numberOfLines={2}>
                    {scheme.description}
                  </Text>
                </View>
                <Badge 
                  label={scheme.status} 
                  variant={scheme.status === "active" ? "success" : "danger"} 
                />
              </View>

              <View className="flex-row mt-4 space-x-6">
                <View className="flex-row items-center">
                  <Clock size={14} color="#D4AF37" className="mr-1" />
                  <Text className="text-textLight text-xs font-bold">{scheme.durationMonths} Mos</Text>
                </View>
                <View className="flex-row items-center">
                  <TrendingUp size={14} color="#D4AF37" className="mr-1" />
                  <Text className="text-textLight text-xs font-bold">{formatCurrency(scheme.monthlyAmount)} / mo</Text>
                </View>
                <View className="flex-row items-center">
                  <Users size={14} color="#D4AF37" className="mr-1" />
                  <Text className="text-textLight text-xs font-bold">{scheme.totalMembers} Members</Text>
                </View>
              </View>

              <View className="h-[1px] bg-slate-800 my-4" />

              <View className="flex-row justify-end space-x-3">
                <TouchableOpacity className="bg-slate-800 p-2 rounded-lg">
                  <Edit3 size={18} color="#D4AF37" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-danger/10 p-2 rounded-lg">
                  <Trash2 size={18} color="#EF4444" />
                </TouchableOpacity>
                <Button 
                  title="View Details" 
                  onPress={() => {}} 
                  className="h-10 px-4 py-0"
                  variant="outline"
                />
              </View>
            </Card>
          ))}
        </View>
        
        <View className="h-20" />
      </ScrollView>
    </View>
  );
};
