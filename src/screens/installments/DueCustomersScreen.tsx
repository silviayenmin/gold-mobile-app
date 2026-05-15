import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { CalendarClock, Search, Phone, Bell, CheckCircle } from "lucide-react-native";
import { Header, Card, Badge, Input, Button } from "@/components/common";
import { formatCurrency } from "@/helpers";

const MOCK_DUES = [
  {
    id: "1",
    customer: "John Doe",
    phone: "+91 9876543210",
    scheme: "Golden Future 11",
    dueAmount: 5000,
    dueDate: "2024-05-10",
    daysOverdue: 4,
  },
  {
    id: "2",
    customer: "Alice Smith",
    phone: "+91 9876543211",
    scheme: "Jewel Flexi",
    dueAmount: 2000,
    dueDate: "2024-05-15",
    daysOverdue: 0,
  },
  {
    id: "3",
    customer: "Bob Wilson",
    phone: "+91 9876543212",
    scheme: "Golden Future 11",
    dueAmount: 5000,
    dueDate: "2024-05-01",
    daysOverdue: 13,
  },
];

export const DueCustomersScreen = () => {
  return (
    <View className="flex-1 bg-background">
      <Header title="Due Monitoring" rightIcon={Bell} onRightPress={() => {}} />

      <View className="px-4 mt-2">
        <Input placeholder="Search customers..." icon={Search} />
      </View>

      <ScrollView className="px-4 mt-2" showsVerticalScrollIndicator={false}>
        <View className="bg-danger/10 border border-danger/20 rounded-2xl p-4 mb-6 flex-row items-center">
          <View className="bg-danger p-3 rounded-xl mr-4">
            <CalendarClock size={24} color="#F8FAFC" />
          </View>
          <View>
            <Text className="text-textLight font-bold">Total Overdue</Text>
            <Text className="text-danger text-xl font-bold">{formatCurrency(12000)}</Text>
            <Text className="text-slate-500 text-xs">8 customers are currently overdue</Text>
          </View>
        </View>

        <Text className="text-textLight text-lg font-bold mb-4">Pending Installments</Text>

        {MOCK_DUES.map((due) => (
          <Card key={due.id} className="mb-4">
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="text-textLight font-bold text-base">{due.customer}</Text>
                <Text className="text-slate-500 text-xs">{due.scheme}</Text>
              </View>
              {due.daysOverdue > 0 ? (
                <Badge label={`${due.daysOverdue} Days Overdue`} variant="danger" />
              ) : (
                <Badge label="Due Tomorrow" variant="warning" />
              )}
            </View>

            <View className="flex-row justify-between items-center bg-background/50 p-3 rounded-xl mb-4">
              <View>
                <Text className="text-slate-500 text-[10px] uppercase font-bold">Due Amount</Text>
                <Text className="text-primary font-bold text-lg">{formatCurrency(due.dueAmount)}</Text>
              </View>
              <View className="items-end">
                <Text className="text-slate-500 text-[10px] uppercase font-bold">Due Date</Text>
                <Text className="text-textLight font-bold">{due.dueDate}</Text>
              </View>
            </View>

            <View className="flex-row space-x-3">
              <TouchableOpacity className="bg-slate-800 flex-1 h-10 rounded-lg items-center justify-center flex-row">
                <Phone size={16} color="#D4AF37" className="mr-2" />
                <Text className="text-primary text-xs font-bold">Call</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-primary flex-1 h-10 rounded-lg items-center justify-center flex-row">
                <CheckCircle size={16} color="#0F172A" className="mr-2" />
                <Text className="text-background text-xs font-bold">Collect</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
        
        <View className="h-20" />
      </ScrollView>
    </View>
  );
};
