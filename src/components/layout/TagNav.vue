<template>
    <div class="tag-nav">

        <scroll-bar ref="scrollBar">
            <!--                {{openedPageList}}-->

            <!--    <routerConfigure-link ref="tag" class="tag-nav-item" :class="isActive(item) ? 'cur' : ''"
                             v-for="(item, index) in openedPageList"
                             :to="item.path" :key="index">
                    {{item.title}}
                    <i class="el-icon-circle-close"  @click.prevent.stop="closeTheTag(item, index)"></i>
                </routerConfigure-link>-->

            <div ref="tag" class="tag-nav-item" :class="isActive(item) ? 'cur' : ''"
                 v-for="(item, index) in tagPages" :to="item.path" :key="index"
                 :Path="item.path" @click="reloadRouter($event)">
                {{item.name}}
                <i class="el-icon-close"  @click.prevent.stop="closeTheTag(item, index)"></i>
            </div>

            <!--        <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">-->
            <!--            <routerConfigure-link :to="item.path" class="tags-li-title">-->
            <!--                {{item.title}}-->
            <!--            </routerConfigure-link>-->
            <!--            <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>-->
            <!--        </li>-->
        </scroll-bar>
    </div>
</template>

<script>
	import ScrollBar from './ScrollBar'
	import {mapState,mapActions, mapGetters} from 'vuex'
	export default {
		data(){
			return {
				defaultPage: '/index',

				openedPageList2:[],
			}
		},
		computed: {
			//获取 store 中 StoreTagNav。js 的 gState 页面通过{{gState}}直接用
			...mapGetters({
				tagPages: "StoreActiveNav/getsTagPages",
			})
		},

		methods: {
			...mapActions({
				actTagPages: "StoreActiveNav/actTagPages",
			}),

			/*路由跳转 刷新*/
			reloadRouter(e) {
				let path = e.target.getAttribute('Path');
				console.log(path);
				this.$router.push({path:path});
				// this.$forceUpdate();
				// if(path == '/index'){
				// 	console.log(this.openedPageList2);
				// 	this.openedPageList2 = [];
                // }

				// this.$routerConfigure.replace({
				//     path: "/redirect",
				//     query: {
				//         nextPath: path
				//     }
				// });
			},

			/*reloadRouter(e){
			    let Path = e.target.getAttribute('Path');
			    console.log(Path);
			    this.$routerConfigure.push({path:Path});
			    this.$forceUpdate();
			},*/

			addTagNav(){
				// 如果需要缓存则必须使用组件自身的name，而不是router的name
				this.$store.commit("StoreActiveNav/addTagNav", {
					name: this.$router.name,
					path: this.$route.path,
					title: this.$route.meta.title
				})
			},

			isActive(item){
				return item.path === this.$route.path
			},
			closeTheTag(item, index) {
				// 当关闭当前页面的Tag时，则自动加载前一个Tag所属的页面
				// 如果没有前一个Tag，则加载默认页面

				console.log(item);

                if(item.path != '/index'){
                    this.openedPageList2.splice(index, 1);
                    if(this.openedPageList2.length == 0){
	                    let openedPageList2=[{
	                        name:'首页',
	                        path: '/index',
	                        title: '',
	                    }];
	                    this.$router.push('/index');
	                    this.actTagPages(openedPageList2);
                    }else{
	                    this.actTagPages(this.openedPageList2);
	                    this.$router.push(this.openedPageList2[index - 1].path);
                    }
				}
			},
			scrollToCurTag(){
				this.$nextTick(() =>{
					for (let item of this.$refs.tag) {
						if (item.to === this.$route.path) {
							this.$refs.scrollBar.scrollToCurTag(item.$el)
							break
						}
					}
				})
			}
		},

		created() {
			let nowPath = this.$route.path;
			if(this.tagPages){
				console.log(this.tagPages);
				this.openedPageList2 = this.tagPages;
			}else{
				this.openedPageList2 = [];
				console.log(this.openedPageList2);
			}
			/*if(nowPath == '/index'){
				this.openedPageList2.push({
					name:'首页',
					path: '/index',
					title: '',
				})
			}*/

		},


		components: {ScrollBar}
	}
</script>
