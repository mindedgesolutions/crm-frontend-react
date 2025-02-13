import { useSelector } from "react-redux";
import { ModeToggle } from "../ModeToggle";
import AppProfileContainer from "./AppProfileContainer";
import { SidebarTrigger } from "../ui/sidebar";

const AppTopnav = () => {
  const { currentUser } = useSelector((store) => store.currentUser);

  return (
    <div className="shadow-lg bg-muted flex flex-row justify-between items-center relative">
      <SidebarTrigger />
      <section className="p-2 flex flex-row justify-end items-center gap-2 pr-8">
        <ModeToggle />
        <span className="text-sm text-muted-foreground font-medium">
          Welcome{" "}
          <span className="uppercase tracking-wider ml-1">
            {currentUser?.name ?? `User`}
          </span>
        </span>
        <AppProfileContainer />
      </section>
    </div>
  );
};
export default AppTopnav;
