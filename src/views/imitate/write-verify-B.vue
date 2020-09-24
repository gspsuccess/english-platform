<template>
  <div class="page-wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="routerList">返回列表页</el-button>
      </div>
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="素材上传" prop="image">
          <img :src="formData.image">
        </el-form-item>
        <el-form-item label="题目内容" prop="detail">
          <el-card class="box-card">
            <div v-html="formData.detail" />
          </el-card>
        </el-form-item>
        <el-form-item label="样文内容" prop="templatearticle">
          <el-input v-model="formData.templatearticle" :readonly="true" type="textarea" placeholder="请输入样文内容" rows="4" />
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
import { getOne } from '@/api/writeB'
import { verifyOne } from '@/api/verify'

export default {
  data() {
    return {
      title: '写作PartB审核',
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
        come: 'wb'
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
