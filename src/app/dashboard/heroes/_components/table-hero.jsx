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

export default function TableHero({ heroes, onDeleteButtonClick }) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-32">Image Desktop</TableHead>
          <TableHead className="min-w-32">Image Mobile</TableHead>
          <TableHead className="min-w-32">Title</TableHead>
          <TableHead className="min-w-28">Description</TableHead>
          <TableHead className="w-36">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {heroes.map((hero) => (
          <TableRow key={hero.id}>
            <TableCell className="font-medium w-32">
              <img src={hero.imageDesktop} alt="image-1" className="max-w-32" />
            </TableCell>
            <TableCell className="font-medium w-32">
              <img src={hero.imageMobile} alt="image-1" className="max-w-32" />
            </TableCell>
            <TableCell>{hero.title}</TableCell>
            <TableCell>{hero.description}</TableCell>
            <TableCell>
              <Button asChild variant="secondary" className="mr-2">
                <Link href={URL.DASHBOARD_HEROES_EDIT(hero.id)}>
                  <Pencil />
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDeleteButtonClick(hero)}
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
