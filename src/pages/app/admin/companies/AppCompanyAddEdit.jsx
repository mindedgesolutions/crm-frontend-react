import { AppContentWrapper, AppPageLoader, AppSubmitBtn } from "@/components";
import AppPopover from "@/components/app/AppPopover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCityState } from "@/utils/functions";
import { useState } from "react";
import { Link } from "react-router-dom";

const AppCompanyAddEdit = () => {
  document.title = `Add New Company | ${import.meta.env.VITE_APP_TITLE}`;

  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    address: "",
    location: "",
    pincode: "",
    city: "",
    state: "",
    contactPerson: "",
    mobile: "",
    username: "",
    userEmail: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const uuid = null;

  // ---------------------------------------------

  const fetchCityState = async (code) => {
    if (code.length !== 6) {
      setForm({ ...form, pincode: code, city: "", state: "" });
    } else {
      setIsLoading(true);
      const response = await getCityState(code);
      if (response.data[0].Status === "Success") {
        setForm({
          ...form,
          pincode: code,
          city: response.data[0].PostOffice[0].District,
          state: response.data[0].PostOffice[0].State,
        });
      } else {
        setForm({ ...form, pincode: code, city: "", state: "" });
      }
      setIsLoading(false);
    }
  };

  // ---------------------------------------------

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "pincode") {
      fetchCityState(e.target.value);
    }
  };

  // ---------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name)
      return setErrors({ ...errors, name: "Company name is required" });
  };

  return (
    <AppContentWrapper>
      {isLoading && <AppPageLoader />}

      <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
        <h3 className="font-bold text-xl tracking-wider text-muted-foreground">
          Add New Company
        </h3>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="border border-muted p-3">
          <div className="flex flex-row justify-between items-center bg-muted my-0 mb-6 p-2">
            <h3 className="font-medium text-sm tracking-wider text-muted-foreground">
              General information
            </h3>
          </div>
          <div className="flex flex-row justify-between items-center gap-4 mb-4">
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="name"
              >
                company name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Company name is required"
                autoFocus={true}
              />
              {errors?.name && (
                <span className="text-destructive">{errors?.name}</span>
              )}
            </div>
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="email"
              >
                company email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="A valid email is a must"
              />
            </div>
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="website"
              >
                company website
              </Label>
              <Input
                type="text"
                name="website"
                id="website"
                placeholder="Website URL (if there is any)"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-start gap-4 mb-4">
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="address"
              >
                address <span className="text-red-500">*</span>
              </Label>
              <Textarea
                type="text"
                name="address"
                id="address"
                placeholder="Complete address"
              />
            </div>
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="location"
              >
                location <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="location"
                id="location"
                placeholder="Company location is required"
              />
            </div>
            <div className="basis-1/3 flex flex-col space-y-2"></div>
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="pincode"
              >
                PIN code <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="pincode"
                id="pincode"
                placeholder="Company PIN code is required"
                value={form.pincode}
                onChange={handleChange}
              />
            </div>
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="city"
              >
                city
              </Label>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="Company city is required"
                value={form.city}
                onChange={handleChange}
                readOnly={true}
              />
            </div>
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="state"
              >
                state
              </Label>
              <Input
                type="text"
                name="state"
                id="state"
                placeholder="State is required"
                value={form.state}
                onChange={handleChange}
                readOnly={true}
              />
            </div>
          </div>
        </div>

        <div className="border border-muted p-3 mt-4">
          <div className="flex flex-row justify-between items-center bg-muted my-0 mb-6 p-2">
            <h3 className="font-medium text-sm tracking-wider text-muted-foreground">
              Contact information
            </h3>
          </div>
          <div className="flex flex-row justify-between items-center gap-4 mb-4">
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="contactPerson"
              >
                contact person <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="contactPerson"
                id="contactPerson"
                placeholder="Company contact person is required"
              />
            </div>
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="mobile"
              >
                mobile no. <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Contact person mobile no. is required"
              />
            </div>
            <div className="basis-1/3 flex flex-col space-y-2"></div>
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="basis-1/3 flex flex-col space-y-2">
              <div className="flex flex-row items-start justify-start gap-2">
                <Label
                  className="text-muted-foreground text-xs uppercase"
                  htmlFor="username"
                >
                  app user name <span className="text-red-500">*</span>{" "}
                </Label>
                <AppPopover
                  text={`Person who will login and create other users`}
                />
              </div>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username is required"
              />
            </div>
            <div className="basis-1/3 flex flex-col space-y-2">
              <div className="flex flex-row items-start justify-start gap-2">
                <Label
                  className="text-muted-foreground text-xs uppercase"
                  htmlFor="userEmail"
                >
                  app user email <span className="text-red-500">*</span>
                </Label>
                <AppPopover
                  text={`This will be the email address. Password will be sent to this email`}
                />
              </div>
              <Input
                type="text"
                name="userEmail"
                id="userEmail"
                placeholder="User email is required"
              />
            </div>
            <div className="basis-1/3 flex flex-col space-y-2"></div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center my-8 gap-4">
          <AppSubmitBtn
            isLoading={isLoading}
            text={uuid ? `save changes` : `add company`}
            customClass={`w-auto uppercase text-white`}
          />
          <Link to={``}>
            <Button type="button" variant="outline" className="uppercase">
              Back to list
            </Button>
          </Link>
        </div>
      </form>
    </AppContentWrapper>
  );
};
export default AppCompanyAddEdit;
