<template>
	<view class="container category-container">
		<view class="category-box">
			<view class="left-box">
				<view class="menu-item" v-for="(cate,index) in categoryInfo" :key="index">
					<view
					:class="currentMenuIndex==index?'selected':''"
					:data-cateid="cate.id" 
					:data-index="index" 
					@tap="changeCategory" 
					>
						{{cate.name}}
					</view>
				</view>
			</view>
			<view class="right-box">
				<view class="foods-type-box">
					<view class="category-detail-box" >
						<view class="category-main" v-for="cate in cateInfo" :key="cate.id">
							<navigator open-type="navigate" :url="'../show/show?searchId=' + cate.id">
								<view class="category-goods-items">
								  <image :src="getFileUrl(cate.file_url)" mode="aspectFill"></image>
								  <view>{{cate.article_name}}</view>
								</view>
							</navigator>
						</view>
					 </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import categoryTpl from "../../components/categoryTpl.vue";
	export default {
		data() {
			return {
				cateids: 0,
				currentMenuIndex:0,
				cateInfo:[],
				categoryInfo:[]
			}
		},
		
		// 生命周期，组件创建完成后被调用
		created() {
			var that = this;
			var serverUrl = that.serverUrl;
			/* 首次加载获取0下标分类 */
			that.loadData(that,serverUrl);
		},
		
		onLoad() {
			/* 获取路径 */
			var that = this;
			var serverUrl = that.serverUrl;
			/* 获取分类 */
			that.getCategoryList(that,serverUrl);
		},
		
		methods: {
			/* 获取所有分类 */
			getCategoryList: function(that, serverUrl) {
				uni.request({
					url: serverUrl + 'categories',
					method: 'get',
					success: (res) => {
						if (res.statusCode == 200) {
							var categoryInfo = res.data.data;
							/* 缓存0下标的id */
							uni.setStorageSync('ids0', res.data.data[0].id);
							that.categoryInfo = categoryInfo;
							
						}
					}
				})
			},
			
			/*加载所有数据*/
			loadData: function (that,serverUrl) {
				/* 获取0下标的id */
				var ids0 = uni.getStorageSync('ids0');
			    that.getCate(that,serverUrl,ids0)
			},
			
			/*切换分类*/
			changeCategory: function (e) {
				/* 获取路径 */
				var that = this;
				var serverUrl = that.serverUrl;
				var index = e.currentTarget.dataset.index,
				id = e.currentTarget.dataset.cateid;
				that.currentMenuIndex = index; 
				that.getCate(that,serverUrl,id)
			},
			
			/* 获取数据 */
			getCate:function(that,serverUrl,id){
				uni.showLoading({
					mask:true,
					title:"请稍后..."
				})
				
				uni.showNavigationBarLoading();
				
				uni.request({
				  	url: serverUrl + 'cateArticels?id=' + id,
				  	method: 'get',
				  	success: (res) => {
				  		if (res.statusCode == 200) {
				  			var cateInfo = res.data.data;
				  			that.cateInfo = cateInfo;
				  		}
				  	},
					complete: () => {
						/* 下拉刷新停止 */
						uni.hideLoading();
						uni.hideNavigationBarLoading()
					}
				})
			},
			
			/* 获取完整图片地址 */
			getFileUrl: function(icon) {
				/* 返回图片完整路径 */
				return this.fileUrl + icon;
			},
		},
		
		// /* 引入组件 */
		// components: {
		// 	categoryTpl
		// }
	}
</script>

<style>
	@import url("./category.css");
</style>
