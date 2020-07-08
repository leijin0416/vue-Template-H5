<template>
<div class="swiper-container" :class="swipeid">
	<div class="swiper-wrapper">
		<!-- 存放内容,<slot> 元素可以用一个特殊的属性 name 来配置如何分发内容 -->
		<slot name="swiper-no"></slot>
	</div>
	<!-- 分页器 -->
	<div :class="{'swiper-pagination':pagination}"></div>
	
    <!-- Add Arrows -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
</div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
	props: {
		swipeid: {
			type: String,
			default: ""
		},
		effect: {
			type: String,
			default: "slide"
		},
		loop: {
			type: Boolean,
			default: false
		},
		direction: {
			type: String,
			default: "horizontal"
		},
		pagination: {
			type: Boolean,
			default: true
		},
		paginationType: {
			type: String,
			default: "bullets"
		},
		autoPlay: {
			type: Number,
		},
		slidesPerView: {
			type: Number,
		},
		slidesPerGroup: {
			type: Number,
		},
		breakpoints: {
			type: Number,
		},
	},
	data() {
		return {
			dom: ""
		};
	},
	mounted() {
		//配置
		var that = this;
		this.dom = new Swiper("." + that.swipeid, {
			//循环
			loop: that.loop,
			//显示的个数
			slidesPerGroup: that.slidesPerGroup,
			slidesPerView: that.slidesPerView,
			//板块间距
			spaceBetween: 30, 
			//自动播放
			autoplay: {
				disableOnInteraction: false,
				delay: that.autoPlay,
			},
			//方向
			direction: that.direction,
			//特效
			effect: that.effect,
			//用户操作swiper之后，不禁止autoplay
			disableOnInteraction: false,
			//修改swiper自己或子元素时，自动初始化swiper
			observer: true,
			//修改swiper的父元素时，自动初始化swiper
			observeParents: true,
			//分页器
			pagination: {
				el: ".swiper-pagination",
				bulletClass: 'swiper-pagination-bullet',
				clickable :true,
			},
			//分页类型(圆点)
			paginationType: that.paginationType,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				//当宽度小于等于1024
				1024: { 
				  slidesPerView: 1,
				  slidesPerGroup: 1,
				  spaceBetween: 0
				},
			},
		});
	}

}
</script>

<style lang="scss">
.swiper-wrapper {
	padding-bottom: 50px;
}
.swiper-container-horizontal {
	.swiper-pagination-bullets {
		bottom: 1rem;
		width: 95%;
		.swiper-pagination-bullet {
			position: relative;
			width: 14px;
			height: 14px;
			opacity: 1;
			overflow: hidden;
			border: 2px solid $color-body-c;
			box-shadow: 0 0.333rem 0.5rem #d1d1d1;
			background-color: #fff;
		}
		//分页器改造
		.swiper-pagination-bullet-active {
			border: 0;
			&:before {
				content: ' ';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 1;
				display: block;
				border-radius: 50px;
				background-color: $color-body-c;
				animation: borderSize .5s ease-in-out;
			}
			&:after {
				content: ' ';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 1;
				display: block;
				border: 2px solid $color-body-c;
				border-radius: 50px;
			}
		}
		@-webkit-keyframes borderSize {
			0% { transform: scale(0);}
			100% { transform: scale(1); }
		}
		@-o-keyframes borderSize {
			0% { transform: scale(0);}
			100% { transform: scale(1); }
		}
		@-moz-keyframes borderSize {
			0% { transform: scale(0);}
			100% { transform: scale(1); }
		}
		@keyframes borderSize {
			0% { transform: scale(0);}
			100% { transform: scale(1); }
		}

	}
}
// 左右分页
.swiper-button-next, .swiper-button-prev {
	width: 44px;
	border-radius: 50px;
	box-shadow: 0 0.5rem 1.5rem rgba(187, 187, 187, .5);
	background-size: 27px 24px;
	background-color: #fff;
}
</style>
