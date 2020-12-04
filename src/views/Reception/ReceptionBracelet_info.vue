<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <el-tree
                class="tree-style"
                :data="userAuthTree"
                show-checkbox
                node-key="id"
                :props="defaultProps"
                ref="tree"
                :render-content="renderContent"
                default-expand-all
                @check-change="handleCheckChange"
                :default-checked-keys="defaultAuth"
        ></el-tree>


    </div>
</template>

<script>
	export default {
		name: "ReceptionBracelet_info",
		data() {
			return {

				userAuthTree: [{
					id: 1,
					label: '一级 1',
					children: [{
						id: 4,
						label: '二级 1-1',
						children: [{
							id: 9,
							label: '三级 1-1-1'
						}, {
							id: 10,
							label: '三级 1-1-2'
						}]
					}]
				}, {
					id: 2,
					label: '一级 2',
					children: [{
						id: 5,
						label: '二级 2-1'
					}, {
						id: 6,
						label: '二级 2-2'
					}]
				}, {
					id: 3,
					label: '一级 3',
					children: [{
						id: 7,
						label: '二级 3-1'
					}, {
						id: 8,
						label: '二级 3-2'
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},

				defaultAuth:[7,8],
			};

		},
		methods: {

			handleCheckChange(){},


			// 内容区渲染后执行 判断底层 赋 class
			renderContent(h, { node, data, store }) {
				let classname = "";

				if (node.level === 2) {
					classname = "levelname";
				}

				// 第三层节点添加className
				if (node.level === 3) {
					classname = "levelname";
				}
				return (
					<span>{node.label}</span>
                )
			},

		},
		created() {
			
		},
	}
</script>

<style lang="scss">
    .tree-style .el-tree-node__children .el-tree-node__children .el-tree-node__content {
        float: left;
    }

</style>
