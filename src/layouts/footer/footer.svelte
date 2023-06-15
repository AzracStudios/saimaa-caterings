<script lang="ts">
	import { goto } from '$app/navigation';
	import Desktoponly from '../../components/conditionalview/desktoponly.svelte';
	import Mobileonly from '../../components/conditionalview/mobileonly.svelte';
	import Icon from '../../components/icon/icon.svelte';
	import Image from '../../components/image/image.svelte';
	import Interactable from '../../components/interactable.svelte';
	import Text from '../../components/text/text.svelte';
	import { BACKEND_URL } from '../../env';
	import type { StrapiGlobalConfig, StrapiNavLink } from '../../lib-wrapper/types';
	import './footer.scss';
	export let global: StrapiGlobalConfig;
	$: global;

	export let links: StrapiNavLink[];
	$: links;
</script>

<div class="footer">
	<div class="footer__section">
		<div class="title">
			<Text text="Quick Links" style="m-bold" />
		</div>

		<div class="quicklinks">
			{#if links}
				{#each links as link}
					<Interactable
						onclick={() => {
							goto(link.url);
						}}
					>
						<Text text={link.name} style="s-regular" />
					</Interactable>
				{/each}
			{/if}
		</div>
	</div>

	<div class="footer__section">
		<div class="title">
			<Text text="Walk In" style="m-bold" />
		</div>

		{#each global.address.split('\n') as line}
			<Text text={line} style="s-regular" />
		{/each}
	</div>

	<div class="footer__section">
		<div class="title">
			<Text text="Contact" style="m-bold" />
		</div>

		{#each global.phone as phone}
		<Text text={phone.name} style="s-bold"/>
		<div class="footer__flex">
			<Icon icon="phone" />
			<Text text={phone.phone} style="s-regular" />
		</div>
		{/each}
		
		<div class="footer__flex">
			<Icon icon="mail" />
			<Text text={global.email} style="s-regular" />
		</div>
		
		<Text text="Follow us" style="s-bold"/>
		{#each global.socials as social}
			<div class="footer__flex">
				<Image src={BACKEND_URL}{social.icon.data.attributes.url} alt={social.name} style="width: 1.2rem;"/>
				<Text text={social.name} style="s-regular" url="{social.url}" />
			</div>
		{/each}
	</div>
</div>

<div class="rights">
	<Text text="© Saimaa Catering. All Rights Reserved. " style="s-regular" />
	<Text text="Designed by:" style="s-regular" />
	<Text text="Adarsh Ravikumar" url="https://adarshravikumar.netlify.app" style="s-regular"/>
</div>
