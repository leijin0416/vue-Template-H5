<template>
	<div class="page v-router">
		<div class="container">
			<h3 class="v-h3-new">最新消息</h3>
			<div class="v-news-box">
				<div class="v-news-list" v-for="item in newsData" :key="item.id">
					<div class="v-main">
						<p class="v-time">{{item.date}}</p>
						<p class="v-text">真实性：{{item.result}}</p>
						<div class="v-item">
							<h3 class="v-h3">{{item.title}}</h3>
							<h4 class="v-h4">{{item.abstract}}</h4>
							<p class="v-text">来源：<span>{{item.author}}</span></p>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ajWebGetSendChinaNews } from '@/mock/api/mock'

export default {
	name: "",
	//组件
	components: {
	},
	//接收父组件传参
	props: {
	},
	data() {
		return {
			newsData: [],
			data: {
				page: 1,
			},
			bg: require('@/assets/img/hk/logo.png'),
		}
	},
	//页面初始化
	mounted(){
		this.fetchNewsData()
	},
	//监听click方法
	methods: {
		/**
		 * 	对于上拉加载更多
		 *  需要手动进行分页
		 */
        fetchNewsData () {
			let _that = this;
			let {page, num} = _that.data;

            ajWebGetSendChinaNews({
				'page': page
            }).then( res => {
                // let data = JSON.parse(res.data.data);
				let data = res.data.data;
				_that.newsData = data;
                // console.log(res)
            })
        },
	}
}
</script>

<style lang="scss" scoped>
.page {
	padding: 0 30px 80px;
	.v-h3-new {
		padding: 30px 0;
		font-size: 36px;
		font-weight: bold;
		color: #706dea;
	}
	.v-news-box {
		.v-news-list {
			position: relative;
			margin-bottom: 30px;
			&::before {
				content: ' ';
				z-index: 9;
				position: absolute;
				left: -8px;
				top: 0;
				display: block;
				width: 20px;
				height: 20px;
				box-sizing: border-box;
				border: 4px solid #706dea;
				border-radius: 100px;
				background-color: #fff;
			}
			&::after {
				content: ' ';
				z-index: 1;
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				display: block;
				width: 2px;
				background-color: #ddd;
			}
			.v-main {
				padding-left: 20px;
				.v-time, > .v-text {
					display: inline-block;
					width: 50%;
					padding: 0 0 20px;
					box-sizing: border-box;
					font-size: 24px;
				}
				> .v-text {
					text-align: right;
				}
			}
			.v-time {
				font-size: 28px;
				color: #666;
			}
			.v-item {
				font-size: 0;
				border: 1px solid #ddd;
				.v-h3 {
					padding: 30px;
					font-size: 32px;
					font-weight: bold;
					border-bottom: 1px solid #ddd;
				}
				.v-h4 {
					min-height: 200px;
					padding: 30px;
					font-size: 28px;
					color: #666;
				}
				.v-text {
					padding: 30px;
					font-size: 24px;
					color: #999;
					span {
						color: #706dea;
					}
				}
			}
		}
	}
}
@media only screen and (max-width: 375px) {
}
</style>
