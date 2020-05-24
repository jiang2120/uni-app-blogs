<template>
	<view class="page">
		<view class="search-block">
			<view class="search-icon-wapper">
				<image 
				class="search-icon"
				src="../../static/search.png">
				</image>
			</view>
			<input 
				v-model="keywords"
				type="text"
				class="search-text" 
				placeholder="搜索文章" 
				maxlength="11" 
				confirm-type="search"
				@confirm="searchAll"
			/>
		</view>
		<view class="list page-block">
			<view class="wapper" v-for="search in searchList" :key="search.id">
				<image
					class="icon"
					:data-searchId = "search.id"
					@click="show"
					:src="getFileUrl(search.file_url)" 
					mode="aspectFill"
				>
				</image>
				<view class="article-desc">
					<view class="article-title">
						{{search.Keywords}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchList:[],
				keywords:"",
				page: 1,
				totalPages: 1
			}
		},
		
		onLoad() {
			/* 获取路径 */
			var that = this;
			var serverUrl = that.serverUrl;
			/* 获取搜索文章 */
			that.getSearchArticle(that,serverUrl);
		},
		
		onReachBottom() {
			var that       = this;
			var page       = that.page + 1;
			var keywords   = that.keywords;
			var totalPages = that.totalPages;
			if(page > totalPages){
				return ;
			}
			that.pagedSearchList(keywords,page,12);
		},
		
		methods: {
			/**
			 * -----------------------------------------------------
			 * 获取文章详情页面
			 * -----------------------------------------------------
			 * @param {void} that 
			 * @param {string} serverUrl 
			 * 
			 * @return {array}
			 */
			show: function(e) {
				var searchId = e.currentTarget.dataset.searchid;
				//页面跳转API
				uni.navigateTo({
					url:"../show/show?searchId=" + searchId
				})
			},
			
			/**
			 * -----------------------------------------------------
			 * 获取搜索文章
			 * -----------------------------------------------------
			 * @param {void} that 
			 * @param {string} serverUrl 
			 * 
			 * @return {array}
			 */
			getSearchArticle: function(that, serverUrl) {
				
				uni.showLoading({
					mask:true,
					title:"请稍后..."
				})
				
				uni.showNavigationBarLoading()
				
				uni.request({
					url: serverUrl + 'search/articles?keywords=&page=&pageSize=',
					method: 'get',
					success: (res) => {
						if (res.statusCode == 200) {
							var searchList = res.data.data;
							that.searchList = searchList;
						}
					},
					complete: () => {
						/* 下拉刷新停止 */
						uni.hideLoading();
						uni.hideNavigationBarLoading()
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
			
			/**
			 * -----------------------------------------------------
			 * 获取搜索资源
			 * -----------------------------------------------------
			 * @param {void} that
			 * @param {string} serverUrl
			 * @param {sting} e 
			 * 
			 * @return string Url
			 */
			searchAll:function(e) {
				/* 获取搜索关键词 */
				let val = this.keywords;
				this.keywords = val;
				this.searchList = [];
				this.pagedSearchList(val,1,12);
			},
			
			/**
			 * -----------------------------------------------------
			 * 获取搜索资源
			 * -----------------------------------------------------
			 * @param {void} that
			 * @param {string} serverUrl
			 * @param {sting} e 
			 * 
			 * @return string Url
			 */
			pagedSearchList:function (keywords,page,pageSize){
				/* 获取路径 */
				var that = this;
				var serverUrl = that.serverUrl;
				
				uni.showLoading({
					mask:true,
					title:"请稍后..."
				})
				uni.showNavigationBarLoading()
				
				uni.request({
					url: serverUrl + 'search/articles?keywords=' + keywords+'&page='+ page +'&pageSize=' +  pageSize,
					method: 'get',
					success: (res) => {
						if (res.statusCode == 200) {
							var searchList = res.data.data;
							that.searchList = that.searchList.concat(searchList);
							that.totalPages = res.data.data.total;
							that.page =	page;
						}
					},
					complete: () => {
						/* 下拉刷新停止 */
						uni.hideLoading();
						uni.hideNavigationBarLoading()
					}
				})
			}
		}
	}
</script>

<style>
	@import url("./search.css");
</style>
