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

export default function TableModule({ modules, onDeleteButtonClick }) {
  const displayFeatures = (features) => {
    if (features.length === 0) return "-";

    return features.map((feature) => feature.description).join(", ");
  };

  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="w-48">Image</TableHead>
          <TableHead className="min-w-28 max-w-32">Title</TableHead>
          <TableHead className="min-w-44">Description</TableHead>
          <TableHead className="min-w-20">Module Features</TableHead>
          <TableHead className="w-36">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modules.map((module) => (
          <TableRow key={module.id}>
            <TableCell className="font-medium w-48">
              <img src={module.image} alt="image-1" className="max-w-40" />
            </TableCell>
            <TableCell>{module.title}</TableCell>
            <TableCell>{module.description}</TableCell>
            <TableCell>{displayFeatures(module.moduleFeatures)}</TableCell>
            <TableCell>
              <Button asChild variant="secondary" className="mr-2">
                <Link href={URL.DASHBOARD_MODULES_EDIT(module.id)}>
                  <Pencil />
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDeleteButtonClick(module)}
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
