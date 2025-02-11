import {
  AppAddEditPlanAttribute,
  AppContentWrapper,
  AppSkeletonTableRow,
} from "@/components";
import customFetch from "@/utils/customFetch";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { Pencil, ThumbsUp } from "lucide-react";
import { useSelector } from "react-redux";
import { splitErrors } from "@/utils/splitErrors";

const AppPlanAttributes = () => {
  document.title = `Plan Attributes | ${import.meta.env.VITE_APP_TITLE}`;
  const [isLoading, setIsLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [meta, setMeta] = useState({});
  const [editId, setEditId] = useState("");
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const navigate = useNavigate();

  return (
    <AppContentWrapper>
      <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
        <h3 className="font-bold text-xl tracking-widest text-muted-foreground">
          Plan Attributes
        </h3>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-4 p-2">
        <div className="basis-2/3">
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
                        {dayjs(new Date(updated_at)).format(
                          "MMM D, YYYY h:mm A"
                        )}
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
                              <AdDeletePlanAttribute deleteId={attr.id} />
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
        <AppAddEditPlanAttribute
          attributes={attributes}
          editId={editId}
          setEditId={setEditId}
        />
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
export default AppPlanAttributes;
