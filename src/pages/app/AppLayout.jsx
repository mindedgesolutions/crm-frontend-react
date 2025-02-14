import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCurrentUser, unsetCurrentUser } from "@/features/currentUserSlice";
import customFetch from "@/utils/customFetch";
import showError from "@/utils/showError";
import { AppFooter, AppTopnav } from "@/components";

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.currentUser);
  const slug = currentUser?.user_detail?.slug;

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

// --------------------------------------------

export const loader = (store) => async () => {
  const { currentUser } = store.getState().currentUser;

  try {
    if (!currentUser.name) {
      const response = await customFetch.get(`/auth/current-user`);
      store.dispatch(setCurrentUser(response.data.user));
    }
    return null;
  } catch (error) {
    console.log(error?.response?.data);
    showError(`Something went wrong! Please try again later.`);
    return redirect(`/sign-in`);
  }
};
