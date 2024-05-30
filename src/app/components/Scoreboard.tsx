'use client';

import {useState, useEffect} from 'react';
import IPlayer from '../types/IPlayer'
import PlayerCard from './PlayerCard';
import { dbFetchAllPlayers, dbUpdatePlayers, updatePlayerList } from '../utils/playerUtils';


export default function Scoreboard() {
    const [players, setPlayers] = useState<IPlayer[] | null>(null);

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
            }
        }

    if (players) {
        return (
            <div className="flex space-x-4 items-center justify-center h-screen">
                {players.map((player) => (
                    <PlayerCard 
                        key={player._id} 
                        player={player} 
                        onAddPoints={() => handleAddPoints(player._id)}
                    />
                ))}
            </div>
        );
    } else {
        return ( <h1> Idk fail </h1>)
    }

}