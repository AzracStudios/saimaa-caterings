<script lang="ts">
	import Hero from '../layouts/hero/hero.svelte';
	import { onMount } from 'svelte';
	import { fetchGlobal, fetchHome } from '../lib-wrapper/useAxios';
	import Page from '../layouts/pagebuilder/pagebuilder.svelte';
	import type { StrapiGlobalConfig, StrapiPage } from '../lib-wrapper/types';
	import Loader from '../components/loader/loader.svelte';

	let pageData: StrapiPage;
	$: pageData;

	let global: StrapiGlobalConfig;
	$: global;

	onMount(async () => {
		global = await fetchGlobal();
		pageData = await fetchHome();
	});
</script>

<Loader />
<Hero />
<div class="vspace vspace--medium" />
<Page {pageData} {global} />
