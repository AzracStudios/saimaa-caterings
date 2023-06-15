<script>
	import Conditionalview from './conditionalview.svelte';
</script>

<Conditionalview
	condition={(win) => {
		return win.innerWidth > 900;
	}}><slot /></Conditionalview
>
