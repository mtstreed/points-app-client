'use client';

import IPlayer from '../types/IPlayer';

interface PlayerCardProps {
    player: IPlayer;
    onAddPoints: () => void;
}

export default function PlayerCard({player, onAddPoints}: PlayerCardProps) {

    return (
        <div className="text-center bg-blue-400 rounded-lg p-4 flex flex-col items-center flex-shrink-0 w-40">
            <h1 className="text-white text-xl font-bold">{player.name}</h1>
            <h1 className="text-white">{player.points} points</h1>
            <h1 className="text-white">Rank {player.rank}</h1>
            <button className="bg-blue-300 text-white px-4 py-1 rounded-lg" onClick={onAddPoints}>Click!</button>
        </div>
    );
}

