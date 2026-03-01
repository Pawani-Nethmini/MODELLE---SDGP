export const dashboardData = {
  insights: {
    totalSpent: 1240,
    monthlyBudget: 1900,
    budgetUsedPercent: 66,
    currency: "USD",
  },
  activeOrders: [
    {
      orderId: "#1023",
      status: "Printing",
      printer: "PrintHub SL-400",
      eta: "2 days",
    },
    {
      orderId: "#1024",
      status: "Design Review",
      printer: null,
      eta: "Pending",
    },
  ],
  notifications: [
    {
      id: "n1",
      text: "Project #1023 is 50% done",
      time: "2 hours ago",
      isNew: true,
    },
    {
      id: "n2",
      text: "New quote received",
      time: "5 hours ago",
      isNew: false,
    },
    {
      id: "n3",
      text: "Designer uploaded a new revision",
      time: "8 hours ago",
      isNew: false,
    },
  ],
  feedback: [],
};

