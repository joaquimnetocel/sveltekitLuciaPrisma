import { lucia } from '$lib/server/lucia';
import { google } from '$lib/server/lucia/google';
import { OAuth2RequestError } from 'arctic';
import type { RequestHandler } from './$types';

interface GoogleUser {
	sub: string; // Unique identifier for the user
	name: string; // Full name of the user
	email: string; // Email address of the user
}

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const codeVerifier = cookies.get('google_oauth_code_verifier');
	const storedState = cookies.get('google_oauth_state') ?? null;

	if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, codeVerifier);
		const googleUserResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		});
		const googleUser: GoogleUser = await googleUserResponse.json();

		const existingGoogleUser = await prismaClient.user.findUnique({
			where: {
				email: googleUser.email,
			},
		});

		if (existingGoogleUser) {
			const session = await lucia.createSession(existingGoogleUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes,
			});
		} else {
			const newUser = await prismaClient.user.create({
				data: {
					email: googleUser.email, // Using email as username
					googleId: googleUser.sub,
					githubId: '',
					name: googleUser.name, // Name field may not always be present, handle accordingly
				},
			});

			const session = await lucia.createSession(newUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes,
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/',
			},
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 500,
		});
	}
};
