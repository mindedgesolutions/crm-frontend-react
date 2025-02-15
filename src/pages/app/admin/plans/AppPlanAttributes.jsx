import {
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
import { serialNo } from "@/utils/functions";
import dayjs from "dayjs";
import { Pencil } from "lucide-react";
import showError from "@/utils/showError";
import { useDispatch, useSelector } from "react-redux";
import { setPlanAttributes } from "@/features/plansSlice";

const AppPlanAttributes = () => {
  document.title = `Plan Attributes | ${import.meta.env.VITE_APP_TITLE}`;

  const [isLoading, setIsLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);
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
      const response = await customFetch.get("/admin/plan-attributes", {
        params: {
          page: queryString.get("page") || "",
        },
      });

      if (response) {
        setAttributes(response.data.attributes.data);
        setMeta({
          currentPage: response.data.attributes.current_page,
          lastPage: response.data.attributes.last_page,
          totalRecords: response.data.attributes.total,
        });
        dispatch(setPlanAttributes(response.data.attributes.data));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error?.response?.data?.erros);
      showError(error?.response?.data?.erros);
    }
  };

  // ------------------------------------

  useEffect(() => {
    fetchData();
  }, [counter, queryString.get("page")]);

  return (
    <AppContentWrapper>
      {isLoading && <AppPageLoader />}

      <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
        <h3 className="font-semibold text-xl tracking-widest text-muted-foreground">
          Plan Attributes
        </h3>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-4 p-2">
        <div className="basis-2/3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
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
                        {serialNo(meta.currentPage) + index}.
                      </TableCell>
                      <TableCell>{attribute}</TableCell>
                      <TableCell>{type}</TableCell>
                      <TableCell>
                        {dayjs(new Date(updated_at)).format(
                          "MMM D, YYYY h:mm A"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col md:flex-row justify-end items-center space-y-4 md:space-y-0 md:gap-4">
                          <button
                            type="button"
                            onClick={() => setEditId(attr.id)}
                          >
                            <Pencil
                              size={14}
                              className="text-muted-foreground transition duration-200 group-hover:text-warning"
                            />
                          </button>
                          <AppDeletePlanAttribute deleteId={attr.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        <AppAddEditPlanAttribute
          attributes={attributes}
          editId={editId}
          setEditId={setEditId}
        />
      </div>
      {meta.lastPage > 1 && (
        <AppPaginationContainer
          totalPages={meta.lastPage}
          currentPage={meta.currentPage}
          addClass={`w-2/3`}
        />
      )}
    </AppContentWrapper>
  );
};
export default AppPlanAttributes;
