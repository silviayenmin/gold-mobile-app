import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Plus, Image as ImageIcon, Trash2, Edit3, ToggleLeft, ToggleRight } from "lucide-react-native";
import { Header, Card, Badge, Button } from "@/components/common";

const MOCK_BANNERS = [
  {
    id: "1",
    title: "Akshaya Tritiya Special",
    description: "Get 5% extra gold on new enrollments.",
    status: "active",
    image: "https://via.placeholder.com/400x200/D4AF37/0F172A?text=Akshaya+Tritiya",
  },
  {
    id: "2",
    title: "Refer & Earn Gold",
    description: "Refer a friend and get 0.5g gold coin.",
    status: "active",
    image: "https://via.placeholder.com/400x200/B8860B/F8FAFC?text=Refer+and+Earn",
  },
  {
    id: "3",
    title: "Diwali Bonanza",
    description: "Double your savings this Diwali.",
    status: "inactive",
    image: "https://via.placeholder.com/400x200/1E293B/D4AF37?text=Diwali+Bonanza",
  },
];

export const BannerOffersScreen = () => {
  return (
    <View className="flex-1 bg-background">
      <Header title="Banners & Offers" rightIcon={Plus} onRightPress={() => {}} />

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <Text className="text-slate-400 text-sm mb-6 mt-2">
          Manage promotional banners and special offers for the customer app.
        </Text>

        {MOCK_BANNERS.map((banner) => (
          <Card key={banner.id} className="mb-6 p-0 overflow-hidden">
            <View className="h-40 bg-slate-800 items-center justify-center">
              <ImageIcon size={40} color="#64748B" />
              <Text className="text-slate-500 text-xs mt-2">Banner Image Preview</Text>
              {/* In real app: <Image source={{ uri: banner.image }} className="w-full h-full" /> */}
            </View>
            
            <View className="p-4">
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="text-textLight text-lg font-bold">{banner.title}</Text>
                  <Text className="text-slate-400 text-xs mt-1">{banner.description}</Text>
                </View>
                <Badge 
                  label={banner.status} 
                  variant={banner.status === "active" ? "success" : "danger"} 
                />
              </View>

              <View className="h-[1px] bg-slate-800 my-4" />

              <View className="flex-row justify-between items-center">
                <TouchableOpacity className="flex-row items-center">
                  {banner.status === "active" ? (
                    <ToggleRight size={24} color="#22C55E" />
                  ) : (
                    <ToggleLeft size={24} color="#64748B" />
                  )}
                  <Text className="text-slate-400 text-xs font-bold ml-2">
                    {banner.status === "active" ? "Deactivate" : "Activate"}
                  </Text>
                </TouchableOpacity>

                <View className="flex-row space-x-3">
                  <TouchableOpacity className="bg-slate-800 p-2 rounded-lg">
                    <Edit3 size={18} color="#D4AF37" />
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-danger/10 p-2 rounded-lg">
                    <Trash2 size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card>
        ))}
        
        <View className="h-20" />
      </ScrollView>
    </View>
  );
};
