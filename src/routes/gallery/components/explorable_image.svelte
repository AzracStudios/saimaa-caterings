<script lang="ts">
	import Image from '../../../components/image/image.svelte';
	import Interactable from '../../../components/interactable.svelte';
	import type { StrapiImageLOD } from '../../../lib-wrapper/types';
	import { sleep } from '../../../lib-wrapper/utils';
	export let src: StrapiImageLOD;

	let explore = false;
	let waitingForClose = false;

	const handleClick = async () => {
		if (explore) {
			waitingForClose = true;
			await sleep(300);
			waitingForClose = false;
		}

		explore = !explore;
		document.body.style.overflow = explore ? 'hidden' : 'visible';
	};
</script>

<Interactable onclick={() => handleClick()}>
	<Image src={src.low.src} alt={src.low.src} />
</Interactable>

<div
	class="explorable explorable-{explore ? '-' : '-in'}active {waitingForClose
		? 'explorable--close'
		: ''}"
>
	<div class="explorable__actions">
		<Interactable onclick={() => handleClick()}>
			<div class="action__close">
				<div class="close__bar" />
				<div class="close__bar" />
			</div>
		</Interactable>
	</div>

	<Image src={src.high.src} alt={src.high.src} />
</div>
