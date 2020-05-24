<template name="categoryTpl">
	<view>
		<view class="category-detail-box" >
		    <view class="category-main" v-for="cate in categoryInfo" :key="cate.id">
				<navigator open-type="navigate" :url="'../show/show?searchId=' + cate.id">
					<view class="category-goods-items">
					  <image :src="getFileUrl(cate.file_url)"></image>
					  <view>{{cate.article_name}}</view>
					</view>
				</navigator>
		    </view>
		  </view>
	</view>
</template>

<script>
	export default {
		name: "categoryTpl",
		
		data() {
			return {
				categoryInfo:{}
			};
		},
		// 定义组件内部使用的属性
		props: {
			// 自定义一个变量，用于接受父组件（首页或者其他页面）传入的参数值
			cateId: ''
		},
		// 生命周期，组件创建完成后被调用
		created() {
			var that = this;
			var serverUrl = that.serverUrl;
			if (that.cateId != null && that.cateId != undefined && that.cateId != '') {
				var cateId = that.cateId;
			}
			that.getCateList(that, serverUrl,cateId);
		},

		methods: {
			getCateList: function(that, serverUrl,id) {
	
				uni.showLoading({
					mask:true,
					title:"请稍后..."
				})
				uni.showNavigationBarLoading()
				
				uni.request({
					url: serverUrl + 'cateArticels?id=' + id,
					method: 'get',
					success: (res) => {
						if (res.statusCode == 200) {
							var categoryInfo = res.data.data;
							that.categoryInfo = categoryInfo;
						}
					},
					complete: () => {
						/* 下拉刷新停止 */
						uni.hideLoading();
						uni.hideNavigationBarLoading()
					}
				})
			},
			
			getFileUrl: function(icon) {
				/* 返回图片完整路径 */
				return this.fileUrl + icon;
			},
		}
	}
</script>

<style>
	.category-detail-box{
	    overflow: hidden;
	    padding: 20upx;
		display: flex;
		flex-direction: row;
	}
	.category-header{
	    height: 200upx;
	    text-align: center;
	}
	.category-header image{
	    border-radius: 5upx;
	    width: 520upx;
	    max-height: 100%;
	}
	.category-title{
	    margin: 30upx;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
	.category-title text{
	    font-size: 24upx;
	    color:#AB956D;
	}
	.category-title text::before,.category-title text::after{
	    content: '';
	    display: inline-block;
	    position: relative;
	    top: -6upx;
	    width: 70upx;
	    height: 2upx;
	    margin: 0 20upx;
	    background-color:#979797;
	}
	.category-main{
	    display: flex;
		flex-direction: row;
	    flex-wrap: wrap;
		padding: 0 12upx;
	}
	.category-goods-items{
	    width: 25%;
	    margin-bottom: 20upx;	
	}
	.category-goods-items.middle{
	    margin:0 20upx;
	}
	.category-goods-items image{
	    height: 120upx;
	    width: 120upx;
	    border-radius: 10upx;
	}
	.category-goods-items view {
	    color:#333333;
	    font-size: 24upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
