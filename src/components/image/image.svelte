<script lang="ts">
	import { onMount } from 'svelte';
	import './image.scss';

	export let src: string | undefined;
	export let alt: string | undefined;

	export let loaded: boolean = false;
	$: loaded;

	export let noradius: boolean = false;
	$: noradius;

	export let style: string = '';
	$: style;

	onMount(() => {
		loaded = true;
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="image {noradius ? 'noradius' : ''}"
	{style}
	on:click={() => {
		onclick;
	}}
>
	<img {src} {alt} class="image__img" />
</div>
