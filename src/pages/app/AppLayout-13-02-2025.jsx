import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import { Layout, Menu } from "antd";
import { userMenus } from "@/utils/menu";
import { AppFooter, AppTopnav } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import showError from "@/utils/showError";
import customFetch from "@/utils/customFetch";
import { setCurrentUser, unsetCurrentUser } from "@/features/currentUserSlice";

const { Sider } = Layout;

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
    <Layout className="h-screen bg-inherit">
      <Sider
        className="text-white bg-black h-screen"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="dark"
      >
        <div className="flex justify-center items-center py-8 mb-4">
          <img
            src={logo}
            alt={import.meta.env.VITE_APP_TITLE}
            className={`h-10 w-10 rounded-full`}
          />
          <span
            className={`text-3xl font-bold tracking-widest text-muted-foreground ms-2 duration-300 ${
              collapsed && "hidden"
            }`}
          >
            CR<span className="text-primary">M</span>
          </span>
        </div>
        <Menu
          mode="inline"
          items={userMenus}
          defaultSelectedKeys={["dashboard"]}
          theme="dark"
          className="bg-black"
        />
      </Sider>
      <div className="w-full">
        <AppTopnav />
        <Outlet />
        <AppFooter />
      </div>
    </Layout>
  );
};
export default AppLayout;
