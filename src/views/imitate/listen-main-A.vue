<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="formData" label-width="100px" class="demo-ruleForm">
      <el-card v-for="(item,index) in formData.voice" :key="index" class="box-card">
        <div slot="header" class="clearfix">
          <span>版块{{ index + 1 }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="deleteItem(index)">删除</el-button>
        </div>
        <el-form-item label="素材上传">
          <file-upload @onSuccess="onSuccess($event,index)" />
        </el-form-item>
        <el-form-item label="文件名称">
          <el-input v-model="item.name" placeholder="请输入文件名称" />
        </el-form-item>
        <el-form-item label="题目列表" style="margin-bottom:0">
          <div v-for="(citem,cindex) in item.info" :key="cindex" class="text item">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ cindex + 1 }}.</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="deleteCItem(index,cindex)">删除</el-button>
              </div>
              <el-card class="box-card" style="display:flex">
                <div v-for="(ccitem,ccindex) in citem.select" :key="ccindex" class="text item" style="display:inline-block;margin:1%;width:48%">
                  <el-input v-model="citem.select[ccindex]" placeholder="请输入内容">
                    <template slot="prepend">{{ ccindex }}</template>
                  </el-input>
                </div>
              </el-card>
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
          </div>
          <el-button class="mt12" type="info" icon="el-icon-plus" style="width:100%;" @click="addCItem(index)">添加题目</el-button>
        </el-form-item>
      </el-card>
      <el-row>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button icon="el-icon-plus" @click="addItem()">添加版块</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import FileUpload from '@/components/FileUpload'
import { Config } from '@/utils/config'
import { getOne, addOne, updateOne } from '@/api/listenA'
const formData = {
  tureid: '',
  voice: [
    {
      name: '声音名字',
      voicefile: '',
      info: [
        {
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: 'A',
          analysis: '',
          value: 5,
          location: 0
        },
        {
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: 'A',
          analysis: '',
          value: 5,
          location: 1
        },
        {
          select: {
            A: '', B: '', C: '', D: ''
          },
          right: 'A',
          analysis: '',
          value: 5,
          location: 2
        }
      ]
    }
  ]
}
const formData_format = JSON.parse(JSON.stringify(formData))
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      title: '新增记录',
      formData: formData_format,
      rules: {
        url: [{ required: true, message: '请选择素材文件', trigger: 'blur' }],
        content: [
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
          for (const item of formData_edit.voice) {
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
    addCItem(index) {
      const location = this.formData.voice[index].info.length
      this.formData.voice[index].info.push({
        select: {
          A: '', B: '', C: '', D: ''
        },
        right: 'A',
        analysis: '',
        value: 5,
        location: location
      })
    },
    deleteCItem(index, cindex) {
      this.formData.voice[index].info.splice(cindex, 1)
    },
    addItem() {
      this.formData.voice.push({
        name: '声音名字',
        voicefile: '',
        info: [
          {
            select: {
              A: '', B: '', C: '', D: ''
            },
            right: 'A',
            analysis: '',
            value: 5,
            location: 0
          },
          {
            select: {
              A: '', B: '', C: '', D: ''
            },
            right: 'A',
            analysis: '',
            value: 5,
            location: 1
          },
          {
            select: {
              A: '', B: '', C: '', D: ''
            },
            right: 'A',
            analysis: '',
            value: 5,
            location: 2
          }
        ]
      })
    },
    deleteItem(index) {
      this.formData.voice.splice(index, 1)
    },
    submitForm() {
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
    resetForm(formName) {
      this.formData = formData
    },
    onSuccess(data, index) {
      this.formData.voice[index].voicefile = data.url
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
