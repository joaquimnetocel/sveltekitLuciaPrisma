<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	
	const {
		data,
		children,
	 }: { 
		data: LayoutData;
		children:Snippet;
	} = $props()

</script>

<Navbar user={data.user}/>
{@render children()}
