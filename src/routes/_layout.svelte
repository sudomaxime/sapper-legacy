<style type="scss" global>
	/**
		Aliases like styles/global do not work yet in style tags. Coming soon !
	*/
	@import "../styles/global.scss";
	/**
		Do not add CSS here, if you have global modules to put in the layout, 
		the styles should come from the global.scss file. 
		Otherwise you will have weird errors.
	*/
</style>

<main>
	<slot></slot>
</main>