<script lang="ts">
	import { onMount } from 'svelte';
	import Text from '../../components/text/text.svelte';
	import { fetchGallery } from '../../lib-wrapper/useAxios';
	import './gallery.scss';
	import ExplorableImage from './components/explorable_image.svelte';
	import Intersectable from '../../components/intersectable/intersectable.svelte';
	import type { StrapiPage } from '../../lib-wrapper/types';
	import Pagebuilder from '../../layouts/pagebuilder/pagebuilder.svelte';

	let pageData: StrapiPage;
	$: pageData;

	onMount(async () => {
		const data = await fetchGallery();
		pageData = data;
	});

</script>

<Pagebuilder {pageData} onlySEO/>

<div class="page">
	<Intersectable once>
		<div class="page__title">
			<Text text="Gallery" style="l-bold" />
		</div>
	</Intersectable>

	<div class="gallery">
		{#if pageData}
			{#each pageData.page as image}
				<ExplorableImage src={image}/>
			{/each}
		{/if}
	</div>
</div>
