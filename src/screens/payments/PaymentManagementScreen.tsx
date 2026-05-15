import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Wallet, Search, Filter, ArrowUpRight, ArrowDownLeft } from "lucide-react-native";
import { Header, Card, Badge, Input } from "@/components/common";
import { formatCurrency, formatDate } from "@/helpers";
import { Payment } from "@/interfaces";

const MOCK_PAYMENTS: Payment[] = [
  {
    id: "1",
    customerId: "1",
    customerName: "John Doe",
    schemeName: "Golden Future 11",
    amount: 5000,
    date: "2024-05-14T10:30:00Z",
    method: "upi",
    status: "success",
    transactionId: "TXN123456789",
  },
  {
    id: "2",
    customerId: "2",
    customerName: "Alice Smith",
    schemeName: "Jewel Flexi",
    amount: 2000,
    date: "2024-05-13T15:45:00Z",
    method: "card",
    status: "success",
    transactionId: "TXN123456790",
  },
  {
    id: "3",
    customerId: "3",
    customerName: "Bob Wilson",
    schemeName: "Golden Future 11",
    amount: 5000,
    date: "2024-05-12T09:15:00Z",
    method: "upi",
    status: "failed",
    transactionId: "TXN123456791",
  },
];

export const PaymentManagementScreen = () => {
  return (
    <View className="flex-1 bg-background">
      <Header title="Payments" rightIcon={Filter} onRightPress={() => {}} />

      <View className="px-4 mt-2">
        <Input placeholder="Search transactions..." icon={Search} />
      </View>

      <ScrollView className="px-4 mt-2" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between mb-4">
          <Card className="flex-1 mr-2 bg-success/10 border border-success/20">
            <Text className="text-slate-400 text-[10px] uppercase font-bold">Total Success</Text>
            <Text className="text-success text-lg font-bold">{formatCurrency(45000)}</Text>
          </Card>
          <Card className="flex-1 ml-2 bg-danger/10 border border-danger/20">
            <Text className="text-slate-400 text-[10px] uppercase font-bold">Total Failed</Text>
            <Text className="text-danger text-lg font-bold">{formatCurrency(5000)}</Text>
          </Card>
        </View>

        <Text className="text-textLight text-lg font-bold mb-4">Recent Transactions</Text>

        {MOCK_PAYMENTS.map((payment) => (
          <Card key={payment.id} className="mb-3">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className={`p-2 rounded-xl mr-3 ${payment.status === "success" ? "bg-success/10" : "bg-danger/10"}`}>
                  {payment.status === "success" ? (
                    <ArrowDownLeft size={20} color="#22C55E" />
                  ) : (
                    <ArrowUpRight size={20} color="#EF4444" />
                  )}
                </View>
                <View>
                  <Text className="text-textLight font-bold">{payment.customerName}</Text>
                  <Text className="text-slate-500 text-[10px]">{payment.schemeName}</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className={`font-bold ${payment.status === "success" ? "text-textLight" : "text-danger"}`}>
                  {formatCurrency(payment.amount)}
                </Text>
                <Text className="text-slate-500 text-[10px]">{formatDate(payment.date)}</Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-slate-800">
              <Text className="text-slate-500 text-[10px]">ID: {payment.transactionId}</Text>
              <Badge 
                label={payment.status} 
                variant={payment.status === "success" ? "success" : "danger"} 
              />
            </View>
          </Card>
        ))}
        
        <View className="h-20" />
      </ScrollView>
    </View>
  );
};
