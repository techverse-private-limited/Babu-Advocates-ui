import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BankEmployeeSidebar } from "@/components/BankEmployeeSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, Send, Reply, Plus, Calendar, User, FileText } from "lucide-react";
import { useState } from "react";

// Mock data for received queries
const receivedQueries = [
  {
    id: "Q001",
    applicationNo: "APP001",
    applicantName: "John Doe",
    loanType: "Home Loan",
    queryText: "Additional income proof required for loan processing. Please provide latest 3 months salary slips.",
    fromBank: "HDFC Bank",
    receivedDate: "2024-01-15",
    status: "Pending Reply",
    priority: "High"
  },
  {
    id: "Q002", 
    applicationNo: "APP002",
    applicantName: "Jane Smith",
    loanType: "Personal Loan",
    queryText: "Property valuation report needs verification. Please confirm property address.",
    fromBank: "SBI",
    receivedDate: "2024-01-14",
    status: "Replied",
    priority: "Medium"
  },
  {
    id: "Q003",
    applicationNo: "APP003",
    applicantName: "Mike Johnson",
    loanType: "Car Loan",
    queryText: "Insurance policy details missing. Please provide comprehensive car insurance documents.",
    fromBank: "ICICI Bank",
    receivedDate: "2024-01-12",
    status: "Pending Reply",
    priority: "Low"
  }
];

// Mock data for sent queries
const sentQueries = [
  {
    id: "SQ001",
    applicationNo: "APP004",
    applicantName: "Sarah Wilson",
    loanType: "Business Loan",
    queryText: "What is the maximum loan tenure available for business loans?",
    toBank: "Axis Bank",
    sentDate: "2024-01-10",
    status: "Replied",
    reply: "Maximum tenure is 10 years for business loans."
  },
  {
    id: "SQ002",
    applicationNo: "APP005", 
    applicantName: "Robert Brown",
    loanType: "Home Loan",
    queryText: "Can we get pre-approval for this home loan application?",
    toBank: "HDFC Bank",
    sentDate: "2024-01-08",
    status: "Pending",
    reply: null
  }
];

const getPriorityBadge = (priority: string) => {
  const config = {
    "High": "bg-red-100 text-red-800",
    "Medium": "bg-yellow-100 text-yellow-800", 
    "Low": "bg-green-100 text-green-800"
  };
  return <Badge className={config[priority as keyof typeof config]}>{priority}</Badge>;
};

const getStatusBadge = (status: string) => {
  const config = {
    "Pending Reply": "bg-orange-100 text-orange-800",
    "Replied": "bg-green-100 text-green-800",
    "Pending": "bg-yellow-100 text-yellow-800"
  };
  return <Badge className={config[status as keyof typeof config]}>{status}</Badge>;
};

export default function BankEmployeeQueries() {
  const [selectedQuery, setSelectedQuery] = useState<any>(null);
  const [replyText, setReplyText] = useState("");
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newQuery, setNewQuery] = useState({
    applicationNo: "",
    queryText: "",
    toBank: "",
    priority: ""
  });

  const handleReply = () => {
    // Handle reply logic here
    setIsReplyDialogOpen(false);
    setReplyText("");
    setSelectedQuery(null);
  };

  const handleCreateQuery = () => {
    // Handle create query logic here
    setIsCreateDialogOpen(false);
    setNewQuery({
      applicationNo: "",
      queryText: "",
      toBank: "",
      priority: ""
    });
  };

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
                <h1 className="text-2xl font-bold text-gray-900">Queries</h1>
                <p className="text-gray-600">Manage received and sent queries</p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6 bg-gray-50">
            <Tabs defaultValue="received" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="received">Received Queries</TabsTrigger>
                <TabsTrigger value="sent">Sent Queries</TabsTrigger>
              </TabsList>

              {/* Received Queries Tab */}
              <TabsContent value="received" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Received Queries</h2>
                  <div className="text-sm text-gray-600">
                    {receivedQueries.filter(q => q.status === "Pending Reply").length} pending replies
                  </div>
                </div>

                <div className="grid gap-4">
                  {receivedQueries.map((query) => (
                    <Card key={query.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg">Query #{query.id}</CardTitle>
                              {getPriorityBadge(query.priority)}
                              {getStatusBadge(query.status)}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                App: {query.applicationNo}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {query.applicantName}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(query.receivedDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <CardDescription>
                          {query.fromBank} | <strong>Loan Type:</strong> {query.loanType}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">{query.queryText}</p>
                          </div>
                          
                          {query.status === "Pending Reply" && (
                            <Button 
                              onClick={() => {
                                setSelectedQuery(query);
                                setIsReplyDialogOpen(true);
                              }}
                              className="gap-2"
                            >
                              <Reply className="h-4 w-4" />
                              Reply to Query
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Sent Queries Tab */}
              <TabsContent value="sent" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Sent Queries</h2>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Query
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Create New Query</DialogTitle>
                        <DialogDescription>
                          Send a query to the bank regarding a loan application.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="applicationNo">Application Number</Label>
                          <Input
                            id="applicationNo"
                            value={newQuery.applicationNo}
                            onChange={(e) => setNewQuery({...newQuery, applicationNo: e.target.value})}
                            placeholder="Enter application number"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="toBank">To Bank</Label>
                          <Select onValueChange={(value) => setNewQuery({...newQuery, toBank: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select bank" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hdfc">HDFC Bank</SelectItem>
                              <SelectItem value="sbi">SBI</SelectItem>
                              <SelectItem value="icici">ICICI Bank</SelectItem>
                              <SelectItem value="axis">Axis Bank</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select onValueChange={(value) => setNewQuery({...newQuery, priority: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="queryText">Query Details</Label>
                          <Textarea
                            id="queryText"
                            value={newQuery.queryText}
                            onChange={(e) => setNewQuery({...newQuery, queryText: e.target.value})}
                            placeholder="Enter your query details..."
                            rows={4}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateQuery} className="gap-2">
                          <Send className="h-4 w-4" />
                          Send Query
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-4">
                  {sentQueries.map((query) => (
                    <Card key={query.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg">Query #{query.id}</CardTitle>
                              {getStatusBadge(query.status)}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                App: {query.applicationNo}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {query.applicantName}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(query.sentDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <CardDescription>
                          {query.toBank} | <strong>Loan Type:</strong> {query.loanType}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">{query.queryText}</p>
                          </div>
                          
                          {query.reply && (
                            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                              <h4 className="font-medium text-green-800 mb-2">Bank Reply:</h4>
                              <p className="text-green-700">{query.reply}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Reply Dialog */}
            <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Reply to Query</DialogTitle>
                  <DialogDescription>
                    Reply to query #{selectedQuery?.id} for application {selectedQuery?.applicationNo}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Original Query:</h4>
                    <p className="text-gray-700">{selectedQuery?.queryText}</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reply">Your Reply</Label>
                    <Textarea
                      id="reply"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Enter your reply..."
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleReply} className="gap-2">
                    <Send className="h-4 w-4" />
                    Send Reply
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}