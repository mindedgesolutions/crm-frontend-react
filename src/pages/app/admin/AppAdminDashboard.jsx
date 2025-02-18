import { useSelector } from "react-redux";

const AppAdminDashboard = () => {
  const { currentUser } = useSelector((store) => store.currentUser);
  document.title = `Welcome ${currentUser?.name} | ${
    import.meta.env.VITE_APP_TITLE
  }`;
  return <div>AppAdminDashboard</div>;
};
export default AppAdminDashboard;
