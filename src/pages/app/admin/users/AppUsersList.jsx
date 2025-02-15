import {
  AdminUserAddEdit,
  AdminUserDelete,
  AppAddEditPlanAttribute,
  AppContentWrapper,
  AppDeletePlanAttribute,
  AppPageLoader,
  AppPaginationContainer,
  AppSkeletonTableRow,
} from "@/components";
import customFetch from "@/utils/customFetch";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { activeBadge, serialNo } from "@/utils/functions";
import dayjs from "dayjs";
import { Pencil, ThumbsUp } from "lucide-react";
import showError from "@/utils/showError";
import { useDispatch, useSelector } from "react-redux";
import { setAdminUsers } from "@/features/userSlice";
import avatar from "@/assets/images/000m.jpg";

const AppUsersList = () => {
  document.title = `List of Users (Super Admin) | ${
    import.meta.env.VITE_APP_TITLE
  }`;

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    lastPage: "",
    totalRecords: "",
  });
  const [editId, setEditId] = useState("");
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const { counter } = useSelector((store) => store.common);
  const dispatch = useDispatch();

  // ------------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get("/admin/users", {
        params: {
          page: queryString.get("page") || "",
        },
      });

      if (response) {
        setUsers(response.data.data);
        setMeta({
          currentPage: response.data.meta.current_page,
          lastPage: response.data.meta.last_page,
          totalRecords: response.data.meta.total,
        });
        dispatch(setAdminUsers(response.data.data));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showError(error);
    }
  };

  // ------------------------------------

  useEffect(() => {
    fetchData();
  }, [counter]);

  // ------------------------------------

  const handleActivate = async (id) => {
    setIsLoading(true);
    try {
      await customFetch.put(`/admin/activate-users/${id}`);
      setIsLoading(false);
      fetchData();
    } catch (error) {
      setIsLoading(false);
      showError(error);
    }
  };

  return (
    <AppContentWrapper>
      {isLoading && <AppPageLoader />}

      <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
        <h3 className="font-semibold text-xl tracking-wider text-muted-foreground">
          List of Users (Super Admin)
        </h3>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-4 p-2">
        <div className="basis-2/3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead></TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <AppSkeletonTableRow />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-xs uppercase text-center"
                  >
                    NO DATA FOUND
                  </TableCell>
                </TableRow>
              ) : (
                users?.map((user, index) => {
                  return (
                    <TableRow key={user.id} className="text-xs uppercase group">
                      <TableCell className="font-medium">
                        {serialNo(meta.currentPage) + index}.
                      </TableCell>
                      <TableCell>
                        <section className="flex flex-row justify-start items-start gap-2.5">
                          <img
                            src={avatar}
                            alt="avatar"
                            className="h-full max-h-14 rounded-sm"
                          />
                          <section className="flex flex-col">
                            <h3 className="font-semibold tracking-wide mb-2">
                              {user.name}
                            </h3>
                            <span className="flex flex-col space-y-1 text-xs text-muted-foreground">
                              <h5 className="lowercase">{user.email}</h5>
                              <h5>{user.mobile}</h5>
                            </span>
                          </section>
                        </section>
                      </TableCell>
                      <TableCell>
                        {dayjs(new Date(user.updated_at)).format(
                          "MMM D, YYYY h:mm A"
                        )}
                      </TableCell>
                      <TableCell>{activeBadge(user.is_active)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col md:flex-row justify-end items-center space-y-4 md:space-y-0 md:gap-4">
                          {user.is_active ? (
                            <>
                              <button
                                type="button"
                                onClick={() => setEditId(user.id)}
                              >
                                <Pencil
                                  size={14}
                                  className="text-muted-foreground transition duration-200 group-hover:text-warning"
                                />
                              </button>
                              <AdminUserDelete deleteId={user.id} />
                            </>
                          ) : (
                            <button onClick={() => handleActivate(user.id)}>
                              <ThumbsUp size={14} className="text-primary" />
                            </button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        <AdminUserAddEdit users={users} editId={editId} setEditId={setEditId} />
      </div>
    </AppContentWrapper>
  );
};
export default AppUsersList;
