<script lang="ts">
	import './icon.scss';
	import '../types.d';

	export let fill: number = 0;
	export let weight: number = 500;
	export let grad: number = 0;
	export let opsz: number = 48;

	export let size: IconSize = 'm';

	export let icon: string = 'disabled_by_default';
	export let url: string = "#";
</script>

<a href={url} class="material__link">
	<span
		class="material-symbols-rounded material__icon--{size} {url != undefined
			? 'material__icon--clickable'
			: ''}"
		style="font-variation-settings: 'FILL' {fill}, 'wght' {weight}, 'GRAD' {grad}, 'opsz' {opsz};"
	>
		{icon}
	</span>
</a>
