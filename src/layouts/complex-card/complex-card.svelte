<script lang="ts">
	import Desktoponly from '../../components/conditionalview/desktoponly.svelte';
	import Mobileonly from '../../components/conditionalview/mobileonly.svelte';
	import Image from '../../components/image/image.svelte';
	import Text from '../../components/text/text.svelte';
	import './complex-card.scss';
	export let title: string;
	export let quote: string;
	export let description: string;
	export let image: string;
</script>

<Desktoponly>
	<div class="complex_card">
		<Image src={image} alt="card image" style="width: 55%;" />
		<div class="text_wrapper">
			<Text text={title} style="m-bold" />
			<div class="vspace vspace--small" />
			{#if quote}
				<Text text={`"${quote}"`} style="s-bold" />
				<div class="vspace vspace--small" />
			{/if}
			{#if description}
				<Text text={description} style="s-medium" />
			{/if}
		</div>
	</div>
</Desktoponly>

<Mobileonly>
	<div class="complex_card complex_card--mobile">
		<Text text={title} style="m-bold" alignment="center" />
		<Image src={image} alt="card image" style="width: 100%;" />
		{#if quote}
			<Text text={`"${quote}"`} style="s-bold" />
			<div class="vspace vspace--small" />
		{/if}
		{#if description}
			<Text text={description} style="s-medium" />
		{/if}
	</div>
</Mobileonly>
