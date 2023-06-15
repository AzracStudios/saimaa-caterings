<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	export let once: boolean = false;

	let element: any;
	let className: string;
	$: className = 'aos-hide';
</script>

<IntersectionObserver
	{element}
	{once}
	on:observe={(e) => {
		className = e.detail.isIntersecting ? 'aos-show' : 'aos-hide';
	}}
>
	<div bind:this={element} class="component__intersectable {className}" style="position: relative;">
		<slot />
	</div>
</IntersectionObserver>
