import IPlayer from '../types/IPlayer'; 

export async function dbFetchAllPlayers(): Promise<String> {
    let allPlayers: IPlayer[] = [];

    try {
        const res: Response = await fetch('../api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
        });
        if (!res.ok) {
            // Attempt to parse the error response
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to update user');
        }
        const result = await res.json();
        return JSON.stringify(result.data);
    } catch (error) {
        console.log('playerUtils|fetchAllPlayers| error: ' + error);
        throw error;
    }
}


export async function dbUpdatePlayer(player: IPlayer): Promise<String> {
    try {
        const res: Response = await fetch(`../api/users${player.auth0Id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(player),
        });
        if (!res.ok) {
            // Attempt to parse the error response
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to update user');
        }
        const result = await res.json();
        return JSON.stringify(result.data);
    } catch (error) {
        console.log('playerUtils|updatePlayers| error: ' + error);
        throw error;
    }
}


// This function is only used to update state, so it always makes copies of the objects it wants to update.
// Sort the list of players, and then reassign each array reference to a copy with the correct rank.
export function assignPlayerRanks(playerList: IPlayer[]): IPlayer[] {
    let playerListCopy: IPlayer[] = [... playerList];
    playerListCopy.sort((a: IPlayer, b: IPlayer) => b.points - a.points); // Sort the array by points

    playerListCopy = playerListCopy.map((playerToSort, i) => (
        {...playerToSort, rank: i + 1}
    ));
    return playerListCopy;
}


// Should just update a single player, should not include reranking
// Actually, can delete? adding points will happen in component; reranking will happen outside of db update.
export function updatePlayerList(playerList: IPlayer[], clickedPlayerId: number): IPlayer[] {
    playerList = playerList.map((player) => player._id === clickedPlayerId ? {...player, points: player.points + 1} : player);
    playerList = assignPlayerRanks(playerList);
    return playerList;
}

