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
import { Eye, Mail, Pencil, Phone, Trash2, User } from "lucide-react";
import { ImWhatsapp } from "react-icons/im";

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
          <DialogTitle className="text-muted-foreground text-2xl tracking-wider">
            {company?.name}
            <p className="text-sm text-muted-foreground/80 mt-2">
              <a href={company?.website} target="_blank">
                {company?.website}
              </a>
            </p>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex flex-row gap-2">
            <div className="p-2 bg-muted-foreground/5 w-full rounded-sm space-y-1">
              {company?.contact_person && (
                <div>
                  <Label className="text-muted-foreground font-normal text-sm inline-flex items-center gap-2">
                    <User size={14} />
                    <span>{company?.contact_person}</span>
                  </Label>
                </div>
              )}
              {company?.email && (
                <div>
                  <Label className="text-muted-foreground font-normal text-sm inline-flex items-center gap-2">
                    <Mail size={14} />
                    {company?.email}
                  </Label>
                </div>
              )}
              {company?.phone && (
                <div>
                  <Label className="text-muted-foreground font-normal text-sm inline-flex items-center gap-2">
                    <Phone size={14} />
                    {company?.phone}
                    <span>|</span>
                    <ImWhatsapp size={14} />
                    {company?.whatsapp}
                  </Label>
                </div>
              )}
            </div>
            <div className="p-2 bg-muted-foreground/5 w-full rounded-sm space-y-1">
              {company?.address && (
                <div>
                  <Label className="text-muted-foreground font-normal text-sm">
                    {company?.address}
                  </Label>
                </div>
              )}
              {company?.location && (
                <div>
                  <Label className="text-muted-foreground font-normal text-sm">
                    {company?.location}
                  </Label>
                </div>
              )}
              {company?.pincode && (
                <div>
                  <Label className="text-muted-foreground font-normal text-sm">
                    {`${company?.city}, ${company?.state} ${company?.pincode}`}
                  </Label>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AppCompanyView;
