import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Filter, Building2, FileText, User, Calendar, CreditCard, RefreshCw } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { EmployeeSidebar } from "@/components/EmployeeSidebar";
import { AppSidebar } from "@/components/AppSidebar";

const LoanApplications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [applicationTypeFilter, setApplicationTypeFilter] = useState("all");

  // Sample loan application data
  const loanApplications = [
    {
      id: "LA001",
      applicationNumber: "LA-2024-001",
      name: "Rajesh Kumar Singh",
      bankName: "State Bank of India",
      amount: "₹15,00,000",
      status: "Under Review",
      date: "2024-01-15",
      loanType: "Home Loan",
      applicationType: "Loan Application"
    },
    {
      id: "LA002", 
      applicationNumber: "LA-2024-002",
      name: "Priya Sharma",
      bankName: "HDFC Bank",
      amount: "₹8,50,000",
      status: "Approved",
      date: "2024-01-18",
      loanType: "Personal Loan",
      applicationType: "Loan Application"
    },
    {
      id: "LA003",
      applicationNumber: "LA-2024-003", 
      name: "Amit Patel",
      bankName: "ICICI Bank",
      amount: "₹25,00,000",
      status: "Pending Documents",
      date: "2024-01-20",
      loanType: "Business Loan",
      applicationType: "Loan Recovery"
    },
    {
      id: "LA004",
      applicationNumber: "LA-2024-004",
      name: "Sunita Verma",
      bankName: "Axis Bank", 
      amount: "₹12,00,000",
      status: "Under Review",
      date: "2024-01-22",
      loanType: "Car Loan",
      applicationType: "Loan Application"
    },
    {
      id: "LA005",
      applicationNumber: "LA-2024-005",
      name: "Rakesh Gupta",
      bankName: "Punjab National Bank",
      amount: "₹18,75,000",
      status: "Rejected",
      date: "2024-01-25", 
      loanType: "Home Loan",
      applicationType: "Loan Recovery"
    },
    {
      id: "LA006",
      applicationNumber: "LA-2024-006",
      name: "Neha Agarwal", 
      bankName: "Kotak Mahindra Bank",
      amount: "₹6,25,000",
      status: "Approved",
      date: "2024-01-28",
      loanType: "Education Loan",
      applicationType: "Loan Recovery"
    }
  ];

  const banks = [
    "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", 
    "Punjab National Bank", "Kotak Mahindra Bank", "IndusInd Bank", "YES Bank"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Rejected": return "bg-red-100 text-red-800 border-red-200";
      case "Under Review": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending Documents": return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // Determine if this is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  const filteredApplications = loanApplications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.bankName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBank = selectedBank === "all" || app.bankName === selectedBank;
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesType = isAdminRoute || applicationTypeFilter === "all" || app.applicationType === applicationTypeFilter;
    
    return matchesSearch && matchesBank && matchesStatus && matchesType;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-legal-bg">
        {isAdminRoute ? <AppSidebar /> : <EmployeeSidebar />}
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-gradient-to-r from-white/95 to-blue-50/95 backdrop-blur-sm shadow-elegant border-b border-white/20">
            <div className="px-6">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="text-slate-600 hover:text-blue-600 transition-colors duration-200" />
                  <div className="h-6 w-px bg-slate-300"></div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">Loan Application</h1>
                      <p className="text-sm text-slate-600">Manage all loan applications</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="px-6 py-8">
        {/* Filters Section */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-card border border-white/20 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, application number, or bank..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 border-slate-200 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger className="w-48 bg-white/50 border-slate-200">
                  <Building2 className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Banks</SelectItem>
                  {banks.map(bank => (
                    <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-white/50 border-slate-200">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Pending Documents">Pending Documents</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              {!isAdminRoute && (
                <Select value={applicationTypeFilter} onValueChange={setApplicationTypeFilter}>
                  <SelectTrigger className="w-48 bg-white/50 border-slate-200">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Application Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Loan Application">Loan Application</SelectItem>
                    <SelectItem value="Loan Recovery">Loan Recovery</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((application, index) => (
            <Card 
              key={application.id} 
              className="bg-gradient-to-br from-white/95 to-blue-50/30 backdrop-blur-sm shadow-card border border-white/20 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 group cursor-pointer hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                      {application.applicationNumber}
                    </CardTitle>
                  </div>
                  <Badge className={`${getStatusColor(application.status)} font-medium px-3 py-1`}>
                    {application.status}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-slate-500" />
                    <CardDescription className="text-slate-600 font-medium">
                      {application.name}
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-slate-500" />
                    <CardDescription className="text-slate-600 font-medium">
                      {application.bankName}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Loan Amount:</span>
                    <span className="font-semibold text-emerald-600">{application.amount}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Loan Type:</span>
                    <span className="font-medium text-slate-700">{application.loanType}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2 border-t border-slate-200">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-500">Applied on {application.date}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                  size="sm"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No applications found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LoanApplications;