export default interface IPlayer {
    _id?: number; // This will be set by mongodb
    name: string;
    points: number;
    rank?: number;
    email: string;
    auth0Id: string;
}