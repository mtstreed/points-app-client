import dotenv from 'dotenv';

dotenv.config();

const serverUri = process.env.SERVER_URI;

export async function GET(): Promise<Response> {
    const res: Response = await fetch(`${serverUri}/users`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	});
	return res;
}


export async function POST(req: Request): Promise<Response> {
	const reqJson = await req.json(); // To get the data from a Request obj, you need to await it
	let res: Response = new Response();
	try {
		res = await fetch(`${serverUri}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reqJson),
		});
	} catch (e) {
		console.log('api/users/route.ts|POST| error: ' + e);
	}
	return res;
}