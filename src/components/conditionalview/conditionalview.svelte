<script lang="ts">
	import { onMount } from 'svelte';

	export let defaultDisplay: string = 'block';
	export let condition: (win: Window) => boolean;
	$: display = "none";

	const onresize = () => {
		display = condition(window) ? defaultDisplay : 'none';
	};

	onMount(() => {
		onresize();
	});
</script>

<svelte:window on:resize={(e) => onresize()} />

<div class="conditionalview" style="display: {display}">
	<slot />
</div>
