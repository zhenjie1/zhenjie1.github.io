<template>
	<div v-html="html">123456</div>
</template>

<script>
export default {
	data(){
		return {
			html: ''
		}
	},
	mounted(){
		this.html = sessionStorage.html
		console.log(this.html)
	}
}
</script>
