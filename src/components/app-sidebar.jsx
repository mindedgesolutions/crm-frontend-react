import { Building2, Settings2, Users } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";

export function AppSidebar({ ...props }) {
  const { currentUser } = useSelector((store) => store.currentUser);

  const data = {
    navMain: [
      {
        title: "Companies",
        url: `/admin/${currentUser?.user_detail?.slug}/companies`,
        icon: Building2,
        isActive: false,
      },
      {
        title: "Users",
        url: `#`,
        icon: Users,
        isActive: false,
        children: [
          {
            title: "Super Admin",
            url: `/admin/${currentUser?.user_detail?.slug}/users/super-admin`,
          },
          {
            title: "Users (Client)",
            url: `/admin/${currentUser?.user_detail?.slug}/users/client`,
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        children: [
          {
            title: "Plan Attributes",
            url: `/admin/${currentUser?.user_detail?.slug}/plan-attributes`,
          },
          {
            title: "Plans",
            url: `/admin/${currentUser?.user_detail?.slug}/plans`,
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
