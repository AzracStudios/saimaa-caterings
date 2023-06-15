<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchGlobal, fetchNavLinks } from '../../lib-wrapper/useAxios';
	import Message from './message.svelte';
	import './navbar.scss';
	import Image from '../../components/image/image.svelte';
	import Interactable from '../../components/interactable.svelte';
	import { goto } from '$app/navigation';
	import Navlinks from './navlinks.svelte';
	import Hammenu from './hammenu.svelte';
	import type { StrapiGlobalConfig, StrapiNavLink } from '../../lib-wrapper/types';

	export let global: StrapiGlobalConfig;
	$: global;

	export let links: StrapiNavLink[];
	$: links;
</script>

<nav class="component__navbar">
	{#if global}
		<Message phone={global.phone} socials={global.socials} />
		<div class="vspace vspace--small" />
		<div class="navbar__wrapper">
			<div class="navbar__logo">
				<Interactable
					onclick={() => {
						goto('/');
					}}
				>
					<Image src={global.logo} alt="logo" />
				</Interactable>
			</div>

			<Navlinks {links} />
			<Hammenu {links} />
		</div>
	{/if}
</nav>
