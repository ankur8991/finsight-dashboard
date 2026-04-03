import React from "react";
import { useState } from "react";
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




const balanceTrendData = [
  { month: "Jan", balance: 45000 },
  { month: "Feb", balance: 52000 },
  { month: "Mar", balance: 61000 },
  { month: "Apr", balance: 58000 },
  { month: "May", balance: 72000 },
  { month: "Jun", balance: 84500 },
];


function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [role, setRole] = useState("admin");

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
    className={`h-10 w-32 rounded-xl ${
      darkMode
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
        <aside
          className={`fixed left-0 top-[72px] z-40 h-[calc(100vh-72px)] w-[260px] border-r p-4 transition-colors duration-300 ${darkMode
              ? "border-slate-800 bg-slate-900"
              : "border-slate-300 bg-slate-200 text-slate-900"
            }`}
        >
          <nav className="space-y-3">
            {/* Active Item */}
            <div
              className={`h-11 rounded-xl px-4 flex items-center font-medium transition-colors duration-200 ${darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-slate-300 text-slate-900"
                }`}
            >
              Dashboard
            </div>

            {/* Hover Items */}
            <div
              className={`h-11 rounded-xl px-4 flex items-center cursor-pointer transition-colors duration-200 ${darkMode
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "text-slate-700 hover:bg-slate-300 hover:text-slate-900"
                }`}
            >
              Transactions
            </div>

            <div
              className={`h-11 rounded-xl px-4 flex items-center cursor-pointer transition-colors duration-200 ${darkMode
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "text-slate-700 hover:bg-slate-300 hover:text-slate-900"
                }`}
            >
              Insights
            </div>

            <div
              className={`h-11 rounded-xl px-4 flex items-center cursor-pointer transition-colors duration-200 ${darkMode
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "text-slate-700 hover:bg-slate-300 hover:text-slate-900"
                }`}
            >
              Settings
            </div>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <main className="ml-[260px] mt-[72px] h-[calc(100vh-72px)] overflow-y-auto p-6 space-y-6 w-[calc(100vw-260px)]">
          {/* Summary Cards */}
          <section className="grid grid-cols-4 gap-6">
            {/* Total Balance */}
            <Card
              className={`h-[120px] rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
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
                <h2 className="text-3xl font-bold">₹1,24,500</h2>
                <p className="mt-2 text-xs text-emerald-400">
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>

            {/* Monthly Income */}
            <Card
              className={`h-[120px] rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
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
                <h2 className="text-3xl font-bold">₹85,000</h2>
                <p className="mt-2 text-xs text-emerald-400">
                  +8.2% from last month
                </p>
              </CardContent>
            </Card>

            {/* Monthly Expenses */}
            <Card
              className={`h-[120px] rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
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
                <h2 className="text-3xl font-bold">₹42,300</h2>
                <p className="mt-2 text-xs text-red-400">
                  -3.8% from last month
                </p>
              </CardContent>
            </Card>

            {/* Savings Rate */}
            <Card
              className={`h-[120px] rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
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
                <h2 className="text-3xl font-bold">49.7%</h2>
                <p className="mt-2 text-xs text-cyan-400">
                  ₹42,700 saved this month
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

          {/* Transactions */}
          <section
            className={`rounded-2xl p-6 shadow-sm transition-colors duration-300 ${darkMode
              ? "border border-slate-800 bg-slate-900"
              : "border border-slate-300 bg-slate-200"
              }`}
          >
            <div className="mb-6 flex items-center justify-between">
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

              <div className="flex items-center gap-3">
                <Input
                  placeholder="Search transactions..."
                  className={`w-64 ${darkMode
                    ? "border-slate-700 bg-slate-950 text-white"
                    : "border-slate-300 bg-slate-100 text-slate-900"
                    }`}
                />
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl">
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
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
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow
                    className={`${darkMode
                      ? "border-slate-800 hover:bg-slate-800"
                      : "border-slate-300 hover:bg-slate-100"
                      }`}
                  >
                    <TableCell
                      className={darkMode ? "text-white" : "text-slate-900"}
                    >12 Apr 2026</TableCell>
                    <TableCell
                      className={darkMode ? "text-white" : "text-slate-900"}
                    >Salary</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-500 text-white">Income</Badge>
                    </TableCell>
                    <TableCell className="text-emerald-400">+₹85,000</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Completed</Badge>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    className={`${darkMode
                      ? "border-slate-800 hover:bg-slate-800"
                      : "border-slate-300 hover:bg-slate-100"
                      }`}
                  >
                    <TableCell
                      className={darkMode ? "text-white" : "text-slate-900"}
                    >14 Apr 2026</TableCell>
                    <TableCell
                      className={darkMode ? "text-white" : "text-slate-900"}
                    >Groceries</TableCell>
                    <TableCell>
                      <Badge className="bg-red-500 text-white">Expense</Badge>
                    </TableCell>
                    <TableCell className="text-red-400">-₹4,500</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Completed</Badge>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    className={`${darkMode
                      ? "border-slate-800 hover:bg-slate-800"
                      : "border-slate-300 hover:bg-slate-100"
                      }`}
                  >
                    <TableCell
                      className={darkMode ? "text-white" : "text-slate-900"}
                    >18 Apr 2026</TableCell>
                    <TableCell
                      className={darkMode ? "text-white" : "text-slate-900"}
                    >Freelance</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-500 text-white">Income</Badge>
                    </TableCell>
                    <TableCell className="text-emerald-400">+₹22,000</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Pending</Badge>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    className={`${darkMode
                      ? "border-slate-800 hover:bg-slate-800"
                      : "border-slate-300 hover:bg-slate-100"
                      }`}
                  >
                    <TableCell
                      className={darkMode ? "text-white" : "text-slate-900"}
                    >21 Apr 2026</TableCell>
                    <TableCell
                      className={darkMode ? "text-white" : "text-slate-900"}
                    >Rent</TableCell>
                    <TableCell>
                      <Badge className="bg-red-500 text-white">Expense</Badge>
                    </TableCell>
                    <TableCell className="text-red-400">-₹18,000</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Completed</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Insights */}
          <section className="grid grid-cols-3 gap-6">
            {/* Highest Spending */}
            <Card
              className={`h-[140px] rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
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
                <h4 className="text-xl font-semibold">Rent • ₹18,000</h4>
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
              className={`h-[140px] rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
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
                <h4 className="text-xl font-semibold">+18.6% Increase</h4>
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
              className={`h-[140px] rounded-2xl shadow-sm transition-colors duration-300 ${darkMode
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
                <h4 className="text-xl font-semibold">₹6,500 Potential</h4>
                <p
                  className={`mt-2 text-sm ${darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                  Reduce food & subscriptions spending by 15%
                </p>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;