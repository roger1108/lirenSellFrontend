<template>
  <div>
    <template v-if="showHeader">
      <v-header :seller="seller"></v-header>
      <div class="tab border-1px">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>
        </div>
         <!-- <div class="tab-item">
          <router-link to="/ratings">评论</router-link>
        </div>  -->
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/order">订单</router-link>
        </div>
      </div>
    </template>
    

    <router-view :seller="seller" :showHeader="showHeader"></router-view>

  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from 'common/js/util';
  import header from 'components/header/header.vue';

  import Fingerprint2 from 'fingerprintjs2';


  const ERR_OK = 0;


  function getCookie(name) {
      var arr;
      var reg = new RegExp('(^| )' +name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
          return unescape(arr[2]);
      else
          return null;
  }

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        },
        showHeader: true
      };
    },
    methods: {

      changeHash() {
        const hash = window.location.hash;

        //roger change start
        // if (hash.indexOf('payment') > -1
        // || hash.indexOf('order') > -1) {
        //   this.showHeader = false;
        // } else {
        //   this.showHeader = true;
        // }


        if (hash.indexOf('payment') > -1) {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
        //roger change end
 
      }
    },
    created() {
      //  var exp = new Date();
      //  exp.setTime(exp.getTime() + 0 * 0);//过期时间0分钟
      //  document.cookie = 'openid=0' + ";expires="+exp.toGMTString();
      /* roger change start */
       if(!getCookie('openid')){
        Fingerprint2.get(function(components) {
          const values = components.map(function(component,index) {
            if (index === 0) { //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
              return component.value.replace(/\bNetType\/\w+\b/, '')
            }
            return component.value
          })
          // 生成最终id murmur   
          const murmur = Fingerprint2.x64hash128(values.join(''), 31)
          var exp = new Date();
          exp.setTime(exp.getTime() + 3600 * 1000*24*365);//过期时间1年
          document.cookie = 'openid=' + murmur + ";expires=" + exp.toGMTString();
          console.log(murmur+"插入成功")
        })



       }
       /* roger change end */

      /*  调用API  roger change start */
        this.$http.get('http://116.62.172.49:5000').then((response) => {
        //this.$http.get('/api/user/info').then((response) => {
            console.log(response.body)
          });

      /*  调用API  roger change end */



      this.changeHash();
      window.addEventListener('hashchange', () => {
        this.changeHash();
      });
      if (this.showHeader) {
        this.$http.get('/sell/api/seller.json').then((response) => {
          response = response.body;
          console.log(response)
          if (response.errno === ERR_OK) {
            this.seller = Object.assign({}, this.seller, response.data);
          }
        });
      }
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
