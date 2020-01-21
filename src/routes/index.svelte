<script context="module">
	import axios from 'axios';

  export async function preload (page) {
		const { data } = await axios.get('https://api.jsonbin.io/b/5e20fb265df640720836b4c7');
    return { data }
	}
</script>

<style type="scss">

	$red: red;

	h1, figure, p {
		text-align: center;
		margin: 0 auto;
		color: $red;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<script>
	export let data; 
</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>
 
<h1>{data.message}</h1>

<figure>
	<img alt='Borat' src='great-success.png'>
	<figcaption>HIGH FIVE!</figcaption>
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
