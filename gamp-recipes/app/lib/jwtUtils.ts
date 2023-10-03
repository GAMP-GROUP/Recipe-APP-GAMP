import jwt from 'jsonwebtoken';

export async  function encodeJwt({ secret, token }: { secret: string; token: string }) {
	if (!token) {
		throw new Error('No token to encode');
	}
	return jwt.sign(token, secret);
}
export async function  decode({ secret, token }: { secret: string; token: string }) {
	if (!token) {
		throw new Error('No token to decode');
	}
	const decodedToken = jwt.verify(token, secret);
	if (typeof decodedToken === 'string') {
		return JSON.parse(decodedToken);
	} else {
		return decodedToken;
	}
}