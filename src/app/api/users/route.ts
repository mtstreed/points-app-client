import dotenv from 'dotenv';

dotenv.config();
const serverUri = process.env.SERVER_URI;

export async function GET(req: Request): Promise<Response> {
    let res: Response = new Response();
	try {
		res = await fetch(serverUri + '/users', {
			headers: {
				'Content-Type': 'application/json',
			}
		});
	} catch (error) {
		console.log('api/users/route.ts|GET| error: ' + error);
	}
	return res;
}


export async function POST(req: Request): Promise<Response> {
	const reqJson = await req.json();
	let res: Response = new Response();
	try {
		res = await fetch(serverUri + '/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reqJson),
		});
	} catch (error) {
		console.log('api/users/route.ts|POST| error: ' + error);
	}
	return res;
}