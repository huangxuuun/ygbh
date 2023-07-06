<template>
	<view class="home">
		<view class="y-header">
			<view class="y-header-tab">
				<view :class="{'y-tab-active':true}">首页</view>
				<view style="margin-left: 142rpx;" @click="tapTab">推荐</view>
			</view>
			<uni-icons type="person" size="48rpx" color="#fff" class="person" @click="tapMy"></uni-icons>
			<view class="y-tag-container">
				<view v-for="(tag,index) in tagList" :key="tag.text" class="y-tag" :class="{'y-tag-active':tag.active}"
					@click="tapTag(index)">
					{{tag.text}}
				</view>
			</view>
		</view>
		<!-- <scroll-view class="home-container" :scroll-y="true" @scrolltolower="lower">
			<uni-row class="demo-uni-row">
				<uni-col :span="12" v-for="(item,index) in 8" :key="index">
					<view class="y-card">
						<view class="y-card-image"
							style="background-image: url('https://img2.baidu.com/it/u=1115987748,3793792879&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500');">
						</view>
						<view class="y-card-content">
							<view>
								【8G】虎牙直播雅雅主播10套合集下载
							</view>
							<view class="y-card-tool">
								<view class="y-card-tool-item">
									<image src="/static/starfill.png" alt="" class="y-card-tool-item__image" v-if="item.isCollect" @click="collectItem">
									<image src="/static/star.png" alt="" class="y-card-tool-item__image" v-else @click="collectItem">
									<text class="y-card-tool-item__text">1221</text>
								</view>
								<view class="y-card-tool-item">
									<image src="/static/lock.png" alt="" class="y-card-tool-item__image">
									<text class="y-card-tool-item__text">1223</text>
								</view>
							</view>
						</view>

					</view>
				</uni-col>
			</uni-row>
			<uni-load-more status="more"></uni-load-more>
		</scroll-view> -->
		<uni-list class="uni-list--waterfall home-container">

			<uni-list-item direction="column" :border="false" class="uni-list-item--waterfall" v-for="(item,index) in 10" :key="index">
				<!-- 自定义 header -->
				<template v-slot:header>
				<!-- 	<view class="slot-box">
						<image class="slot-image" mode="widthFix" src="https://img2.baidu.com/it/u=1115987748,3793792879&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500"></image>
					</view> -->
					<view class="y-card-image"
						style="background-image: url('https://img2.baidu.com/it/u=1115987748,3793792879&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500');">
					</view>
				</template>
				<!-- 自定义 body -->
				<template v-slot:body>
					<view class="y-card-content">
						<view class="y-card-title">
							【8G】虎牙直播雅雅主播10套合集下载
						</view>
						<view class="y-card-tool">
							<view class="y-card-tool-item">
								<image src="/static/starfill.png" alt="" class="y-card-tool-item__image" v-if="item.isCollect" @click="collectItem">
								<image src="/static/star.png" alt="" class="y-card-tool-item__image" v-else @click="collectItem">
								<text class="y-card-tool-item__text">1221</text>
							</view>
							<view class="y-card-tool-item">
								<image src="/static/lock.png" alt="" class="y-card-tool-item__image">
								<text class="y-card-tool-item__text">1223</text>
							</view>
						</view>
					</view>
					<!-- <text class="slot-box slot-text">自定义插槽</text> -->
				</template>
				<!-- 自定义 footer-->
				<!-- <template v-slot:footer>
					<image class="slot-image" src="/static/logo.png" mode="widthFix"></image>
				</template> -->
			</uni-list-item>
			
		</uni-list>
		<uni-load-more status="more" style="top: 236rpx; position: relative; background-color: #171616;"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						img: 'https://img2.baidu.com/it/u=1115987748,3793792879&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500',
						name: '【8G】虎牙直播雅雅主播10套合集下载',
						collectNumber: 1231,
						lockNumber: 1231,
						id: 1
					},
					{
						img: 'https://img2.baidu.com/it/u=1115987748,3793792879&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500',
						name: '【8G】虎牙直播雅雅主播10套合集下载',
						collectNumber: 1231,
						lockNumber: 1231,
						id: 2
					},
					{
						img: 'https://img2.baidu.com/it/u=1115987748,3793792879&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500',
						name: '【8G】虎牙直播雅雅主播10套合集下载',
						collectNumber: 1231,
						lockNumber: 1231,
						id: 3
					},
					{
						img: 'https://img2.baidu.com/it/u=1115987748,3793792879&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500',
						name: '【8G】虎牙直播雅雅主播10套合集下载',
						collectNumber: 1231,
						lockNumber: 1231,
						id: 4
					}
				],
				current: 0,
				tabs: ['军事', '国内', '新闻新闻', '军事', '国内', '新闻', '军事', '国内', '新闻'],
				checked: true,
				disabled: true,
				tagList: [{
						text: '全部',
						active: false
					},
					{
						text: '最新',
						active: true
					},
					{
						text: '最多收藏',
						active: false
					},
					{
						text: '最多解锁',
						active: false
					}
				],
				show: true
			};
		},
		methods: {
			tapMy() {
				uni.navigateTo({
					url: '/pages/my/my'
				})
			},
			tapTab() {
				uni.navigateTo({
					url: '/pages/recommend/recommend'
				})
			},
			collectItem() {},
			tapTag(index) {
				this.tagList.forEach((item, i) => {
					item.active = false
					if (index === i) {
						item.active = true
					}
				})
			},
			lower: function(e) {
				console.log(e)
			},
			changeTab(index) {
				console.log('当前选中的项：' + index)
			}
		},
		onLoad: function(options) {
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(){
			console.log(123)
		}
	}
