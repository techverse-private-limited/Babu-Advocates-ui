import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, Mail, Lock, ArrowLeft, Users, Eye, EyeOff, Copy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { showToast } from "@/lib/toast";
import lawyerIllustration from "@/assets/lawyer-illustration.png";

const EmployeeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const demoCredentials = {
    email: "advocate@babuadvocates.com",
    password: "advocate123"
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === demoCredentials.email && password === demoCredentials.password) {
      showToast.success("Welcome back!");
      navigate("/employee-dashboard");
    } else {
      showToast.error("Invalid credentials. Please use the demo credentials shown below.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Back to Home - Top Left */}
      <Link to="/" className="absolute top-4 left-4 inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors z-10">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
      
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="flex">
            <Link
              to="/advocate-login"
              className="flex-1 px-6 py-4 text-center text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors font-medium rounded-tl-3xl"
            >
              Admin Login
            </Link>
            <div className="flex-1 px-6 py-4 text-center text-white bg-employee-red font-medium rounded-tr-3xl">
              Employee Login
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Illustration */}
            <div className="bg-gradient-to-br from-red-600 to-purple-700 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-pink-400/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-red-300/20 rounded-full blur-lg"></div>
              <div className="mb-4 relative">
                <div className="w-28 h-28 bg-white rounded-xl shadow-md flex items-center justify-center mb-3 relative overflow-hidden">
                  <img 
                    src={lawyerIllustration} 
                    alt="Employee illustration" 
                    className="w-20 h-20 object-contain"
                  />
                  <div className="absolute top-1 right-1 w-6 h-6 bg-employee-red rounded-full flex items-center justify-center">
                    <Users className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              <h2 className="text-lg font-bold text-white mb-1 relative z-10">Welcome Advocate!</h2>
              <p className="text-xs text-white/80 relative z-10">
                Manage your legal cases with ease
              </p>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-6">
              <div className="text-center mb-4">
                <p className="text-xs text-slate-500 mb-2">
                  Use the demo credentials below to sign in
                </p>
                <h3 className="text-xl font-bold text-employee-red mb-1">Welcome Back</h3>
                <p className="text-sm text-slate-600">
                  Sign in to your Legal account as Employee
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-10 rounded-lg border-slate-200 focus:border-employee-red focus:ring-employee-red"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-10 rounded-lg border-slate-200 focus:border-employee-red focus:ring-employee-red"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-10 text-sm font-medium bg-employee-red hover:bg-employee-red-hover text-white rounded-lg mt-4"
                >
                  Sign In as Employee Manager
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
                        {demoCredentials.email}
                      </code>
                      <button
                        onClick={() => copyToClipboard(demoCredentials.email)}
                        className="text-slate-400 hover:text-slate-600 p-1"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Password:</span>
                    <div className="flex items-center gap-1">
                      <code className="bg-white px-2 py-1 rounded text-xs text-slate-700 border">
                        {demoCredentials.password}
                      </code>
                      <button
                        onClick={() => copyToClipboard(demoCredentials.password)}
                        className="text-slate-400 hover:text-slate-600 p-1"
                      >
                        <Copy className="h-3 w-3" />
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

export default EmployeeLogin;