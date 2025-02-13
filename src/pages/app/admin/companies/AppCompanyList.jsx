import {
  AppContentWrapper,
  AppPageLoader,
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
import { Pencil, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import customFetch from "@/utils/customFetch";
import AppToolTipped from "@/components/app/AppToolTipped";

const AppCompanyList = () => {
  document.title = `List of Companies | ${import.meta.env.VITE_APP_TITLE}`;

  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [meta, setMeta] = useState({});
  const { counter } = useSelector((store) => store.common);

  // ----------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/admin/companies`);
      setCompanies(response.data.data);
      setMeta(response.data.meta);
      setIsLoading(false);
    } catch (error) {
      // console.log(error.status);
      // console.error(error?.response?.data);
      setIsLoading(false);
    }
  };

  // ----------------------------------

  const handleActivate = async (id) => {};

  useEffect(() => {
    fetchData();
  }, [counter]);

  return (
    <AppContentWrapper>
      {isLoading && <AppPageLoader />}

      <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
        <h3 className="font-bold text-xl tracking-wider text-muted-foreground">
          List of Companies
        </h3>
        <Link to={`/admin/souvik-nag/companies/new`}>
          <Button size={"xs"} className="capitalize tracking-wider">
            add new
          </Button>
        </Link>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-4 p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sl. No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Contact No.</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
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
                      <AppToolTipped
                        text={`${company.location}, ${company.city}, ${company.state}`}
                      />
                    </TableCell>
                    <TableCell>
                      <AppToolTipped text={company.contact_person} />
                    </TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell>{company.whatsapp}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>
                      {dayjs(new Date(company.created_at)).format(
                        "DD/MM/YYYY h:mm A"
                      )}
                    </TableCell>
                    <TableCell>{activeBadge(company.is_active)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col justify-end items-center md:flex-row space-y-1 md:gap-4">
                        {company.is_active ? (
                          <NavLink
                            to={`/admin/souvik-nag/companies/${company.enc_id}/edit`}
                          >
                            <button type="button">
                              <Pencil
                                size={18}
                                className="text-muted-foreground transition duration-200 group-hover:text-yellow-500"
                              />
                            </button>
                          </NavLink>
                        ) : (
                          <button onClick={() => handleActivate(company.id)}>
                            <ThumbsUp size={18} className="text-green-500" />
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
      {/* {meta.totalPages > 1 && (
        <PaginationContainer
          totalPages={meta.totalPages}
          currentPage={meta.currentPage}
          addClass={`w-2/3`}
        />
      )} */}
    </AppContentWrapper>
  );
};
export default AppCompanyList;
