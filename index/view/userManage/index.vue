<template>
  <div>
    <div class="serch-block">
      <user-filter :filter="filter"/>
    </div>
    <div class="box-card">
      <list ref="userListRef" :filter="filter"/>
    </div>
  </div>
</template>

<script>
  import UserFilter from '@view/userManage/components/user-filter.vue'
  import List from '@view/userManage/components/list.vue'

  export default {
    components: { UserFilter, List },
    data () {
      return {
        breadList: [{
          path: '/usermanage', name: '用户管理'
        }],
        filter: {
          email: '',
          account: '',
          nickName: '',
          userType: '',
          userName: ''
        }
      }
    },
    created () {
      this.$store.commit('breadList', this.breadList)
    },

    methods: {
    }
  }
</script>
