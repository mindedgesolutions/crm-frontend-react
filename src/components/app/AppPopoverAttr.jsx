import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Info, X } from "lucide-react";

const AppPopoverAttr = ({ plan }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Info size={14} className="text-red-500 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 max-h-96 p-2">
        <ScrollArea className="h-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Features</h4>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-1 items-center">
                {plan.plan_attribute.map((attr, index) => {
                  let label = "";
                  if (attr?.pivot?.attr_value === "yes") {
                    label = <Check size={16} className="text-primary" />;
                  } else if (attr?.pivot?.attr_value === "no") {
                    label = <X size={16} className="text-red-500" />;
                  } else if (attr?.pivot?.attr_value) {
                    label = attr?.pivot?.attr_value;
                  }

                  return (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-start text-xs py-2 border-b-[1px]"
                    >
                      <p className="w-3">{index + 1}.</p>
                      <p className="w-40">{attr.attribute}</p>
                      <p className="w-24 capitalize">{label || `---`}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
export default AppPopoverAttr;
