<template>
	<view class="page">
		<view class="movie-info">
			<navigator :url="'../file/file?file=' + getFileUrl(articleInfo.file_url)">
				<image :src="getFileUrl(articleInfo.file_url)" class="file" mode="aspectFill"></image>
			</navigator>
			
			<view class="movie-desc">
				<view class="title"><b>标题</b>：{{articleInfo.article_name}}</view>
				<view class="basic-info"><b>关键词</b>：{{articleInfo.Keywords}}</view>
				<view class="basic-info"><b>描述</b>：{{articleInfo.describe}}</view>
			</view>
		</view>
		<view class="plots-block">
			<view class="plots-title">文章详情</view>
		</view>
		<hr>
		<view class="plots-block">
			<rich-text :nodes="articleInfo.content" class="plots-desc"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleInfo: {},
			};
		},
		
		onLoad(params) {
			var that = this;
			var serverUrl = that.serverUrl;
			// 获取上一个页面传入的参数
			var id = params.searchId;
			// 通过api修改导航栏的属性
			uni.setNavigationBarColor({
				frontColor: "#FFF",
				backgroundColor:"#AB956D"
			});
			that.getArticleInfo(that,serverUrl,id);
		},
		
		// 此函数仅仅只支持在小程序端的分享，分享到微信群或者微信好友
		onShareAppMessage(res) {
			var that = this;
			return {
			  title: that.articleInfo.article_name,
			  path: '/pages/show/show?searchId=' + that.articleInfo.id
			}
		},
		
		// 监听导航栏的按钮
		onNavigationBarButtonTap(e) {
			var index = e.index;
			var that = this;
			var articleInfo = that.articleInfo;
			var id = articleInfo.id;
			var article_name = articleInfo.article_name;
			var file_url = articleInfo.file_url;
			var Keywords = articleInfo.Keywords;
			if (index == 0) {
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: "https://l007.dreamxiao.cn/#/pages/show/show?searchId=" + id,
					title: "程序猿修炼手札：《" + article_name + "》",
					summary: "程序猿修炼手札：《" + article_name + "》",
					imageUrl: getFileUrl(file_url),
					success: function (res) {
					}
				});
			}
		},
		
		methods: {
			getArticleInfo:function(that,serverUrl,id){
				uni.request({
					url: serverUrl + 'articles/' + id,
					method: "get",
					success: (res) => {
						// 获取真实数据之前，务必判断状态是否为200
						if (res.statusCode == 200) {
							var articleInfo = res.data.data;
							that.articleInfo = articleInfo;
						}
					}
				});
			},
			
			getFileUrl: function(icon) {
				/* 返回图片完整路径 */
				return this.fileUrl + icon;
			},
		},
	}
</script>

<style>
	@import url("./show.css");
</style>
