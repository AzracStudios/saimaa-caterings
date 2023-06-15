<script lang="ts">
	import { getContext } from 'svelte';
	import { bannerIndex, intervalId, triggerInterval } from './store';
	import { get } from 'svelte/store';

	export let buttonIndex: number;
	$: index = 0;

	let context = getContext('handle banner navigation') as {
		handleBannerNavigate: (idx: number) => void;
	};
	let onClick: (idx: number) => void = context.handleBannerNavigate;

	bannerIndex.subscribe((newVal) => {
		index = newVal;
	});
</script>

<button
	aria-label="select carousel item {index}"
	class="controls__button {index == buttonIndex ? 'controls__button--active' : ''}"
	on:click={() => {
		onClick(buttonIndex);
		clearInterval(get(intervalId));
		triggerInterval.set(true);
	}}
/>
