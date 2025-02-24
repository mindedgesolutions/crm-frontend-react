import {
  AppContentWrapper,
  AppPageLoader,
  AppPaginationContainer,
  AppSkeletonTableRow,
  CoAddEditNetwork,
  CoDeleteLeadStatus,
  CoDeleteNetwork,
} from "@/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import customFetch from "@/utils/customFetch";
import { serialNo } from "@/utils/functions";
import dayjs from "dayjs";
import { Pencil, ThumbsUp } from "lucide-react";
import { updateCounter } from "@/features/commonSlice";
import showSuccess from "@/utils/showSuccess";
import showError from "@/utils/showError";
import noImage from "@/assets/images/no-image.jpg";

const CoListNetworks = () => {
  document.title = `List of Networks | ${import.meta.env.VITE_APP_TITLE}`;

  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const { currentUser } = useSelector((store) => store.currentUser);
  const company = currentUser?.user_detail?.company_id;
  const [networks, setNetworks] = useState([]);
  const [meta, setMeta] = useState({});
  const { counter } = useSelector((store) => store.common);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/company/networks`, {
        params: { page: queryString.get("page") },
      });

      if (response.status === 200) {
        setNetworks(response.data.data);
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
      const response = await customFetch.put(`/company/network-activate/${id}`);
      if (response.status === 200) {
        dispatch(updateCounter());
        showSuccess(`Network activated`);
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
          Networks
        </h3>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-4 p-2">
        <div className="basis-2/3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Network</TableHead>
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
              ) : networks?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-xs uppercase text-center"
                  >
                    NO DATA FOUND
                  </TableCell>
                </TableRow>
              ) : (
                networks?.map((network, index) => {
                  const displayImg = network.network_img
                    ? `${import.meta.env.VITE_BASE_URL}${network.network_img}`
                    : noImage;

                  return (
                    <TableRow
                      key={network.id}
                      className="text-xs uppercase group"
                    >
                      <TableCell className="font-medium">
                        {serialNo(meta.currentPage) + index}.
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row justify-start items-start">
                          <img
                            src={displayImg}
                            alt={network.name}
                            className="w-4 h-4 rounded-sm mr-2"
                          />
                          <span>{network.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {dayjs(new Date(network.updated_at)).format(
                          "DD/MM/YYYY h:mm A"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col md:flex-row justify-end items-center space-y-4 md:space-y-0 md:gap-4">
                          {network.company_id && (
                            <>
                              {network.is_active ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => setEditId(network.id)}
                                  >
                                    <Pencil
                                      size={14}
                                      className="text-muted-foreground transition duration-200 group-hover:text-warning"
                                    />
                                  </button>
                                  <CoDeleteNetwork deleteId={network.id} />
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => activateStatus(network.id)}
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
        <CoAddEditNetwork
          networks={networks}
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
export default CoListNetworks;
