<template>
  <el-dialog :visible="visible" :width="width" :close-on-click-modal="false" v-loading="loading" @close="cancel">
    <div slot="title">
      <div style="padding: 0 30px 16px">
        <span class="dd-font title">{{ title }}</span>
        <span class="dd-font subTitle">{{ subTitle }}</span>
      </div>
      <div class="line" />
    </div>
    <slot/>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirmFun">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    name: 'Dialog',
    props: {
      loading: {
        type: Boolean,
        default () {
          return false
        }
      },
      visible: {
        type: Boolean,
        default () {
          return true
        }
      },
      title: {
        type: String,
        default () {
          return 'Title'
        }
      },
      subTitle: {
        type: String,
        default () {
          return ''
        }
      },
      confirm: {
        type: Function,
        default () {
          return null
        }
      },
      cancel: {
        type: Function,
        default () {
          return null
        }
      },
      save: {
        type: Function,
        default () {
          return null
        }
      },
      width: {
        type: [Number, String],
        default () {
          return '50%'
        }
      }
    },

    data () {
      return {
        timer: null,
        disabled: false
      }
    },
    created () {
      console.log(this.visible)
    },
    methods: {
      funConfig (fun) {
        fun()
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.disabled = false
        }, 1500)
      },

      confirmFun () {
        this.disabled = true
        this.funConfig(this.confirm)
      },

      saveFun () {
        this.disabled = true
        this.funConfig(this.save)
      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 14px;
    font-weight: bold;
    color: #212328;
  }

  .subTitle {
    font-size: 14px;
    color: #212328;
    padding-left: 30px;
  }

</style>
