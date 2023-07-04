<template>
	<view>
		<view class="y-header">
			<view class="y-header-back" @click="tapBack">
				<image src="/static/back.png" class="y-header-back__img"></image>
			</view>
			<view class="y-header-info">
				<image
					src="https://img2.baidu.com/it/u=1115987748,3793792879&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500"
					mode="" class="y-header-info__avator"></image>
				<view class="y-header-info__detail">
					<view class="y-header-info__detail__phone">15267863184</view>
					<view>会员到期时间：<text class="value-text">永久</text></view>
					<view class="y-header-info__detail__describe">
						<view>今日可解锁: <text class="value-text">10</text></view>
						<view>已用: <text class="value-text">10</text></view>
						<view>剩余: <text class="value-text">10</text></view>
					</view>
				</view>
			</view>
		</view>
		<view class="my-container">
			<view class="my-container__tab">
				<v-tabs v-model="current" :scroll="false" :tabs="tabs" @change="changeTab" activeColor="#EF0EC9"
					lineColor="linear-gradient(315deg, #8B3FFF 0%, #EF0EC9 100%)" :lineScale="0.2" lineHeight='6rpx'
					bgColor="#171616" color="rgba(255,255,255,0.8)" :lineAnimation="false"></v-tabs>
			</view>
			<swiper class="my-container__swiper" :current="swiperCurrent" @animationfinish="animationFinished">
				<swiper-item class="swiper-item">
					<view class="y-section">选择会员套餐</view>
					<view class="pay-card-container">
						<view class="pay-card">
							<view class="pay-card__header">
								永久VIP
							</view>
							<view class="pay-card__body">
								<view>
									<text class="big-price">¥188</text>
									<text class="small-price">¥268</text>
								</view>
								<view class="save-text">
									节省29.9%
								</view>
								<view class="count-text">
									20次解锁/天
								</view>
								<view class="describe-text">
									最优惠
								</view>
							</view>
						</view>
						<view class="pay-card">
							<view class="pay-card__header">
								永久VIP
							</view>
							<view class="pay-card__body">
								<view>
									<text class="big-price">¥188</text>
									<text class="small-price">¥268</text>
								</view>
								<view class="save-text">
									节省29.9%
								</view>
								<view class="count-text">
									20次解锁/天
								</view>
								<view class="describe-text">
									最优惠
								</view>
							</view>
						</view>
						<view class="pay-card">
							<view class="pay-card__header">
								永久VIP
							</view>
							<view class="pay-card__body">
								<view>
									<text class="big-price">¥188</text>
									<text class="small-price">¥268</text>
								</view>
								<view class="save-text">
									节省29.9%
								</view>
								<view class="count-text">
									20次解锁/天
								</view>
								<view class="describe-text">
									最优惠
								</view>
							</view>
						</view>
						
					</view>
					<view class="y-section">注意事项</view>
					<view class="detail-text">
						<view>1.购买会员套餐之后，可解锁任意资源</view>
						<view>2.购买月卡VIP后，再购买年卡VIP或永久VIP，会员时间可以累积，每日解锁次数按照高等级会员次数计算</view>
						<view>3.不支持补差价购买更高等级会员套餐</view>
						<view>4.会员套餐一经购买，不支持退款</view>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item">2</swiper-item>
				<swiper-item class="swiper-item">3</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperCurrent:0,
				current: 0,
				tabs: ['会员充值', '我的收藏', '我的资源']
			};
		},
		methods: {
			tapBack(){
				uni.navigateBack()
			},
			animationFinished(e) {
				this.current = e.detail.current
				this.swiperCurrent = e.detail.current

				// 填充数据
				// this.fillData()
			},
			changeTab(index) {
				this.swiperCurrent = index

				console.log('当前选中的项：' + index)
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
		}
	}
</script>

<style lang="scss">
	.y-header {
		height: 360rpx;
		background-image: url('/static/headerBg3.png');
		background-size: cover;
		color: #fff;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		overflow: hidden;
		padding: 0 30rpx 0 30rpx;

		&-back {
			&__img {
				width: 48rpx;
				height: 48rpx;
				margin-top: 120rpx;
			}
		}

		&-info {
			display: flex;
			align-items: center;

			&__avator {
				width: 132rpx;
				height: 132rpx;
				border: 4rpx solid #EF0EC9;
				;
				border-radius: 50%;

			}

			&__detail {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.6);
				margin-left: 40rpx;

				&__phone {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 0.79);
				}

				&__describe {
					display: flex;
					align-items: center;
					// justify-content: space-around;
				}
			}
		}

		.value-text {
			margin: 0 20rpx;
			color: #EF0EC9;
		}
	}

	.my-container {
		background-color: #171616;
		height: calc(100vh - 360rpx);
		padding: 0 32rpx;

		&__tab {
			padding: 0 40rpx;
		}
		&__swiper{
			height: calc(100vh - 500rpx);
		}
	}

	.swiper-item{
		color: #fff;
	}
	.y-section{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255,255,255,0.6);
		position: relative;
		text-indent: 20rpx;
		margin:32rpx 0;
	}
	.y-section::before{
		content: '';
		display: block;
		width: 6rpx;
		height: 24rpx;
		background: linear-gradient(315deg, #8B3FFF 0%, #EF0EC9 100%);
		border-radius: 4rpx;
		position: absolute;
		top:10rpx
	}
	.pay-card-container{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.pay-card{
		width: 220rpx;
		height: 340rpx;
		background: #1F1F1F;
		border-radius: 8rpx;
		border: 2rpx solid linear-gradient(135deg, rgba(226, 20, 208, 1), rgba(148, 59, 251, 1)) 2 2;
		&__header{
			height: 64rpx;
			line-height: 64rpx;
			text-align: center;
			background: #2E2E2E;
			border-radius: 8rpx 8rpx 0 0 ;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255,255,255,0.8);
		}
		&__body{
			height: 240rpx;
			padding-top: 25rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
		}
	}
	.big-price{
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(255,255,255,0.8);

	}
	.small-price{
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255,255,255,0.8);
		text-decoration: line-through;
		margin-left: 4rpx;
	}
	.save-text{
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255,255,255,0.4);
	}
	.count-text{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #EF0EC9;
	}
	.describe-text{
		width: 184rpx;
		height: 36rpx;
		background: rgba(255,147,0,0.24);
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #EF790E;
		line-height: 36rpx;
		text-align: center;
	}
	.detail-text{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255,255,255,0.6);
	}
</style>