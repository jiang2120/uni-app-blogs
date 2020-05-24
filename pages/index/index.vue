<template>
	<view class="page">
		<!-- 轮播图开始 -->
		<swiper :indicator-dots="true" :autoplay="true">
			<swiper-item v-for="carouse in carouselList" :key="carouse.id">
				<image :src="getFileUrl(carouse.file_url)" class="carousel" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图结束 -->

		<!-- 热门开始 -->
		<view class="page-block article-hot">
			<view class="hot-title-nav">
				<image src="" class="hot-icon"></image>
				<view class="hot-title">
					热门推荐
				</view>
			</view>
		</view>
		<hr>
		<scroll-view scroll-x="true" class="page-block hot">
			<view class="article-sing" v-for="hot in hotlList" :key="hot.id">
				<view class="sing-wapper">
					<navigator open-type="navigate" :url="'../show/show?searchId=' + hot.id">
						<image :src="getFileUrl(hot.file_url)" class="sing" mode="aspectFill"></image>
						<view class="title">
							{{hot.article_name}}
						</view>
					</navigator>
				</view>
			</view>
		</scroll-view>
		<!-- 热门结束 -->

		<!-- 最新文章开始 -->
		<view class="page-block article-hot">
			<view class="hot-title-nav">
				<image src="" class="hot-icon"></image>
				<view class="hot-title">
					最新文章
				</view>
			</view>
		</view>
		<hr>
		<view class="article-new page-block" v-for="news in newlList" :key="news.id">
			<navigator open-type="navigate" :url="'../show/show?searchId=' + news.id">
				<view class="article-wapper">
					<image :src="getFileUrl(news.file_url)" class="article-icon" mode="aspectFill"></image>
					<view class="article-desc">
						<view class="article-title">
							标题：{{news.article_name}}
						</view>
						<view class="article-info">
							关键词：{{news.Keywords}}
						</view>
					</view>
				</view>
			</navigator>
		</view>
		
		<!-- 最新文章结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carouselList: [],
				hotlList: [],
				newlList: []
			}
		},
		
		onPullDownRefresh() {
			/* 获取路径 */
			var that = this;
			var serverUrl = that.serverUrl;
			/* 下拉获取最新文章 */
			this.getArticleNew(that, serverUrl);
		},

		onLoad() {
			/* 获取路径 */
			var that = this;
			var serverUrl = that.serverUrl;

			/* 获取轮播图 */
			that.getBanner(that, serverUrl);
			/* 获取热门文章 */
			that.getArticleHot(that, serverUrl);
			/* 获取最新文章 */
			that.getArticleNew(that, serverUrl);
		},

		methods: {
			/**
			 * -----------------------------------------------------
			 * 获取轮播图
			 * -----------------------------------------------------
			 * @param {void} that 
			 * @param {string} serverUrl 
			 * 
			 * @return {array}
			 */
			getBanner: function(that, serverUrl) {
				uni.request({
					url: serverUrl + 'files?code=banner',
					method: 'get',
					success: (res) => {
						if (res.statusCode == 200) {
							var carouselList = res.data.data;
							that.carouselList = carouselList;
						}
					}
				})
			},

			/**
			 * -----------------------------------------------------
			 * 获取热门文章
			 * -----------------------------------------------------
			 * @param {void} that 
			 * @param {string} serverUrl 
			 * 
			 * @return {array}
			 */
			getArticleHot: function(that, serverUrl) {
				uni.request({
					url: serverUrl + 'articles?hot=1&top=1',
					method: 'get',
					success: (res) => {
						if (res.statusCode == 200) {
							var hotlList = res.data.data;
							that.hotlList = hotlList;
						}
					}
				})
			},

			/**
			 * -----------------------------------------------------
			 * 获取最新文章
			 * -----------------------------------------------------
			 * @param {void} that 
			 * @param {string} serverUrl 
			 * 
			 * @return {array}
			 */
			getArticleNew: function(that, serverUrl) {
				
				uni.showLoading({
					mask:true
				})
				
				uni.showNavigationBarLoading()
				
				uni.request({
					url: serverUrl + 'articles',
					method: 'get',
					success: (res) => {
						if (res.statusCode == 200) {
							var newlList = res.data.data;
							that.newlList = newlList;
						}
					},
					complete: () => {
						/* 下拉刷新停止 */
						uni.hideLoading();
						uni.hideNavigationBarLoading()
						uni.stopPullDownRefresh()
					}
				})
			},

			/**
			 * -----------------------------------------------------
			 * 获取图片完整地址
			 * -----------------------------------------------------
			 * @param {Object} icon
			 * 
			 * @return string Url
			 */
			getFileUrl: function(icon) {
				/* 返回图片完整路径 */
				return this.fileUrl + icon;
			},
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
