import {
  AppContentWrapper,
  AppPageLoader,
  AppPaginationContainer,
  AppSkeletonTableRow,
  CoAddEditLeadStatus,
  CoDeleteLeadStatus,
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

const CoListNetworks = () => {
  document.title = `List of Networks | ${import.meta.env.VITE_APP_TITLE}`;

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

  // const fetchData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await customFetch.get(
  //       `/masters/lead-status/${company}`,
  //       { params: { page: queryString.get("page") } }
  //     );

  //     if (response.status === 200) {
  //       setLeadStatus(response.data.data);
  //       setMeta({
  //         currentPage: response.data.current_page,
  //         lastPage: response.data.last_page,
  //       });
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //     fetchData();
  //   }, [counter, queryString.get("page")]);

  return <div>CoListNetworks</div>;
};
export default CoListNetworks;
