<template>
	<div class="absolute left-0 top-0 h-full w-auto pt-7 flex flex-col items-center justify-start border-black border-opacity-75 bg-black bg-opacity-50"
		:class="this.$store.state.hidedSidebar ? 'hide-sidebar':'show-sidebar'">
		<div v-for="app in apps" :key="app.id">
			<SidebarApp :app="app" v-if="app.favourite" :id="'sidebar-' + app.id" @click.native="appClick(app.id)" />
		</div>
	</div>
</template>

<script>
	import SidebarApp from "./SidebarApp";

	export default {
		name: 'Sidebar',
		props: {
			apps: {
				type: Array
			}
		},
		components: {
			SidebarApp,
		},
		methods: {
			appClick(id) {
				//console.log(`appClick: id - ${id}`)
				this.$emit('appClick', id)
			}
		}
	}
</script>
