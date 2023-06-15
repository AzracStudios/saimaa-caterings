<script lang="ts">
	import type { StrapiGlobalConfig } from '../../lib-wrapper/types';
	import Text from '../../components/text/text.svelte';
	import Interactable from '../../components/interactable.svelte';
	import Image from '../../components/image/image.svelte';
	import { BACKEND_URL } from '../../env';
	import { goto } from '$app/navigation';
	import './contact-banner.scss';

	export let global: StrapiGlobalConfig | undefined;
</script>

{#if global}
	<div class="element__contact-banner">
		<Text text="Get In Touch" style="l-bold" alignment="center" fancy />
		<div class="vspace vspace--small" />
		<div class="socials">
			{#each global.socials as social}
				<Interactable onclick={() => goto(social.url)}>
					<Image src="{BACKEND_URL}{social.icon.data.attributes.url}" alt={social.name} />
				</Interactable>
			{/each}
		</div>

		<div class="breaker">
			<div class="line" />
			<Text text="or" alignment="center" style="s-medium" />
		</div>

		<div class="number__container">
			{#each global.phone as phone}
				<div class="number__item">
					<Text text={phone.name} style="m-bold" alignment="center" />

					<Text text={phone.phone} style="m-medium" alignment="center" />
				</div>
			{/each}
		</div>
	</div>
{/if}
