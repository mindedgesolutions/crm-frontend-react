import { AppContentWrapper, AppPageLoader, AppSubmitBtn } from "@/components";
import AppPopover from "@/components/app/AppPopover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import customFetch from "@/utils/customFetch";
import { getCityState } from "@/utils/functions";
import showSuccess from "@/utils/showSuccess";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const AppCompanyAddEdit = () => {
  document.title = `Add New Company | ${import.meta.env.VITE_APP_TITLE}`;
  const { id } = useParams();

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
    whatsapp: "",
    username: "",
    userEmail: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { currentUser } = useSelector((store) => store.currentUser);

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

  const resetErrors = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ---------------------------------------------

  const resetForm = () => {
    setForm({
      ...form,
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
      whatsapp: "",
      username: "",
      userEmail: "",
    });
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
    if (!form.address) {
      errorBag = { ...errorBag, address: "Address is required" };
      errorCount++;
    }
    if (!form.location) {
      errorBag = { ...errorBag, location: "Location is required" };
      errorCount++;
    }
    if (!form.pincode) {
      errorBag = { ...errorBag, pincode: "PIN code is required" };
      errorCount++;
    }
    if (!form.city) {
      errorBag = { ...errorBag, city: "City is required" };
      errorCount++;
    }
    if (!form.state) {
      errorBag = { ...errorBag, state: "State is required" };
      errorCount++;
    }
    if (!form.contactPerson) {
      errorBag = { ...errorBag, contactPerson: "Contact person is required" };
      errorCount++;
    }
    if (!form.mobile) {
      errorBag = { ...errorBag, mobile: "Mobile is required" };
      errorCount++;
    }
    if (!form.whatsapp) {
      errorBag = {
        ...errorBag,
        whatsapp: "WhatsApp no. is required",
      };
      errorCount++;
    }
    if (!form.username) {
      errorBag = { ...errorBag, username: "App user name is required" };
      errorCount++;
    }
    if (!form.userEmail) {
      errorBag = { ...errorBag, userEmail: "User email is required" };
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    setIsLoading(true);

    try {
      const process = id ? customFetch.patch : customFetch.post;
      const apiUrl = id ? `/admin/companies/${id}` : `/admin/companies`;
      const response = await process(apiUrl, data);
      setIsLoading(false);

      if (response.status === 201) {
        showSuccess("Company added successfully");
        resetForm();
      } else if (response.status === 202) {
        showSuccess("Updated successfully");
      }
    } catch (error) {
      setIsLoading(false);
      setErrors(error?.response?.data?.errors);
    }
  };

  // --------------------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const response = await customFetch.get(`/admin/companies/${id}`);

        setForm({
          ...form,
          name: response.data.data?.name ?? "",
          email: response.data.data?.email ?? "",
          website: response.data.data?.website ?? "",
          address: response.data.data?.address ?? "",
          location: response.data.data?.location ?? "",
          pincode: response.data.data?.pincode ?? "",
          city: response.data.data?.city ?? "",
          state: response.data.data?.state ?? "",
          contactPerson: response.data.data?.contact_person ?? "",
          mobile: response.data.data?.phone ?? "",
          whatsapp: response.data.data?.whatsapp ?? "",
          username: response.data.data?.user_master?.name ?? "",
          userEmail: response.data.data?.user_master?.email ?? "",
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error?.response?.data);
    }
  };

  // --------------------------------------------

  useEffect(() => {
    fetchData();
  }, []);

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
          <div className="flex flex-row justify-between items-center gap-4 mb-2">
            <div className="basis-1/3 flex flex-col">
              <Label
                className="text-muted-foreground text-xs uppercase mb-2"
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
                value={form.name}
                onChange={handleChange}
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4">{errors?.name}</span>
            </div>
            <div className="basis-1/3 flex flex-col">
              <Label
                className="text-muted-foreground text-xs uppercase mb-2"
                htmlFor="email"
              >
                company email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="A valid email is a must"
                value={form.email}
                onChange={handleChange}
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4">{errors?.email}</span>
            </div>
            <div className="basis-1/3 flex flex-col">
              <Label
                className="text-muted-foreground text-xs uppercase mb-2"
                htmlFor="website"
              >
                company website
              </Label>
              <Input
                type="text"
                name="website"
                id="website"
                placeholder="Website URL (if there is any)"
                value={form.website}
                onChange={handleChange}
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4">
                {errors?.website}
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-center items-start gap-4 mb-2">
            <div className="basis-1/3 flex flex-col">
              <Label
                className="text-muted-foreground text-xs uppercase mb-2"
                htmlFor="address"
              >
                address <span className="text-red-500">*</span>
              </Label>
              <Textarea
                type="text"
                name="address"
                id="address"
                placeholder="Complete address"
                value={form.address}
                onChange={handleChange}
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4">
                {errors?.address}
              </span>
            </div>
            <div className="basis-1/3 flex flex-col">
              <Label
                className="text-muted-foreground text-xs uppercase mb-2"
                htmlFor="location"
              >
                location <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="location"
                id="location"
                placeholder="Company location is required"
                value={form.location}
                onChange={handleChange}
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4">
                {errors?.location}
              </span>
            </div>
            <div className="basis-1/3 flex flex-col"></div>
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="basis-1/3 flex flex-col">
              <Label
                className="text-muted-foreground text-xs uppercase mb-2"
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
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4">
                {errors?.pincode}
              </span>
            </div>
            <div className="basis-1/3 flex flex-col">
              <Label
                className="text-muted-foreground text-xs uppercase mb-2"
                htmlFor="city"
              >
                city (auto-filled)
              </Label>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="Company city is required"
                value={form.city}
                onChange={handleChange}
                onKeyUp={resetErrors}
                readOnly={true}
              />
              <span className="text-red-500 text-xs h-4">{errors?.city}</span>
            </div>
            <div className="basis-1/3 flex flex-col">
              <Label
                className="text-muted-foreground text-xs uppercase mb-2"
                htmlFor="state"
              >
                state (auto-filled)
              </Label>
              <Input
                type="text"
                name="state"
                id="state"
                placeholder="State is required"
                value={form.state}
                onChange={handleChange}
                onKeyUp={resetErrors}
                readOnly={true}
              />
              <span className="text-red-500 text-xs h-4">{errors?.state}</span>
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
            <div className="basis-1/3 flex flex-col">
              <Label
                className="text-muted-foreground text-xs uppercase mb-2"
                htmlFor="contactPerson"
              >
                contact person <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="contactPerson"
                id="contactPerson"
                placeholder="Company contact person is required"
                value={form.contactPerson}
                onChange={handleChange}
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4">
                {errors?.contactPerson}
              </span>
            </div>
            <div className="basis-1/3 flex flex-col">
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
                placeholder="Contact person mobile no. is required"
                value={form.mobile}
                onChange={handleChange}
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4">{errors?.mobile}</span>
            </div>
            <div className="basis-1/3 flex flex-col">
              <Label
                className="text-muted-foreground text-xs uppercase mb-2"
                htmlFor="whatsapp"
              >
                whatsapp no. <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="whatsapp"
                id="whatsapp"
                placeholder="Contact person whatsapp no. is required"
                value={form.whatsapp}
                onChange={handleChange}
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4">
                {errors?.whatsapp}
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="basis-1/3 flex flex-col">
              <div className="flex flex-row items-start justify-start gap-2">
                <Label
                  className="text-muted-foreground text-xs uppercase mb-2"
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
                value={form.username}
                onChange={handleChange}
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4">
                {errors?.username}
              </span>
            </div>
            <div className="basis-1/3 flex flex-col">
              <div className="flex flex-row items-start justify-start gap-2">
                <Label
                  className="text-muted-foreground text-xs uppercase mb-2"
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
                value={form.userEmail}
                onChange={handleChange}
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4">
                {errors?.userEmail}
              </span>
            </div>
            <div className="basis-1/3 flex flex-col"></div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center my-8 gap-4">
          <AppSubmitBtn
            isLoading={isLoading}
            text={id ? `save changes` : `add company`}
            customClass={`w-auto uppercase text-white`}
          />
          <Link to={`/admin/${currentUser.slug}/companies`}>
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
