import { ModeToggle } from "../ModeToggle";
import AppProfileContainer from "./AppProfileContainer";

const AppTopnav = () => {
  return (
    <section className="w-full bg-muted shadow-lg p-2 flex flex-row justify-end items-center gap-2 pr-8">
      <ModeToggle />
      <span className="text-sm text-muted-foreground font-medium">
        Welcome{" "}
        <span className="uppercase tracking-wider ml-1">Souvik Nag</span>
      </span>
      <AppProfileContainer />
    </section>
  );
};
export default AppTopnav;
