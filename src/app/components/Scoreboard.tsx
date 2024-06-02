'use client';

import {useState, useEffect} from 'react';
import IPlayer from '../types/IPlayer'
import PlayerCard from './PlayerCard';
import { dbFetchAllPlayers, dbUpdatePlayers, updatePlayerList } from '../utils/playerUtils';
import Confetti from 'react-confetti';


export default function Scoreboard() {
    const [players, setPlayers] = useState<IPlayer[] | null>(null);
    const [isConfettiVisible, setIsConfettiVisible] = useState(false);

    // TODO put in server component? Only need to fetch once upon mount
    // useEffect for fetching the intitial players state upon component mount.
    useEffect(() => {
        const fetchAsyncPlayers: () => void = async () => {
            const allPlayers: IPlayer[] = await dbFetchAllPlayers();
            setPlayers(allPlayers);
        }
        fetchAsyncPlayers();
    }, []);

    const handleAddPoints = (clickedPlayerId: number): void => {
        if (players) {
            let updatedPlayers = [...players];
            updatedPlayers = updatePlayerList(updatedPlayers, clickedPlayerId);
            setPlayers(updatedPlayers);
            dbUpdatePlayers(updatedPlayers);

            // If the order of names has changed, that means the rankings have changed. Throw some confetti.
            const oldRanks: string[] = players.map(player => player.name);
            const newRanks: string[] = updatedPlayers.map(player => player.name);
            // Compare values, not obj references
            if (JSON.stringify(oldRanks) !== JSON.stringify(newRanks)) {
                setIsConfettiVisible(true);
                setTimeout(() => {
                    setIsConfettiVisible(false);
                }, 5000); // Confetti will be visible for 5 seconds
            }
        }
    }

    if (players) {
        return (
            <div>
                <div className="flex space-x-4 items-center justify-center h-screen">
                    {players.map((player, index) => (
                        <PlayerCard 
                            key={player._id} 
                            player={player} 
                            onAddPoints={() => handleAddPoints(player._id)}
                        />
                    ))}
                </div>
                <div>
                    {isConfettiVisible && <Confetti width={window.innerWidth} height={window.innerHeight} />}
                </div>
            </div> 
        );
    } else {
        return ( <h1> Idk fail </h1>)
    }

}