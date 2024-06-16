'use client';

import MainContent from './components/MainContent';
import IPlayer from './types/IPlayer';
import { useUser } from '@auth0/nextjs-auth0/client';
import dotenv from 'dotenv';
import { dbGetPlayerById, dbCreatePlayer } from './utils/playerUtils';


dotenv.config();
const serverUri = process.env.SERVER_URI;

export default function Page() {

	const { user, error, isLoading } = useUser();

	if (user && user.sub) { // Check if user is logged in and has a sub property (AKA auth0Id).
		const auth0Id: string = user.sub as string;
		const existingUserCheck = async () => {
			const existingUser: IPlayer | undefined = await dbGetPlayerById(auth0Id);
			if (!existingUser) {
				// Create a new user using user data from auth0.
				let newPlayer: IPlayer = {
					name: user.name as string,
					points: 0,
					email: user.email as string,
					auth0Id: auth0Id,
				};
				dbCreatePlayer(newPlayer);
			}
		}
		existingUserCheck();
	}
	return(
		<MainContent>
		</MainContent>
	);
}