import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as crm from "@/pages";
import store from "./store";

import { loader as appLayoutLoader } from "@/pages/app/AppLayout";
import { loader as newPlanLoader } from "@/pages/app/admin/plans/AppPlansNew";
import { loader as adminDashboardLoader } from "@/pages/app/admin/AppAdminDashboard";

const router = createBrowserRouter([
  // Website routes start -----------------------------------------------------------
  {
    path: "/",
    element: <crm.WbLayout />,
    children: [
      { index: true, element: <crm.WbLanding /> },
      { path: "about", element: <crm.WbAbout /> },
      { path: "services", element: <crm.WbServices /> },
      { path: "contact", element: <crm.WbContact /> },
    ],
  },
  // Website routes end -----------------------------------------------------------

  // Auth routes start -----------------------------------------------------------
  { path: "/sign-in", element: <crm.Signin /> },
  { path: "/sign-up", element: <crm.Signup /> },
  { path: "/forgot-password", element: <crm.ForgotPassword /> },
  { path: "/reset-password", element: <crm.ResetPassword /> },
  // Auth routes end -----------------------------------------------------------

  // Admin routes start -----------------------------------------------------------
  {
    path: "/admin/:slug",
    element: <crm.AppLayout />,
    errorElement: <crm.AppErrorPage />,
    loader: appLayoutLoader(store),
    children: [
      {
        path: "dashboard",
        element: <crm.AppAdminDashboard />,
        loader: adminDashboardLoader(store),
      },
      {
        path: "companies",
        children: [
          { index: true, element: <crm.AppCompanyList /> },
          { path: "new", element: <crm.AppCompanyAddEdit /> },
          { path: ":id/edit", element: <crm.AppCompanyAddEdit /> },
        ],
      },
      {
        path: "users",
        children: [
          { path: "super-admin", element: <crm.AppUsersList /> },
          { path: "client", element: <crm.AppCoUsersList /> },
        ],
      },
      { path: "plan-attributes", element: <crm.AppPlanAttributes /> },
      {
        path: "plans",
        children: [
          { index: true, element: <crm.AppPlans /> },
          { path: "new", element: <crm.AppPlansNew />, loader: newPlanLoader },
          {
            path: ":id/edit",
            element: <crm.AppPlansNew />,
            loader: newPlanLoader,
          },
        ],
      },
    ],
  },
  // Admin routes end -----------------------------------------------------------

  // Company admin routes start -----------------------------------------------------------
  {
    path: "/app/admin/:slug",
    element: <crm.AppLayout />,
    loader: appLayoutLoader(store),
    children: [
      { path: "dashboard", element: <crm.CoAdminDashboard /> },
      {
        path: "settings",
        children: [
          { path: "lead-status", element: <crm.CoListLeadStatus /> },
          { path: "networks", element: <crm.CoListNetworks /> },
          { path: "groups", element: <crm.CoListGroups /> },
        ],
      },
      { path: "users", element: <crm.CoListUsers /> },
      { path: "leads", element: <crm.CoLeadsAdmin /> },
    ],
  },
  // Company admin routes end -----------------------------------------------------------

  // Company manager routes start -----------------------------------------------------------
  {
    path: "/app/manager/:slug",
    element: <crm.AppLayout />,
    loader: appLayoutLoader(store),
    children: [{ path: "dashboard", element: <crm.CoManagerDashboard /> }],
  },
  // Company manager routes end -----------------------------------------------------------

  // Company employee routes start -----------------------------------------------------------
  {
    path: "/app/emp/:slug",
    element: <crm.AppLayout />,
    loader: appLayoutLoader(store),
    children: [{ path: "dashboard", element: <crm.CoEmployeeDashboard /> }],
  },
  // Company employee routes end -----------------------------------------------------------

  // Profile routes start -----------------------------------------------------------
  {
    path: "/:slug",
    element: <crm.AppLayout />,
    loader: appLayoutLoader(store),
    children: [
      { path: "settings", element: <crm.ProfileSettings /> },
      { path: "change-password", element: <crm.ChangePassword /> },
      { path: "forbidden", element: <crm.AppForbidden /> },
    ],
  },
  // Profile routes end -----------------------------------------------------------
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
