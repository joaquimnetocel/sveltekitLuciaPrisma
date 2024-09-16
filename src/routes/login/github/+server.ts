import { dev } from '$app/environment';
import { github } from '$lib/server/lucia/github';
import { generateState } from 'arctic';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	const state = generateState();
	const url = await github.createAuthorizationURL(state);

	cookies.set('github_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60,
		sameSite: 'lax',
	});

	return new Response(null, {
		status: 302,
		headers: {
			location: url.toString(),
		},
	});
};
