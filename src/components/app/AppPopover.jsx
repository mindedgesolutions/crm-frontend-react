import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleHelp } from "lucide-react";

const AppPopover = ({ text }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <CircleHelp size={14} className="text-red-500 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            {/* <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p> */}
            <p className="text-sm text-muted-foreground">{text}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default AppPopover;
