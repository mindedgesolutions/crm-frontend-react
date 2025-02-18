import {
  AppContentWrapper,
  AppPaginationContainer,
  CoAddEditLeadStatus,
} from "@/components";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CoListLeadStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const leadStatus = [];
  const meta = {
    currentPage: 1,
    lastPage: 1,
  };

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
              ) : leadStatus.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-xs uppercase text-center"
                  >
                    NO DATA FOUND
                  </TableCell>
                </TableRow>
              ) : (
                leadStatus?.map((attr, index) => {
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
