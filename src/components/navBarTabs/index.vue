<template>
    <div class="v-nav">
        <van-tabbar v-model="active" @change="setChangeActive" fixed>
            <van-tabbar-item 
                v-for="(item, index) of data"  
                :key="item.name"
                :to="item.path" 
                :name="item.name">
                <span>{{item.label}} {{active}}</span>
                <template #icon="props">
                    <img :src="props.active ? item.active : item.inactive" />
                </template>
                </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { sessionData } from '@/filters/storage';

export default {
    data() {
        return {
            active: '',
            icon: {
                active: 'https://img.yzcdn.cn/vant/user-active.png',
                inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
            }
        };
    },
    computed: {
		//取
        ...mapGetters("localUser", ["getNavId"]),
    },
    watch: {
        'active': {
            handler: function(newer, older) {
                if (newer == null) {
                    return
                } else {
                    // console.log(newer);
                }
            },
    　　　　deep: true
        }
    },
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    created() {
        this.getChangeActive();
    },
    mounted() {
    },
    methods: {
        /** 
         *  获取
        */
        getChangeActive() {
            let num = this.getNavId;
            let sessionId = sessionData('get', 'setTabBarActive');
            // console.log(sessionId);

            if (num == '' && sessionId == null) {
                // 第一次进来的时候
                this.active = 1;

            } else if (num == '' && sessionId != null) {
                // 刷新页面的时候
                let url = this.$route.path;
                let displayNavBar = this.$route.meta.displayNavBar;
                if (displayNavBar) {
                    if (sessionId == 1) this.$router.push('/');
                    if (sessionId == 2) this.$router.push('/transmit');
                    if (sessionId == 3) this.$router.push('/shop');
                    if (sessionId == 4) this.$router.push('/home');
                }
                Vue.set(this, 'active', Number(sessionId));
                
            } else {
                // 默认
                this.active = num;
            }
            // console.log(this.$route.path);
        },
        /**
         *  设置
         */
        setChangeActive (active) {
            this.$emit('changeActive', active)
            // console.log(active);
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/.van-tabbar-item--active {
    color: $color-body-c;
}
/deep/.van-tabbar-item__icon img {
    width: auto;
    height: 36px;
}
</style>