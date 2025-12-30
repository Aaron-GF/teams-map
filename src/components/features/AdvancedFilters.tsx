"use client";

import { useState, useMemo } from "react";
import { type Player, type Club } from "@/types";
import PlayerCard from "./PlayerCard";

interface AdvancedFiltersProps {
  allPlayers: Player[];
  allClubs: Club[];
}

export default function AdvancedFilters({
  allPlayers,
  allClubs,
}: AdvancedFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedFoot, setSelectedFoot] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxAge, setMaxAge] = useState(20);

  const filteredPlayers = useMemo(() => {
    return allPlayers.filter((player) => {
      const matchesSearch = player.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesClub = selectedClub === "" || player.clubId === selectedClub;
      const matchesFoot = selectedFoot === "" || player.foot === selectedFoot;
      const matchesPosition =
        selectedPosition === "" || player.position === selectedPosition;
      const matchesRating = player.rating >= minRating;

      const birthYear = new Date(player.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;
      const matchesAge = age <= maxAge;

      return (
        matchesSearch &&
        matchesClub &&
        matchesFoot &&
        matchesPosition &&
        matchesRating &&
        matchesAge
      );
    });
  }, [
    allPlayers,
    search,
    selectedClub,
    selectedFoot,
    selectedPosition,
    minRating,
    maxAge,
  ]);

  const positions = Array.from(new Set(allPlayers.map((p) => p.position)));

  return (
    <div className="flex flex-col gap-12">
      {/* Panel de Filtros */}
      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Búsqueda por Nombre */}
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1">
            Nombre del Jugador
          </label>
          <div className="relative group">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-dark-blue focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-celta transition-colors">
              🔍
            </span>
          </div>
        </div>

        {/* Filtro de Club */}
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1">
            Club / Equipo
          </label>
          <select
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-dark-blue focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden appearance-none"
          >
            <option value="">Todos los clubes</option>
            {allClubs.map((club) => (
              <option key={club.id} value={club.id}>
                {club.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Posición */}
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1">
            Posición
          </label>
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-dark-blue focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden appearance-none"
          >
            <option value="">Cualquier posición</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Pierna */}
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1">
            Pierna Hábil
          </label>
          <div className="flex gap-2">
            {["", "Diestro", "Zurdo"].map((foot) => (
              <button
                key={foot}
                onClick={() => setSelectedFoot(foot)}
                className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  selectedFoot === foot
                    ? "bg-dark-blue text-white border-dark-blue shadow-lg shadow-dark-blue/20"
                    : "bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100"
                }`}
              >
                {foot === "" ? "Todos" : foot}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro de Valoración */}
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
            Valoración Mínima <span>{minRating}+</span>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-celta"
          />
          <div className="flex justify-between text-[8px] font-bold text-gray-300 uppercase tracking-widest">
            <span>Amateur</span>
            <span>Élite</span>
          </div>
        </div>

        {/* Filtro de Edad */}
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
            Edad Máxima <span>{maxAge} años</span>
          </label>
          <input
            type="range"
            min="5"
            max="20"
            step="1"
            value={maxAge}
            onChange={(e) => setMaxAge(Number(e.target.value))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-celta"
          />
          <div className="flex justify-between text-[8px] font-bold text-gray-300 uppercase tracking-widest">
            <span>Prebenjamín</span>
            <span>Juvenil</span>
          </div>
        </div>
      </div>

      {/* Sección de Resultados */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col">
            <h3 className="text-xl font-black text-dark-blue uppercase tracking-tighter">
              Resultados Encontrados
            </h3>
            <span className="text-[10px] font-bold text-blue-celta uppercase tracking-widest">
              {filteredPlayers.length} jugadores coinciden con tu búsqueda
            </span>
          </div>

          {(search ||
            selectedClub ||
            selectedFoot ||
            selectedPosition ||
            minRating > 0 ||
            maxAge < 20) && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedClub("");
                setSelectedFoot("");
                setSelectedPosition("");
                setMinRating(0);
                setMaxAge(20);
              }}
              className="text-[10px] font-black text-red-celta uppercase tracking-widest hover:underline"
            >
              Limpiar Filtros
            </button>
          )}
        </div>

        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-16 border border-dashed border-gray-200 flex flex-col items-center text-center gap-4">
            <span className="text-4xl text-gray-200">⚽</span>
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-black text-dark-blue uppercase tracking-tight">
                Sin coincidencias
              </h4>
              <p className="text-gray-400 text-sm font-medium">
                No se han encontrado jugadores que cumplan con los criterios.{" "}
                <br />
                Prueba a flexibilizar los filtros.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
