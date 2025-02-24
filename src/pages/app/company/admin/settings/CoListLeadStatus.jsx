import {
  AppContentWrapper,
  AppPageLoader,
  AppPaginationContainer,
  AppSkeletonTableRow,
  CoAddEditLeadStatus,
  CoDeleteLeadStatus,
} from "@/components";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import customFetch from "@/utils/customFetch";
import { serialNo } from "@/utils/functions";
import dayjs from "dayjs";
import { Pencil, ThumbsUp } from "lucide-react";
import { useLocation } from "react-router-dom";
import { updateCounter } from "@/features/commonSlice";
import showSuccess from "@/utils/showSuccess";
import showError from "@/utils/showError";

const CoListLeadStatus = () => {
  document.title = `Lead Status | ${import.meta.env.VITE_APP_TITLE}`;

  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const { currentUser } = useSelector((store) => store.currentUser);
  const company = currentUser?.user_detail?.company_id;
  const [leadStatus, setLeadStatus] = useState([]);
  const [meta, setMeta] = useState({});
  const { counter } = useSelector((store) => store.common);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/company/lead-status`, {
        params: { page: queryString.get("page") },
      });

      if (response.status === 200) {
        setLeadStatus(response.data.data);
        setMeta({
          currentPage: response.data.current_page,
          lastPage: response.data.last_page,
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const activateStatus = async (id) => {
    setIsLoading(true);
    try {
      const response = await customFetch.put(
        `/company/lead-status-activate/${id}`
      );
      if (response.status === 200) {
        dispatch(updateCounter());
        showSuccess(`Lead status activated`);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showError(error?.response?.data?.message);
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, [counter, queryString.get("page")]);

  return (
    <AppContentWrapper>
      {isLoading && <AppPageLoader />}

      <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
        <h3 className="font-semibold text-xl tracking-widest text-muted-foreground">
          Lead Status
        </h3>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-4 p-2">
        <div className="basis-2/3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Attribute</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <AppSkeletonTableRow />
                  </TableCell>
                </TableRow>
              ) : leadStatus.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-xs uppercase text-center"
                  >
                    NO DATA FOUND
                  </TableCell>
                </TableRow>
              ) : (
                leadStatus?.map((status, index) => {
                  return (
                    <TableRow
                      key={status.id}
                      className="text-xs uppercase group"
                    >
                      <TableCell className="font-medium">
                        {serialNo(meta.currentPage) + index}.
                      </TableCell>
                      <TableCell>{status.name}</TableCell>
                      <TableCell>
                        {dayjs(new Date(status.updated_at)).format(
                          "DD/MM/YYYY h:mm A"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col md:flex-row justify-end items-center space-y-4 md:space-y-0 md:gap-4">
                          {status.company_id && (
                            <>
                              {status.is_active ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => setEditId(status.id)}
                                  >
                                    <Pencil
                                      size={14}
                                      className="text-muted-foreground transition duration-200 group-hover:text-warning"
                                    />
                                  </button>
                                  <CoDeleteLeadStatus deleteId={status.id} />
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => activateStatus(status.id)}
                                >
                                  <ThumbsUp
                                    size={14}
                                    className="text-muted-foreground transition duration-200 group-hover:text-primary"
                                  />
                                </button>
                              )}
                            </>
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
        <CoAddEditLeadStatus
          leadStatus={leadStatus}
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
export default CoListLeadStatus;
