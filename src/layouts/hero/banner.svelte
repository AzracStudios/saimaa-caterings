<script lang="ts">
	import { bannerIndex } from './store';
	import Image from '../../components/image/image.svelte';
	import Text from '../../components/text/text.svelte';
	import type { StrapiBanner } from '../../lib-wrapper/types';
	import Button from '../../components/button/button.svelte';
	import Interactable from '../../components/interactable.svelte';
	import { goto } from '$app/navigation';

	export let banner: StrapiBanner;
	export let index: number;
	$: imgPos = index * 120;

	let center = banner.horizontal == 'center';
	let middle = banner.vertical == 'middle';

	const angleLUT: { [key: string]: string } = {
		top_left: '140',
		top_right: '-140',
		top_center: '180',
		bottom_left: '40',
		bottom_right: '-40',
		bottom_center: '0',
		middle_left: '90',
		middle_right: '-90'
	};

	bannerIndex.subscribe((newVal) => {
		imgPos = (newVal - index) * -120;
	});
</script>

<div class="banner__image" style="left: {imgPos}%;">
	<div class="banner__content">
		<div
			class="banner__action"
			style="
		{!center ? banner.horizontal : 'left'}: {center
				? '50%; transform: translateX(-50%);align-items:center;'
				: '0;'}
		{banner.horizontal == 'right' ? 'align-items:end;' : ''}
		{!middle ? banner.vertical : 'top'}: {middle ? '50%; transform: translateY(-50%);' : '0;'}
		"
		>
			{#if banner.callToAction != null}
				<div class="banner__text">
					<Text text={banner.callToAction} style="l-medium" alignment={banner.horizontal} />
				</div>
			{/if}

			{#if banner.actionButtons.length != 0}
				<div class="action__buttons">
					{#each banner.actionButtons as button}
						<Interactable
							onclick={() => {
								goto(button.url);
							}}
						>
							<Button text={button.text} style="m-medium" white flexible nointeract />
						</Interactable>
					{/each}
				</div>
			{/if}
		</div>

		{#if `${banner.vertical}_${banner.horizontal}` != 'middle_center'}
			<div
				class="banner__gradient"
				style="background: linear-gradient({angleLUT[
					`${banner.vertical}_${banner.horizontal}`
				]}deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 70%);"
			/>
		{/if}

		<Image
			src={banner.image}
			alt="banner"
			style="width: 100%; aspect-ratio: inherit; border-radius: inherit;"
		/>
	</div>
</div>
