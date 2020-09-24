<template>
  <div class="page-wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
      </div>
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-tabs type="border-card">
          <el-tab-pane v-for="(item,index) in formData.text" :key="index" :label="'Text' + (index + 1)">
            <el-form-item label="题目名称">
              <el-input v-model="item.name" :readonly="true" placeholder="请输入题目名称" />
            </el-form-item>
            <el-form-item label="题目内容">
              <el-card class="box-card">
                <div v-html="formData.detail" />
              </el-card>
            </el-form-item>
            <el-form-item label="题目选项" style="margin-bottom:0">
              <el-card v-for="(citem,cindex) in item.info" :key="cindex" class="box-card" :class="(cindex + 1) === item.info.length?'':'mb12'">
                <el-form-item label="标题">
                  <el-input v-model="citem.name" class="mb12" :readonly="true" placeholder="请输入题目内容" />
                </el-form-item>
                <el-form-item label="题目选项">
                  <el-card class="box-card mb12">
                    <div v-for="(ccitem,ccindex) in citem.select" :key="ccindex" class="text item" :class="ccindex === 'D'?'':'mb12'">
                      <el-input v-model="formData.text[index].info[cindex].select[ccindex]" placeholder="请输入内容" :readonly="true">
                        <template slot="prepend">{{ ccindex }}</template>
                      </el-input>
                    </div>
                  </el-card>
                </el-form-item>
                <el-form-item label="题目答案">
                  <el-input v-model="citem.right" class="mb12" :readonly="true" placeholder="题目答案" />
                </el-form-item>
                <el-form-item label="题目解析">
                  <el-input v-model="citem.analysis" class="mb12" :readonly="true" placeholder="题目解析" />
                </el-form-item>
                <el-form-item label="题目分值">
                  <el-input v-model="citem.value" :readonly="true" placeholder="题目分值" />
                </el-form-item>
              </el-card>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-row style="margin-top:24px;">
          <el-button icon="el-icon-check" type="success" @click="verify(true)">通过审核</el-button>
          <el-button icon="el-icon-close" type="danger" @click="verify(false)">不通过审核</el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getOne } from '@/api/readB'
import { verifyOne } from '@/api/verify'

export default {
  data() {
    return {
      title: '阅读PartB审核',
      formData: {}
    }
  },
  created() {
    const id = this.$route.query.id || 0
    if (id) {
      getOne(id).then((res) => {
        if (res.code === 1) {
          const formData_edit = res.results[0]
          for (const item of formData_edit.text) {
            for (const citem of item.info) {
              citem.select = JSON.parse(citem.select)
            }
          }
          this.formData = formData_edit
        }
      })
    }
  },
  methods: {
    verify(status) {
      const data = {
        id: this.formData.id,
        is_ok: status,
        come: 'rb'
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
