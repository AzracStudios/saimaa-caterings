<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '../../components/icon/icon.svelte';
	import Image from '../../components/image/image.svelte';
	import Interactable from '../../components/interactable.svelte';
	import Text from '../../components/text/text.svelte';
	import { BACKEND_URL } from '../../env';
	import type { StrapiPhone, StrapiSocials } from '../../lib-wrapper/types';

	export let phone: StrapiPhone[] | undefined;
	$: phone;

	export let socials: StrapiSocials[] | undefined;
	$: socials;
</script>

{#if phone != undefined && socials != undefined}
	<div class="navbar__message">
		<div class="message__phone">
			<Icon icon="phone" size="s" />
			<Text
				text={[
					...phone.map((c) => {
						return c.phone;
					})
				].join('⠀|⠀')}
				style="xs-bold"
			/>
		</div>
		<div class="message__socials">
			{#each socials as social}
				<Interactable onclick={() => goto(social.url)}>
					<Image src="{BACKEND_URL}{social.icon.data.attributes.url}" alt={social.name} />
				</Interactable>
			{/each}
		</div>
	</div>
{/if}
