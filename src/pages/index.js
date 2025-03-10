// Website Routes start here --------------------------------------------
export { default as WbLayout } from "@/pages/website/WbLayout";
export { default as WbLanding } from "@/pages/website/WbLanding";
export { default as WbAbout } from "@/pages/website/WbAbout";
export { default as WbServices } from "@/pages/website/WbServices";
export { default as WbContact } from "@/pages/website/WbContact";
// Website Routes end here ----------------------------------------------

// Auth Routes start here --------------------------------------------
export { default as Signin } from "@/pages/app/auth/Signin";
export { default as Signup } from "@/pages/app/auth/Signup";
export { default as ForgotPassword } from "@/pages/app/auth/ForgotPassword";
export { default as ResetPassword } from "@/pages/app/auth/ResetPassword";
// Auth Routes end here ----------------------------------------------

// Common Routes start here --------------------------------------------
export { default as ProfileSettings } from "@/pages/app/profile/ProfileSettings";
export { default as ChangePassword } from "@/pages/app/profile/ChangePassword";
export { default as AppForbidden } from "@/pages/app/errors/AppForbidden";
// Common Routes end here ----------------------------------------------

// Admin Routes start here --------------------------------------------
export { default as AppLayout } from "@/pages/app/AppLayout";
export { default as AppAdminDashboard } from "@/pages/app/admin/AppAdminDashboard";
export { default as AppUsersList } from "@/pages/app/admin/users/AppUsersList";
export { default as AppCoUsersList } from "@/pages/app/admin/users/AppCoUsersList";
export { default as AppPlanAttributes } from "@/pages/app/admin/plans/AppPlanAttributes";
export { default as AppPlans } from "@/pages/app/admin/plans/AppPlans";
export { default as AppCompanyList } from "@/pages/app/admin/companies/AppCompanyList";
export { default as AppCompanyAddEdit } from "@/pages/app/admin/companies/AppCompanyAddEdit";
export { default as AppPlansNew } from "@/pages/app/admin/plans/AppPlansNew";
// Admin Routes end here ----------------------------------------------

// Company Routes start here --------------------------------------------
export { default as CoAdminDashboard } from "@/pages/app/company/admin/CoAdminDashboard";
export { default as CoManagerDashboard } from "@/pages/app/company/manager/CoManagerDashboard";
export { default as CoEmployeeDashboard } from "@/pages/app/company/employee/CoEmployeeDashboard";
export { default as CoListGroups } from "@/pages/app/company/admin/settings/CoListGroups";
export { default as CoListLeadStatus } from "@/pages/app/company/admin/settings/CoListLeadStatus";
export { default as CoListNetworks } from "@/pages/app/company/admin/settings/CoListNetworks";
export { default as CoListUsers } from "@/pages/app/company/admin/CoListUsers";
export { default as CoLeadsAdmin } from "@/pages/app/company/admin/CoLeadsAdmin";
// Company Routes end here ----------------------------------------------

export { default as AppErrorPage } from "@/pages/app/AppErrorPage";
