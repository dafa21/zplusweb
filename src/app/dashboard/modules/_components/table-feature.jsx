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

export default function TableFeature({ id, features, onDeleteButtonClick }) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="w-48">Image</TableHead>
          <TableHead className="min-w-44">Description</TableHead>
          <TableHead className="w-36">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {features.map((feature) => (
          <TableRow key={feature.id}>
            <TableCell className="font-medium w-48">
              <img src={feature.image} alt="image-1" className="max-w-40" />
            </TableCell>
            <TableCell>{feature.description}</TableCell>
            <TableCell>
              <Button asChild variant="secondary" className="mr-2">
                <Link href={URL.DASHBOARD_MODULE_FEATURES_EDIT(id, feature.id)}>
                  <Pencil />
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDeleteButtonClick(feature)}
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
