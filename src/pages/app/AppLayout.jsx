import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentUser, unsetCurrentUser } from "@/features/currentUserSlice";
import customFetch from "@/utils/customFetch";
import showError from "@/utils/showError";
import { AppFooter, AppTopnav } from "@/components";

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser } = useSelector((store) => store.currentUser);
  const slug = currentUser?.user_detail?.slug;

  // --------------------------------------------

  const loggedInUser = async () => {
    try {
      if (!currentUser?.id) {
        const response = await customFetch.get(`/auth/current-user`);
        dispatch(setCurrentUser(response.data.user));
      }
    } catch (error) {
      console.log(error?.response?.data);
      showError(`Something went wrong! Please try again later.`);
      navigate(`/sign-in`);
    }
  };

  // --------------------------------------------

  const handleUnauthenticated = () => {
    localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
    dispatch(unsetCurrentUser());
    showError("Please sign in to continue.");
    navigate(`/sign-in`);
  };

  // --------------------------------------------

  const handleUnauthorized = () => {
    navigate(`/${slug}/forbidden`);
  };

  useEffect(() => {
    loggedInUser();

    window.addEventListener("unauthenticated", handleUnauthenticated);
    window.addEventListener("unauthorized", handleUnauthorized);
  }, [navigate]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppTopnav />
        <Outlet />
        <AppFooter />
      </main>
    </SidebarProvider>
  );
};
export default AppLayout;
