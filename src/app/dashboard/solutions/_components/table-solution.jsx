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

export default function TableSolution({ solutions, onDeleteButtonClick }) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="w-48">Image</TableHead>
          <TableHead className="min-w-28 max-w-32">Title</TableHead>
          <TableHead className="w-auto">Description</TableHead>
          <TableHead className="w-36">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {solutions.map((solution) => (
          <TableRow key={solution.id}>
            <TableCell className="font-medium w-48">
              <img src={solution.image} alt="image-1" className="max-w-40" />
            </TableCell>
            <TableCell>{solution.title}</TableCell>
            <TableCell>{solution.description}</TableCell>
            <TableCell>
              <Button asChild variant="secondary" className="mr-2">
                <Link href={URL.DASHBOARD_PROBLEMS_EDIT(solution.id)}>
                  <Pencil />
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDeleteButtonClick(solution)}
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
