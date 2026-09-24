"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { Plus } from "lucide-react";
import Link from "next/link";
import TableMember from "./_components/table-member";
import DeleteConfirm from "./_components/delete-confirm";
import { URL } from "@/lib/menu";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function Member() {
  useNavBreadcrumb([{ name: "Team" }]);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [members, setMembers] = React.useState([]);

  const handleDeleteButton = (member) => {
    setSelectedMember(member);
    setOpenDelete(true);
  };

  const onDeleteMember = async () => {
    try {
      await api.delete(`/members/${selectedMember.id}`);
      toast.success("Member deleted successfully");
      getMembers();
    } catch (error) {
      toast.error("Failed to delete member");
    }
  };

  const getMembers = async () => {
    try {
      const response = await api.get("/members");
      const list = response.data.data;

      setMembers(list);
    } catch (error) {
      setMembers([]);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div>
      <DeleteConfirm
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={onDeleteMember}
      />

      <SectionTitle>Team</SectionTitle>

      <div className="flex justify-between mt-6">
        <SectionSubtitle className="mt-0">List of Member</SectionSubtitle>
        <Button asChild>
          <Link href={URL.DASHBOARD_MEMBERS_ADD()}>
            <Plus />
            Add Member
          </Link>
        </Button>
      </div>

      <TableMember members={members} onDeleteButtonClick={handleDeleteButton} />
    </div>
  );
}
