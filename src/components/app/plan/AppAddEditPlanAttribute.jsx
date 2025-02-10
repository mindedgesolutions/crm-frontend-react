import { AppSubmitBtn } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { nanoid } from "nanoid";
import { useState } from "react";
import { fieldTypes } from "@/utils/data";
import showSuccess from "@/utils/showSuccess";
import customFetch from "@/utils/customFetch";
import { useDispatch } from "react-redux";
import { updateCounter } from "@/features/commonSlice";
import showError from "@/utils/showError";
import { useNavigate } from "react-router-dom";

const AppAddEditPlanAttribute = ({ attributes, editId, setEditId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ attribute: "", type: "" });
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ attribute: "", type: "" });
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post(`/plan-attributes`, data);
      resetForm();
      setIsLoading(false);
      dispatch(updateCounter());
      showSuccess(`Plan attribute added successfully`);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.status === 401) {
        showError(`Login required`);
        localStorage.removeItem("crmToken");
        navigate(`/sign-in`);
      }
      setErrors(error?.response?.data?.errors);
    }
  };

  return (
    <div className="basis-1/3 min-h-40 border rounded-lg p-4">
      <h3 className="text-lg font-medium tracking-wider text-muted-foreground mb-4">
        {editId ? `Edit details` : `Add plan attribute`}
      </h3>
      <Separator />
      <form onSubmit={handleSubmit} autoComplete="off" className="mt-4">
        <div className="w-full items-center space-y-1 mb-4">
          <Label
            htmlFor="attribute"
            className="capitalize text-muted-foreground tracking-widest"
          >
            attribute <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="attribute"
            name="attribute"
            placeholder="A fitting attribute explains the plan better"
            value={form.attribute}
            onChange={handleChange}
          />
          <span className="text-red-500 text-sm tracking-wide">
            {!form.attribute && errors?.attribute?.[0]}
          </span>
        </div>
        <div className="w-full items-center space-y-1 mb-4">
          <Label
            htmlFor="type"
            className="capitalize text-muted-foreground tracking-widest"
          >
            attribute response type <span className="text-red-500">*</span>
          </Label>
          <select
            name="type"
            id="type"
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
            value={form.type}
            onChange={handleChange}
          >
            <option value="">- Select -</option>
            {fieldTypes?.map((type) => {
              return (
                <option key={nanoid()} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
          <span className="text-red-500 text-sm tracking-wide">
            {!form.type && errors?.type?.[0]}
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
export default AppAddEditPlanAttribute;
