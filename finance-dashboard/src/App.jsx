import React from "react";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  AlertTriangle,
  Landmark,
} from "lucide-react";
import { Moon, Sun } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";






function App() {

  // const mainRef = useRef(null);

  const [darkMode, setDarkMode] = useState(true);
  const [role, setRole] = useState("admin");
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "12 Apr 2026",
      category: "Salary",
      type: "income",
      amount: 85000,
      status: "Completed",
    },
    {
      id: 2,
      date: "14 Apr 2026",
      category: "Groceries",
      type: "expense",
      amount: 4500,
      status: "Completed",
    },
    {
      id: 3,
      date: "18 Apr 2026",
      category: "Freelance",
      type: "income",
      amount: 22000,
      status: "Pending",
    },
    {
      id: 4,
      date: "21 Apr 2026",
      category: "Rent",
      type: "expense",
      amount: 18000,
      status: "Completed",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    category: "",
    type: "expense",
    amount: "",
    status: "Completed",
  });
  const [editingId, setEditingId] = useState(null);
  const [editTransaction, setEditTransaction] = useState({
    date: "",
    category: "",
    type: "income",
    amount: "",
    status: "Completed",
  });


  const dashboardRef = useRef(null);
  const transactionsRef = useRef(null);
  const insightsRef = useRef(null);
  const settingsRef = useRef(null);



  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  const savingsRate = totalIncome
    ? ((totalBalance / totalIncome) * 100).toFixed(1)
    : 0;

  const filteredTransactions = transactions.filter((tx) =>
    `${tx.date} ${tx.category} ${tx.type} ${tx.amount} ${tx.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getPercentageChange = (current, previous) => {
    if (previous === 0) return 0;
    return (((current - previous) / previous) * 100).toFixed(1);
  };



  const midPoint = Math.floor(transactions.length / 2);

  const previousTransactions = transactions.slice(midPoint);
  const currentTransactions = transactions.slice(0, midPoint);

  const previousIncomeTotal = previousTransactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const previousExpenseTotal = previousTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const previousBalance = previousIncomeTotal - previousExpenseTotal;

  const currentIncomeTotal = currentTransactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const currentExpenseTotal = currentTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const currentBalance = currentIncomeTotal - currentExpenseTotal;

  const balanceGrowth = getPercentageChange(
    currentBalance,
    previousBalance
  );

  const incomeGrowth = getPercentageChange(
    currentIncomeTotal,
    previousIncomeTotal
  );

  const expenseGrowth = getPercentageChange(
    currentExpenseTotal,
    previousExpenseTotal
  );


  const highestExpense = transactions
    .filter((tx) => tx.type === "expense")
    .sort((a, b) => b.amount - a.amount)[0];

  const balanceTrendData = transactions.map((tx, index) => ({
    month: `T${index + 1}`,
    balance:
      transactions
        .slice(0, index + 1)
        .reduce(
          (sum, item) =>
            item.type === "income"
              ? sum + item.amount
              : sum - item.amount,
          0
        ),
  }));


  const categoryData = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => {
      const existing = acc.find(
        (item) => item.name === tx.category
      );

      if (existing) {
        existing.value += tx.amount;
      } else {
        acc.push({
          name: tx.category,
          value: tx.amount,
        });
      }

      return acc;
    }, []);

  const COLORS = [
    "#10b981",
    "#ef4444",
    "#06b6d4",
    "#f59e0b",
    "#8b5cf6",
  ];


 const handleAddTransaction = () => {
  if (
    !newTransaction.date ||
    !newTransaction.category ||
    !newTransaction.amount
  ) {
    return;
  }

  const transaction = {
    id: Date.now(),
    ...newTransaction,
    amount: Number(newTransaction.amount),
  };

  setTransactions((prev) => [transaction, ...prev]);

  setNewTransaction({
    date: "",
    category: "",
    type: "expense",
    amount: "",
    status: "Completed",
  });

  setOpen(false);
};

const handleEditClick = (tx) => {
  setEditingId(tx.id);

  setEditTransaction({
    date: tx.date,
    category: tx.category,
    type: tx.type,
    amount: tx.amount,
    status: tx.status,
  });

  setOpen(true);
};

const handleEditTransaction = () => {
  setTransactions((prev) =>
    prev.map((tx) =>
      tx.id === editingId
        ? {
            ...tx,
            ...editTransaction,
            amount: Number(editTransaction.amount),
          }
        : tx
    )
  );

  setEditingId(null);

  setEditTransaction({
    date: "",
    category: "",
    type: "expense",
    amount: "",
    status: "Completed",
  });

  setOpen(false);
};




  return (

    <div
      className={`h-screen overflow-hidden transition-colors duration-300 ${darkMode
        ? "bg-slate-950 text-white"
        : "bg-slate-200 text-slate-900"
        }`}
    >
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] border-b px-6 flex items-center justify-between transition-colors duration-300 ${darkMode
          ? "border-slate-800 bg-slate-950"
          : "bg-slate-200 text-slate-900"
          }`}
      >
        <div
          className={`text-xl font-semibold transition-colors duration-300 ${darkMode ? "text-slate-300" : "text-slate-900"
            }`}
        >
          FinSight
        </div>

        <div className="flex items-center gap-4">
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger
              className={`h-10 w-32 rounded-xl ${darkMode
                ? "border-slate-700 bg-slate-900 text-white"
                : "border-slate-300 bg-slate-200 text-slate-900"
                }`}
            >
              <SelectValue placeholder="Select role" />
            </SelectTrigger>

            <SelectContent
              className={
                darkMode
                  ? "border-slate-700 bg-slate-900 text-white"
                  : "border-slate-300 bg-slate-200 text-slate-900"
              }
            >
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setDarkMode(!darkMode)}
            className={`rounded-full ${darkMode
              ? "border-slate-700 bg-slate-900 text-white hover:bg-slate-800"
              : "border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
              }`}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}


        {/* Dashboard Content */}
        <main className="mt-[72px] h-[calc(100vh-72px)] overflow-y-auto p-6 space-y-6 w-full">
          {/* Summary Cards */}
          <section ref={dashboardRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Total Balance */}
            <Card
              className={`min-h-[120px] h-auto rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
                ? "border-slate-800 bg-slate-900 text-white"
                : "border-slate-300 bg-slate-200 text-slate-900"
                }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  Total Balance
                </CardTitle>
                <Wallet className="h-5 w-5 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <h2 className="text-3xl font-bold">₹{totalBalance.toLocaleString()}</h2>
                <p className="mt-2 text-xs text-emerald-400">
                  {balanceGrowth > 0 ? "+" : ""}
                  {balanceGrowth}% from last month
                </p>
              </CardContent>
            </Card>

            {/* Monthly Income */}
            <Card
              className={`min-h-[120px] h-auto rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
                ? "border-slate-800 bg-slate-900 text-white"
                : "border-slate-300 bg-slate-200 text-slate-900"
                }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  Monthly Income
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <h2 className="text-3xl font-bold">₹{totalIncome.toLocaleString()}</h2>
                <p className="mt-2 text-xs text-emerald-400">
                  {incomeGrowth > 0 ? "+" : ""}
                  {incomeGrowth}% from last month
                </p>
              </CardContent>
            </Card>

            {/* Monthly Expenses */}
            <Card
              className={`min-h-[120px] h-auto rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
                ? "border-slate-800 bg-slate-900 text-white"
                : "border-slate-300 bg-slate-200 text-slate-900"
                }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  Monthly Expenses
                </CardTitle>
                <TrendingDown className="h-5 w-5 text-red-400" />
              </CardHeader>
              <CardContent>
                <h2 className="text-3xl font-bold">₹{totalExpenses.toLocaleString()}</h2>
                <p className="mt-2 text-xs text-red-400">
                  {expenseGrowth > 0 ? "+" : ""}
                  {expenseGrowth}% from last month
                </p>
              </CardContent>
            </Card>

            {/* Savings Rate */}
            <Card
              className={`min-h-[120px] h-auto rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
                ? "border-slate-800 bg-slate-900 text-white"
                : "border-slate-300 bg-slate-200 text-slate-900"
                }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  Savings Rate
                </CardTitle>
                <PiggyBank className="h-5 w-5 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <h2 className="text-3xl font-bold">{savingsRate}%</h2>
                <p className="mt-2 text-xs text-cyan-400">
                  ₹{totalBalance.toLocaleString()} saved this month
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Charts Balance Trend*/}
          <Card
            className={`col-span-8 h-[360px] rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
              ? "border-slate-800 bg-slate-900 text-white"
              : "border-slate-300 bg-slate-200 text-slate-900"
              }`}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">
                Balance Trend
              </CardTitle>
              <p className="text-sm text-slate-400">
                Last 6 months account growth overview
              </p>
            </CardHeader>

            <CardContent className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={balanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#94a3b8"} />
                  <XAxis dataKey="month" stroke={darkMode ? "#94a3b8" : "#94a3b8"} />
                  <YAxis stroke={darkMode ? "#94a3b8" : "#94a3b8"} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#0f172a" : "#e2e8f0",
                      border: darkMode
                        ? "1px solid #334155"
                        : "1px solid #94a3b8",
                      borderRadius: "12px",
                      color: darkMode ? "#fff" : "#0f172a",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>



          {/* Category Distribution */}
          <section className="grid grid-cols-1 gap-6">
            <Card
              className={`w-full h-[420px] rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
                  ? "border-slate-800 bg-slate-900 text-white"
                  : "border-slate-300 bg-slate-200 text-slate-900"
                }`}
            >
              <CardHeader>
                <CardTitle
                  className={darkMode ? "text-white" : "text-slate-900"}
                >
                  Spending Breakdown
                </CardTitle>
                <p
                  className={
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }
                >
                  Expense distribution by category
                </p>
              </CardHeader>

              <CardContent className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {categoryData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode
                          ? "#0f172a"
                          : "#e2e8f0",
                        border: darkMode
                          ? "1px solid #334155"
                          : "1px solid #94a3b8",
                        borderRadius: "12px",
                        color: darkMode ? "#fff" : "#0f172a",
                      }}
                    />

                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </section>



          {/* Transactions */}
          <section
            ref={transactionsRef}
            className={`rounded-2xl p-6 shadow-sm transition-colors duration-300 ${darkMode
              ? "border border-slate-800 bg-slate-900"
              : "border border-slate-300 bg-slate-200"
              }`}
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3
                  className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"
                    }`}
                >
                  Recent Transactions
                </h3>
                <p
                  className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                  Track your latest income and expenses
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3 w-full sm:w-auto min-w-0">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search transactions..."
                  className={`w-full sm:w-64 min-w-0 ${darkMode
                    ? "border-slate-700 bg-slate-950 text-white"
                    : "border-slate-300 bg-slate-100 text-slate-900"
                    }`}
                />
                {role === "admin" && (
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl">
                        <Plus className="mr-2 h-4 w-4" />
                        Add
                      </Button>
                    </DialogTrigger>

                    <DialogContent
                      className={
                        darkMode
                          ? "border-slate-800 bg-slate-900 text-white"
                          : "border-slate-300 bg-slate-200 text-slate-900"
                      }
                    >
                      <DialogHeader>
                        <DialogTitle>
                          {editingId ? "Edit Transaction" : "Add Transaction"}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4">
                        <Input
                          placeholder="Date"
                          value={editingId ? editTransaction.date : newTransaction.date}
                          onChange={(e) =>
                            editingId
                              ? setEditTransaction({
                                ...editTransaction,
                                date: e.target.value,
                              })
                              : setNewTransaction({
                                ...newTransaction,
                                date: e.target.value,
                              })
                          }
                        />

                        <Input
                          placeholder="Category"
                          value={editingId ? editTransaction.category : newTransaction.category}
                          onChange={(e) =>
                            editingId
                              ? setEditTransaction({
                                ...editTransaction,
                                category: e.target.value,
                              })
                              : setNewTransaction({
                                ...newTransaction,
                                category: e.target.value,
                              })
                          }
                        />

                        <Select
  value={editingId ? editTransaction.type : newTransaction.type}
  onValueChange={(value) =>
    editingId
      ? setEditTransaction({
          ...editTransaction,
          type: value,
        })
      : setNewTransaction({
          ...newTransaction,
          type: value,
        })
  }
>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem style={{ backgroundColor: "green", color: "white" }} value="income">
                              Income
                            </SelectItem>
                            <SelectItem style={{ backgroundColor: "red", color: "white" }} value="expense">
                              Expense
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <Input
                          placeholder="Amount"
                          type="number"
                          value={editingId ? editTransaction.amount : newTransaction.amount}
                          onChange={(e) =>
                            editingId
                              ? setEditTransaction({
                                ...editTransaction,
                                amount: e.target.value,
                              })
                              : setNewTransaction({
                                ...newTransaction,
                                amount: e.target.value,
                              })
                          }
                        />

                        <Button
                          onClick={editingId ? handleEditTransaction : handleAddTransaction}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                          Save Transaction
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>

            <div
              className={`rounded-xl overflow-hidden ${darkMode ? "border border-slate-800" : "border border-slate-300"
                }`}
            >
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-slate-900">
                    <TableHead className="text-slate-400">Date</TableHead>
                    <TableHead className="text-slate-400">Category</TableHead>
                    <TableHead className="text-slate-400">Type</TableHead>
                    <TableHead className="text-slate-400">Amount</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-400">Action</TableHead>
                  </TableRow>
                </TableHeader>


                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => (
                      <TableRow
                        key={tx.id}
                        className={`${darkMode
                          ? "border-slate-800 hover:bg-slate-800"
                          : "border-slate-300 hover:bg-slate-100"
                          }`}
                      >
                        <TableCell className={darkMode ? "text-white" : "text-slate-900"}>
                          {tx.date}
                        </TableCell>

                        <TableCell className={darkMode ? "text-white" : "text-slate-900"}>
                          {tx.category}
                        </TableCell>

                        <TableCell>
                          <Badge
                            className={
                              tx.type === "income"
                                ? "bg-emerald-500 text-white"
                                : "bg-red-500 text-white"
                            }
                          >
                            {tx.type === "income" ? "Income" : "Expense"}
                          </Badge>
                        </TableCell>

                        <TableCell
                          className={
                            tx.type === "income" ? "text-emerald-400" : "text-red-400"
                          }
                        >
                          {tx.type === "income" ? "+" : "-"}₹
                          {tx.amount.toLocaleString()}
                        </TableCell>

                        <TableCell>
                          <Badge variant="secondary">{tx.status}</Badge>
                        </TableCell>

                        {role === "admin" && (
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditClick(tx)}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={role === "admin" ? 6 : 5}
                        className={`h-24 text-center ${darkMode ? "text-slate-400" : "text-slate-600"
                          }`}
                      >
                        No transactions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>


              </Table>
            </div>
          </section>

          {/* Insights */}
          <section ref={insightsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Highest Spending */}
            <Card
              className={`min-h-[140px] h-auto rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
                ? "border-slate-800 bg-slate-900 text-white"
                : "border-slate-300 bg-slate-200 text-slate-900"
                }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle
                  className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                  Highest Spending
                </CardTitle>
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </CardHeader>
              <CardContent>
                <h4 className="text-xl font-semibold">{highestExpense?.category} • ₹{highestExpense?.amount.toLocaleString()}</h4>
                <p
                  className={`mt-2 text-sm ${darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                  42% of your total monthly expenses
                </p>
              </CardContent>
            </Card>

            {/* Monthly Growth */}
            <Card
              className={`min-h-[140px] h-auto rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
                ? "border-slate-800 bg-slate-900 text-white"
                : "border-slate-300 bg-slate-200 text-slate-900"
                }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle
                  className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                  Monthly Growth
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <h4 className="text-xl font-semibold">+{savingsRate}% Increase</h4>
                <p
                  className={`mt-2 text-sm ${darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                  Better balance growth than previous month
                </p>
              </CardContent>
            </Card>

            {/* Savings Opportunity */}
            <Card
              className={`min-h-[140px] h-auto rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
                ? "border-slate-800 bg-slate-900 text-white"
                : "border-slate-300 bg-slate-200 text-slate-900"
                }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle
                  className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                  Savings Opportunity
                </CardTitle>
                <Landmark className="h-5 w-5 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <h4 className="text-xl font-semibold">₹{Math.floor(totalExpenses * 0.15).toLocaleString()} Potential</h4>
                <p
                  className={`mt-2 text-sm ${darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                  Focus on recurring expenses to improve monthly savings efficiency
                </p>
              </CardContent>
            </Card>
          </section>


          {/* Settings */}
          <section
            ref={settingsRef}
            className={`rounded-2xl p-6 shadow-sm transition-colors duration-300 ${darkMode
              ? "border border-slate-800 bg-slate-900"
              : "border border-slate-300 bg-slate-200"
              }`}
          >
            <div className="space-y-4">
              <div>
                <h3
                  className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"
                    }`}
                >
                  Preferences
                </h3>
                <p
                  className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                  Quick overview of current dashboard configuration
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`rounded-xl p-4 ${darkMode ? "bg-slate-800" : "bg-slate-300"
                    }`}
                >
                  <p className="text-sm text-slate-400">Current Role</p>
                  <h4 className="mt-1 text-lg font-semibold capitalize">{role}</h4>
                </div>

                <div
                  className={`rounded-xl p-4 ${darkMode ? "bg-slate-800" : "bg-slate-300"
                    }`}
                >
                  <p className="text-sm text-slate-400">Theme Mode</p>
                  <h4 className="mt-1 text-lg font-semibold">
                    {darkMode ? "Dark" : "Light"}
                  </h4>
                </div>

                <div
                  className={`rounded-xl p-4 ${darkMode ? "bg-slate-800" : "bg-slate-300"
                    }`}
                >
                  <p className="text-sm text-slate-400">Transactions Count</p>
                  <h4 className="mt-1 text-lg font-semibold">
                    {transactions.length}
                  </h4>
                </div>
              </div>
            </div>
          </section>


        </main>
      </div>
    </div>
  );
}

export default App;