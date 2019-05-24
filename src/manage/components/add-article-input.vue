
<template>
  <el-form :model='pageFilter' ref="articleRef" label-width="90px">
    <el-row>
      <el-col :span='6'>
        <el-form-item label="文章标题">
          <el-input
            size='small'
            class=""
            clearable
            v-model='pageFilter.articleTitle'
            @change="titleChange"
            @keyup.enter.native="titleChange" />
        </el-form-item>
      </el-col>
      <el-col :span='6' v-if="!add">
        <el-form-item label="文章作者">
          <search-user :nick-name.sync="pageFilter.articleOwner" @result-change="nickChange" />
        </el-form-item>
      </el-col>
      <el-col :span='6'>
        <el-form-item label="阅读权限">
          <select-usertype :article-grade.sync="pageFilter.articleGrade" :type="pageFilter.articleGrade" @result-change="gradeChange" placeholder="请选择阅读权限" ref="userTypeRef" />
        </el-form-item>
      </el-col>
      <el-col :span='6'>
        <el-form-item label="类型">
          <el-cascader
            v-model="pageFilter.articleType"
            :options="options"
            filterable
            clearable
            change-on-select
            @change="typeChange"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6" class="vertical-middle right" v-if="add">
        <el-button
          size="mini"
          @click="changeImg"
          icon="el-icon-upload">上传封面图片</el-button>
        <el-button
          size="mini"
          @click="submitData"
          icon="el-icon-share">{{ btn }}</el-button>
      </el-col>
    </el-row>
    <update-article-img ref="updateRef" @enter="updateImg" title="封面图片" />

  </el-form>
</template>

<script>
  import Tabs from '@/components/tabs.vue'
  import SelectUsertype from '@/components/search/select-usertype.vue'
  import SearchUser from '@/components/search/search-user.vue'
  import UpdateArticleImg from '@/components/update-article-img.vue'

  export default {
    components: { Tabs, SelectUsertype, SearchUser, UpdateArticleImg },
    props: {
      add: {
        type: Boolean,
        default: false
      },
      filter: {
        type: Object,
        default: null
      },
      btn: {
        type: String,
        default: '发布'
      },
      dialogData: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        pageFilter: {
          articleTitle: '',
          articleGrade: '',
          articleType: [],
          articleOwner: '',
          articleUrl: ''
        },
        options: [{
                    value: '技术',
                    label: '技术',
                    children: [{
                      value: '前端',
                      label: '前端',
                      children: [{
                        value: 'vue',
                        label: 'vue'
                      }, {
                        value: 'node',
                        label: 'node'
                      }, {
                        value: 'js',
                        label: 'js'
                      }, {
                        value: 'html',
                        label: 'html'
                      }]
                    }, {
                      value: '后端',
                      label: '后端',
                      children: [{
                        value: 'java',
                        label: 'java'
                      }, {
                        value: 'python',
                        label: 'python'
                      }]
                    }]
                  }, {value: '体育', label: '体育', children: [{value: '篮球', label: '篮球'}, {value: '足球', label: '足球'}]},
                  {value: '生活', label: '生活'},
                  {value: '娱乐', label: '娱乐'},
                  {value: '冷知识', label: '冷知识'}]
      }
    },
    created () {
    },
    mounted () {
      if (this.dialogData !== null) {
        this.pageFilter = this.dialogData
      }
      window.localStorage.setItem('tag', JSON.stringify(this.options))
    },
    watch: {
      'pageFilter.articleGrade' () {
        if (this.pageFilter.articleGrade === '') {
          this.$refs.userTypeRef.userType = ''
        }
      }
    },
    methods: {
      gradeChange () {
        if (this.add) return false
        this.filter['articleGrade'] = this.pageFilter.articleGrade
      },
      nickChange () {
        if (this.add) return false
        this.filter.articleOwner = this.pageFilter.articleOwner
      },
      titleChange () {
        if (this.add) return false
        this.filter['articleTitle'] = this.pageFilter.articleTitle
      },
      typeChange () {
        if (this.add) return false
        this.filter['articleType'] = this.pageFilter.articleType
      },
      submitData () {
        let tip = false
        let obj = JSON.parse(JSON.stringify(this.pageFilter))
        delete obj.articleOwner
        for (let key in obj) {
          if (obj[key] === '' || obj['articleType'] === []) {
            tip = true
          }
        }
        if (tip) {
          this.$message.error('标题、阅读权限、类型都需要填写')
        } else {
          this.$emit('submitData', obj)
        }
      },
      changeImg () {
        this.$refs.updateRef.openDialog()
      },
      updateImg (val) {
        let formData = new FormData()
        formData.append('file', val)
        this.$api.upLoad(formData).then(res => {
          if (res.success) {
            this.pageFilter.articleUrl = res.fullPath
            this.$refs.updateRef.hideDialog()
          }
        })
      }
    }
  }
</script>
<style scoped>
.vertical-middle>>> .el-button {
  margin-top: 6px !important;
}
</style>
