<template>
    <video-player  class="video-player-box"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        customEventName="customstatechangedeventname"

        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)">
    </video-player>
</template>

<script>
  export default {
    data() {
        return {
            playerOptions: {
                autoplay: false, 
                muted: false, 
                loop: false, 
                preload: 'auto', 
                language: 'zh-CN',
                aspectRatio: '16:9', 
                fluid: true, 
                sources: [
                    {
                        type: 'video/mp4', 
                        src: require('@/assets/img/video.mp4')
                    }
                ],
                hls: true,
                poster: require('@/assets/img/hk/logo-white.png'), 
                width: document.documentElement.clientWidth, 
                notSupportedMessage: '此视频暂无法播放，请稍后再试',
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true 
                }
            }
        }
    },
    mounted() {
        //console.log('this is current player instance object', this.player)
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player
        }
    },
    methods: {
        onPlayerPlay(player) {
            // console.log('player play!', player)
        },
        onPlayerPause(player) {
            // console.log('player pause!', player)
        },
        playerStateChanged(playerCurrentState) {
            // console.log('player current update state', playerCurrentState)
        },
        playerReadied(player) {
            console.log('the player is readied', player)
            // you can use it to do something...
            // player.[methods]
        }
    }
  }
</script>

<style lang="scss" scoped>
/deep/.video-js.vjs-fluid {
    position: relative;
    .vjs-big-play-button {
        width: 2.2em;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>