import {
  AppContentWrapper,
  AppPageLoader,
  AppPaginationContainer,
  AppSkeletonTableRow,
} from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { activeBadge, serialNo } from "@/utils/functions";
import dayjs from "dayjs";
import { Eye, Pencil, ThumbsUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import customFetch from "@/utils/customFetch";
import AppToolTipped from "@/components/app/AppToolTipped";
import showError from "@/utils/showError";

const AppCompanyList = () => {
  document.title = `List of Companies | ${import.meta.env.VITE_APP_TITLE}`;

  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [meta, setMeta] = useState({});
  const { counter } = useSelector((store) => store.common);
  const { currentUser } = useSelector((store) => store.currentUser);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);

  // ----------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/admin/companies`, {
        params: { page: queryString.get("page") || "" },
      });
      setCompanies(response.data.data);
      setMeta(response.data.meta);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showError(error?.response?.data?.errors);
    }
  };

  // ----------------------------------

  const handleActivate = async (id) => {};

  useEffect(() => {
    fetchData();
  }, [counter, queryString.get("page")]);

  return (
    <AppContentWrapper>
      {isLoading && <AppPageLoader />}

      <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
        <h3 className="font-semibold text-xl tracking-wider text-muted-foreground">
          List of Companies
        </h3>
        <Link to={`/admin/${currentUser.user_detail.slug}/companies/new`}>
          <Button size={"xs"} className="capitalize tracking-wider">
            add new
          </Button>
        </Link>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-4 p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Contact No.</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
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
            ) : companies.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-xs uppercase text-center"
                >
                  NO DATA FOUND
                </TableCell>
              </TableRow>
            ) : (
              companies?.map((company, index) => {
                return (
                  <TableRow
                    key={company.id}
                    className="text-xs uppercase group"
                  >
                    <TableCell className="font-medium">
                      {serialNo(meta.current_page) + index}.
                    </TableCell>
                    <TableCell>
                      <AppToolTipped text={company.name} />
                    </TableCell>
                    <TableCell>
                      <AppToolTipped text={company.contact_person} />
                    </TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell>{company.whatsapp}</TableCell>
                    <TableCell>
                      <AppToolTipped text={company.email} />
                    </TableCell>
                    <TableCell>
                      {dayjs(new Date(company.created_at)).format(
                        "DD/MM/YYYY h:mm A"
                      )}
                    </TableCell>
                    <TableCell>{activeBadge(company.is_active)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col md:flex-row justify-end items-center space-y-4 md:space-y-0 md:gap-4">
                        {company.is_active ? (
                          <>
                            <button type="button">
                              <Eye
                                size={14}
                                className="text-muted-foreground transition duration-200 group-hover:text-info"
                              />
                            </button>
                            <NavLink
                              to={`/admin/${currentUser.user_detail.slug}/companies/${company.enc_id}/edit`}
                            >
                              <button type="button">
                                <Pencil
                                  size={14}
                                  className="text-muted-foreground transition duration-200 group-hover:text-warning"
                                />
                              </button>
                            </NavLink>
                            <button type="button">
                              <Trash2
                                size={14}
                                className="transition duration-200 text-red-500"
                              />
                            </button>
                          </>
                        ) : (
                          <button onClick={() => handleActivate(company.id)}>
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
      {meta.last_page > 1 && (
        <AppPaginationContainer
          totalPages={meta.last_page}
          currentPage={meta.current_page}
        />
      )}
    </AppContentWrapper>
  );
};
export default AppCompanyList;
