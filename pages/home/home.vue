<template>
	<view>
		<view class="y-header">
			<view class="y-header-tab">
				<view :class="{'y-tab-active':true}">首页</view>
				<view style="margin-left: 142rpx;" @click="tapTab">推荐</view>
			</view>
			<uni-icons type="person" size="48rpx" color="#fff" class="person"></uni-icons>
			<view class="y-tag-container">
				<view v-for="(tag,index) in tagList" :key="tag.text" class="y-tag" :class="{'y-tag-active':tag.active}" @click="tapTag(index)">
					{{tag.text}}
				</view>
			</view>
		</view>
		<!-- 		<v-tabs v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>
 -->
		<scroll-view class="home-container" :scroll-y="true" @scrolltolower="lower">
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
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						img:'https://img2.baidu.com/it/u=1115987748,3793792879&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500',
						name:'【8G】虎牙直播雅雅主播10套合集下载',
						collectNumber:1231,
						lockNumber:1231,
						id:1
					},
					{
						img:'https://img2.baidu.com/it/u=1115987748,3793792879&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500',
						name:'【8G】虎牙直播雅雅主播10套合集下载',
						collectNumber:1231,
						lockNumber:1231,
						id:2
					},
					{
						img:'https://img2.baidu.com/it/u=1115987748,3793792879&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500',
						name:'【8G】虎牙直播雅雅主播10套合集下载',
						collectNumber:1231,
						lockNumber:1231,
						id:3
					},
					{
						img:'https://img2.baidu.com/it/u=1115987748,3793792879&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500',
						name:'【8G】虎牙直播雅雅主播10套合集下载',
						collectNumber:1231,
						lockNumber:1231,
						id:4
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
			tapTab(){
				console.log(1231)
				uni.redirectTo({
					url:'/'
				})
			},
			collectItem(){},
			tapTag(index){
				this.tagList.forEach((item,i)=>{
					item.active = false
					if(index===i){
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
		height: calc(100vh - 256rpx);
		padding: 8rpx;
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
			}
		}
	}
</style>