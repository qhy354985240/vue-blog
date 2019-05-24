<template>
  <div class="arch_item">
    <p class="arch_item_title">{{ title | format }}</p>
    <ul>
      <router-link
        v-for="(item,index) in list" :key="index"
        :to="{path: '/article/'+item._id,query:{article:change(item)}}">
        <li>{{ item.createTime.substring(5,10) + "  " }}&nbsp;
          <span>{{ item.articleTitle }}</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['list', 'title'],
    filters: {
      format (val) {
        let arr = val.split('-')
        return `${arr[0]} 年 ${arr[1]} 月`
      }
    },
    methods: {
      change (val) {
        return JSON.stringify(val)
      }
    }
  }
</script>

<style lang="scss">
.arch_item {
  padding: 20px 0;
  display: inline-block;
  vertical-align: top;
  .arch_item_title {
    position: relative;
    color: #242f35;
    padding-left: 16px;
    margin: 30px auto 20px;
    font-weight: 400;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 4px;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      background: #1a1818;
      background: linear-gradient(to bottom,#1a1818 35%,#353030 100%) left center no-repeat;
      background-size: 100%;
    }
  }
  ul {
    padding-left: 20px;
    font-size: 16px;
    list-style: none;
    a {
      span{
        color: #4183c4;
      }
      li {
        padding: 10px 0 0 20px;
        color: #666;
        border-left: 1px solid #ccc;
      }
      &:hover li{
        color: #353030;
        border-left: 3px solid #BE4F8D;
        -webkit-transition: .2s ease-out;
        transition: .2s ease-out;
        -webkit-transform: translateX(8px);
        transform: translateX(8px);
      }
      &:hover span {
        color: #BE4F8D;
        -webkit-transition: .2s ease-out;
        transition: .2s ease-out;
      }
    }

  }
}
</style>
