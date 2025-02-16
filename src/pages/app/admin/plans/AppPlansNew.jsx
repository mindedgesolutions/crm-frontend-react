import { AppContentWrapper, AppPageLoader, AppSubmitBtn } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import customFetch from "@/utils/customFetch";
import { tenures } from "@/utils/data";
import showError from "@/utils/showError";
import showSuccess from "@/utils/showSuccess";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";

const AppPlansNew = () => {
  document.title = `Add New Plan | ${import.meta.env.VITE_APP_TITLE}`;

  const { currentUser } = useSelector((store) => store.currentUser);
  const id = null;
  const [form, setForm] = useState({
    name: "",
    shortDesc: "",
    tenure: 1,
    price: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // For dynamic fields start -------------------
  const { planAttributes: attributes } = useLoaderData();
  const [fields, setFields] = useState(attributes || []);
  const [dynamicFormData, setDynamicFormData] = useState({});

  const handleDbChange = (e) => {
    setDynamicFormData({ ...dynamicFormData, [e.target.name]: e.target.value });
  };
  // For dynamic fields end -------------------

  // ----------------------------------

  const resetErrors = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ----------------------------------

  const formReset = () => {
    setForm({ ...form, name: "", shortDesc: "", tenure: 1, price: 0 });
    setDynamicFormData({});
  };

  // ----------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorCount = 0;
    let errorBag = {};

    if (!form.name) {
      errorBag = { ...errorBag, name: "Name is required" };
      errorCount++;
    }
    if (!form.shortDesc) {
      errorBag = { ...errorBag, shortDesc: "Short description is required" };
      errorCount++;
    }
    if (!form.price) {
      errorBag = { ...errorBag, price: "Price is required" };
      errorCount++;
    }
    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    setIsLoading(true);
    let data = new FormData();
    data.append("name", form.name);
    data.append("shortDesc", form.shortDesc);
    data.append("tenure", form.tenure);
    data.append("price", form.price);
    data.append("attributes", JSON.stringify(dynamicFormData));
    try {
      await customFetch.post("/admin/plans", data);
      setIsLoading(false);
      formReset();
      showSuccess("Plan added successfully");
    } catch (error) {
      setIsLoading(false);
      setErrors(error?.response?.data?.errors);
      return;
    }
  };

  return (
    <AppContentWrapper>
      {isLoading && <AppPageLoader />}

      <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
        <h3 className="font-semibold text-xl tracking-wider text-muted-foreground">
          Add New Plan
        </h3>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="border border-muted p-3">
          <div className="flex flex-row justify-between items-center gap-4 mb-2">
            <div className="basis-1/3 flex flex-col">
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
                placeholder="Plan must have a name"
                autoFocus={true}
                value={form.name}
                onChange={handleChange}
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4 tracking-wider">
                {errors?.name}
              </span>
            </div>
            <div className="basis-1/3 flex flex-col">
              <Label
                className="text-muted-foreground text-xs uppercase mb-2"
                htmlFor="shortDesc"
              >
                short description <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="shortDesc"
                id="shortDesc"
                placeholder="A valid email is a must"
                value={form.shortDesc}
                onChange={handleChange}
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4 tracking-wider">
                {errors?.shortDesc}
              </span>
            </div>
            <div className="basis-1/3 flex flex-col">
              <Label
                className="text-muted-foreground text-xs uppercase mb-2"
                htmlFor="tenure"
              >
                tenure
              </Label>
              <select
                name="tenure"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                value={form.tenure}
                onChange={handleChange}
              >
                {tenures.map((tenure) => {
                  return (
                    <option key={nanoid()} value={tenure.value}>
                      {tenure.label}
                    </option>
                  );
                })}
              </select>
              <span className="text-red-500 text-xs h-4 tracking-wider">
                {errors?.tenure}
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-center items-start gap-4 mb-2">
            <div className="basis-1/3 flex flex-col">
              <Label
                className="text-muted-foreground text-xs uppercase mb-2"
                htmlFor="price"
              >
                price <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="price"
                id="price"
                placeholder="A valid email is a must"
                value={form.price}
                onChange={handleChange}
                onKeyUp={resetErrors}
              />
              <span className="text-red-500 text-xs h-4 tracking-wider">
                {errors?.price}
              </span>
            </div>
            <div className="basis-1/3 flex flex-col"></div>
            <div className="basis-1/3 flex flex-col"></div>
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
            <h3 className="font-semibold tracking-widest text-muted-foreground">
              Plan Attributes
            </h3>
          </div>
          {fields.map((field, index) => {
            return (
              <div key={nanoid()}>
                <div className="flex flex-row justify-start items-center text-muted-foreground gap-4 py-1">
                  <span className="w-[50px] text-xs">{index + 1}.</span>
                  <p className="min-w-96 text-xs uppercase tracking-wider">
                    {field.attribute}
                  </p>
                  <span>
                    {field.type === "radio" ? (
                      <>
                        <div className="flex flex-row justify-start items-center gap-4 py-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={field.name}
                              id={`${field.name}_yes`}
                              value="yes"
                              checked={dynamicFormData[field.name] === "yes"}
                              onChange={handleDbChange}
                            />
                            <Label
                              htmlFor={`${field.name}_yes`}
                              className="text-xs"
                            >
                              YES
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={field.name}
                              id={`${field.name}_no`}
                              value="no"
                              checked={dynamicFormData[field.name] === "no"}
                              onChange={handleDbChange}
                            />
                            <Label
                              htmlFor={`${field.name}_no`}
                              className="text-xs"
                            >
                              NO
                            </Label>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <input
                          type={field.type}
                          name={field.name}
                          id={field.name}
                          className="flex h-10 w-60 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                          placeholder={`Enter ${field.attribute.toLowerCase()}`}
                          value={dynamicFormData[field.name] || ""}
                          onChange={handleDbChange}
                        />
                      </>
                    )}
                  </span>
                </div>
                <Separator />
              </div>
            );
          })}
        </div>
        <div className="flex flex-row justify-center items-center my-8 gap-4">
          <AppSubmitBtn
            isLoading={isLoading}
            text={id ? `save changes` : `add plan`}
            customClass={`w-auto uppercase text-white`}
          />
          <Link to={`/admin/${currentUser.slug}/plans`}>
            <Button type="button" variant="outline" className="uppercase">
              Back to list
            </Button>
          </Link>
        </div>
      </form>
    </AppContentWrapper>
  );
};
export default AppPlansNew;

// ----------------------------------
export const loader = async () => {
  try {
    const response = await customFetch.get("/masters/plan-attributes");
    const planAttributes = response.data;
    return { planAttributes };
  } catch (error) {
    console.log(error?.response?.data?.errors);
    showError(error?.response?.data?.errors);
    return null;
  }
};
