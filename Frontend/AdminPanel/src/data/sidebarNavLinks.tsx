import { BookUser, Clapperboard, Handshake, Headset, House, KeyRound, Layers, LayoutDashboard, LayoutTemplate, Settings } from "lucide-react";

export const SIDEBAR_NAV_LINKS = [
  {
    label: "Dashboard",
    link: "/",
    Icon: <LayoutDashboard />
  },
  {
    label: "Ana səhifə",
    link: "/home",
    Icon: <House />
  },
  {
    label: "Haqqımızda",
    link: "/about",
    Icon: <Headset />
  },
  {
    label: "Xidmətlərimiz",
    link: "/services",
    Icon: <Settings />
  },
  {
    label: "Layihələrimiz",
    link: "/projects",
    Icon: <Layers />
  },
  {
    label: "Studiya",
    link: "/studio",
    Icon: <Clapperboard />
  },
  {
    label: "Partnyorlar",
    link: "/partners",
    Icon: <Handshake />
  },
  {
    label: "Blog",
    link: "/blogs",
    Icon: <LayoutTemplate />
  },
  {
    label: "Əlaqə",
    link: "/contact",
    Icon: <BookUser />
  },
  {
    label: "Auth",
    link: "/auth",
    Icon: <KeyRound/>
  },
]