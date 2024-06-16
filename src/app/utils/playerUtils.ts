import IPlayer from '../types/IPlayer'; 

export async function dbFetchAllPlayers(): Promise<IPlayer[]> {
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
        return result as IPlayer[];
    } catch (error) {
        console.log('playerUtils|dbFetchAllPlayers| error: ' + error);
        throw error;
    }
}


export async function dbUpdatePlayer(player: IPlayer): Promise<IPlayer> {
    try {
        const res: Response = await fetch(`../api/users/${player.auth0Id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(player),
        });
        const result = await res.json();
        return result as IPlayer;
    } catch (error) {
        console.log('playerUtils|dbUpdatePlayer| error: ' + error);
        throw error;
    }
}


// This function is only used to update state, so it always makes copies of the players being ranked (treat state as immutable).
export function assignPlayerRanks(playerList: IPlayer[]): IPlayer[] {
    let playerListCopy = [...playerList];
    playerListCopy.sort((a: IPlayer, b: IPlayer) => b.points - a.points); // Sort the array by points
    playerListCopy = playerListCopy.map((playerToSort, i) => {
        return {...playerToSort, rank: i + 1};
    });
    return playerListCopy;
}

export async function dbGetPlayerById(auth0Id: string): Promise<IPlayer | undefined> {
    try {
        const res: Response = await fetch(`../api/users/${auth0Id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Handle for user not found error, and others.
        if (res.status === 404) {
            return undefined;
        }
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to update user');
        }
        return await res.json() as IPlayer;
    } catch {
        console.log('dbGetPlayerById|No existing user found');
        return undefined;
    }
}

export async function dbCreatePlayer(player: IPlayer): Promise<IPlayer> {
    const res: Response = await fetch(`../api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
    });
    return await res.json() as IPlayer;
}