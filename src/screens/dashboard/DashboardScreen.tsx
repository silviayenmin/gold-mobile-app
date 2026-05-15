import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { 
  Users, 
  Wallet, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Plus,
  ArrowUpRight,
  Search
} from "lucide-react-native";
import { StatsCard, Card, Header, Badge } from "@/components/common";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { formatCurrency } from "@/helpers";

const RECENT_TRANSACTIONS = [
  { id: "1", customer: "John Doe", amount: 5000, date: "2024-05-14", status: "success" },
  { id: "2", customer: "Alice Smith", amount: 12000, date: "2024-05-13", status: "success" },
  { id: "3", customer: "Bob Wilson", amount: 3500, date: "2024-05-13", status: "failed" },
];

export const DashboardScreen = () => {
  return (
    <View className="flex-1 bg-background">
      <Header 
        title="Admin Dashboard" 
        rightIcon={Search}
        onRightPress={() => {}}
      />
      
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between mt-2">
          <StatsCard 
            title="Total Customers" 
            value="1,284" 
            icon={Users} 
            trend="up" 
            trendValue="+12%" 
          />
          <StatsCard 
            title="Total Collections" 
            value={formatCurrency(4580000)} 
            icon={Wallet} 
            trend="up" 
            trendValue="+8%" 
          />
          <StatsCard 
            title="Pending Dues" 
            value={formatCurrency(125000)} 
            icon={Clock} 
            iconColor="#EF4444"
            trend="down" 
            trendValue="-5%" 
          />
          <StatsCard 
            title="Active Schemes" 
            value="12" 
            icon={TrendingUp} 
            iconColor="#22C55E"
          />
        </View>

        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-textLight text-lg font-bold">Quick Actions</Text>
          </View>
          <View className="flex-row space-x-4">
            <TouchableOpacity className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex-1 items-center">
              <View className="bg-primary p-2 rounded-xl mb-2">
                <Plus size={20} color="#0F172A" />
              </View>
              <Text className="text-primary text-xs font-bold">Add Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-card rounded-2xl p-4 flex-1 items-center border border-slate-700">
              <View className="bg-slate-700 p-2 rounded-xl mb-2">
                <Wallet size={20} color="#D4AF37" />
              </View>
              <Text className="text-textLight text-xs font-bold">Collect Due</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-card rounded-2xl p-4 flex-1 items-center border border-slate-700">
              <View className="bg-slate-700 p-2 rounded-xl mb-2">
                <TrendingUp size={20} color="#D4AF37" />
              </View>
              <Text className="text-textLight text-xs font-bold">New Scheme</Text>
            </TouchableOpacity>
          </View>
        </View>

        <RevenueChart />

        <View className="mt-8 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-textLight text-lg font-bold">Recent Transactions</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-primary text-sm font-medium mr-1">View All</Text>
              <ChevronRight size={16} color="#D4AF37" />
            </TouchableOpacity>
          </View>

          {RECENT_TRANSACTIONS.map((tx) => (
            <Card key={tx.id} className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="bg-background p-3 rounded-xl mr-4">
                  <ArrowUpRight size={20} color={tx.status === "success" ? "#22C55E" : "#EF4444"} />
                </View>
                <View>
                  <Text className="text-textLight font-bold">{tx.customer}</Text>
                  <Text className="text-slate-500 text-xs">{tx.date}</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-textLight font-bold">{formatCurrency(tx.amount)}</Text>
                <Badge 
                  label={tx.status} 
                  variant={tx.status === "success" ? "success" : "danger"} 
                />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
