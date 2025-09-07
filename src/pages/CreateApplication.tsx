import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BankEmployeeSidebar } from "@/components/BankEmployeeSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/lib/toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  CalendarIcon,
  ChevronDown,
  Upload,
  FileText,
  User,
  DollarSign,
  Clock,
  Save,
  Send,
  X
} from "lucide-react";

export default function CreateApplication() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    applicationType: "",
    borrowerName: "",
    customerId: "",
    phone: "",
    email: "",
    address: "",
    loanType: "",
    loanAmount: "",
    sanctionDate: undefined as Date | undefined,
    outstandingAmount: "",
    dueSince: undefined as Date | undefined,
    recoveryStage: "",
    additionalNotes: ""
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<Array<{name: string, type: string, size: number}>>([]);
  const [sectionsOpen, setSectionsOpen] = useState({
    borrower: true,
    recovery: false,
    documents: false
  });

  // Auto-generated application ID
  const applicationId = `APP${Date.now().toString().slice(-6)}`;
  const submissionDate = new Date();

  const loanTypes = [
    "Home Loan",
    "Personal Loan", 
    "Business Loan",
    "Vehicle Loan",
    "Education Loan",
    "Gold Loan"
  ];

  const recoveryStages = [
    "Pre-legal Notice",
    "Legal Action Initiated",
    "Court Case Filed"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const required = ['applicationType', 'borrowerName', 'customerId', 'phone', 'email', 'loanType', 'loanAmount'];
    if (formData.applicationType === 'Loan Recovery') {
      required.push('outstandingAmount', 'recoveryStage');
    }
    
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (isDraft: boolean) => {
    if (!isDraft && !validateForm()) {
      showToast.error("Please fill in all required fields.");
      return;
    }
    showToast.success(isDraft ? "Draft saved successfully!" : "Application submitted successfully!");

    navigate('/bank-employee/submissions');
  };

  const progress = formData.applicationType ? 25 + (formData.borrowerName ? 25 : 0) + (formData.loanType ? 25 : 0) + (uploadedFiles.length > 0 ? 25 : 0) : 0;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-bank-light font-kontora">
        <BankEmployeeSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-6 gap-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-foreground">Create Application</h1>
              <p className="text-sm text-muted-foreground">Submit new loan legal opinion or recovery application</p>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6 overflow-auto">
            {/* Progress Bar */}
            <Card className="border-0 shadow-card">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-bank-navy font-medium">{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Application Info */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <FileText className="h-5 w-5 text-bank-navy" />
                  Application Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Application ID</Label>
                    <Input value={applicationId} readOnly className="bg-muted/50 mt-1" />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Application Type *</Label>
                    <Select value={formData.applicationType} onValueChange={(value) => handleInputChange('applicationType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select application type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Loan Legal Opinion">Loan Legal Opinion</SelectItem>
                        <SelectItem value="Loan Recovery">Loan Recovery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Submission Date</Label>
                    <Input value={format(submissionDate, "dd/MM/yyyy")} readOnly className="bg-muted/50 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Borrower Details */}
            <Collapsible open={sectionsOpen.borrower} onOpenChange={(open) => setSectionsOpen(prev => ({...prev, borrower: open}))}>
              <Card className="border-0 shadow-card">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
                    <CardTitle className="flex items-center justify-between text-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-bank-navy" />
                        Borrower Details
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${sectionsOpen.borrower ? 'rotate-180' : ''}`} />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Full Name *</Label>
                        <Input 
                          value={formData.borrowerName}
                          onChange={(e) => handleInputChange('borrowerName', e.target.value)}
                          placeholder="Enter borrower's full name"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Customer ID / Account Number *</Label>
                        <Input 
                          value={formData.customerId}
                          onChange={(e) => handleInputChange('customerId', e.target.value)}
                          placeholder="Enter customer ID or account number"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Phone Number *</Label>
                        <Input 
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter phone number"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Email Address *</Label>
                        <Input 
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter email address"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                      <Textarea 
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter complete address"
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Loan Type *</Label>
                        <Select value={formData.loanType} onValueChange={(value) => handleInputChange('loanType', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select loan type" />
                          </SelectTrigger>
                          <SelectContent>
                            {loanTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Loan Amount *</Label>
                        <Input 
                          type="number"
                          value={formData.loanAmount}
                          onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                          placeholder="Enter loan amount"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Sanction Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal mt-1",
                                !formData.sanctionDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.sanctionDate ? format(formData.sanctionDate, "dd/MM/yyyy") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.sanctionDate}
                              onSelect={(date) => handleInputChange('sanctionDate', date)}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Loan Recovery Section - Only show if Loan Recovery is selected */}
            {formData.applicationType === 'Loan Recovery' && (
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <DollarSign className="h-5 w-5 text-bank-navy" />
                    Loan Recovery Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Outstanding Amount *</Label>
                      <Input 
                        type="number"
                        value={formData.outstandingAmount}
                        onChange={(e) => handleInputChange('outstandingAmount', e.target.value)}
                        placeholder="Enter outstanding amount"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Due Since</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal mt-1",
                              !formData.dueSince && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.dueSince ? format(formData.dueSince, "dd/MM/yyyy") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.dueSince}
                            onSelect={(date) => handleInputChange('dueSince', date)}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Recovery Stage *</Label>
                      <Select value={formData.recoveryStage} onValueChange={(value) => handleInputChange('recoveryStage', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select recovery stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {recoveryStages.map(stage => (
                            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Documents Upload */}
            <Collapsible open={sectionsOpen.documents} onOpenChange={(open) => setSectionsOpen(prev => ({...prev, documents: open}))}>
              <Card className="border-0 shadow-card">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
                    <CardTitle className="flex items-center justify-between text-foreground">
                      <div className="flex items-center gap-2">
                        <Upload className="h-5 w-5 text-bank-navy" />
                        Documents Upload
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${sectionsOpen.documents ? 'rotate-180' : ''}`} />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-bank-navy transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag & drop files here or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="mt-2"
                      >
                        Browse Files
                      </Button>
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">Uploaded Files</Label>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-bank-navy" />
                              <span className="text-sm font-medium">{file.name}</span>
                              <span className="text-xs text-muted-foreground">
                                ({(file.size / 1024).toFixed(1)} KB)
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Additional Notes */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Clock className="h-5 w-5 text-bank-navy" />
                  Additional Notes
                </CardTitle>
                <CardDescription>
                  Add any additional comments or clarifications for the application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  placeholder="Enter any additional notes, comments, or special instructions..."
                  rows={4}
                  className="resize-none"
                />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="border-0 shadow-card">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => handleSubmit(true)}
                    className="sm:w-auto w-full"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button
                    onClick={() => handleSubmit(false)}
                    className="sm:w-auto w-full bg-bank-navy hover:bg-bank-navy/90 text-white"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit to Admin
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}