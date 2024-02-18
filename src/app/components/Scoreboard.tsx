'use client';

import {useState, useEffect} from 'react';
import IPlayer from '../types/IPlayer'
import PlayerCard from './PlayerCard';
import { fetchAllPlayers, assignPlayerRanks, updatePlayers } from '../utils/playerUtils';


export default function Scoreboard() {
    const [players, setPlayers] = useState<IPlayer[] | null>(null);

    // TODO put in server component? Only need to fetch once upon mount
    // useEffect for fetching the intitial players state upon component mount.
    useEffect(() => {
        const fetchAsyncPlayers: () => void = async () => {
            const allPlayers: IPlayer[] = await fetchAllPlayers();
            setPlayers(allPlayers);
        }
        fetchAsyncPlayers();
    }, []);

    // TODO Move this to utils? If I do, it would have to take two args, the full set of players in state, and something to identify the clicked player.
    // because right now it uses the players state variable without taking it as a param, which seems whacky anyway
    const handleAddPoints = (clickedPlayer: IPlayer) => {
        if (players) {
            let updatedPlayers = [...players];
            updatedPlayers = updatedPlayers.map((player) => player._id === clickedPlayer._id ? {...player, points: player.points + 1} : player);
            updatedPlayers = assignPlayerRanks(updatedPlayers);
            setPlayers(updatedPlayers);
            updatePlayers(updatedPlayers);
        }
    }

    if (players) {
        return (
            <div className="flex space-x-4 items-center justify-center h-screen">
                {players.map((player) => (
                    <PlayerCard 
                        key={player._id} 
                        player={player} 
                        onAddPoints={() => handleAddPoints(player)}
                    />
                ))}
            </div>
        );
    } else {
        return ( <h1> Idk fail </h1>)
    }

}