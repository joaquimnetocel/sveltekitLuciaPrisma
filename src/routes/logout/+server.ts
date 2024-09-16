import { lucia } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, locals }) => {
	if (!locals.session) {
		redirect(302, '/login');
	}

	await lucia.invalidateSession(locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes,
	});

	cookies.delete('google_oauth_state', { path: '.' });
	cookies.delete('google_oauth_code_verifier', { path: '.' });

	redirect(302, '/');
};
