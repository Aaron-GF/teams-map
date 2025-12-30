import { Player } from "@/lib/data";
import DeletePlayerButton from "./DeletePlayerButton";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="w-full bg-white rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-8 transition-all hover:shadow-2xl hover:scale-[1.01]">
      {/* Foto/Avatar del Jugador */}
      <div className="relative shrink-0 flex justify-center md:block">
        <div className="size-32 md:size-40 bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-inner flex items-center justify-center">
          {player.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={player.imageUrl}
              alt={player.name}
              className="size-full object-cover"
            />
          ) : (
            <span className="text-4xl text-gray-200">👤</span>
          )}
        </div>
      </div>

      {/* Información del Jugador */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="border-b border-gray-100 pb-4">
          <div className="flex justify-between items-start gap-4">
            <h4 className="text-2xl md:text-3xl font-black text-dark-blue uppercase tracking-tighter">
              {player.name}
            </h4>
            <DeletePlayerButton
              playerId={player.id}
              playerName={player.name}
              imageUrl={player.imageUrl}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-3 py-1 bg-blue-celta/10 text-blue-celta rounded-full text-[10px] font-black uppercase tracking-widest">
              {player.position}
            </span>
            <span className="px-3 py-1 bg-red-celta/10 text-red-celta rounded-full text-[10px] font-black uppercase tracking-widest leading-relaxed">
              {player.foot}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 italic">
              Nacimiento
            </span>
            <span className="text-sm font-bold text-dark-blue">
              {new Date(player.birthDate).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex flex-col md:col-span-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 italic">
              Valoración Técnica
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-blue-celta to-dark-blue transition-all duration-1000"
                  style={{ width: `${player.rating * 10}%` }}
                />
              </div>
              <span className="text-sm font-black text-dark-blue">
                {player.rating}/10
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 italic">
            Descripción del Perfil
          </span>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            {player.description}
          </p>
        </div>
      </div>
    </div>
  );
}
