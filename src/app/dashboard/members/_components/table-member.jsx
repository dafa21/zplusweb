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

export default function TableMember({ members, onDeleteButtonClick }) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="w-48">Image</TableHead>
          <TableHead className="min-w-28 max-w-32">Name</TableHead>
          <TableHead className="min-w-44">Role</TableHead>
          <TableHead className="w-36">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium w-48">
              <img src={member.image} alt="image-1" className="max-w-40" />
            </TableCell>
            <TableCell>{member.name}</TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell>
              <Button asChild variant="secondary" className="mr-2">
                <Link href={URL.DASHBOARD_MEMBERS_EDIT(member.id)}>
                  <Pencil />
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDeleteButtonClick(member)}
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
