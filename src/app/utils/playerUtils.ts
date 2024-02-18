import IPlayer from '../types/IPlayer'; 


export async function fetchAllPlayers(): Promise<IPlayer[]> {
    let allPlayers: IPlayer[] = [];

    try {
        const res: Response = await fetch('../api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
        });
        allPlayers = await res.json() as IPlayer[];
    } catch (e) {
        console.log('playerUtils|fetchAllPlayers| error: ' + e);
    }
    return allPlayers;
}


export async function updatePlayers(playerList: IPlayer[]): Promise<IPlayer[]> {
    try {
        const res: Response = await fetch('../api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerList),
        });
        const data = await res.json();
    } catch (e) {
        console.log('playerUtils|updatePlayers| error: ' + e);
    }

    return playerList;
}


export function assignPlayerRanks(playerList: IPlayer[]): IPlayer[] {
    playerList.sort((a: IPlayer, b: IPlayer) => b.points - a.points);
    playerList.map((playerToSort, i) => playerToSort.rank = i + 1)

    // Map over the input array. Give each player their new rank.
    playerList.map((player) => {
        // Handling for inherent possibility that find() returns undefined. Bit of a hassle.
        const sortedPlayer: IPlayer | undefined = playerList.find((sortedPlayer: IPlayer) => sortedPlayer._id === player._id);
        if (sortedPlayer) {
            player.rank = sortedPlayer.rank;
        } else {
            player.rank;
        }
    });
    return playerList;
}
