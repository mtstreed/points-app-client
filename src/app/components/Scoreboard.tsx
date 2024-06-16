'use client';

import {useState, useEffect} from 'react';
import IPlayer from '../types/IPlayer'
import PlayerCard from './PlayerCard';
import { dbFetchAllPlayers, dbUpdatePlayer, assignPlayerRanks } from '../utils/playerUtils';
import Confetti from 'react-confetti';


export default function Scoreboard() {
    const [players, setPlayers] = useState<IPlayer[] | null>(null);
    const [isConfettiVisible, setIsConfettiVisible] = useState(false);

    useEffect(() => {
        const asyncFetchPlayers = async () => {
            try {
                let allPlayers: IPlayer[] = await dbFetchAllPlayers();
                allPlayers = assignPlayerRanks(allPlayers);
                setPlayers(allPlayers);
            } catch (error) {
                console.log('ScoreBoard|asyncFetchPlayers|error: ' + JSON.stringify(error));
            }
            
        }
        asyncFetchPlayers();
    }, []);


    const handleAddPoints = async (clickedPlayer: IPlayer): Promise<void> => {
        if (players) {
            let playersCopy: IPlayer[] = [...players];
            // Find the index of the player to be updated, and assign a new (shallow copied) player to that reference.
            const playerIndex = playersCopy.findIndex(player => player.auth0Id === clickedPlayer.auth0Id);
            if (playerIndex !== -1) { // findIndex() returns -1 if not found.
                playersCopy[playerIndex] = { ...playersCopy[playerIndex], points: playersCopy[playerIndex].points + 1 };
            }

            // Rerank and update all players. 
            // dbUpdatedPlayer() returns a promise, so we need to await the array of promises.
            playersCopy = assignPlayerRanks(playersCopy);
            playersCopy = await Promise.all(playersCopy.map(async (updatedPlayerCopy) => {
                return await dbUpdatePlayer(updatedPlayerCopy);
            }));
            setPlayers(playersCopy);

            // If the order of names has changed, that means the rankings have changed. Throw some confetti.
            const oldRanks: string[] = players.map(player => player.name);
            const newRanks: string[] = playersCopy.map(player => player.name);
            if (JSON.stringify(oldRanks) !== JSON.stringify(newRanks)) { // Compare values, not obj references
                setIsConfettiVisible(true);
                setTimeout(() => {
                    setIsConfettiVisible(false);
                }, 5000); // Confetti for 5 seconds
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
                            onAddPoints={() => handleAddPoints(player)}
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