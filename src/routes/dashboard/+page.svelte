<script lang="ts">
	import type { PageData } from "./$types";

  	const {
		data,
	}: {
		data: PageData;
	} = $props()
</script>

<div class="h-[80vh] flex items-center justify-center">
	<h1 class="text-4xl font-bold">Welcome {data.user?.name}</h1>
</div>
