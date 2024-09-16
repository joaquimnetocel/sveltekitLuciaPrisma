import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;

	if (!session) {
		throw redirect(302, '/login');
	}

	const user = locals.user;

	if (!user) {
		throw redirect(302, '/login');
	}

	const userDetails = await prismaClient.user.findFirst({
		where: { id: user.id },
	});

	return { user: userDetails };
};
