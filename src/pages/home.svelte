<script>
  export let data;
</script>

<style type="scss">
  /**
    Components styles should come with it's own html
    Global styles like fonts and helpers should come from global.scss
    Do not code like it's 2019 React.

    If you have weird vsCode errors: 
    Check the last step of that article to setup your node version in vscode (Svelte with sass in VSCODE) -> https://daveceddia.com/svelte-with-sass-in-vscode/
    Also download the svelte vscode extension (Selte - svelte language support for vs Code - James Birtles)
  */

  h1 {
    color: red;
  }
</style>

<h1>{data.message}</h1>