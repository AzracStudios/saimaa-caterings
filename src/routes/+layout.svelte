<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '../layouts/footer/footer.svelte';
	import Navbar from '../layouts/navbar/navbar.svelte';
	import type { StrapiGlobalConfig, StrapiNavLink } from '../lib-wrapper/types';
	import '../styles/global.scss';
	import { fetchGlobal, fetchNavLinks } from '../lib-wrapper/useAxios';

	let global: StrapiGlobalConfig;
	$: global;

	let links: StrapiNavLink[];
	$: links;

	onMount(async () => {
		global = await fetchGlobal();
		links = await fetchNavLinks();
	});
</script>

{#if global}
	<Navbar {global} {links} />

	<div class="padding-container" style="min-height: 60vh;">
		<slot />
	</div>

	<div class="vspace vspace--large" />
	<Footer {global} {links} />
{/if}
