import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  useSidebar 
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Scale,
  LayoutDashboard,
  FileText,
  Calendar,
  Search,
  BarChart3,
  Users,
  LogOut,
  RefreshCw,
  IndianRupee,
  History,
  Plus,
  UserPlus,
  Building,
  ChevronDown
} from "lucide-react";
import { showToast } from "@/lib/toast";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Loan Application",
    url: "/admin/applications",
    icon: FileText,
  },
  {
    title: "Loan Recovery",
    url: "/admin/loan-recovery",
    icon: RefreshCw,
  },
  {
    title: "Past Applications",
    url: "/admin/past-applications",
    icon: History,
  },
  {
    title: "Payment Details",
    url: "/admin/payment-details",
    icon: IndianRupee,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [createAccountsOpen, setCreateAccountsOpen] = useState(false);

  const isActive = (path: string) => currentPath === path;

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    showToast.success("Successfully logged out!");
    navigate('/advocate-login');
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900 border-r-0 flex flex-col h-full">
        {/* Menu */}
        <SidebarGroup className="flex-1 px-0 pt-6">
          <SidebarGroupLabel className="px-4 py-3 text-slate-400 text-sm font-medium uppercase tracking-wider">
            {!collapsed && "Main Menu"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="px-2">
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={`
                          flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden
                          ${active 
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25' 
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                          }
                        `}
                      >
                        <Icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'} flex-shrink-0`} />
                        {!collapsed && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              
              {/* Create Accounts Dropdown */}
              <SidebarMenuItem>
                <Collapsible open={createAccountsOpen} onOpenChange={setCreateAccountsOpen}>
                  <CollapsibleTrigger asChild>
                    <button 
                      className={`
                        flex items-center justify-between w-full px-3 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden
                        text-slate-300 hover:bg-slate-700/50 hover:text-white
                      `}
                    >
                      <div className="flex items-center">
                        <Plus className={`h-5 w-5 ${collapsed ? '' : 'mr-3'} flex-shrink-0`} />
                        {!collapsed && (
                          <span className="font-medium">Create Accounts</span>
                        )}
                      </div>
                      {!collapsed && (
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${createAccountsOpen ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent className="ml-8 mt-1 space-y-1">
                      <button 
                        className="flex items-center w-full px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700/30 rounded-md transition-all duration-200"
                        onClick={() => {/* Navigate to employee login creation */}}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Employee login for advocates
                      </button>
                      <button 
                        className="flex items-center w-full px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700/30 rounded-md transition-all duration-200"
                        onClick={() => {/* Navigate to bank login creation */}}
                      >
                        <Building className="h-4 w-4 mr-2" />
                        Bank's logins
                      </button>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Section */}
        <SidebarGroup className="px-0 pb-6">
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button 
                        className="
                          flex items-center w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 group
                        "
                      >
                        <LogOut className={`h-5 w-5 ${collapsed ? '' : 'mr-3'} flex-shrink-0`} />
                        {!collapsed && (
                          <span className="font-medium">Logout</span>
                        )}
                      </button>
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
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}