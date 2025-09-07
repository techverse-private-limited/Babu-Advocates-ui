import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BankEmployeeSidebar } from "@/components/BankEmployeeSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Calendar, User, Building, Eye } from "lucide-react";

// Mock data for submitted documents
const submissions = [
  {
    id: "SUB001",
    applicantName: "John Doe",
    loanType: "Home Loan",
    amount: "₹50,00,000",
    submittedDate: "2024-01-15",
    status: "Under Review",
    documents: ["Salary Certificate", "Bank Statements", "Property Documents"]
  },
  {
    id: "SUB002",
    applicantName: "Jane Smith",
    loanType: "Personal Loan",
    amount: "₹3,00,000",
    submittedDate: "2024-01-12",
    status: "Approved",
    documents: ["Income Proof", "Identity Proof", "Address Proof"]
  },
  {
    id: "SUB003",
    applicantName: "Mike Johnson",
    loanType: "Car Loan",
    amount: "₹8,00,000",
    submittedDate: "2024-01-10",
    status: "Pending Documents",
    documents: ["Salary Slip", "Car Quotation"]
  },
  {
    id: "SUB004",
    applicantName: "Sarah Wilson",
    loanType: "Business Loan",
    amount: "₹25,00,000",
    submittedDate: "2024-01-08",
    status: "Rejected",
    documents: ["Business Plan", "Financial Statements", "GST Returns"]
  }
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    "Under Review": { variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800" },
    "Approved": { variant: "default" as const, className: "bg-green-100 text-green-800" },
    "Pending Documents": { variant: "outline" as const, className: "bg-orange-100 text-orange-800" },
    "Rejected": { variant: "destructive" as const, className: "bg-red-100 text-red-800" }
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig["Under Review"];
  
  return (
    <Badge variant={config.variant} className={config.className}>
      {status}
    </Badge>
  );
};

export default function MySubmissions() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <BankEmployeeSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Submissions</h1>
                <p className="text-gray-600">Track your submitted loan applications</p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6 bg-gray-50">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{submissions.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Under Review</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {submissions.filter(s => s.status === "Under Review").length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Approved</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {submissions.filter(s => s.status === "Approved").length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {submissions.filter(s => s.status === "Pending Documents").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Submissions Table */}
            <Card>
              <CardHeader>
                <CardTitle>Submitted Applications</CardTitle>
                <CardDescription>
                  View all your submitted loan applications and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Submission ID</TableHead>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Loan Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Submitted Date</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.id}</TableCell>
                        <TableCell>{submission.applicantName}</TableCell>
                        <TableCell>{submission.loanType}</TableCell>
                        <TableCell className="font-semibold">{submission.amount}</TableCell>
                        <TableCell>{new Date(submission.submittedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {submission.documents.map((doc, index) => (
                              <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {doc}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}