import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { updateCounter } from "@/features/commonSlice";
import customFetch from "@/utils/customFetch";
import showError from "@/utils/showError";
import showSuccess from "@/utils/showSuccess";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CoDeleteLeadStatus = ({ deleteId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await customFetch.delete(`/lead-status-master/${deleteId}`);
      setIsLoading(false);
      dispatch(updateCounter());
      showSuccess(`Lead status deactivated`);
    } catch (error) {
      setIsLoading(false);
      showError(error?.response?.data?.msg);
      return null;
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button">
          <Trash2 size={14} className="text-red-500" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit
            cum repellat enim aliquid expedita similique.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default CoDeleteLeadStatus;
