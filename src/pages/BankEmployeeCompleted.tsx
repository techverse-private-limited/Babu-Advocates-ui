import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Search, CheckCircle, Download, Filter, DollarSign, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BankEmployeeSidebar } from "@/components/BankEmployeeSidebar";

const BankEmployeeCompleted = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Sample completed documents with payment status
  const completedDocuments = [
    {
      id: "DOC001",
      caseId: "CASE001",
      applicationType: "Loan Legal Opinion",
      applicantName: "ABC Enterprises",
      submittedDate: "2024-01-10",
      completedDate: "2024-01-15",
      advocateName: "Ramesh Kumar",
      amount: 50000,
      paymentStatus: "Completed",
      paymentDate: "2024-01-16",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN123456789",
      status: "Approved"
    },
    {
      id: "DOC002", 
      caseId: "CASE002",
      applicationType: "Loan Recovery",
      applicantName: "XYZ Corp",
      submittedDate: "2024-01-08",
      completedDate: "2024-01-14",
      advocateName: "Priya Sharma",
      amount: 35000,
      paymentStatus: "Pending",
      paymentDate: null,
      paymentMethod: null,
      transactionId: null,
      status: "Approved"
    },
    {
      id: "DOC003",
      caseId: "CASE003", 
      applicationType: "Legal Opinion",
      applicantName: "Tech Solutions",
      submittedDate: "2024-01-05",
      completedDate: "2024-01-13",
      advocateName: "Suresh Patel",
      amount: 75000,
      paymentStatus: "Completed",
      paymentDate: "2024-01-14",
      paymentMethod: "UPI",
      transactionId: "UPI987654321",
      status: "Approved"
    },
    {
      id: "DOC004",
      caseId: "CASE004",
      applicationType: "Loan Agreement",
      applicantName: "Retail Solutions",
      submittedDate: "2024-01-12",
      completedDate: "2024-01-17",
      advocateName: "Anjali Gupta",
      amount: 42000,
      paymentStatus: "Failed",
      paymentDate: null,
      paymentMethod: null,
      transactionId: null,
      status: "Approved"
    },
    {
      id: "DOC005",
      caseId: "CASE005",
      applicationType: "Document Verification",
      applicantName: "Manufacturing Ltd",
      submittedDate: "2024-01-01",
      completedDate: "2024-01-11",
      advocateName: "Vikram Singh",
      amount: 28000,
      paymentStatus: "Completed",
      paymentDate: "2024-01-12",
      paymentMethod: "NEFT",
      transactionId: "NEFT321654987",
      status: "Approved"
    }
  ];

  // Filter documents based on search and filters
  const filteredDocuments = completedDocuments.filter(doc => {
    const matchesSearch = searchTerm === "" || 
      doc.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.applicationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.advocateName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || doc.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPayment = paymentFilter === "all" || doc.paymentStatus.toLowerCase() === paymentFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case "approved":
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Approved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Completed</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleDownload = () => {
    // Create CSV content
    const headers = ["Application Number", "Application Type", "Applicant Name", "Amount", "Payment Status", "Payment Date", "Payment Method", "Transaction ID", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredDocuments.map(doc => [
        doc.id,
        doc.applicationType,
        doc.applicantName,
        doc.amount,
        doc.paymentStatus,
        doc.paymentDate || "N/A",
        doc.paymentMethod || "N/A",
        doc.transactionId || "N/A",
        doc.status
      ].join(","))
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `completed_documents_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalAmount = filteredDocuments
    .filter(d => d.paymentStatus.toLowerCase() === 'completed')
    .reduce((sum, doc) => sum + doc.amount, 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-bank-light">
        <BankEmployeeSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-6 gap-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="flex justify-between items-center flex-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center">
                  <FileCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Completed Documents</h1>
                  <p className="text-sm text-muted-foreground">All approved applications with payment status</p>
                </div>
              </div>
              
              <Button 
                onClick={handleDownload}
                className="bg-bank-success hover:bg-bank-success/90"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="px-6 py-8">

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/80">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-6 w-6 text-bank-success" />
                      <h3 className="font-semibold text-muted-foreground">Total Approved</h3>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{filteredDocuments.length}</p>
                    <p className="text-sm text-muted-foreground mt-1">Applications approved</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/80">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-6 w-6 text-emerald-600" />
                      <h3 className="font-semibold text-muted-foreground">Payment Received</h3>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600">₹{totalAmount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground mt-1">Total amount paid</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/80">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileCheck className="h-6 w-6 text-bank-navy" />
                      <h3 className="font-semibold text-muted-foreground">Payment Rate</h3>
                    </div>
                    <p className="text-2xl font-bold text-bank-navy">
                      {Math.round((filteredDocuments.filter(d => d.paymentStatus === 'Completed').length / filteredDocuments.length) * 100)}%
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Successful payments</p>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <Card className="mb-6 border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-bank-navy" />
                    <span>Filter Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search by applicant, type, case ID, or advocate..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Payment Status</label>
                      <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Payments</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents Table */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle>Completed Applications</CardTitle>
                  <CardDescription>
                    All approved applications with their payment status and details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Application Number</TableHead>
                          <TableHead>Application Type</TableHead>
                          <TableHead>Applicant Name</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Completed Date</TableHead>
                          <TableHead>Payment Status</TableHead>
                          <TableHead>Payment Method</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDocuments.map((doc) => (
                          <TableRow key={doc.id} className="hover:bg-muted/50 transition-colors">
                            <TableCell className="font-medium text-bank-navy">{doc.id}</TableCell>
                            <TableCell>{doc.applicationType}</TableCell>
                            <TableCell>{doc.applicantName}</TableCell>
                            <TableCell className="font-semibold">₹{doc.amount.toLocaleString()}</TableCell>
                            <TableCell>{new Date(doc.completedDate).toLocaleDateString()}</TableCell>
                            <TableCell>{getPaymentStatusBadge(doc.paymentStatus)}</TableCell>
                            <TableCell>{doc.paymentMethod || "N/A"}</TableCell>
                            <TableCell>{getStatusBadge(doc.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {filteredDocuments.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>No completed documents found matching your criteria</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BankEmployeeCompleted;