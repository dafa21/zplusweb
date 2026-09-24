"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { Plus } from "lucide-react";
import Link from "next/link";
import TableHero from "./_components/table-hero";
import DeleteConfirm from "./_components/delete-confirm";
import { URL } from "@/lib/menu";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function Hero() {
  useNavBreadcrumb([{ name: "Hero" }]);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedHero, setSelectedHero] = React.useState(null);
  const [heroes, setHeroes] = React.useState([]);

  const handleDeleteButton = (hero) => {
    setSelectedHero(hero);
    setOpenDelete(true);
  };

  const onDeleteHero = async () => {
    try {
      await api.delete(`/heroes/${selectedHero.id}`);
      toast.success("Hero deleted successfully");
      getheroes();
    } catch (error) {
      toast.error("Failed to delete hero");
    }
  };

  const getheroes = async () => {
    try {
      const response = await api.get("/heroes");
      const list = response.data.data;

      setHeroes(list);
    } catch (error) {
      setHeroes([]);
    }
  };

  useEffect(() => {
    getheroes();
  }, []);

  return (
    <div>
      <DeleteConfirm
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={onDeleteHero}
      />

      <SectionTitle>Hero</SectionTitle>

      <div className="flex justify-between mt-6">
        <SectionSubtitle className="mt-0">List of Hero</SectionSubtitle>

        <Button asChild>
          <Link href={URL.DASHBOARD_HEROES_ADD()}>
            <Plus />
            Add Hero
          </Link>
        </Button>
      </div>

      <TableHero heroes={heroes} onDeleteButtonClick={handleDeleteButton} />
    </div>
  );
}
