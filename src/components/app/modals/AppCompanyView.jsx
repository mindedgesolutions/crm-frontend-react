import { AppSubmitBtn } from "@/components";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import customFetch from "@/utils/customFetch";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Pencil, Trash2 } from "lucide-react";

const AppCompanyView = ({ company }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button type="button">
          <Eye
            size={14}
            className="text-muted-foreground transition duration-200 group-hover:text-info"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="min-w-auto md:min-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-muted-foreground tracking-wider">
            Company details
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col justify-start items-start space-y-2">
            <Label htmlFor="name" className="text-right text-muted-foreground">
              Group name <span className="text-red-500">*</span>
            </Label>
            <Input id="name" name="name" className="col-span-3" />
          </div>
          <div className="flex flex-col justify-start items-start space-y-2">
            <Label htmlFor="desc" className="text-right text-muted-foreground">
              Description
            </Label>
            <Input id="desc" name="desc" className="col-span-3" />
          </div>
          <div className="flex flex-col justify-start items-start space-y-2">
            <Label
              htmlFor="groupImg"
              className="text-right text-muted-foreground"
            >
              Group image
            </Label>
            <input
              type="file"
              name="groupImg"
              id="groupImg"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col justify-start items-start space-y-2">
            <div className="w-32 h-32 p-1 border border-dashed relative">
              <button
                type="button"
                className="absolute right-1 text-red-500 hover:text-red-400"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AppCompanyView;
