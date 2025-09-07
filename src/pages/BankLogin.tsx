import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Landmark, Mail, Lock, ArrowLeft, Users, CreditCard, Copy, Eye, EyeOff, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import lawyerIllustration from "@/assets/lawyer-illustration.png";

const BankLogin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"manager" | "employee">("manager");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const credentials = demoCredentials[activeTab];
    if (email === credentials.email && password === credentials.password) {
      if (activeTab === "manager") {
        localStorage.setItem("bankManagerLogin", "true");
        toast.success("Welcome Bank Manager!");
        navigate("/bank-manager-dashboard");
      } else {
        localStorage.setItem("bankEmployeeLogin", "true");
        toast.success("Welcome Bank Employee!");
        navigate("/bank-employee-dashboard");
      }
    } else {
      toast.error("Invalid credentials. Please use the demo credentials provided.");
    }
  };

  const demoCredentials = {
    manager: { email: "manager@yourbank.com", password: "manager123" },
    employee: { email: "employee@yourbank.com", password: "employee123" }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Static decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-slate-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-slate-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-slate-200 rounded-full blur-3xl"></div>
      </div>
      
      {/* Back to Home - Top Left */}
      <Link to="/" className="absolute top-4 left-4 inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors z-10">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
      
      <div className="w-full max-w-2xl relative z-10 animate-fade-in">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-elegant overflow-hidden border border-white/20 animate-scale-in">
          {/* Tab Headers */}
          <div className="flex">
            <button
              onClick={() => setActiveTab("manager")}
              className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 rounded-tl-3xl ${
                activeTab === "manager"
                  ? "text-white bg-admin-blue"
                  : "text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              Bank Manager Login
            </button>
            <button
              onClick={() => setActiveTab("employee")}
              className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 rounded-tr-3xl ${
                activeTab === "employee"
                  ? "text-white bg-employee-red"
                  : "text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              Bank Employee Login
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Illustration */}
            <div className={`p-6 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300 ${
              activeTab === "manager" 
                ? "bg-gradient-to-br from-admin-blue via-admin-blue-hover to-legal-deep-blue"
                : "bg-gradient-to-br from-employee-red via-employee-red-hover to-red-700"
            }`}>
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
              
              <div className="mb-4 relative">
                <div className="w-28 h-28 bg-white rounded-xl shadow-md flex items-center justify-center mb-3 relative overflow-hidden">
                  <img 
                    src={lawyerIllustration} 
                    alt="Banking Professional" 
                    className="w-20 h-20 object-contain"
                  />
                  <div className={`absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === "manager" ? "bg-admin-blue" : "bg-employee-red"
                  }`}>
                    {activeTab === "manager" ? 
                      <Landmark className="w-3 h-3 text-white" /> : 
                      <CreditCard className="w-3 h-3 text-white" />
                    }
                  </div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              
              <h2 className="text-lg font-bold text-white mb-1 relative z-10">
                Welcome {activeTab === "manager" ? "Bank Manager!" : "Bank Employee!"}
              </h2>
              <p className="text-xs text-white/80 relative z-10">
                {activeTab === "manager" 
                  ? "Manage your banking operations and oversee legal documentation processes"
                  : "Access your employee portal and manage assigned banking tasks"
                }
              </p>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-6">
              <div className="text-center mb-4">
                <p className="text-xs text-slate-500 mb-2">
                  Use the demo credentials below to sign in
                </p>
                <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                  activeTab === "manager" ? "text-admin-blue" : "text-employee-red"
                }`}>
                  Welcome Back
                </h3>
                <p className="text-sm text-slate-600">
                  Sign in to your Legal account as {activeTab === "manager" ? "Bank Manager" : "Bank Employee"}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 transition-colors duration-200" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={activeTab === "manager" ? "manager@yourbank.com" : "employee@yourbank.com"}
                      className={`pl-10 h-10 rounded-lg border-slate-200 transition-all duration-300 hover:border-slate-300 ${
                        activeTab === "manager" 
                          ? "focus:border-admin-blue focus:ring-admin-blue"
                          : "focus:border-employee-red focus:ring-employee-red"
                      }`}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 transition-colors duration-200" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your secure password"
                      className={`pl-10 pr-10 h-10 rounded-lg border-slate-200 transition-all duration-300 hover:border-slate-300 ${
                        activeTab === "manager" 
                          ? "focus:border-admin-blue focus:ring-admin-blue"
                          : "focus:border-employee-red focus:ring-employee-red"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className={`w-full h-10 text-sm font-medium text-white rounded-lg mt-4 transition-all duration-200 ${
                    activeTab === "manager"
                      ? "bg-admin-blue hover:bg-admin-blue-hover"
                      : "bg-employee-red hover:bg-employee-red-hover"
                  }`}
                >
                  Sign In as {activeTab === "manager" ? "Bank Manager" : "Bank Employee"}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <h4 className="font-medium text-sm mb-2 text-slate-700">Demo Credentials</h4>
                <p className="text-xs text-slate-500 mb-3">
                  Use these credentials to access the application with profile-based authentication
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Email:</span>
                    <div className="flex items-center gap-1">
                      <code className="bg-white px-2 py-1 rounded text-xs text-slate-700 border">
                        {demoCredentials[activeTab].email}
                      </code>
                      <button
                        onClick={() => copyToClipboard(demoCredentials[activeTab].email, "Email")}
                        className={`p-1 transition-colors duration-200 ${
                          copiedField === "Email" 
                            ? "text-green-500" 
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {copiedField === "Email" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Password:</span>
                    <div className="flex items-center gap-1">
                      <code className="bg-white px-2 py-1 rounded text-xs text-slate-700 border">
                        {demoCredentials[activeTab].password}
                      </code>
                      <button
                        onClick={() => copyToClipboard(demoCredentials[activeTab].password, "Password")}
                        className={`p-1 transition-colors duration-200 ${
                          copiedField === "Password" 
                            ? "text-green-500" 
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {copiedField === "Password" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankLogin;