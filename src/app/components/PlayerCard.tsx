'use client';

import IPlayer from '../types/IPlayer';

interface PlayerCardProps {
    player: IPlayer;
    loggedIn?: boolean
    onAddPoints: () => void;
}

export default function PlayerCard({player, loggedIn=false, onAddPoints}: PlayerCardProps) {
    return (
        // Make 1st ranked PlayerCard golden
        <div className={`text-center rounded-lg p-4 flex flex-col items-center flex-shrink-0 h-30 w-40 ${player.rank === 1 ? 'text-yellow-100 bg-gradient-to-tl from-yellow-400 to-yellow-600 shadow-2xl shadow-inner' : 'text-white bg-blue-400'}`}>
            <h1 className="text-xl font-bold">{player.name}</h1>
            <h1 className="">{player.points} points</h1>
            <h1 className="">Rank {player.rank}</h1>
            {loggedIn && <button className={`px-4 py-1 rounded-lg ${player.rank === 1 ? 'border-4 border-yellow-200' : 'bg-blue-300'}`} onClick={onAddPoints}>Click!</button>}
        </div>
    );
}

