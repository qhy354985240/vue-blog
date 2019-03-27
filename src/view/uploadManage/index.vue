<template>
  <div>
    <div class="serch-block">
      <user-filter/>
    </div>
    <div class="box-card">
      <comments-list />
    </div>
  </div>
</template>

<script>
  import UserFilter from '@view/userManage/components/user-filter.vue'
  import CommentsList from '@view/commentsManage/components/comments-list.vue'

  export default {
    components: { UserFilter, CommentsList },
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
