import { Building2, Gauge, Settings2, Users } from "lucide-react";
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
  const slug = currentUser?.user_detail?.slug;
  const role = currentUser?.roles?.[0]?.name;

  const data = {
    navSuperAdmin: [
      { title: "Dashboard", url: `/admin/${slug}/dashboard`, icon: Gauge },
      { title: "Companies", url: `/admin/${slug}/companies`, icon: Building2 },
      {
        title: "Users",
        url: `#`,
        icon: Users,
        children: [
          {
            title: "Super Admin",
            url: `/admin/${slug}/users/super-admin`,
          },
          {
            title: "Users (Client)",
            url: `/admin/${slug}/users/client`,
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
            url: `/admin/${slug}/plan-attributes`,
          },
          {
            title: "Plans",
            url: `/admin/${slug}/plans`,
          },
        ],
      },
    ],
    navCoAdmin: [],
    navManager: [],
    navCoEmp: [],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher slug={slug} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navSuperAdmin} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
