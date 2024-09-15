<script lang="ts">
	import type { User } from 'lucia';

	const {
		user,
	}: {
		user: User | null;
	} = $props();
</script>

<div>
	<a href="/"> <button>Home</button></a>
	<div>
		{#if user}
			<a href="/logout"><button>Log out</button></a>
		{:else}
			<a href="/login"><button>Log in</button></a>
		{/if}
	</div>
</div>