</script>

<style lang="scss">
	.y-header {
		height: 256rpx;
		background-image: url('/static/headerBg.png');
		background-size: cover;
		color: #fff;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		overflow: hidden;
		
		width: 100vw;
		position: fixed;
		z-index: 100;
	}

	.y-header-tab {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		margin-top: 114rpx;
		padding-bottom: 38rpx;
	}

	.y-tab-active {
		color: #EF0EC9;
		position: relative;
	}

	.y-tab-active::after {
		content: '';
		display: block;
		z-index: 10;
		width: 24rpx;
		height: 6rpx;
		background: linear-gradient(315deg, #8B3FFF 0%, #EF0EC9 100%);
		border-radius: 4rpx;
		position: absolute;
		top: 50rpx;
		left: 16rpx;
	}

	.person {
		position: absolute;
		top: 114rpx;
		right: 32rpx;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.y-tag-container {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.y-tag {
		background: #1B1B1B;
		border-radius: 32rpx;
		color: rgba(255, 255, 255, 0.4);
		width: 144rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}

	.y-tag-active {
		background: linear-gradient(318deg, #FF00FD 0%, #1D00FF 100%);
		color: #fff;
		position: relative;
	}

	.y-tag-active ::after {}

	.y-card {
		width: 364rpx;

		&-image {
			width: 100%;
			border-radius: 8rpx 8rpx 0 0;
			height: 236rpx;
			background-size: cover;
			
			display: flex;
		}
		&-title{
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(255,255,255,0.79);
		}
		&-content {
			height: 172rpx;
			background: #1F1F1F;
			border-radius: 0rpx 0rpx 8rpx 8rpx;
			padding: 24rpx;
			color: #fff;
		}
	}

	.home-container {
		background-color: #171616;
		// height: calc(100vh - 256rpx);
		padding: 8rpx;
		// overflow: scroll;
	}

	.y-card-tool {
		margin-top: 28rpx;
		display: flex;
		align-items: center;
		
		
		&-item {
			display: flex;
			align-items: center;
			margin-right: 24rpx;

			&__image {
				width: 28rpx;
				height: 28rpx;
			}

			&__text {
				margin-left: 8rpx;
				
				color: rgba(255,255,255,0.45);
				font-size: 20rpx;
			}
		}
	}

	.uni-list--waterfall {

		/* #ifndef H5 || APP-VUE */
		// 小程序 编译后会多一层标签，而其他平台没有，所以需要特殊处理一下
		::v-deep .uni-list {
			/* #endif */
			position: relative;
			top: 240rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			padding: 5px;
			box-sizing: border-box;

			/* #ifdef H5 || APP-VUE */
			// h5 和 app-vue 使用深度选择器，因为默认使用了 scoped ，所以样式会无法穿透
			::v-deep

			/* #endif */
			.uni-list-item--waterfall {
				width: 50%;
				box-sizing: border-box;
				
				
				.uni-list-item__container {
					display: flex;
					padding: 5px;
					flex-direction: column;
					background-color: #171616;
				}

			}

			/* #ifndef H5 || APP-VUE */
		}

		/* #endif */
	}
	.slot-image{
		border-radius: 8rpx 8rpx 0 0;
		height: 236rpx;
	}
	.home{
		min-height: 100vh;
		background-color: #171616;
		
	}
</style>