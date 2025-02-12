import { AppContentWrapper } from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { serialNo } from "@/utils/functions";
import dayjs from "dayjs";
import { Pencil, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AppCompanyList = () => {
  document.title = `List of Companies | ${import.meta.env.VITE_APP_TITLE}`;

  const [isLoading, setIsLoading] = useState(false);
  const attributes = [];
  const [companies, setCompanies] = useState([]);
  const { counter } = useSelector((store) => store.common);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      setIsLoading(false);
    } catch (error) {
      console.error(error?.response?.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <AppContentWrapper>
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
              <TableHead>Attribute</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Last Updated</TableHead>
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
            ) : attributes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-xs uppercase text-center"
                >
                  NO DATA FOUND
                </TableCell>
              </TableRow>
            ) : (
              attributes?.map((attr, index) => {
                const { attribute, type, updated_at } = attr;
                return (
                  <TableRow key={attr.id} className="text-xs uppercase group">
                    <TableCell className="font-medium">
                      {serialNo(page) + index}.
                    </TableCell>
                    <TableCell>{attribute}</TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell>
                      {dayjs(new Date(updated_at)).format("MMM D, YYYY h:mm A")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col justify-end items-center md:flex-row space-y-1 md:gap-4">
                        {attr.is_active ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setEditId(attr.id)}
                            >
                              <Pencil
                                size={18}
                                className="text-muted-foreground transition duration-200 group-hover:text-yellow-500"
                              />
                            </button>
                            {/* <AdDeletePlanAttribute deleteId={attr.id} /> */}
                          </>
                        ) : (
                          <button onClick={() => handleActivate(attr.id)}>
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
