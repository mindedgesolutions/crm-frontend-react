import { LuLayoutDashboard, LuPaperclip } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { PiShareNetwork } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import { HiOutlineCog6Tooth, HiOutlineBuildingLibrary } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

export const adminMenus = [];

export const userMenus = [
  {
    title: "dashboard",
    icon: <LuLayoutDashboard />,
    url: `/user/souvik-nag/dashboard`,
  },
  {
    title: "whatsapp",
    icon: <FaWhatsapp />,
    children: [
      { title: "Overview", url: `/user/souvik-nag/dashboard` },
      { title: "Contact Lists", url: `/user/souvik-nag/dashboard` },
      { title: "Segments", url: `/user/souvik-nag/dashboard` },
      { title: "Contacts", url: `/user/souvik-nag/dashboard` },
      // { label: "Contact Lists", key: "contact-lists" },
      // { label: "Segments", key: "segments" },
      // { label: "Contacts", key: "contacts" },
      // { label: "Auto-Replies", key: "auto-replies" },
      // { label: "Flow Builder", key: "flow-builder" },
      // { label: "Templates", key: "templates" },
    ],
  },
  // {
  //   key: "campaigns",
  //   icon: <PiShareNetwork />,
  //   label: "Campaigns",
  //   children: [{ label: "WhatsApp", key: "c-whatsapp" }],
  // },
  // {
  //   key: "team",
  //   icon: <FiUsers />,
  //   label: <NavLink to={`/user/souvik-nag/team`}>Team</NavLink>,
  // },
  // { key: "my-tickets", icon: <IoTicketOutline />, label: "My Tickets" },
  // {
  //   key: "ai-assistant",
  //   icon: <PiShareNetwork />,
  //   label: "AI Assistant",
  //   children: [
  //     { label: "AI Writer", key: "ai-writer" },
  //     { label: "Settings", key: "ai-settings" },
  //   ],
  // },
  // {
  //   key: "settings",
  //   icon: <HiOutlineCog6Tooth />,
  //   label: "Settings",
  //   children: [
  //     { label: "WhatsApp", key: "whatsapp-settings" },
  //     { label: "General Settings", key: "general-settings" },
  //     { label: "Billing Details", key: "billing-details" },
  //   ],
  // },
  // { key: "api", icon: <LuPaperclip />, label: "API" },
  // // For admin ---------------------
  // {
  //   key: "masters",
  //   icon: <HiOutlineCog6Tooth />,
  //   label: "Masters",
  //   children: [
  //     {
  //       label: (
  //         <NavLink to={`/admin/souvik-nag/plan-attributes`}>
  //           Plan Attributes
  //         </NavLink>
  //       ),
  //       key: "plan-attributes",
  //     },
  //     { label: "Plans", key: "plans" },
  //   ],
  // },
  // {
  //   key: "ad-companies",
  //   icon: <HiOutlineBuildingLibrary />,
  //   label: <NavLink to={`/admin/souvik-nag/companies`}>Companies</NavLink>,
  // },
  // { key: "ad-users", icon: <FiUsers />, label: "Users" },
];
