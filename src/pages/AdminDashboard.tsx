import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Scale, FileText, LogOut, Gavel, Download, DollarSign, Building2, UserCheck, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { showToast } from "@/lib/toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState("all");
  const [bankSearch, setBankSearch] = useState("");
  const [activeMenuTab, setActiveMenuTab] = useState("");

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    showToast.success("Successfully logged out!");
    navigate('/advocate-login');
  };

  const banks = [
    { id: "all", name: "All Banks" },
    { id: "sbi", name: "State Bank of India" },
    { id: "hdfc", name: "HDFC Bank" },
    { id: "icici", name: "ICICI Bank" },
    { id: "axis", name: "Axis Bank" },
    { id: "pnb", name: "Punjab National Bank" },
    { id: "bob", name: "Bank of Baroda" },
    { id: "canara", name: "Canara Bank" },
    { id: "union", name: "Union Bank of India" },
    { id: "indian", name: "Indian Bank" },
    { id: "boi", name: "Bank of India" },
    { id: "central", name: "Central Bank of India" },
    { id: "iob", name: "Indian Overseas Bank" },
    { id: "uco", name: "UCO Bank" },
    { id: "punjab_sind", name: "Punjab & Sind Bank" },
    { id: "maharashtra", name: "Bank of Maharashtra" },
    { id: "kotak", name: "Kotak Mahindra Bank" },
    { id: "indusind", name: "IndusInd Bank" },
    { id: "yes", name: "YES Bank" },
    { id: "federal", name: "Federal Bank" },
    { id: "south_indian", name: "South Indian Bank" },
    { id: "karur_vysya", name: "Karur Vysya Bank" },
    { id: "city_union", name: "City Union Bank" },
    { id: "dcb", name: "DCB Bank" },
    { id: "rbl", name: "RBL Bank" },
    { id: "bandhan", name: "Bandhan Bank" },
    { id: "idfc", name: "IDFC FIRST Bank" },
    { id: "equitas", name: "Equitas Small Finance Bank" },
    { id: "ujjivan", name: "Ujjivan Small Finance Bank" },
    { id: "esaf", name: "ESAF Small Finance Bank" },
    { id: "au", name: "AU Small Finance Bank" },
    { id: "fincare", name: "Fincare Small Finance Bank" },
    { id: "suryoday", name: "Suryoday Small Finance Bank" },
    { id: "jana", name: "Jana Small Finance Bank" },
    { id: "northeast", name: "Northeast Small Finance Bank" },
    { id: "capital", name: "Capital Small Finance Bank" },
    { id: "unity", name: "Unity Small Finance Bank" },
    { id: "shivalik", name: "Shivalik Small Finance Bank" },
    { id: "utkarsh", name: "Utkarsh Small Finance Bank" },
    { id: "nainital", name: "Nainital Bank" }
  ];

  const monthlyBankCases = {
    sbi: 12, hdfc: 10, icici: 8, axis: 7, pnb: 5, bob: 4, canara: 4, union: 3, indian: 3,
    boi: 3, central: 2, iob: 2, uco: 2, punjab_sind: 2, maharashtra: 2, kotak: 6, indusind: 5,
    yes: 4, federal: 3, south_indian: 3, karur_vysya: 2, city_union: 2, dcb: 2, rbl: 3,
    bandhan: 2, idfc: 3, equitas: 1, ujjivan: 1, esaf: 1, au: 2, fincare: 1, suryoday: 1,
    jana: 1, northeast: 1, capital: 1, unity: 1, shivalik: 1, utkarsh: 1, nainital: 1
  };

  // Get top 5 banks by monthly cases
  const topBanks = Object.entries(monthlyBankCases)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([bankId, cases]) => ({
      id: bankId,
      name: banks.find(b => b.id === bankId)?.name || bankId,
      cases
    }));

  // Filter banks based on search
  const filteredBanks = banks
    .filter(bank => bank.id !== "all")
    .filter(bank => 
      bank.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
      bank.id.toLowerCase().includes(bankSearch.toLowerCase())
    )
    .map(bank => ({
      ...bank,
      cases: monthlyBankCases[bank.id as keyof typeof monthlyBankCases] || 0
    }))
    .sort((a, b) => b.cases - a.cases);

  const bankWiseSales = {
    sbi: { amount: 450000, cases: 45, documents: 156 },
    hdfc: { amount: 380000, cases: 38, documents: 142 },
    icici: { amount: 320000, cases: 32, documents: 118 },
    axis: { amount: 280000, cases: 28, documents: 95 },
    pnb: { amount: 210000, cases: 21, documents: 76 },
    all: { amount: 1640000, cases: 164, documents: 587 }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-legal-bg">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-gradient-to-r from-white/95 to-blue-50/95 backdrop-blur-sm shadow-elegant border-b border-white/20">
            <div className="px-6">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                  <SidebarTrigger className="text-slate-600 hover:text-blue-600 transition-colors duration-200" />
                  <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center hover-scale transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-200">
                      <Scale className="h-6 w-6 text-white transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <div className="transition-transform duration-200 group-hover:translate-x-1">
                      <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-600 group-hover:to-purple-600">Babu Advocates</h1>
                      <p className="text-sm text-slate-600 transition-colors duration-200 group-hover:text-blue-600">Admin Dashboard</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={() => navigate('/attendance')}
                    variant="ghost" 
                    className="text-slate-600 hover-scale transition-all duration-200 hover:bg-gradient-to-br hover:from-orange-50 hover:to-amber-50 hover:text-orange-600 group" 
                    title="Employee Attendance"
                  >
                    <UserCheck className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:scale-110" />
                    <span className="hidden sm:inline">Attendance</span>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        size="sm" 
                        className="bg-red-600 hover:bg-red-700 text-white border-red-600"
                      >
                        <LogOut className="h-4 w-4 mr-2 transition-transform duration-200" />
                        Logout
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You will be redirected to the login page and will need to sign in again.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                          Yes, Logout
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="px-6 py-8">
              {/* Welcome Section */}
              <div className="mb-8 animate-fade-in">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 transition-all duration-300 hover:from-purple-600 hover:via-pink-500 hover:to-orange-500 cursor-pointer">Welcome back, Admin!</h2>
                <p className="text-slate-600 transition-colors duration-200 hover:text-blue-600 cursor-pointer">Here's what's happening in your law firm today.</p>
              </div>

              {/* Dashboard Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Cases */}
                <Card className="bg-gradient-to-br from-white/95 to-blue-50/50 backdrop-blur-sm shadow-elegant border border-white/20 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 group cursor-pointer hover-scale animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Gavel className="h-6 w-6 text-blue-600 transition-all duration-300 group-hover:text-purple-600 group-hover:rotate-12 group-hover:scale-110" />
                      <h3 className="font-semibold text-slate-700 transition-colors duration-200 group-hover:text-blue-600">Total Cases</h3>
                    </div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-600 group-hover:to-blue-600 group-hover:scale-105 transform">
                      {bankWiseSales.all.cases}
                    </p>
                    <p className="text-sm text-slate-600 mt-1 transition-colors duration-200 group-hover:text-blue-500">Across all banks</p>
                  </CardContent>
                </Card>

                {/* Total Sales */}
                <Card className="bg-gradient-to-br from-white/95 to-emerald-50/30 backdrop-blur-sm shadow-elegant border border-white/20 hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-300 group cursor-pointer hover-scale animate-fade-in" style={{animationDelay: '100ms'}}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-6 w-6 text-emerald-600 transition-all duration-300 group-hover:text-green-600 group-hover:scale-110 group-hover:rotate-12" />
                      <h3 className="font-semibold text-slate-700 transition-colors duration-200 group-hover:text-emerald-600">Total Sales</h3>
                    </div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-green-600 group-hover:to-emerald-600 group-hover:scale-105 transform">
                      ₹{bankWiseSales.all.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-600 mt-1 transition-colors duration-200 group-hover:text-emerald-500">From all banks</p>
                  </CardContent>
                </Card>

                {/* Monthly Cases */}
                <Card className="bg-gradient-to-br from-white/95 to-orange-50/30 backdrop-blur-sm shadow-elegant border border-white/20 hover:shadow-2xl hover:shadow-orange-100 transition-all duration-300 group cursor-pointer hover-scale animate-fade-in" style={{animationDelay: '200ms'}}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-6 w-6 text-orange-600 transition-all duration-300 group-hover:text-amber-600 group-hover:scale-110 group-hover:rotate-6" />
                      <h3 className="font-semibold text-slate-700 transition-colors duration-200 group-hover:text-orange-600">This Month</h3>
                    </div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-amber-600 group-hover:to-orange-600 group-hover:scale-105 transform">
                      42
                    </p>
                    <p className="text-sm text-slate-600 mt-1 transition-colors duration-200 group-hover:text-orange-500">New cases</p>
                  </CardContent>
                </Card>

                {/* Total Documents */}
                <Card className="bg-gradient-to-br from-white/95 to-purple-50/30 backdrop-blur-sm shadow-elegant border border-white/20 hover:shadow-2xl hover:shadow-purple-100 transition-all duration-300 group cursor-pointer hover-scale animate-fade-in" style={{animationDelay: '300ms'}}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Download className="h-6 w-6 text-purple-600 transition-all duration-300 group-hover:text-pink-600 group-hover:rotate-12 group-hover:scale-110" />
                      <h3 className="font-semibold text-slate-700 transition-colors duration-200 group-hover:text-purple-600">Documents</h3>
                    </div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-pink-600 group-hover:to-purple-600 group-hover:scale-105 transform">
                      {bankWiseSales.all.documents}
                    </p>
                    <p className="text-sm text-slate-600 mt-1 transition-colors duration-200 group-hover:text-purple-500">Total processed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Bank-wise Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in" style={{animationDelay: '400ms'}}>
                {/* Bank Selection & Sales */}
                <Card className="bg-gradient-to-br from-white/95 to-blue-50/30 backdrop-blur-sm shadow-elegant border border-white/20 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 hover-scale">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 group">
                      <Building2 className="h-5 w-5 text-blue-600 transition-all duration-300 group-hover:text-indigo-600 group-hover:scale-110 group-hover:rotate-6" />
                      <span className="bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-600">Bank-wise Sales</span>
                    </CardTitle>
                    <CardDescription className="text-slate-600 transition-colors duration-200 group-hover:text-blue-600">Select a bank to view detailed metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select value={selectedBank} onValueChange={setSelectedBank}>
                      <SelectTrigger className="w-full hover:border-blue-400 hover:shadow-md transition-all duration-200 group">
                        <SelectValue placeholder="Select a bank" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm border border-blue-100">
                        {banks.map((bank) => (
                          <SelectItem key={bank.id} value={bank.id} className="hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
                            {bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-4 rounded-lg border border-blue-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 space-y-3 group">
                      <div className="flex items-center justify-between p-2 rounded hover:bg-white/50 transition-all duration-200">
                        <span className="text-sm font-medium text-slate-600 transition-colors duration-200 group-hover:text-slate-700">Revenue</span>
                        <span className="text-lg font-bold text-emerald-600 transition-all duration-200 group-hover:scale-105 transform">
                          ₹{bankWiseSales[selectedBank as keyof typeof bankWiseSales]?.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded hover:bg-white/50 transition-all duration-200">
                        <span className="text-sm font-medium text-slate-600 transition-colors duration-200 group-hover:text-slate-700">Cases</span>
                        <span className="text-lg font-bold text-blue-600 transition-all duration-200 group-hover:scale-105 transform">
                          {bankWiseSales[selectedBank as keyof typeof bankWiseSales]?.cases}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded hover:bg-white/50 transition-all duration-200">
                        <span className="text-sm font-medium text-slate-600 transition-colors duration-200 group-hover:text-slate-700">Documents</span>
                        <span className="text-lg font-bold text-purple-600 transition-all duration-200 group-hover:scale-105 transform">
                          {bankWiseSales[selectedBank as keyof typeof bankWiseSales]?.documents}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Bank-wise Cases */}
                <Card className="bg-gradient-to-br from-white/95 to-emerald-50/30 backdrop-blur-sm shadow-elegant border border-white/20 hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-300 hover-scale">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 group">
                      <Gavel className="h-5 w-5 text-emerald-600 transition-all duration-300 group-hover:text-green-600 group-hover:rotate-12 group-hover:scale-110" />
                      <span className="bg-gradient-to-r from-slate-800 to-emerald-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-emerald-600 group-hover:to-green-600">Monthly Cases by Bank</span>
                    </CardTitle>
                    <CardDescription className="text-slate-600 transition-colors duration-200 group-hover:text-emerald-600">Top 5 banks with search for others</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Search Input */}
                    <div className="relative group">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400 transition-colors duration-200 group-hover:text-emerald-500" />
                      <Input
                        placeholder="Search banks..."
                        value={bankSearch}
                        onChange={(e) => setBankSearch(e.target.value)}
                        className="pl-10 bg-white/80 backdrop-blur-sm border-slate-200 focus:border-emerald-400 hover:border-emerald-300 transition-all duration-200 focus:shadow-md focus:shadow-emerald-100"
                      />
                    </div>

                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {bankSearch ? (
                        // Show filtered search results
                        filteredBanks.length > 0 ? (
                          filteredBanks.map((bank, index) => (
                            <div 
                              key={bank.id} 
                              className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-lg hover:from-blue-50 hover:to-blue-100 transition-all duration-200 hover:shadow-md hover:scale-[1.02] transform group cursor-pointer"
                              style={{animationDelay: `${index * 50}ms`}}
                            >
                              <span className="text-sm font-medium text-slate-700 transition-colors duration-200 group-hover:text-blue-700">{bank.name}</span>
                              <Badge variant="secondary" className="bg-blue-600 text-white transition-all duration-200 group-hover:bg-blue-700 group-hover:scale-110 transform">{bank.cases}</Badge>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-slate-500 animate-fade-in">No banks found matching your search.</div>
                        )
                      ) : (
                        // Show top 5 banks by default
                        topBanks.map((bank, index) => (
                          <div 
                            key={bank.id} 
                            className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-lg hover:from-blue-50 hover:to-blue-100 transition-all duration-200 hover:shadow-md hover:scale-[1.02] transform group cursor-pointer animate-fade-in"
                            style={{animationDelay: `${index * 100}ms`}}
                          >
                            <span className="text-sm font-medium text-slate-700 transition-colors duration-200 group-hover:text-blue-700">{bank.name}</span>
                            <Badge variant="secondary" className="bg-blue-600 text-white transition-all duration-200 group-hover:bg-blue-700 group-hover:scale-110 transform">{bank.cases}</Badge>
                          </div>
                        ))
                      )}
                    </div>
                    
                    {!bankSearch && (
                      <div className="text-center pt-2 animate-fade-in" style={{animationDelay: '500ms'}}>
                        <p className="text-xs text-slate-500 transition-colors duration-200 hover:text-emerald-600 cursor-default">Showing top 5 banks. Use search to find others.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;