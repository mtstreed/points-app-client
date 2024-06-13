'use client';

import MainContent from './components/MainContent';
import IPlayer from './types/IPlayer';
import { useUser } from '@auth0/nextjs-auth0/client';
import dotenv from 'dotenv';

dotenv.config();
const serverUri = process.env.SERVER_URI;

export default function Page() {

	const { user, error, isLoading } = useUser();
	// Should maybe go in utils
	// async function getUser(auth0Id: string) {
	// 	const res: Response = await fetch(`${serverUri}/users/${auth0Id}`, {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		}
	// 	});
	// 	return await res.json() as IPlayer;
	// }

	// if (user && user.sub) { // Check if user is logged in.
	// 	const existingUser: IPlayer = await getUser(user.sub);
	// 	console.log('Page|existingUser: ' + JSON.stringify(existingUser));
	// 	if (!existingUser) { // If user does not exist in db, create a new user.
	// 		const reqJson = JSON.stringify(user as unknown as IPlayer);

	// 		const res: Response = await fetch(`${serverUri}/users`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify(reqJson),
	// 		});
	// 		return await res.json() as IPlayer;
	// 	}
	// }

	return(
		<MainContent>
		</MainContent>
	);
}