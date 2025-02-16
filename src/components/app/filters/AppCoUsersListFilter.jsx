import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { roles } from "@/utils/data";
import showError from "@/utils/showError";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const AppCoUsersListFilter = ({ companies }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((store) => store.currentUser);
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [form, setForm] = useState({ role: "", company: "", search: "" });

  // ------------------------------------

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ------------------------------------

  const resetFilters = () => {
    navigate(`/admin/${currentUser.user_detail.slug}/users/client`);
    setForm({ ...form, role: "", company: "", search: "" });
  };

  // ------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (data.search && data.search.length < 3) {
      showError("Search query must be at least 3 characters long");
      return;
    }

    data.role && searchParams.set("role", data.role);
    data.company && searchParams.set("company", data.company);
    data.search && searchParams.set("search", data.search);

    navigate(`${pathname}?${searchParams.toString()}`);
  };

  // ------------------------------------

  useEffect(() => {
    setForm({
      ...form,
      role: searchParams.get("role") || "",
      company: searchParams.get("company") || "",
      search: searchParams.get("search") || "",
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row justify-end items-center gap-4 bg-info/15 p-2">
        <select
          name="role"
          id="role"
          value={form.role}
          onChange={handleChange}
          className="flex h-8 w-full md:w-48 items-center justify-between rounded-md bg-background px-2 py-1 text-sm focus:outline-none"
        >
          <option value="">- Filter by role -</option>
          {roles.map((role) => {
            return (
              <option key={nanoid()} value={role.roleId}>
                {role.roleLabel}
              </option>
            );
          })}
        </select>
        <select
          name="company"
          id="company"
          value={form.company}
          onChange={handleChange}
          className="flex h-8 w-full md:w-48 items-center justify-between rounded-md bg-background px-2 py-1 text-sm focus:outline-none"
        >
          <option value="">- Filter by company -</option>
          {companies.map((co) => {
            return (
              <option key={nanoid()} value={co.slug}>
                {co.name}
              </option>
            );
          })}
        </select>
        <Input
          type="text"
          className="w-full md:w-48 h-8 px-2 py-1 focus:outline-none"
          id="search"
          name="search"
          placeholder="Min 3 characters"
          value={form.search}
          onChange={handleChange}
        />
        <div className="flex flex-row gap-2">
          <Button size="xs" type="submit">
            Search
          </Button>
          <Button
            size="xs"
            variant="ghost"
            type="button"
            className="bg-muted"
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};
export default AppCoUsersListFilter;
