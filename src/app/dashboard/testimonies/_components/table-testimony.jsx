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

export default function TableTestimony({ testimonies, onDeleteButtonClick }) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="w-48">Image</TableHead>
          <TableHead className="min-w-28 max-w-32">Description</TableHead>
          <TableHead className="min-w-44">Name</TableHead>
          <TableHead>Institution</TableHead>
          <TableHead className="w-36">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {testimonies.map((testimony) => (
          <TableRow key={testimony.id}>
            <TableCell className="font-medium w-48">
              <img src={testimony.logo} alt="image-1" className="max-w-40" />
            </TableCell>
            <TableCell>{testimony.name}</TableCell>
            <TableCell>{testimony.description}</TableCell>
            <TableCell>{testimony.institution}</TableCell>
            <TableCell>
              <Button asChild variant="secondary" className="mr-2">
                <Link href={URL.DASHBOARD_TESTIMONIES_EDIT(testimony.id)}>
                  <Pencil />
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDeleteButtonClick(testimony)}
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
