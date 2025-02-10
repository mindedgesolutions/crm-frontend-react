import { Badge } from "@/components/ui/badge";
import customFetch from "./customFetch";
import { splitErrors } from "./splitErrors";
import CryptoJS from "crypto-js";
import axios from "axios";

// ------
export const adUserBadge = (type) => {
  switch (type) {
    case "Super Admin":
      return <Badge className="text-[10px] bg-primary/80">{type}</Badge>;
    case "Admin":
      return <Badge className="text-[10px] bg-primary/80">{type}</Badge>;

    default:
      return (
        <Badge className="text-[10px] bg-muted-foreground/90">{type}</Badge>
      );
  }
};

// ------
export const activeBadge = (status) => {
  switch (status) {
    case true:
      return <Badge className="text-[10px] bg-primary/80">Active</Badge>;

    case false:
      return (
        <Badge className="text-[10px] bg-muted-foreground/90">Inactive</Badge>
      );
  }
};

// ------
export const tenureBadge = (tenure) => {
  switch (tenure) {
    case 1:
      return <Badge className="text-[10px] bg-primary/80">monthly</Badge>;
    case 3:
      return <Badge className="text-[10px] bg-primary/80">quarterly</Badge>;
    case 12:
      return (
        <Badge className="text-[10px] bg-muted-foreground/90">yearly</Badge>
      );
  }
};

// ------
export const getCityState = async (code) => {
  const response = await axios.get(
    `https://api.postalpincode.in/pincode/${Number(code)}`
  );

  return response;
};

// ------
export const serialNo = (page) => {
  const srno = !page || page <= 1 ? 1 : (page - 1) * 10 + 1;
  return srno;
};

export const currencyFormat = () => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0, // Ensures two decimal places
  });
  return formatter;
};

// ------
export const namePrefix = (name) => {
  const arr = name.split(" ");
  const pref =
    arr[0].substring(0, 1).toUpperCase() + arr[1].substring(0, 1).toUpperCase();

  return pref;
};

// ------
export const encParam = (value) => {
  return encodeURIComponent(
    CryptoJS.AES.encrypt(value, import.meta.env.VITE_ENC_KEY).toString()
  );
};

export const decParam = (value) => {
  const data = CryptoJS.AES.decrypt(value, import.meta.env.VITE_ENC_KEY);

  return data.toString(CryptoJS.enc.Utf8);
};
