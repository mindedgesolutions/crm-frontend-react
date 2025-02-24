import {
  AdminUserDelete,
  AppContentWrapper,
  AppCoUsersListFilter,
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
import { activeBadge, roleBadge, serialNo } from "@/utils/functions";
import dayjs from "dayjs";
import { Eye, Mail, Pencil, ThumbsUp } from "lucide-react";
import showError from "@/utils/showError";
import { useSelector } from "react-redux";
import avatar from "@/assets/images/000m.jpg";

const CoListUsers = () => {
  document.title = `List of Users | ${import.meta.env.VITE_APP_TITLE}`;

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: "",
    lastPage: "",
    totalRecords: "",
  });
  const [editId, setEditId] = useState("");
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const { counter } = useSelector((store) => store.common);

  // ------------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get("/company/users", {
        params: {
          page: queryString.get("page") || "",
          role: queryString.get("role") || "",
          search: queryString.get("search") || "",
        },
      });

      if (response) {
        setUsers(response.data.data);
        setMeta({
          currentPage: response.data.meta.current_page,
          lastPage: response.data.meta.last_page,
          totalRecords: response.data.meta.total,
        });
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
  }, [
    counter,
    queryString.get("page"),
    queryString.get("role"),
    queryString.get("company"),
    queryString.get("search"),
  ]);

  return (
    <AppContentWrapper>
      {isLoading && <AppPageLoader />}

      <div className="flex flex-row justify-between items-center bg-muted my-4 mb-2 p-3">
        <h3 className="font-semibold text-xl tracking-wider text-muted-foreground">
          List of Users
        </h3>
      </div>
      <AppCoUsersListFilter />
      <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-4 p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead></TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <AppSkeletonTableRow />
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
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
                          className="h-10 rounded-sm"
                        />
                        <section className="flex flex-col">
                          <h3 className="font-semibold tracking-wide mb-1">
                            {user.name}
                          </h3>
                          <span className="flex flex-row justify-start items-center text-sm text-muted-foreground/80">
                            <Mail size={12} className="mt-1 me-1" />
                            <h5 className="lowercase me-1">{user.email}</h5>
                          </span>
                        </section>
                      </section>
                    </TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    <TableCell>{user.company}</TableCell>
                    <TableCell>{roleBadge(user.role)}</TableCell>
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
                            <button>
                              <Eye
                                size={14}
                                className="text-muted-foreground group-hover:text-info"
                              />
                            </button>
                            <button>
                              <Pencil
                                size={14}
                                className="text-muted-foreground group-hover:text-warning"
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
      {meta.lastPage > 1 && (
        <AppPaginationContainer
          totalPages={meta.lastPage}
          currentPage={meta.currentPage}
        />
      )}
    </AppContentWrapper>
  );
};
export default CoListUsers;
