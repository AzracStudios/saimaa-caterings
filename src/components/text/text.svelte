<script lang="ts">
	import './text.scss';
	import '../types.d';

	export let text: string | undefined;
	export let url: string | undefined = undefined;
	export let style: Style = 'm-regular';
	export let noselect: boolean = false;
	export let alignment: string = 'justify';
	export let fancy: boolean = false;
	export let cap: boolean = false;
</script>

{#if url}
	<a href={url}>
		<p
			class="component__text component__text--{style} 
			link
			{noselect ? 'noselect' : ''}"
			style="text-align:{alignment}; {cap ? 'text-transform:capitalize' : ''}"
		>
			{text}
		</p>
	</a>
{:else}
	<p
		class="component__text component__text--{fancy ? 'fancy' : style} 
			{noselect ? 'noselect' : ''} "
		style="text-align:{alignment}; {cap ? 'text-transform:capitalize' : ''}"
	>
		{text}
	</p>
{/if}
