import { AppSubmitBtn } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import showSuccess from "@/utils/showSuccess";
import customFetch from "@/utils/customFetch";
import { useDispatch } from "react-redux";
import { updateCounter } from "@/features/commonSlice";
import { Trash2 } from "lucide-react";

const AdminUserAddEdit = ({ editId, users, setEditId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const dispatch = useDispatch();

  // ------------------------------------

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ------------------------------------

  const resetErrors = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ------------------------------------

  const resetForm = () => {
    setForm({ ...form, name: "", email: "", mobile: "" });
    setEditId(null);
    setErrors([]);
  };

  // ------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorCount = 0;
    let errorBag = {};

    if (!form.name) {
      errorBag = { ...errorBag, name: "Name is required" };
      errorCount++;
    }
    if (!form.email) {
      errorBag = { ...errorBag, email: "Email is required" };
      errorCount++;
    }
    if (!form.mobile) {
      errorBag = { ...errorBag, mobile: "Mobile no. is required" };
      errorCount++;
    }

    if (errorCount) {
      setErrors(errorBag);
      return;
    }

    setIsLoading(true);

    let data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("mobile", form.mobile);
    const url = editId ? `/admin/users/${editId}` : `/admin/users`;
    const msg = editId
      ? `User updated successfully`
      : `User added successfully`;
    const process = editId ? customFetch.put : customFetch.post;
    try {
      const response = await process(url, data);
      if (response) {
        showSuccess(msg);
        resetForm();
        dispatch(updateCounter());
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error?.response?.data?.errors);
      setErrors(error?.response?.data?.errors);
    }
  };

  // ------------------------------------

  useEffect(() => {
    if (editId) {
      const user = users.find((user) => user.id === editId);
      if (user) {
        setForm({
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        });
      }
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
        <div className="w-full items-center mb-2">
          <Label
            htmlFor="email"
            className="capitalize text-muted-foreground tracking-widest"
          >
            email <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Email is required"
            value={form.email}
            onChange={handleChange}
            onKeyUp={resetErrors}
          />
          <span className="text-red-500 text-xs tracking-wider">
            {errors?.email}
          </span>
        </div>
        <div className="w-full items-center mb-2">
          <Label
            htmlFor="mobile"
            className="capitalize text-muted-foreground tracking-widest"
          >
            mobile <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="mobile"
            name="mobile"
            placeholder="Mobile no. is required"
            value={form.mobile}
            onChange={handleChange}
            onKeyUp={resetErrors}
          />
          <span className="text-red-500 text-xs tracking-wider">
            {errors?.mobile}
          </span>
        </div>
        <div className="w-full items-center space-y-1 mb-2">
          <Label
            htmlFor="name"
            className="capitalize text-muted-foreground tracking-widest"
          >
            avatar
          </Label>
          <input
            type="file"
            id="networkImg"
            name="networkImg"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
            // onChange={handleFileChange}
          />
        </div>
        <div className="h-20 w-20 border border-dashed p-2 mb-4 relative">
          <button
            type="button"
            className="absolute -right-6 bottom-1 text-red-500 hover:text-red-400"
            // onClick={removeFile}
          >
            <Trash2 size={18} />
          </button>
          {/* {networkImg ? (
            <img src={URL.createObjectURL(networkImg)} alt="No image found" />
          ) : dbNetworkImg ? ( */}
          {/* <img src={dbNetworkImg} alt="No image found" /> */}
          {/* ) : null} */}
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
export default AdminUserAddEdit;
