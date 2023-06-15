<script lang="ts">
	import Image from '../../components/image/image.svelte';
	import Text from '../../components/text/text.svelte';
	import './card.scss';

	export let image: string;
	export let text: string;
</script>

<div class="card">
	<Image src={image} alt="card image" />
	<Text {text} style="s-medium" />
</div>
