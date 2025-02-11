import loginbg from "@/assets/images/loginbg.jpg";
import { AppSubmitBtn } from "@/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import customFetch from "@/utils/customFetch";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

const Signin = () => {
  document.title = `Sign In | ${import.meta.env.VITE_APP_TITLE}`;

  const [form, setForm] = useState({
    email: "souvik@test.com",
    password: "password",
    remember: false,
  });
  const [errors, setErrors] = useState([]);
  const [otherError, setOtherError] = useState("");
  const [type, setType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ----------------- Functions -----------------

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // Reset error message

  const resetError = (event) => {
    setErrors({ ...errors, [event.target.name]: null });
    setOtherError(null);
  };

  // Change password type

  const changeType = () => {
    setType(type === "password" ? "text" : "password");
  };

  // Handle form submit starts -----------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, remember: data.remember === "on" ? true : false };

    let errorCount = 0;
    let errorBag = {};

    if (!data.email) {
      errorBag = { ...errorBag, email: ["Email is required"] };
      errorCount++;
    }
    if (!data.password) {
      errorBag = { ...errorBag, password: ["Password is required"] };
      errorCount++;
    }

    if (errorCount > 0) {
      return setErrors(errorBag);
    }

    setIsLoading(true);

    try {
      const response = await customFetch.post("/auth/login", data);
      setIsLoading(false);

      localStorage.setItem(
        import.meta.env.VITE_TOKEN_NAME,
        response.data.token
      );

      if (response.data.user.roles[0].name === "super admin") {
        navigate(`/admin/${response.data.user.slug}/dashboard`);
      } else {
        navigate(`/app/${response.data.user.slug}/dashboard`);
      }
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.status === 401) {
        setOtherError(error?.response?.data?.errors);
      }
      setErrors(error?.response?.data?.errors);
    }
  };

  // Handle form submit ends -----------------

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-4 md:px-14">
          <span className="mb-3 text-primary text-4xl font-bold">
            Welcome back
          </span>
          <span className="font-light mb-8 tracking-wide">
            Welcom back! Please enter your details
          </span>

          {otherError && (
            <div className="text-red-500 text-sm font-medium tracking-wide">
              {otherError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="py-2 md:py-4">
              <Label
                htmlFor="email"
                className="text-muted-foreground capitalize tracking-widest"
              >
                email
              </Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                onKeyUp={resetError}
              />
              <span className="text-red-500 text-sm tracking-wide">
                {errors?.email?.[0]}
              </span>
            </div>
            <div className="py-2 md:py-4">
              <Label
                htmlFor="password"
                className="text-muted-foreground capitalize tracking-widest"
              >
                password
              </Label>
              <div className="relative">
                <Input
                  type={type}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  onKeyUp={resetError}
                />
                <IoEyeOutline
                  size={20}
                  className="absolute top-3 right-3 text-muted-foreground cursor-pointer"
                  onClick={changeType}
                />
                <span className="text-red-500 text-sm tracking-wide">
                  {errors?.password?.[0]}
                </span>
              </div>
            </div>
            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="mr-2"
                />
                <span className="text-sm text-muted-foreground">
                  Keep me logged in
                </span>
              </div>
              <Link to={`/forgot-password`}>
                <span className="font-medium text-sm text-muted-foreground">
                  Forgot password
                </span>
              </Link>
            </div>
            <AppSubmitBtn
              customClass={`w-full bg-black text-white p-2 rounded-lg mb-6 border border-gray-300 hover:bg-white hover:text-black`}
              text={`Sign in`}
              isLoading={isLoading}
            />
          </form>
          <Link to={`/sign-up`}>
            <div className="text-center text-sm text-muted-foreground tracking-wide">
              Dont'have an account?
              <span className="font-normal text-muted-foreground hover:text-primary hover:underline ms-1">
                Sign up
              </span>
            </div>
          </Link>
        </div>
        <div className="relative">
          <img
            src={loginbg}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default Signin;
