<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchDhinabojanam } from '../../lib-wrapper/useAxios';
	import Page from '../../layouts/pagebuilder/pagebuilder.svelte';
	import type { StrapiPage } from '../../lib-wrapper/types';

	let pageData: StrapiPage;
	$: pageData;

	onMount(async () => {
		pageData = await fetchDhinabojanam();
	});
</script>

<Page {pageData}/>
