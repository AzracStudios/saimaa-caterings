<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fetchEvents } from '../../../lib-wrapper/useAxios';
	import Image from '../../../components/image/image.svelte';
	import { BACKEND_URL } from '../../../env';
	import Text from '../../../components/text/text.svelte';
	import Desktoponly from '../../../components/conditionalview/desktoponly.svelte';
	import Mobileonly from '../../../components/conditionalview/mobileonly.svelte';
	import { goto } from '$app/navigation';
	let data: any;
	$: data;

	let nameTitleCase: string;
	$: nameTitleCase;

	onMount(async () => {
		nameTitleCase = $page.params.name
			.split(' ')
			.map(function (word) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			})
			.join(' ')
			.replaceAll('-', ' ');
		try {
			data = await fetchEvents($page.params.name);
		} catch {
			goto('/error');
		}
	});
</script>

<svelte:head>
	{#if data}
		<title>Saimaa Catering - {nameTitleCase}</title>
		<meta name="og:title" property="og:title" content="Saimaa Catering - {nameTitleCase}" />
		<meta name="description" property="description" content={data.content} />
		<meta name="og:description" property="og:description" content={data.content} />
		<meta
			name="url"
			property="url"
			content="https://www.saimaacatering.com/events/{$page.params.name}"
		/>
		<meta
			name="og:url"
			property="og:description"
			content="https://www.saimaacatering.com/events/{$page.params.name}"
		/>
	{/if}
</svelte:head>

{#if data}
	<div class="vspace vspace--small" />
	<Desktoponly>
		<Image
			src="{BACKEND_URL}{data.banner.data.attributes.url}"
			alt={$page.params.name}
			style="aspect-ratio: 2.7;"
		/>
	</Desktoponly>

	<Mobileonly>
		<Image
			src="{BACKEND_URL}{data.banner.data.attributes.url}"
			alt={$page.params.name}
			style="aspect-ratio: 0.9;"
		/>
	</Mobileonly>
	<div class="vspace vspace--medium" />

	{#each data.content.split('\n') as cont}
		<Text text={cont} style="s-medium" />
		<div class="vspace vspace--small" />
	{/each}
	<div class="vspace vspace--small" />

	{#if data.services}
		<Text text="Services we offer for {nameTitleCase}" style="m-bold" />
	{/if}
	
	<ul style="margin-left: 1.5rem;">
		{#if data.services}
			{#each data.services.split('\n') as service}
				{#if service}
					<li><Text text={service} style="s-medium" /></li>
				{/if}
			{/each}
		{/if}
	</ul>
{/if}
