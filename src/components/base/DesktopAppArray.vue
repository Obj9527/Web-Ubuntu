<template>
	<div class="absolute right-0 w-auto h-auto flex flex-col justify-start items-center" style="top: 30px">
		<div v-for="app in this.apps" :key="app.id">
			<DesktopApp v-if="app.desktop_shortcut" :app="app" @dblclick.native="openApp(app)" />
		</div>
	</div>
</template>

<script>
	import DesktopApp from "./DesktopApp";
	export default {
		name: "DesktopAppArray",
		props: {
			apps: {
				type: Array,
				required: true,
			}
		},
		components: {
			DesktopApp
		},
		methods: {
			openApp(app) {
				setTimeout(() => {
					this.$store.commit('openWindow', app)
					this.$store.commit('refreshWindowFocused', app.id)
				}, 400)
			},
		}
	}
</script>
