<template>
  <div>
    <div class="serch-filter">
      <user-filter/>
    </div>
    <div class="box-card">
      <list/>
    </div>
  </div>
</template>

<script>
  import LeftMenu from '@/components/left-menu.vue'
  import UserFilter from '@view/userManage/components/user-filter.vue'
  import List from '@view/userManage/components/list.vue'

  export default {
    components: { LeftMenu, UserFilter, List },
    data () {
      return {

      }
    },
    created () {

    },

    methods: {

    }
  }
</script>
