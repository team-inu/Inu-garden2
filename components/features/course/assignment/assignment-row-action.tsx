/* eslint-disable react/no-unescaped-entities */
"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AssignmentSchema } from "@/data/schema"; // TODO: make it dynamic
import { useState } from "react";
import { CreateAssignmentType } from "@/types/schema/assignment-schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import AssignmentDialog from "./assignment-dialog";
import { checkMultipleString } from "@/libs/utils";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function AssigmentRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const assignmentData = AssignmentSchema.parse(row.original);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const clo = checkMultipleString(assignmentData.clo);
  const po = checkMultipleString(assignmentData.po);
  const plo = checkMultipleString(assignmentData.plo);

  console.log(clo);

  const onSubmit = (values: CreateAssignmentType) => {
    console.log(values);
  };

  const onDelete = () => {
    console.log("delete");
  };

  return (
    <Dialog
      open={isEditDialogOpen || isDeleteDialogOpen}
      onOpenChange={
        isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
      }
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isEditDialogOpen && (
        <AssignmentDialog
          isEdit
          onSubmit={onSubmit}
          defaultValues={{
            ...assignmentData,
            clo,
            plo,
            po,
          }}
        />
      )}

      {isDeleteDialogOpen && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are your sure to delete?</DialogTitle>
            <DialogDescription>
              You can't undo this action. This will permanently delete the.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={onDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
