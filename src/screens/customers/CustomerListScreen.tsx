import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Search, Plus, Filter, Phone, Mail, ChevronRight } from "lucide-react-native";
import { Header, Card, Badge, Input } from "@/components/common";
import { formatCurrency } from "@/helpers";
import { Customer } from "@/interfaces";

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    address: "Chennai, India",
    joinedAt: "2024-01-10",
    status: "active",
    activeSchemes: 2,
    totalSavings: 45000,
  },
  {
    id: "2",
    name: "Alice Smith",
    email: "alice@example.com",
    phone: "+91 9876543211",
    address: "Bangalore, India",
    joinedAt: "2024-02-15",
    status: "active",
    activeSchemes: 1,
    totalSavings: 12000,
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    phone: "+91 9876543212",
    address: "Hyderabad, India",
    joinedAt: "2023-12-05",
    status: "inactive",
    activeSchemes: 0,
    totalSavings: 50000,
  },
];

export const CustomerListScreen = () => {
  const [search, setSearch] = useState("");

  const renderItem = ({ item }: { item: Customer }) => (
    <Card className="mb-4">
      <TouchableOpacity activeOpacity={0.7} className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="w-12 h-12 bg-primary/20 rounded-full items-center justify-center mr-4">
            <Text className="text-primary font-bold text-lg">{item.name.charAt(0)}</Text>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-textLight font-bold text-base">{item.name}</Text>
              <Badge label={item.status} variant={item.status === "active" ? "success" : "danger"} />
            </View>
            <View className="flex-row items-center mb-1">
              <Phone size={12} color="#64748B" className="mr-1" />
              <Text className="text-slate-400 text-xs">{item.phone}</Text>
            </View>
            <View className="flex-row items-center">
              <Mail size={12} color="#64748B" className="mr-1" />
              <Text className="text-slate-400 text-xs">{item.email}</Text>
            </View>
          </View>
        </View>
        <ChevronRight size={20} color="#64748B" className="ml-2" />
      </TouchableOpacity>
      
      <View className="h-[1px] bg-slate-800 my-3" />
      
      <View className="flex-row justify-between">
        <View>
          <Text className="text-slate-500 text-[10px] uppercase font-bold">Total Savings</Text>
          <Text className="text-primary font-bold">{formatCurrency(item.totalSavings)}</Text>
        </View>
        <View className="items-end">
          <Text className="text-slate-500 text-[10px] uppercase font-bold">Active Schemes</Text>
          <Text className="text-textLight font-bold">{item.activeSchemes}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View className="flex-1 bg-background">
      <Header 
        title="Customers" 
        rightIcon={Plus}
        onRightPress={() => {}}
      />
      
      <View className="px-4 mt-2">
        <Input
          placeholder="Search customers..."
          icon={Search}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View className="flex-1 px-4 mt-2">
        <FlashList
          data={MOCK_CUSTOMERS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))}
          renderItem={renderItem}
          estimatedItemSize={150}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-20">
              <Text className="text-slate-500">No customers found</Text>
            </View>
          }
        />
      </View>
    </View>
  );
};
