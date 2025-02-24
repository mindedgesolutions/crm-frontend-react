import { AppSubmitBtn } from "@/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCounter } from "@/features/commonSlice";
import customFetch from "@/utils/customFetch";
import showError from "@/utils/showError";
import showSuccess from "@/utils/showSuccess";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CoAddEditLeadStatus = ({ editId, leadStatus, setEditId }) => {
  const [form, setForm] = useState({ name: "" });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // ---------------------------------

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------------

  const resetErrors = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ---------------------------------

  const resetForm = () => {
    setForm({ ...form, name: "" });
    setErrors([]);
    setEditId(null);
  };

  // ---------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorCount = 0;
    let errorBag = {};

    if (!form.name) {
      errorBag = { ...errorBag, name: "Name is required" };
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const apiUrl = editId
      ? `/lead-status-master/${editId}`
      : `/lead-status-master`;
    const process = editId ? customFetch.put : customFetch.post;
    const msg = editId
      ? `Lead status updated successfully`
      : `Lead status added successfully`;
    setIsLoading(true);
    try {
      const response = await process(apiUrl, data);
      if (response.status === 201 || response.status === 200) {
        showSuccess(msg);
        resetForm();
        setEditId(null);
        dispatch(updateCounter());
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.status === 422) {
        setErrors(error?.response?.data?.errors);
        return;
      }
      showError(error?.response?.data?.message);
      return;
    }
  };

  // ---------------------------------

  useEffect(() => {
    if (editId) {
      const status = leadStatus.find((status) => status.id === editId);
      setForm({ ...form, name: status.name });
    }
  }, [editId]);

  return (
    <div className="w-full md:basis-1/3 min-h-40 border rounded-lg p-4">
      <h3 className="text-lg font-medium tracking-wider text-muted-foreground mb-4">
        {editId ? `Edit details` : `Add super admin`}
      </h3>
      <Separator />
      <form onSubmit={handleSubmit} autoComplete="off" className="mt-4">
        <div className="w-full items-center mb-2">
          <Label
            htmlFor="name"
            className="capitalize text-muted-foreground tracking-widest"
          >
            name <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Name is required"
            value={form.name}
            onChange={handleChange}
            onKeyUp={resetErrors}
          />
          <span className="text-red-500 text-xs tracking-wider">
            {errors?.name}
          </span>
        </div>
        <Separator />
        <div className="w-full flex flex-row justify-between items-center mt-4">
          <Button type="button" variant="outline" onClick={resetForm}>
            Reset
          </Button>
          <AppSubmitBtn
            text={editId ? `Update` : `Add`}
            isLoading={isLoading}
            customClass={`my-0`}
          />
        </div>
      </form>
    </div>
  );
};
export default CoAddEditLeadStatus;
