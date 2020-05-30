<template>
	<!-- 全局调用组件 -->
	<div class="layout-container">
        <slot></slot>
    </div>
</template>

<script>
	export default {
        name: "Layout",
		data() {
			return {};
		},
		components: {
		}
	};
</script>

<style lang="scss" scoped>
</style>
