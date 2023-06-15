<script lang="ts">
	import Text from '../text/text.svelte';
	import '../button/button.scss';
	import '../types.d';

	export let style: Style;
	export let filled: boolean = false;
	export let fullwidth: boolean = false;
	export let flexible: boolean = false;
	export let white: boolean = false;
	export let nointeract: boolean = false;
	export let text: string;
	$: text;
</script>

<div
	class="component__button {fullwidth
		? 'component__button--fullwidth'
		: flexible
		? 'component__button--flexible'
		: ''}"
>
	<button
		class="component__button--{!filled ? 'outlined' : 'filled'} {white
			? 'component__button--white'
			: ''}"
		
		tabindex={nointeract ? -1 : 0}
	>
		<Text {text} {style} noselect alignment="center" />
	</button>
</div>
