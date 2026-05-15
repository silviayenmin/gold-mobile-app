export const MOCK_GOLD_RATE = {
  price: 7250.50,
  change: 1.25,
  isUp: true,
  lastUpdated: 'Today, 10:30 AM',
};

export const MOCK_ACTIVE_SCHEMES = [
  {
    id: '1',
    name: 'Wedding Gold Savings',
    totalAmount: 120000,
    paidAmount: 45000,
    nextDueAmount: 5000,
    nextDueDate: '2026-06-05',
    progress: 0.375,
    monthsPaid: 9,
    totalMonths: 24,
  },
];

export const MOCK_AVAILABLE_SCHEMES = [
  {
    id: 's1',
    title: 'Smart Gold Plan',
    monthlyAmount: 2000,
    duration: 11,
    bonus: '1 Month Installment Free',
    description: 'Save monthly and get 1 month installment as bonus at the end of the term.',
  },
  {
    id: 's2',
    title: 'Premium Gold Saver',
    monthlyAmount: 5000,
    duration: 12,
    bonus: '0.5% Extra Weight',
    description: 'Ideal for long term savings with guaranteed extra gold weight.',
  },
  {
    id: 's3',
    title: 'Flexi Gold Chit',
    monthlyAmount: 1000,
    duration: 10,
    bonus: 'No Making Charges',
    description: 'Flexible savings with zero making charges on jewelry purchase.',
  },
];

export const MOCK_PAYMENTS = [
  {
    id: 'p1',
    schemeName: 'Wedding Gold Savings',
    amount: 5000,
    date: '2026-05-01',
    status: 'Success',
    transactionId: 'TXN123456789',
  },
  {
    id: 'p2',
    schemeName: 'Wedding Gold Savings',
    amount: 5000,
    date: '2026-04-02',
    status: 'Success',
    transactionId: 'TXN123456780',
  },
];
