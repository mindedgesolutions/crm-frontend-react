import { useSelector } from "react-redux";

const CoAdminDashboard = () => {
  const { currentUser } = useSelector((store) => store.currentUser);
  document.title = `Welcome ${currentUser?.name} | ${
    import.meta.env.VITE_APP_TITLE
  }`;

  return <div>CoAdminDashboard</div>;
};
export default CoAdminDashboard;
