<!-- 
	Example router page best practice. 
	* The router files should never contain styles.
	* Grabbing data for a page using context="module" should be done only in router files.
	* SEO tags should be inside router pages using <svelte:head> component.
	* You sould import your rendered page here.

	Router pages should be a concise as possible and only deal with grabbing data and
	organising the app before the page renders.

	DO NOT USE AXIOS OR OTHER MEANS OF FETCHING DATA UNLESS YOU KNOW WHAT YOU ARE DOING, 
	use this.fetch otherwise your app will fail to load server side.
 -->

<script context="module">
  export async function preload (page) {
		const res = await this.fetch('https://api.jsonbin.io/b/5e20fb265df640720836b4c7');
		const data = await res.json();
    return { data }
	}
</script>

<script>
	import HomePage from '../pages/home.svelte'
	export let data; 
</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<HomePage data={data}/>

