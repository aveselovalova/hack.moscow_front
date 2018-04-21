<template>
	<div>
	<select v-model="selected" id="select_language">
		<option v-for="lang in langs">{{ lang.name }}</option>
	</select>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				langs: [
					{name:'English', code:'en-US'},
					{name:'Pусский', code:'ru-RU'},
				],
				d: ''
			}
		},
		computed: {
			selected: {
				get () {
					return null;
				},
				set (optionValue) {
					this.d = this.langs.filter(l => l.name == optionValue)[0].code
					this.$emit('interface', this.d)
				},
			},
		},
	}
</script>