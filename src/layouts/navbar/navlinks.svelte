<script lang="ts">
	import Interactable from '../../components/interactable.svelte';
	import { goto } from '$app/navigation';
	import Text from '../../components/text/text.svelte';
	import Desktoponly from '../../components/conditionalview/desktoponly.svelte';
	import type { StrapiNavLink } from '../../lib-wrapper/types';
	import { page } from '$app/stores';
	import Button from '../../components/button/button.svelte';
	export let links: StrapiNavLink[];
</script>

<Desktoponly>
	<div class="navbar__navlinks">
		{#if links}
			{#each links as link}
				<div class="navlink {$page.url.pathname == link.url ? 'current' : ''}">
					<Interactable
						onclick={() => {
							goto(link.url);
						}}
					>
						<Text text={link.name} style="s-bold" />
					</Interactable>
					<div class="line" />
				</div>
			{/each}
		{/if}
		<Interactable
			onclick={() => {
				goto('/menu');
			}}
		>
			<Button text="Get A Quote" style="s-medium" filled/>
		</Interactable>
	</div>
</Desktoponly>
