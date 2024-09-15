// LUCIA CONFIG:
import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { prismaAdapter } from "./prismaAdapter";

export const lucia = new Lucia(prismaAdapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}
