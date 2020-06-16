<template>
<div class="amap-demo">
    <div class="amap-page-container" style="">
        <el-amap 
            vid="amapDemo" 
            :plugin="plugin"
            :zoom="zoom" 
            :center="center" 
            class="amap-demo">
            <!-- 横向模块提示框 -->
            <!-- <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker> -->
            <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker> 
            <!-- 按钮模块窗口 -->
            <el-amap-info-window :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
        </el-amap>
    </div>
</div>
</template>

<script>
    const exampleComponents = {
      props: ['p'],
      template: `<div>深圳市宝安国际机场</div>`
    }
    module.exports = {
        name: 'amap-page',
        data() {
            return {
                count: 1,
                zooms: 13,
                center: [113.814829,22.633092],
                plugin: [{//插件
                    pName: 'Scale',  //比例尺
                    events: {
                        init(instance) {
                            console.log(instance);
                        }
                    }
                },{
                    pName: 'ToolBar',  //工具条
                    events: {
                        init(instance) {
                            console.log(instance);
                        }
                    }
                } ],
                window: {
                    visible: true,
                    position:  [113.814829,22.633092],
                    content: '深圳市宝安国际机场',
                    events: {
                        close() {
                            this.window.visible = false;
                        }
                    }
                },
                markers: [
                    {
                        position: [113.814829,22.633092],
                        events: {
                            click: () => {
                                this.window.visible = false;
                                this.$nextTick(() => {
                                    // console.log(this.window);
                                    this.window.visible = true;
                                });
                            },
                            dragend: (e) => {
                                console.log('---event---: dragend')
                                // this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                            }
                        },
                        visible: true,
                        draggable: false
                    }
                ],
                componentMarker: { //横向模块
                    position: [113.814829,22.633092],
                    contentRender: (h, instance) => h(exampleComponents,{style: {backgroundColor: '#fff'}, props: {text: 'father is here'}}, ['xxxxxxx'])
                }
            };
        },
        methods: {

        }
    };
</script>

<style lang="scss" scoped>
.amap-demo {
    width: 100%;
    height: 400px;
    font-size: 12px;
}
</style>