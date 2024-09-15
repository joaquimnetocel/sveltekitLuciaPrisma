// PRISMA CONFIG:
import type { PrismaClient } from '@prisma/client';
/////

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	// PRISMA CONFIG:
	// eslint-disable-next-line no-var
	var prismaClient: PrismaClient;
	/////
}

export {};
