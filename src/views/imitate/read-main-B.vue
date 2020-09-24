<template>
  <div class="page-wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="routerList">返回列表页</el-button>
      </div>
      <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-tabs type="border-card">
          <el-tab-pane v-for="(item,index) in formData.text" :key="index" :label="'Text' + (index + 1)">
            <el-form-item label="题目名称">
              <el-input v-model="item.name" placeholder="请输入题目名称" />
            </el-form-item>
            <el-form-item label="题目内容">
              <tinymce v-model="item.detail" :height="300" />
            </el-form-item>
            <el-form-item label="题目选项" style="margin-bottom:0">
              <el-card v-for="(citem,cindex) in item.info" :key="cindex" class="box-card" :class="(cindex + 1) === item.info.length?'':'mb12'">
                <el-form-item label="标题">
                  <el-input v-model="citem.name" class="mb12" placeholder="请输入题目内容" />
                </el-form-item>
                <el-form-item label="题目选项">
                  <el-card class="box-card mb12">
                    <div v-for="(ccitem,ccindex) in citem.select" :key="ccindex" class="text item" :class="ccindex === 'D'?'':'mb12'">
                      <el-input v-model="formData.text[index].info[cindex].select[ccindex]" placeholder="请输入内容">
                        <template slot="prepend">{{ ccindex }}</template>
                      </el-input>
                    </div>
                  </el-card>
                </el-form-item>
                <el-form-item label="题目答案">
                  <el-input v-model="citem.right" class="mb12" placeholder="题目答案" />
                </el-form-item>
                <el-form-item label="题目解析">
                  <el-input v-model="citem.analysis" class="mb12" placeholder="题目解析" />
                </el-form-item>
                <el-form-item label="题目分值">
                  <el-input v-model="citem.value" placeholder="题目分值" />
                </el-form-item>
              </el-card>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-row style="margin-top:24px;">
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import FileUpload from '@/components/FileUpload'
import { addOne, getOne, updateOne } from '@/api/readB'
const formData = {
  tureid: '',
  thispoint: '',
  text: [
    {
      name: '',
      detail: '',
      info: [
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 1
        },
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 2
        },
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 3
        },
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 4
        },
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 5
        }
      ]
    },
    {
      name: '',
      detail: '',
      info: [
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 1
        },
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 2
        },
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 3
        },
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 4
        },
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 5
        }
      ]
    },
    {
      name: '',
      detail: '',
      info: [
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 1
        },
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 2
        },
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 3
        },
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 4
        },
        {
          name: '',
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: '',
          analysis: '',
          value: 5,
          location: 5
        }
      ]
    }
  ]
}
const formData_format = JSON.parse(JSON.stringify(formData))
export default {
  components: {
    Tinymce,
    FileUpload
  },
  data() {
    return {
      title: '新增记录',
      formData: formData_format,
      rules: {
        detail: [
          { required: true, message: '请输入题目内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const id = this.$route.query.id || 0
    const tureid = this.$route.query.tureid || 0
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
    if (tureid) {
      this.formData.tureid = tureid
    }
  },
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this._submitForm()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _submitForm() {
      console.log(this.formData)
      if (!this.formData.id) {
        addOne(this.formData).then((res) => {
          if (res.code === 1) {
            this.$message.success(res.msg)
            this.resetForm()
          }
        })
      } else {
        updateOne(this.formData.id, this.formData).then((res) => {
          if (res.code === 1) {
            this.$message.success(res.msg)
          }
        })
      }
    },
    routerList() {
      this.$router.push('listen-index-B')
    },
    resetForm() {
      this.formData = formData
    },
    onSuccess(data) {
      this.formData.voicefile = data.url
    }
  }
}
</script>
<style lang="stylus">
</style>
