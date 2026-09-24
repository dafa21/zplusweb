import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { URL } from "@/lib/menu";

export default function TableCredibility({
  credibilities,
  onDeleteButtonClick,
}) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-28">Total</TableHead>
          <TableHead className="min-w-28">Description</TableHead>
          <TableHead className="w-36">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {credibilities.map((credibility) => (
          <TableRow key={credibility.id}>
            <TableCell>{credibility.total}</TableCell>
            <TableCell>{credibility.description}</TableCell>
            <TableCell>
              <Button asChild variant="secondary" className="mr-2">
                <Link href={URL.DASHBOARD_CREDIBILITIES_EDIT(credibility.id)}>
                  <Pencil />
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDeleteButtonClick(credibility)}
              >
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
