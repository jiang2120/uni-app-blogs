<template>
	<view class="black">
		<image 
			:src="file_url"
			class="cover"
			mode="widthFix"
			@longpress="operator"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				file_url: ""
			};
		},
		onLoad(params) {
			var file_url = params.file;
			this.file_url = file_url;
			// 通过api修改导航栏的属性
			uni.setNavigationBarColor({
				frontColor: "#000000",
				backgroundColor: "#ffffff"
			});
		},
		methods: {
			operator:function() {
				var that = this;
				uni.showActionSheet({
					itemList: ["保存图片到本地"],
					success: function(res){
						// 下标为0则下载
						if (res.tapIndex == 0) {
							uni.showLoading({
								title: "图片保存中..."
							})
							uni.downloadFile({
								url: that.file_url,
								success: function(result) {
									var tempFilePath = result.tempFilePath;
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success: function() {
											uni.showToast({
												title: "保存成功",
												duration: 2000
											})
										},
										complete: function() {
											uni.hideLoading();
										}
									})
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
.black {
	background-color: #FFFFFF;
	width: 100%;
	height: 100%;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: fixed;
}
.cover {
	align-self: center;
}
</style>
