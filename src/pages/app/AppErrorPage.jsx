import { useRouteError } from "react-router-dom";

const AppErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return <div>AppErrorPage</div>;
};
export default AppErrorPage;
