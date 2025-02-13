import { AppContentWrapper, AppPageLoader, AppSubmitBtn } from "@/components";
import AppPopover from "@/components/app/AppPopover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import customFetch from "@/utils/customFetch";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileSettings = () => {
  document.title = `Profile Settings | ${import.meta.env.VITE_APP_TITLE}`;

  const { currentUser } = useSelector((store) => store.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});

  // ---------------------------------------------

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------------------------

  const resetErrors = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ---------------------------------------------

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
      errorBag = { ...errorBag, mobile: "Mobile is required" };
      errorCount++;
    }

    const regex = /^[0-9]+$/;

    if (form.mobile && regex.test(form.mobile) === false) {
      errorBag = { ...errorBag, mobile: "Must be a number" };
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    setIsLoading(true);

    let data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("mobile", form.mobile);
    avatar ?? data.append("avatar", avatar);

    try {
      await customFetch.post(`/auth/update-profile`, data);
    } catch (error) {
      setIsLoading(false);
      // splitErrors(error?.response?.data?.errors);
      console.log(error?.response?.data?.errors);
      return;
    }
  };

  // ---------------------------------------------

  useEffect(() => {
    setForm({
      ...form,
      name: currentUser?.name ?? "",
      email: currentUser?.email ?? "",
      mobile: currentUser?.user_detail?.mobile ?? "",
    });
  }, [currentUser]);

  return (
    <AppContentWrapper>
      {isLoading && <AppPageLoader />}

      <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
        <h3 className="font-bold text-xl tracking-wider text-muted-foreground">
          Profile Settings
        </h3>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="flex flex-row justify-start items-start gap-2">
          <div className="basis-3/4">
            <div className="border border-muted p-3">
              <div className="flex flex-row justify-between items-center bg-muted my-0 mb-6 p-2">
                <h3 className="font-medium text-sm tracking-wider text-muted-foreground">
                  General information
                </h3>
              </div>
              <div className="flex flex-row justify-between items-center gap-4 mb-2">
                <div className="basis-1/2 flex flex-col">
                  <Label
                    className="text-muted-foreground text-xs uppercase mb-2"
                    htmlFor="name"
                  >
                    name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Company name is required"
                    autoFocus={true}
                    value={form.name}
                    onChange={handleChange}
                    onKeyUp={resetErrors}
                  />
                  <span className="text-red-500 text-xs h-4">
                    {errors?.name}
                  </span>
                </div>
                <div className="basis-1/2 flex flex-col"></div>
              </div>
              <div className="flex flex-row justify-between items-center gap-4 mb-2">
                <div className="basis-1/2 flex flex-col">
                  <div className="flex flex-row items-start justify-start gap-2">
                    <Label
                      className="text-muted-foreground text-xs uppercase mb-2"
                      htmlFor="email"
                    >
                      email <span className="text-red-500">*</span>
                    </Label>
                    <AppPopover
                      text={`If you change email, your username will be updated too.`}
                    />
                  </div>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email is required"
                    value={form.email}
                    onChange={handleChange}
                    onKeyUp={resetErrors}
                  />
                  <span className="text-red-500 text-xs h-4">
                    {errors?.email}
                  </span>
                </div>
                <div className="basis-1/2 flex flex-col">
                  <Label
                    className="text-muted-foreground text-xs uppercase mb-2"
                    htmlFor="mobile"
                  >
                    mobile no. <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="mobile"
                    id="mobile"
                    placeholder="Mobile is required"
                    value={form.mobile}
                    onChange={handleChange}
                    onKeyUp={resetErrors}
                  />
                  <span className="text-red-500 text-xs h-4">
                    {errors?.mobile}
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-start items-center mt-8">
                <AppSubmitBtn
                  isLoading={isLoading}
                  text={`save changes`}
                  customClass={`w-auto uppercase text-white`}
                />
              </div>
            </div>
            <div className="border border-muted p-3 mt-4">
              <div className="flex flex-row justify-between items-center bg-muted my-0 mb-6 p-2">
                <h3 className="font-medium text-sm tracking-wider text-muted-foreground">
                  Leads information
                </h3>
              </div>
            </div>
          </div>
          <div className="basis-1/4 flex flex-row justify-start items-center">
            <div className="w-52 h-48 p-2 overflow-hidden relative">
              <div className="w-40 h-44 border border-dashed border-muted-foreground/40"></div>
              <div className="absolute top-4 right-0 font-thin text-primary p-2 bg-muted-foreground/10 rounded-full cursor-pointer hover:bg-muted-foreground/15">
                <Pencil size={18} />
              </div>
              <div className="absolute bottom-4 right-0 font-thin text-destructive p-2 bg-muted-foreground/10 rounded-full cursor-pointer hover:bg-muted-foreground/15">
                <Trash size={18} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </AppContentWrapper>
  );
};
export default ProfileSettings;
