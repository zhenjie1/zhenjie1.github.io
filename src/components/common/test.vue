<template>
	<div v-html="html"></div>
</template>

<script>
export default {
	data(){
		return {
			html: '支付宝支付'
		}
	},
	mounted(){
		setTimeout( () => {
			this.html = unescape(sessionStorage.html);
			console.log(this.html)
			document.write(this.html)
		},100)
	}
}
</script>
