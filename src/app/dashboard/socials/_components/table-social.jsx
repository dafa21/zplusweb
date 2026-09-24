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
import { getSocialType } from "../_utils/social";

export default function TableSocial({ socials, onDeleteButtonClick }) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-28">Social Media</TableHead>
          <TableHead className="min-w-28">Value</TableHead>
          <TableHead className="min-w-28">Link</TableHead>
          <TableHead className="w-36">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {socials.map((social) => (
          <TableRow key={social.id}>
            <TableCell>{getSocialType(social.type).label}</TableCell>
            <TableCell>{social.value}</TableCell>
            <TableCell>{social.link}</TableCell>
            <TableCell>
              <Button asChild variant="secondary" className="mr-2">
                <Link href={URL.DASHBOARD_SOCIALS_EDIT(social.id)}>
                  <Pencil />
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDeleteButtonClick(social)}
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
