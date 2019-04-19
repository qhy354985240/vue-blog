<template>
  <div class="hello">
    <ul>
      <li v-for="(item, index) in users" :key="item._id">
        {{ index + 1 }}.{{ item.userName }}
        <el-button @click="del_user(index, $event)">删除</el-button>
      </li>
    </ul>
    <el-button type="primary" @click="logout()">登出</el-button>
  </div>
</template>

<script>
  import api from '@/api/axios.js'
  export default {
    data () {
      return {
        users: ''
      }
    },
    created () {
      this.getUsers()
    },

    methods: {
      getUsers () {
        api.getUser().then((res) => {
          if (res.success) {
            this.users = res.result
          }
        })
      },
      del_user (index, event) {
        let opt = {
          id: this.users[index]._id
        }
        api.delUser(opt)
          .then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // 移除节点
            this.users.splice(index, 1)
          }).catch((err) => {
            console.log(err)
          })
      },
      logout () {
        // 清除token
        this.$store.dispatch('UserLogout')
        if (!this.$store.state.token) {
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '登出成功'
          })
        } else {
          this.$message({
            type: 'info',
            message: '登出失败'
          })
        }
      }
    }
  }
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
