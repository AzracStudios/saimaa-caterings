<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchServices } from '../../lib-wrapper/useAxios';
	import Page from '../../layouts/pagebuilder/pagebuilder.svelte';

	let pageData: { page: any[]; seo: any[] };
	$: pageData;

	onMount(async () => {
		pageData = await fetchServices();
	});
</script>

<Page {pageData} />
