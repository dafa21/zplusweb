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

export default function TableClient({ clients, onDeleteButtonClick }) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="w-48">Image</TableHead>
          <TableHead className="min-w-28 max-w-32">Name</TableHead>
          <TableHead className="min-w-44">Description</TableHead>
          <TableHead className="w-36">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium w-48">
              <img src={client.logo} alt={client.name} className="max-w-40" />
            </TableCell>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.projectDescription}</TableCell>
            <TableCell>
              <Button asChild variant="secondary" className="mr-2">
                <Link href={URL.DASHBOARD_CLIENTS_EDIT(client.id)}>
                  <Pencil />
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDeleteButtonClick(client)}
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
