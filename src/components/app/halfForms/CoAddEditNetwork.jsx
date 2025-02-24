import { AppSubmitBtn } from "@/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCounter } from "@/features/commonSlice";
import customFetch from "@/utils/customFetch";
import showSuccess from "@/utils/showSuccess";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "antd";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CoAddEditNetwork = ({ editId, setEditId, networks }) => {
  const [form, setForm] = useState({ name: "" });
  const [networkLogo, setNetworkLogo] = useState(null);
  const [dbImage, setDbImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // ---------------------------------------------

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------------------------

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowed = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowed.includes(file.type)) {
      setErrors({
        ...errors,
        networkLogo: "Only jpg, jpeg, png files are allowed",
      });
      document.getElementById("networkLogo").value = "";
      return;
    }

    if (file.size > 1024 * 100) {
      setErrors({
        ...errors,
        networkLogo: "File size should be less than 100KB",
      });
      document.getElementById("networkLogo").value = "";
      return;
    }

    setErrors({ ...errors, networkLogo: "" });
    setNetworkLogo(file);
  };

  // ---------------------------------------------

  const deleteImg = () => {
    setNetworkLogo(null);
    document.getElementById("networkLogo").value = "";
  };

  // ---------------------------------------------

  const resetErrors = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ---------------------------------------------

  const resetForm = () => {
    setForm({ ...form, name: "" });
    setNetworkLogo(null);
    setDbImage(null);
    setErrors([]);
    setEditId(null);
    document.getElementById("networkLogo").value = "";
  };

  // ---------------------------------------------

  useEffect(() => {
    if (editId) {
      const network = networks.find((item) => item.id === editId);
      setForm({ ...form, name: network.name });
      if (network?.network_img) {
        setDbImage(network.network_img);
      }
    }
  }, [editId]);

  // ---------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorCount = 0;
    let errorBag = {};

    if (!form.name) {
      errorBag = { ...errorBag, name: "Network name is required" };
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, logo: networkLogo || null };

    const url = editId
      ? `/company/network/update/${editId}`
      : `/company/networks`;
    const msg = editId
      ? `Network updated successfully`
      : `Network added successfully`;

    setIsLoading(true);
    try {
      const response = await customFetch.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201 || response.status === 200) {
        showSuccess(msg);
        dispatch(updateCounter());
        resetForm();
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
        {editId ? `Edit details` : `Add new network`}
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
            htmlFor="name"
            className="capitalize text-muted-foreground tracking-widest"
          >
            network icon <span className="text-red-500">*</span>
          </Label>
          <input
            type="file"
            className="flex h-10 w-full rounded-sm border border-input bg-background px-2 py-2 text-base file:border-1 file:bg-transparent file:text-xs file:font-normal file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            id="networkLogo"
            name="networkLogo"
            onChange={handleFileChange}
          />
          <span className="text-red-500 text-xs tracking-wider">
            {errors?.networkLogo}
          </span>
        </div>
        <div className="w-full items-center mb-2">
          <div className="relative w-32 h-24 flex justify-start items-start">
            <span className="w-24 h-24 border border-dashed">
              <img
                src={
                  networkLogo
                    ? URL.createObjectURL(networkLogo)
                    : `${import.meta.env.VITE_BASE_URL}${dbImage}`
                }
                alt=""
              />
            </span>
            <Trash2
              size={18}
              className="absolute bottom-1 right-1 text-red-500 cursor-pointer"
              onClick={deleteImg}
            />
          </div>
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
export default CoAddEditNetwork;
