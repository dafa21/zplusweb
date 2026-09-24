"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { Plus } from "lucide-react";
import Link from "next/link";
import TableClient from "./_components/table-client";
import DeleteConfirm from "./_components/delete-confirm";
import { URL } from "@/lib/menu";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function Client() {
  useNavBreadcrumb([{ name: "Client" }]);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState(null);
  const [clients, setClients] = React.useState([]);

  const handleDeleteButton = (client) => {
    setSelectedClient(client);
    setOpenDelete(true);
  };

  const onDeleteClient = async () => {
    try {
      await api.delete(`/clients/${selectedClient.id}`);
      toast.success("Client deleted successfully");
      getClients();
    } catch (error) {
      toast.error("Failed to delete client");
    }
  };

  const getClients = async () => {
    try {
      const response = await api.get("/clients");
      const list = response.data.data;

      setClients(list);
    } catch (error) {
      setClients([]);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div>
      <DeleteConfirm
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={onDeleteClient}
      />

      <SectionTitle>Client</SectionTitle>

      <div className="flex justify-between mt-6">
        <SectionSubtitle className="mt-0">List of Client</SectionSubtitle>
        <Button asChild>
          <Link href={URL.DASHBOARD_CLIENTS_ADD()}>
            <Plus />
            Add Client
          </Link>
        </Button>
      </div>

      <TableClient clients={clients} onDeleteButtonClick={handleDeleteButton} />
    </div>
  );
}
