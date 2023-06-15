<script lang="ts">
	import ControllerButton from './controller-button.svelte';
	export let len: number = 0;
</script>

<div class="hero__controls">
	{#if len > 0}
		{#each Array(len) as _, index}
			<ControllerButton buttonIndex={index} />
		{/each}
	{:else}
		{#each Array(4) as _}
			<div class="controls__button--skeleton" />
		{/each}
	{/if}
</div>
