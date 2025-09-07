import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { History, FileText, Calendar, User, DollarSign, CheckCircle, XCircle, Eye, Building2, ArrowUpDown } from "lucide-react";
import { EmployeeSidebar } from "@/components/EmployeeSidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

// Mock data for completed applications
const mockCompletedApplications = [
  {
    id: "LA001",
    applicantName: "John Smith",
    loanType: "Personal Loan",
    amount: 50000,
    submittedDate: "2024-02-15",
    completedDate: "2024-02-28",
    status: "Approved",
    duration: "24 months",
    bank: "State Bank of India"
  },
  {
    id: "LA002",
    applicantName: "Sarah Johnson",
    loanType: "Home Loan",
    amount: 1500000,
    submittedDate: "2024-01-20",
    completedDate: "2024-02-05",
    status: "Approved",
    duration: "20 years",
    bank: "HDFC Bank"
  },
  {
    id: "LA003",
    applicantName: "Michael Brown",
    loanType: "Business Loan",
    amount: 300000,
    submittedDate: "2024-01-10",
    completedDate: "2024-01-25",
    status: "Rejected",
    duration: "5 years",
    bank: "ICICI Bank"
  },
  {
    id: "LA004",
    applicantName: "Emily Davis",
    loanType: "Vehicle Loan",
    amount: 800000,
    submittedDate: "2024-01-05",
    completedDate: "2024-01-18",
    status: "Approved",
    duration: "7 years",
    bank: "State Bank of India"
  },
  {
    id: "LA005",
    applicantName: "Robert Wilson",
    loanType: "Education Loan",
    amount: 400000,
    submittedDate: "2023-12-20",
    completedDate: "2024-01-03",
    status: "Approved",
    duration: "10 years",
    bank: "HDFC Bank"
  },
  {
    id: "LA006",
    applicantName: "Lisa Parker",
    loanType: "Personal Loan",
    amount: 75000,
    submittedDate: "2024-03-10",
    completedDate: "2024-03-20",
    status: "Approved",
    duration: "36 months",
    bank: "Axis Bank"
  },
  {
    id: "LA007",
    applicantName: "David Kumar",
    loanType: "Home Loan",
    amount: 2000000,
    submittedDate: "2024-02-01",
    completedDate: "2024-02-20",
    status: "Rejected",
    duration: "25 years",
    bank: "ICICI Bank"
  }
];

const PastApplications = () => {
  const location = useLocation();
  const [selectedBank, setSelectedBank] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Determine if this is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Get unique banks for filter
  const banks = useMemo(() => {
    const uniqueBanks = [...new Set(mockCompletedApplications.map(app => app.bank))];
    return uniqueBanks.sort();
  }, []);

  // Filter and sort applications
  const filteredAndSortedApplications = useMemo(() => {
    let filtered = mockCompletedApplications;

    // Filter by bank
    if (selectedBank !== "all") {
      filtered = filtered.filter(app => app.bank === selectedBank);
    }

    // Sort by date
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.completedDate);
      const dateB = new Date(b.completedDate);
      
      return sortOrder === "newest" 
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    return sorted;
  }, [selectedBank, sortOrder]);
  const getStatusIcon = (status: string) => {
    return status === "Approved" ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  const getStatusBadge = (status: string) => {
    return status === "Approved" ? (
      <Badge className="bg-green-100 text-green-800 border-green-200">
        Approved
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 border-red-200">
        Rejected
      </Badge>
    );
  };

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
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                      <History className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-amber-600 bg-clip-text text-transparent">Past Applications</h1>
                      <p className="text-sm text-slate-600">View completed loan applications</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="px-6 py-8">
              <Card className="bg-white/95 backdrop-blur-sm shadow-elegant border border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Completed Applications
                      </CardTitle>
                      <CardDescription>
                        Showing {filteredAndSortedApplications.length} of {mockCompletedApplications.length} applications
                      </CardDescription>
                    </div>
                    
                    {/* Sorting Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-slate-500" />
                        <Select value={selectedBank} onValueChange={setSelectedBank}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by bank" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Banks</SelectItem>
                            {banks.map((bank) => (
                              <SelectItem key={bank} value={bank}>
                                {bank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <ArrowUpDown className="h-4 w-4 text-slate-500" />
                        <Select value={sortOrder} onValueChange={(value: "newest" | "oldest") => setSortOrder(value)}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">{filteredAndSortedApplications.map((application) => (
                      <Card key={application.id} className="border border-slate-200 hover:shadow-md transition-shadow duration-200">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <h3 className="text-lg font-semibold text-slate-800">
                                    {application.applicantName}
                                  </h3>
                                  <div className="flex items-center gap-1">
                                    {getStatusIcon(application.status)}
                                    {getStatusBadge(application.status)}
                                  </div>
                                </div>
                                <div className="text-sm text-slate-500">
                                  ID: {application.id}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-slate-400" />
                                  <span className="text-slate-600 font-medium">{application.bank}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-slate-400" />
                                  <span className="text-slate-600">{application.loanType}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-slate-400" />
                                  <span className="text-slate-600">₹{application.amount.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-slate-400" />
                                  <span className="text-slate-600">Completed: {application.completedDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-slate-400" />
                                  <span className="text-slate-600">Duration: {application.duration}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="ml-4">
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PastApplications;