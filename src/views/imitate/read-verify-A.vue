<template>
  <div class="page-wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
      </div>
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="题目内容" prop="detail">
          <el-card class="box-card">
            <div v-html="formData.detail" />
          </el-card>
        </el-form-item>
        <el-form-item label="题目选项" prop="select">
          <el-card class="box-card" style="display:flex">
            <div v-for="(item,index) in formData.select" :key="index" class="text item" style="display:inline-block;margin:1%;width:23%">
              <el-input v-model="formData.select[index]" placeholder="请输入内容" :readonly="true">
                <template slot="prepend">{{ index }}</template>
              </el-input>
            </div>
          </el-card>
        </el-form-item>
        <el-form-item label="题目答案" prop="value">
          <el-card class="box-card">
            <el-card v-for="(item,index) in formData.info" :key="index" class="box-card mb12">
              <el-input v-model="item.right" :readonly="true" placeholder="题目答案" class="mb12" />
              <el-input v-model="item.analysis" :readonly="true" placeholder="答案解析" class="mb12" />
              <el-input-number v-model="item.value" :readonly="true" :step="5" placeholder="题目分值" />
            </el-card>
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
import { getOne } from '@/api/readA'
import { verifyOne } from '@/api/verify'

export default {
  data() {
    return {
      title: '阅读PartA审核',
      formData: {}
    }
  },
  created() {
    const id = this.$route.query.id
    getOne(id).then((res) => {
      if (res.code === 1) {
        const formData_edit = res.results
        formData_edit.select = JSON.parse(formData_edit.select.replace(/'/g, '"'))
        this.formData = formData_edit
      }
    })
  },
  methods: {
    verify(status) {
      const data = {
        id: this.formData.id,
        is_ok: status,
        come: 'ra'
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
