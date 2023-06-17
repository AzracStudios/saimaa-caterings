<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '../../components/button/button.svelte';
	import Mobileonly from '../../components/conditionalview/mobileonly.svelte';
	import Interactable from '../../components/interactable.svelte';
	import Text from '../../components/text/text.svelte';
	import type { StrapiNavLink } from '../../lib-wrapper/types';
	let open = false;
	$: open;

	export let links: StrapiNavLink[];

	const handleClick = async () => {
		open = !open;
		document.body.style.overflow = open ? 'hidden' : 'visible';
	};
</script>

<Mobileonly>
	<div class="navbar__hammenu" role="navigation">
		<Interactable onclick={handleClick}>
			<div class="hammenu__ham {open ? 'hammenu__ham--open' : ''}">
				<div class="ham__l1" />
				<div class="ham__l2" />
				<div class="ham__l3" />
			</div>
		</Interactable>

		<div class="hammenu__navlinks {open ? 'hammenu__navlinks--open' : ''}">
			{#if links}
				{#each links as link}
					<Interactable
						onclick={() => {
							handleClick();
							goto(link.url);
						}}
					>
						<Text text={link.name} style="m-bold" noselect />
					</Interactable>
				{/each}
			{/if}
			<Interactable
				onclick={() => {
					handleClick();

					goto('/menu');
				}}
			>
				<Button text="Get A Quote" style="s-medium" filled />
			</Interactable>
		</div>
	</div>
</Mobileonly>
