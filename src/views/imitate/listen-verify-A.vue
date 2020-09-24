<template>
  <div class="app-container">
    <el-form ref="form" label-width="80px">
      <el-card v-for="(item,index) in formData.voice" :key="index" class="box-card">
        <div slot="header" class="clearfix">
          <span>版块{{ index + 1 }}</span>
        </div>
        <el-form-item label="听力素材">
          <audio :src="'https://chinanets.cn/' + item.voicefile" controls="controls" />
        </el-form-item>
        <el-form-item label="文件名称">
          <el-input v-model="item.name" :readonly="true" placeholder="请输入文件名称" />
        </el-form-item>
        <el-form-item label="题目列表" style="margin-bottom:0">
          <div v-for="(citem,cindex) in item.info" :key="cindex" class="text item">
            <el-card class="box-card">
              <el-card class="box-card" style="display:flex">
                <div v-for="(ccitem,ccindex) in citem.select" :key="ccindex" class="text item" style="display:inline-block;margin:1%;width:48%">
                  <el-input v-model="citem.select[ccindex]" :readonly="true" placeholder="请输入内容">
                    <template slot="prepend">{{ ccindex }}</template>
                  </el-input>
                </div>
              </el-card>
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
          </div>
        </el-form-item>
      </el-card>
      <el-row>
        <el-button icon="el-icon-check" type="success" @click="verify(true)">通过审核</el-button>
        <el-button icon="el-icon-close" type="danger" @click="verify(false)">不通过审核</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { Config } from '@/utils/config'
import { getOne } from '@/api/listenA'
import { verifyOne } from '@/api/verify'

export default {
  data() {
    return {
      title: '听力PartA审核',
      formData: {}
    }
  },
  created() {
    const id = this.$route.query.id
    getOne(id).then((res) => {
      if (res.code === 1) {
        const formData_edit = res.results[0]
        for (const item of formData_edit.voice) {
          for (const citem of item.info) {
            citem.select = JSON.parse(citem.select)
          }
        }
        this.formData = formData_edit
      }
    })
  },
  methods: {
    verify(status) {
      const data = {
        id: this.formData.id,
        is_ok: status,
        come: 'la'
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
.box-card
  margin-bottom 12px
.mt12
  margin-top 12px
.mb12
  margin-bottom 12px
.radio
  line-height 36px
  text-align center
</style>
