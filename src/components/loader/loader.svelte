<script lang="ts">
	import { onMount } from 'svelte';
	import './loader.scss';
	import { sleep } from '../../lib-wrapper/utils';

	let loading: boolean = true;
	$: loading;

	let disappear = false;
	$: disappear;

	onMount(async () => {
		document.body.style.overflowY = 'hidden';
		await sleep(6000);
		document.body.style.overflowY = 'auto';
		loading = false;
		await sleep(900);
		disappear = true;
	});
</script>

{#if !disappear}
	<div class="loader {!loading ? 'out' : ''}">
		<div class="overlay" />
		<div class="logo">
			<img src="/emblem.svg" alt="logo" />
		</div>
		<!-- SOURCE: https://loading.io/css/ -->
		<div class="lds-ellipsis">
			<div />
			<div />
			<div />
			<div />
		</div>
	</div>
{/if}

<style lang="scss">
	@import '../../styles/variables';
	// SOURCE: https://loading.io/css/
	.lds-ellipsis {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
		z-index: 101;
	}
	.lds-ellipsis div {
		position: absolute;
		top: 33px;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: $color-primary;
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.lds-ellipsis div:nth-child(1) {
		left: 8px;
		animation: lds-ellipsis1 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(2) {
		left: 8px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(3) {
		left: 32px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(4) {
		left: 56px;
		animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}
</style>
