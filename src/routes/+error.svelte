<script>
	import { page } from '$app/stores';
	import Text from '../components/text/text.svelte';
</script>

<div class="error">
	<div class="wrapper">
		<Text text={$page.status.toString()} style="xl-bold" alignment="center" />
		<Text text={$page.error?.message} style="m-medium" alignment="center" />
		<Text text="Back To Home" style="m-medium" url="/" alignment="center" />
	</div>
</div>

<style lang="scss">
	.error {
		height: 50svh;
		width: 100svw;
		display: grid;
		place-content: center;
	}
</style>
