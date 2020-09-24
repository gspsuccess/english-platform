<template>
  <div class="page-wrapper">
    <el-card class="box-card" style="padding-bottom:0;">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="routerList">返回列表页</el-button>
      </div>
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="题目内容">
          <el-input v-model="formData.declare" :readonly="true" type="textarea" placeholder="请输入题目内容" rows="4" />
        </el-form-item>
        <el-form-item label="题目文章">
          <el-tabs type="border-card">
            <el-tab-pane label="文章1">
              <div v-html="formData.one" />
            </el-tab-pane>
            <el-tab-pane label="文章2">
              <div v-html="formData.two" />
            </el-tab-pane>
            <el-tab-pane label="文章3">
              <div v-html="formData.three" />
            </el-tab-pane>
            <el-tab-pane label="文章4">
              <div v-html="formData.four" />
            </el-tab-pane>
            <el-tab-pane label="文章5">
              <div v-html="formData.five" />
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <el-form-item label="题目选项">
          <el-card class="box-card" style="display:flex">
            <div v-for="(item,index) in formData.select" :key="index" class="text item" style="display:inline-block;margin:1%;width:23%">
              <el-input v-model="formData.select[index]" placeholder="请输入内容" :readonly="true">
                <template slot="prepend">{{ index }}</template>
              </el-input>
            </div>
          </el-card>
        </el-form-item>
        <el-form-item label="题目答案" style="margin-bottom:0">
          <el-card class="box-card mb12">
            <div v-for="(item,index) in formData.info" :key="index" class="text item">
              <el-card class="box-card" :class="(index + 1) === formData.info.length?'':'mb12'">
                <el-form-item label="题目答案">
                  <el-input v-model="item.right" class="mb12" :readonly="true" placeholder="题目答案" />
                </el-form-item>
                <el-form-item label="题目解析">
                  <el-input v-model="item.analysis" class="mb12" :readonly="true" placeholder="题目解析" />
                </el-form-item>
                <el-form-item label="题目分值">
                  <el-input v-model="item.value" :readonly="true" placeholder="题目分值" />
                </el-form-item>
              </el-card>
            </div>
          </el-card>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-check" type="success" @click="verify(true)">通过审核</el-button>
          <el-button icon="el-icon-close" type="danger" @click="verify(false)">不通过审核</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getOne } from '@/api/readC'
import { verifyOne } from '@/api/verify'

export default {
  data() {
    return {
      title: '阅读PartC审核',
      formData: {}
    }
  },
  created() {
    const id = this.$route.query.id
    getOne(id).then((res) => {
      if (res.code === 1) {
        const formData_edit = res.results
        formData_edit.select = JSON.parse(formData_edit.select)
        this.formData = formData_edit
      }
    })
  },
  methods: {
    verify(status) {
      const data = {
        id: this.formData.id,
        is_ok: status,
        come: 'rc'
      }
      verifyOne(data).then((res) => {
        if (res.code === 1) {
          this.$message.success(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="stylus">

</style>
