<template>
  <div style="width: 100%;margin: 0 auto;height: 100%">
    <div class="w1200">
      <h1 class="logo">
        <img style="height: 60px" src="../../static/img/logo.png" alt="">
      </h1>
      <h1 style="line-height: 50px;font-size: 45px;display: inline-block">
        <img style="height: 50px" src="../../static/img/mfsd.png" alt=""></h1>
      <div style="display: inline-block;line-height: 60px;vertical-align: middle;position: absolute;right: 220px">
        <Icon type="android-time" size="10"></Icon>
        剩余观看时间:{{displayTime}}
      </div>
      <div style="display: inline-block;line-height: 60px;vertical-align: middle;position: absolute;right: 40px">
        <Avatar style="background-color: #87d068;vertical-align: middle" icon="person"/>
        {{userName}}
        <i-button style="margin-left: 20px" type="" @click="logout">
          <Icon type="log-out"></Icon>
          退出
        </i-button>
      </div>
    </div>
    <div class="topCont">
    </div>
    <div class="layout" :class="{'layout-hide-text':spanLeft < 4}">
      <Row style="height: 100%">

        <Col :span="spanLeft" class="layout-menu-left">
        <Menu accordion
              theme="dark"
              width="auto"
              @on-select="goMenu"
              :active-name="'/main/word'"
              open-names="['1']">
          <Submenu :key="item.name" :name="item.name" v-for="(item , index) in leftMenu">
            <template slot="title">
              <Icon :type="item.type"></Icon>
              {{item.label}}
            </template>
            <Menu-item
              :key="one.name"
              :name="one.url"
              v-for="(one , ind) in item.children">
              <Icon type="play"></Icon>
              {{one.label}}
            </Menu-item>
          </Submenu>
        </Menu>
        </Col>

        <Col :span="spanRight" style="height:100%">
        <div style="height: 90%;margin: -15px 0 0 0;text-align: center">
          <div class="layout-content">
            <div class="layout-content-main">

              <video-component
                ref="video"
                v-for="(item,index) in videoList"
                :displayMask="displayMask"
                :url="item.url"
                :class="videoStyle"
              ></video-component>
              <div style="width: 100%;position: absolute;bottom: 10px;margin: 0 auto">
                <Page
                  @on-change="handlePage"
                  layout="prev, pager, next"
                  :page-size="limit"
                  :total="totalPage">
                  size="small"
                  show-total>
                </Page>
              </div>
            </div>
          </div>
          <span class="layout-copy">
               Copyright © 2017百占百胜网
             </span>
        </div>
        </Col>
      </Row>
    </div>
  </div>

</template>
<script>
  import Cookies from 'js-cookie';
  import VideoComponent from './VideoComponent.vue'
  import mockData from '../libs/mockData'
  export default {
    data(){
      return {
        videoStyle: 'widthVideo',
        expand: true,
        leftMenu: mockData.menuData,
        limitTime: 5000,
        displayTime: 0,
        userInfo: {},
        displayTimer: {},
        timer: {},
        displayMask: false,
        urlData: 'http://localhost:2017/video/t2.mp4',
        spanLeft: 4,
        spanRight: 20,
        userName: '',
        val: [],
        limit: 6,
        totalPage: 30,
        title_page: 1,
        videoList: [
          {name: '123', url: 'http://localhost:2017/video/t2.mp4'},
        ]
      }
    },
    computed: {
      iconSize () {
        return this.spanLeft === 5 ? 14 : 24;
      }
    },
    created(){
      this.userName = Cookies.get('user');
      this.$http.get(`/user/info?userName=${this.userName}`).then((res) => {
        if (res.data === '未登入') {
          this.$Message.error('未登入，请登入');
          this.$router.push('/login');
          return;
        }
        this.userInfo = res.data[0];
        this.limitTime = res.data[0].limitTime * 3600;
        this.displayTime = this.secondToDate(res.data[0].limitTime) * 3600;
        this.val = ['英语', '单词'];
        this.selectTypeData(this.val);
      })
    },
    mounted(){
      this.displayTimer = setInterval(() => {
        this.limitTime = this.limitTime - 1
      }, 1000);
      this.timer = setInterval(() => {
        this.displayTime = this.limitTime <= 0 ? this.secondToDate(0) : this.displayTime;
        this.userInfo.limitTime = (this.limitTime / 3600).toFixed(4);
        this.$http.put(`/user/updateUser`, this.userInfo).then((res) => {
        })
      }, 5000)
    },
    watch: {
      'displayTime': function (newValue, old) {
        if (newValue === 0) {
          this.removeTimer();
          this.displayMask = true;
          this.$refs.video.pause();
          this.$Message.error('您的时间已用完');
        }
      },
      'limitTime': function (newValue, old) {
        this.displayTime = this.secondToDate(newValue)
      },
      '$route': function (newValue, old) {
        const id = newValue.params.id;
        this.val = mockData.translateSeaCon[id];
        this.selectTypeData(this.val);
      }
    },
    methods: {
      //退出
      logout() {
        this.$http.get('/user/logout').then((res) => {
          if (res.data.result) {
            this.removeTimer();
            this.$router.push('/login');
          }
        })
      },

      removeTimer() {
        clearInterval(this.timer);
        clearInterval(this.displayTimer);
      },

      selectTypeData(val){
        let searchCon = {page: this.title_page, limit: this.limit, type: val};
        this.$http.post('/video/typeVideosInfo', searchCon).then(res => {
          this.videoList = res.data.data;
          this.totalPage = res.data.count;
        })
      },

      goMenu(url) {
        this.$router.push(url);
      },

      handlePage(val){
        this.title_page = val;
        this.selectTypeData(this.val);
      },

      test(){
        console.log(123)
      },

      secondToDate(result) {
        var h = Math.floor(result / 3600);
        var m = Math.floor((result / 60 % 60));
        var s = Math.floor((result % 60));
        return this.addZero(h) + ":" + this.addZero(m) + ":" + this.addZero(s);
      },
      addZero(val) {
        if (val < 10)return '0' + val;
        else return val
      },
    },
    components: {VideoComponent}
  }
</script>
<style scoped>
  @import "main.css";
</style>
