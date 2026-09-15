import {
  LayoutDashboard,
  User,
  BookOpen,
  Calendar,
  ClipboardList,
  BarChart3,
  CheckSquare,
  MessageSquare,
  Settings,
  Users,
  Wallet,
  FileText,
  GraduationCap,
  Building2,
  Shield,
  Bell,
  type LucideIcon,
} from "lucide-react";

export type PortalLink = { label: string; href: string; Icon: LucideIcon };

export const studentPortalNav: PortalLink[] = [
  { label: "Dashboard", href: "/portal/student", Icon: LayoutDashboard },
  { label: "My Profile", href: "/portal/student/profile", Icon: User },
  { label: "Timetable", href: "/portal/student/timetable", Icon: Calendar },
  { label: "Assignments", href: "/portal/student/assignments", Icon: ClipboardList },
  { label: "Results", href: "/portal/student/results", Icon: BarChart3 },
  { label: "Attendance", href: "/portal/student/attendance", Icon: CheckSquare },
  { label: "Messages", href: "/portal/student/messages", Icon: MessageSquare },
  { label: "Settings", href: "/portal/student/settings", Icon: Settings },
];

export const parentPortalNav: PortalLink[] = [
  { label: "Dashboard", href: "/portal/parent", Icon: LayoutDashboard },
  { label: "My Children", href: "/portal/parent/children", Icon: Users },
  { label: "Academics", href: "/portal/parent/academics", Icon: BookOpen },
  { label: "Attendance", href: "/portal/parent/attendance", Icon: CheckSquare },
  { label: "Payments", href: "/portal/parent/payments", Icon: Wallet },
  { label: "Messages", href: "/portal/parent/messages", Icon: MessageSquare },
  { label: "Settings", href: "/portal/parent/settings", Icon: Settings },
];

export const staffPortalNav: PortalLink[] = [
  { label: "Dashboard", href: "/portal/staff", Icon: LayoutDashboard },
  { label: "My Classes", href: "/portal/staff/classes", Icon: BookOpen },
  { label: "Students", href: "/portal/staff/students", Icon: GraduationCap },
  { label: "Attendance", href: "/portal/staff/attendance", Icon: CheckSquare },
  { label: "Assessments", href: "/portal/staff/assessments", Icon: ClipboardList },
  { label: "Messages", href: "/portal/staff/messages", Icon: MessageSquare },
  { label: "Settings", href: "/portal/staff/settings", Icon: Settings },
];

export const adminPortalNav: PortalLink[] = [
  { label: "Dashboard", href: "/portal/admin", Icon: LayoutDashboard },
  { label: "Content", href: "/portal/admin/content", Icon: FileText },
  { label: "Site Structure", href: "/portal/admin/structure", Icon: Building2 },
  { label: "Users & Roles", href: "/portal/admin/users", Icon: Shield },
  { label: "Reports", href: "/portal/admin/reports", Icon: BarChart3 },
  { label: "Notifications", href: "/portal/admin/notifications", Icon: Bell },
  { label: "Settings", href: "/portal/admin/settings", Icon: Settings },
];

export const portalNavByRole = {
  student: studentPortalNav,
  parent: parentPortalNav,
  staff: staffPortalNav,
  admin: adminPortalNav,
};
