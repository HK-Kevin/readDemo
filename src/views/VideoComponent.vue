<template>
  <div class="video_container">
    <video ref="myVideo" height="100%" width="100%" preload="auto" controls="controls" :src="url"></video>
    <div v-if="displayMask" class="video_mask" @click="clickMask(false)"></div>
  </div>
</template>
<script>
  export default {
    props: ['displayMask','url'],
    watch:{
        'displayMask':function (newValue,oldValue) {
          if(newValue) {
              this.pause();
          }
        }
    },
    methods:{
      pause() {
        this.$refs.myVideo.pause();
      },

      clickMask(nodesc) {
        this.$Notice.config({
          top: 100,
          duration: 3
        });
        this.$Notice.warning({
          title: '试读时间结束',
          desc: nodesc ? '' : '如需开通，请联系老师：微信：xiabin'
        });
      }
    }
  }

</script>
<style scoped>
  .video_container {

    position: relative;
    float: left;
    margin-left: 20px;
    margin-bottom: 20px;
  }
  video::-webkit-media-controls-enclosure {
    overflow:hidden;
  }
  video::-webkit-media-controls-panel {
    width: calc(100% + 30px);
  }
  .video_mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .6;
  }
</style>
