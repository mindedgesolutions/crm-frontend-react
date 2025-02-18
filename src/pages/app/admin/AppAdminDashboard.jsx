import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

const AppAdminDashboard = () => {
  const { currentUser } = useSelector((store) => store.currentUser);
  document.title = `Welcome ${currentUser?.name} | ${
    import.meta.env.VITE_APP_TITLE
  }`;
  const { msg } = useLoaderData();
  console.log(msg);

  return <div>AppAdminDashboard</div>;
};
export default AppAdminDashboard;

// --------------------------------------------

export const loader = (store) => async () => {
  const msg = `This is Super Admin dashboard`;
  return { msg };
};
