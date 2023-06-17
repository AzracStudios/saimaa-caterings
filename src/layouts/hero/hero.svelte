<script lang="ts">
	import './hero.scss';
	import Banner from './banner.svelte';
	import Controls from './controls.svelte';
	import { setContext } from 'svelte';
	import { bannerImages, bannerIndex, intervalId, triggerInterval } from './store';
	import { onMount } from 'svelte';
	import { fetchBanners } from '../../lib-wrapper/useAxios';
	import { get } from 'svelte/store';
	import type { StrapiBanner } from '../../lib-wrapper/types';
	import { sleep } from '../../lib-wrapper/utils';

	let banners: StrapiBanner[];
	$: banners = [];

	bannerImages.subscribe((data) => {
		banners = data;
	});

	setContext('handle banner navigation', {
		handleBannerNavigate: (idx: number) => {
			bannerIndex.set(idx);
		},
		bannerIndex
	});

	$: bannerImageLen = 0;

	onMount(async () => {
		const banners: StrapiBanner[] = await fetchBanners();

		bannerImages.set(banners);
		bannerImageLen = banners.length;
		if (get(intervalId)) clearInterval(get(intervalId));

		await sleep(6000);
		triggerInterval.set(true);

		triggerInterval.subscribe((val) => {
			if (val == true) {
				intervalId.set(
					setInterval(() => {
						bannerIndex.set(get(bannerIndex) + 1 < bannerImageLen ? get(bannerIndex) + 1 : 0);
					}, 5000)
				);

				triggerInterval.set(false);
			}
		});
	});
</script>

<div class="vspace vspace--small" />
<div class="hero disable-interaction">
	<div class="hero__banner">
		{#if banners.length > 0}
			{#each banners as banner, index}
				<Banner {index} {banner} />
			{/each}
		{:else}
			<div class="banner__image--skeleton" />
		{/if}
	</div>

	<Controls len={bannerImageLen} />
</div>
