import { AppSubmitBtn } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { fieldTypes } from "@/utils/data";
import showSuccess from "@/utils/showSuccess";
import customFetch from "@/utils/customFetch";
import { useDispatch } from "react-redux";
import { updateCounter } from "@/features/commonSlice";

const AppAddEditPlanAttribute = ({ attributes, editId, setEditId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ attribute: "", type: "" });
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  // ------------------------------------

  useEffect(() => {
    if (editId) {
      const attribute = attributes.find((attr) => attr.id === editId);
      if (attribute) {
        setForm({
          ...form,
          attribute: attribute.attribute,
          type: attribute.type,
        });
      }
    }
  }, [editId]);

  // ------------------------------------

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "type") {
      setErrors({ ...errors, type: "" });
    }
  };

  // ------------------------------------

  const resetErrors = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ------------------------------------

  const resetForm = () => {
    setForm({ attribute: "", type: "" });
    setErrors([]);

    if (editId) {
      setEditId("");
    }
  };

  // ------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorCount = 0;
    let errorBag = {};

    if (!form.attribute) {
      errorBag = { ...errorBag, attribute: `Attribute is required` };
      errorCount++;
    }
    if (!form.type) {
      errorBag = { ...errorBag, type: `Attribute type is required` };
      errorCount++;
    }
    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const url = editId
      ? `/admin/plan-attributes/${editId}`
      : `/admin/plan-attributes`;
    const process = editId ? customFetch.put : customFetch.post;
    const msg = editId
      ? `Plan attribute updated successfully`
      : `Plan attribute added successfully`;
    try {
      const response = await process(url, data);

      if (response) {
        resetForm();
        dispatch(updateCounter());
        showSuccess(msg);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrors(error?.response?.data?.errors);
      return;
    }
  };

  return (
    <div className="w-full md:basis-1/3 min-h-40 border rounded-lg p-4">
      <h3 className="text-lg font-medium tracking-wider text-muted-foreground mb-4">
        {editId ? `Edit details` : `Add plan attribute`}
      </h3>
      <Separator />
      <form onSubmit={handleSubmit} autoComplete="off" className="mt-4">
        <div className="w-full items-center space-y-1 mb-2">
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
            onKeyUp={resetErrors}
          />
          <span className="text-red-500 text-xs tracking-wider">
            {errors?.attribute}
          </span>
        </div>
        <div className="w-full items-center space-y-1 mb-2">
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
          <span className="text-red-500 text-xs tracking-wider">
            {errors?.type}
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
