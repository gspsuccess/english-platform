<template>
  <el-upload
    class="avatar-uploader"
    :name="name"
    :action="action"
    :headers="headers"
    :multiple="false"
    :limit="1"
    :before-upload="beforeUpload"
    :on-success="onSuccess"
    :on-error="onError"
    :on-remove="onRemove"
    :on-exceed="onExceed"
    :disabled="disabled"
    show-file-list
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'ImgUpload',
  props: {
    name: {
      type: String,
      default: 'company'
    },
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    imageUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      action: `${process.env.VUE_APP_BASE_API}/upload`
    }
  },
  computed: {
    headers() {
      return {
        token: `${getToken()}`
      }
    }
  },
  methods: {
    onRemove() {
      this.$message({
        message: '文件删除成功',
        type: 'success'
      })
      this.imageUrl = ''
      this.$emit('onRemove')
    },
    onExceed() {
      this.$message({
        message: '每次只能上传一个文件',
        type: 'warning'
      })
    },
    beforeUpload(file) {
      this.$emit('beforeUpload', file)
    },
    onSuccess(response, file) {
      console.log('onSuccess', response, file)
      const { errorCode, code, msg, data } = response
      if (errorCode !== 0) {
        this.$message({
          message: (msg && `上传失败，失败原因：${msg}`) || '上传失败',
          type: 'error'
        })
        this.$emit('onError', data)
      } else {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.imageUrl = URL.createObjectURL(file.raw)
        this.$emit('onSuccess', data)
      }
    },
    onError(err) {
      const errMsg = (err.message && JSON.parse(err.message)) || '上传失败'
      this.$message({
        message: (errMsg.msg && `上传失败，失败原因：${errMsg.msg}`) || '上传失败',
        type: 'error'
      })
      this.$emit('onError', err)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .avatar-uploader
    margin-bottom 0
  .avatar-uploader .el-upload
    border 1px dashed #d9d9d9
    border-radius 6px
    cursor pointer
    position relative
    overflow hidden

  .avatar-uploader .el-upload:hover
    border-color #409EFF

  .avatar-uploader-icon
    font-size 28px
    color #8c939d
    width 96px
    height 96px
    line-height 96px
    text-align center

  .avatar
    width 96px
    height 96px
    display block
</style>
