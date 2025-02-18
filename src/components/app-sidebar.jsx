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
import allMenus from "@/utils/menu";

export function AppSidebar({ ...props }) {
  const { currentUser } = useSelector((store) => store.currentUser);
  const slug = currentUser?.user_detail?.slug;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher slug={slug} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={allMenus()} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
