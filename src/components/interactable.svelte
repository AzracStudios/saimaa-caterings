<script lang="ts">
	export let role: string | undefined = undefined;

	export let onclick: () => void = () => {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="component__interactable"
	on:click={() => {
		onclick();
	}}
>
	<slot {role} />
</div>
