import dotenv from 'dotenv';

dotenv.config();
const serverUri = process.env.SERVER_URI;

export async function GET(req: Request): Promise<Response> {
    let res: Response = new Response();
	try {
		res = await fetch(serverUri + '/users', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
	} catch (error) {
		console.log('api/users/route.ts|GET| error: ' + error);
	}
	return res;
}