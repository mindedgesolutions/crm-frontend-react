import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as crm from "@/pages";

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
    children: [
      { path: "dashboard", element: <crm.AppAdminDashboard /> },
      { path: "companies", element: <crm.AppCompanyList /> },
      { path: "companies/new", element: <crm.AppCompanyAddEdit /> },
      { path: "users", element: <crm.AppUsersList /> },
      { path: "plan-attributes", element: <crm.AppPlanAttributes /> },
    ],
  },
  // Admin routes end -----------------------------------------------------------

  // Company routes start -----------------------------------------------------------
  {
    path: "/app/:slug",
    element: <crm.AppLayout />,
    children: [
      { path: "dashboard", element: <crm.AppCompanyDashboard /> },
      { path: "team", element: <crm.AppTeamList /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
