import { Building2, Gauge, Settings2, Share2, Users } from "lucide-react";
import { useSelector } from "react-redux";

function allMenus() {
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
    navCoAdmin: [
      { title: "Dashboard", url: `/app/admin/${slug}/dashboard`, icon: Gauge },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        children: [
          {
            title: "Lead Status",
            url: `/app/admin/${slug}/settings/lead-status`,
          },
          {
            title: "Networks",
            url: `/app/admin/${slug}/settings/networks`,
          },
          // {
          //   title: "Users",
          //   url: `/app/admin/${slug}/settings/users`,
          // },
          {
            title: "Groups",
            url: `/app/admin/${slug}/settings/groups`,
          },
        ],
      },
      { title: "Users", url: `/app/admin/${slug}/users`, icon: Users },
      { title: "Leads", url: `/app/admin/${slug}/leads`, icon: Share2 },
    ],
    navManager: [],
    navCoEmp: [],
  };

  let menu = [];

  if (role === "super admin") {
    menu = data.navSuperAdmin;
  } else if (role === "admin") {
    menu = data.navCoAdmin;
  } else if (role === "manager") {
    menu = data.navManager;
  } else if (role === "employee") {
    menu = data.navCoEmp;
  }

  return menu;
}
export default allMenus;
