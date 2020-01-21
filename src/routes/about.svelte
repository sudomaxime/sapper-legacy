<svelte:head>
	<title>About</title>
</svelte:head>

<script type="ts">
	function hello (): void {
		console.log("hello")
	}
</script>

<h1>About this site</h1>

<button on:click={hello}></button>

<p>This is the 'about' page. There's not much here.</p>