import dotenv from 'dotenv';

dotenv.config();
const serverUri = process.env.SERVER_URI;

export async function GET(req: Request, { params }: { params: { id: String } }): Promise<Response> {
	const id = params.id;

    let res: Response = new Response();
	try {
		res = await fetch(serverUri + `/users/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
	} catch (error) {
		console.log('api/users/[id]route.ts|GET| error: ' + error);
	}
	return res;
}


export async function POST(req: Request, { params }: { params: { id: String } }): Promise<Response> {
	const id = params.id;
	const reqJson = await req.json();

    let res: Response = new Response();
	try {
		res = await fetch(serverUri + `/users/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reqJson)
		});
	} catch (error) {
		console.log('api/users/[id]/route.ts|POST| error: ' + error);
	}
	return res;
}