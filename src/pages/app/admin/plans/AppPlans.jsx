import {
  AppContentWrapper,
  AppPageLoader,
  AppPopoverAttr,
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
import { activeBadge } from "@/utils/functions";
import dayjs from "dayjs";
import { Eye, IndianRupee, Pencil, ThumbsUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import customFetch from "@/utils/customFetch";
import showError from "@/utils/showError";

const AppPlans = () => {
  document.title = `List of Plans | ${import.meta.env.VITE_APP_TITLE}`;

  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const { counter } = useSelector((store) => store.common);
  const { currentUser } = useSelector((store) => store.currentUser);

  // ----------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/admin/plans`);
      setPlans(response.data.plans);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showError(error?.response?.data?.errors);
    }
  };

  // ----------------------------------

  useEffect(() => {
    fetchData();
  }, [counter]);

  const handleActivate = async (id) => {};

  return (
    <AppContentWrapper>
      {isLoading && <AppPageLoader />}

      <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
        <h3 className="font-semibold text-xl tracking-wider text-muted-foreground">
          List of Plans
        </h3>
        <Link to={`/admin/${currentUser.user_detail.slug}/plans/new`}>
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
              <TableHead></TableHead>
              <TableHead>Tenure</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Features</TableHead>
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
            ) : plans.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-xs uppercase text-center"
                >
                  NO DATA FOUND
                </TableCell>
              </TableRow>
            ) : (
              plans?.map((plan, index) => {
                return (
                  <TableRow key={plan.id} className="text-xs uppercase group">
                    <TableCell className="font-medium">{index + 1}.</TableCell>
                    <TableCell>{plan.name}</TableCell>
                    <TableCell className="lowercase">
                      {plan.tenure === 1
                        ? `${plan.tenure} month`
                        : `${plan.tenure} months`}
                    </TableCell>
                    <TableCell>
                      <span className="flex flex-row justify-start items-center">
                        <IndianRupee size={12} />
                        {plan.price}
                      </span>
                    </TableCell>
                    <TableCell>
                      <AppPopoverAttr plan={plan} />
                    </TableCell>
                    <TableCell>
                      {dayjs(new Date(plan.updated_at)).format(
                        "DD/MM/YYYY h:mm A"
                      )}
                    </TableCell>
                    <TableCell>{activeBadge(plan.is_active)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col md:flex-row justify-end items-center space-y-4 md:space-y-0 md:gap-4">
                        {plan.is_active ? (
                          <>
                            <button type="button">
                              <Eye
                                size={14}
                                className="text-muted-foreground transition duration-200 group-hover:text-info"
                              />
                            </button>
                            <NavLink
                              to={`/admin/${currentUser.user_detail.slug}/plans/${plan.enc_id}/edit`}
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
                          <button onClick={() => handleActivate(plan.id)}>
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
    </AppContentWrapper>
  );
};
export default AppPlans;
