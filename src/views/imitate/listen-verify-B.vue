<template>
  <div class="page-wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">返回列表页</el-button>
      </div>
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="素材上传" prop="voicefile">
          <audio :src="'https://chinanets.cn/' + formData.voicefile" controls="controls" />
        </el-form-item>
        <el-form-item label="文件名称" prop="name">
          <el-input v-model="formData.name" :readonly="true" placeholder="请输入文件名称" />
        </el-form-item>
        <el-form-item label="题目内容" prop="detail">
          <el-input v-model="formData.detail" :readonly="true" type="textarea" placeholder="请输入题目内容" rows="4" />
        </el-form-item>
        <el-form-item label="题目答案" prop="templetanswer">
          <el-input v-model="formData.templetanswer" :readonly="true" placeholder="请输入题目答案" />
        </el-form-item>
        <el-form-item label="题目分值" prop="value">
          <el-input-number v-model="formData.value" :readonly="true" :step="5" />
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
import { getOne } from '@/api/listenB'
import { verifyOne } from '@/api/verify'

export default {
  data() {
    return {
      title: '听力PartB审核',
      formData: {}
    }
  },
  created() {
    const id = this.$route.query.id
    getOne(id).then((res) => {
      if (res.code === 1) {
        const formData_edit = res.results
        this.formData = formData_edit
      }
    })
  },
  methods: {
    verify(status) {
      const data = {
        id: this.formData.id,
        is_ok: status,
        come: 'lb'
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
