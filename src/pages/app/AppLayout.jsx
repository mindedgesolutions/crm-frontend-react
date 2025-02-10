import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import { Layout, Menu } from "antd";
import { userMenus } from "@/utils/menu";
import { AppFooter, AppTopnav } from "@/components";
import { useSelector } from "react-redux";

const { Sider } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const { counter } = useSelector((store) => store.common);

  useEffect(() => {
    console.log(Math.random(Math.floor() * 1000));
  }, [counter]);

  return (
    <Layout className="h-screen bg-inherit">
      <Sider
        className="text-white bg-black"
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
