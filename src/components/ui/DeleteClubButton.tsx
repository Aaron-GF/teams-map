"use client";

import { useState } from "react";
import { deleteClub } from "@/lib/actions";

interface DeleteClubButtonProps {
  clubId: string;
  clubName: string;
  imageUrl?: string | null;
}

export default function DeleteClubButton({
  clubId,
  clubName,
  imageUrl,
}: DeleteClubButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      !confirm(
        `¿Estás seguro de que quieres eliminar el club "${clubName}"? \n\nAtención: Si el club tiene jugadores asociados, el borrado fallará por seguridad.`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteClub(clubId, imageUrl);
    setIsDeleting(false);

    if (!result.success) {
      alert(`Error al eliminar: ${result.error}`);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all border border-red-100 disabled:opacity-50"
      title="Eliminar Club"
    >
      {isDeleting ? (
        <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478.397m7.5 0v-1.123c0-1.16-.838-2.109-1.93-2.109h-3.86c-1.103 0-1.93.949-1.93 2.109V5.79m7.5 0a48.108 48.108 0 00-7.5 0"
          />
        </svg>
      )}
    </button>
  );
}
