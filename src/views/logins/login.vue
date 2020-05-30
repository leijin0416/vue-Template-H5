<template>
	<div class="page">
        <div class="v-login-box">
            <div class="ag_name">
                <van-form @submit="onSubmitClick">
                    <van-field 
                        name="phone"
                        label="用户名"
                        placeholder="请输入用户名"
                        type="text"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                        v-model="phone" />
                    <van-field
                        name="password"
                        label="密码"
                        placeholder="请输入密码"
                        :type="downIcon ? 'password': 'text'"
                        @click-right-icon="eyeClick"
                        :right-icon="downIcon ? 'closed-eye': 'eye'"
                        v-model="password"
                        :rules="[{ required: true, message: '请填写密码' }]"
                        error-message />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">
                        登录
                        </van-button>
                    </div>
                </van-form>
            </div>
        </div>
	</div>
</template>

<script>

export default {
	data() {
		return {
            formData: Object,
            phone: '',
            password: '',
            downIcon: true,
            icon: {
                active: 'https://img.yzcdn.cn/vant/user-active.png',
                inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
            },
			orIPhone: true
		}
	},
	//组件
	components: {
	},
	//接收父组件传参
	props: {
	},
	//页面初始化
	created(){
	},
	watch: {
		"orIPhone": {
			handler: function(newer, older) {
				if (newer == null) {
					return
				} else {
					let _that = this;
					_that.orIPhone = newer;
					//this.getList(); // methods中定义好的获取数据列表的方法
					//alert(newer)
				}
			},
	　　　　deep: true
		}
	},
	//监听click方法
	methods: {
        eyeClick() {
            let _this = this;
            _this.downIcon = !_this.downIcon;
        },
        onSubmitClick(values) {
            let _this = this;
            _this.formData = values;
            console.log('submit', _this.formData);
        }
	},
	destroyed () {

    }
}
</script>

<style lang="scss" scoped>
.page {
    overflow: hidden;
}

//小于1024
@media only screen and (max-width: 1024px) {
}
</style>
