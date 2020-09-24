<template>
  <div class="singleImageUpload2 upload-container">
    <el-upload
      :name="name"
      :action="action"
      :headers="headers"
      :multiple="false"
      :limit="1"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
      :on-remove="onRemove"
      :file-list="fileList"
      :on-exceed="onExceed"
      :disabled="disabled"
      :data="data"
      drag
      show-file-list
      class="image-uploader"
    >
      <i class="el-icon-upload" />
      <div v-if="fileList.length === 0" class="el-upload__text">
        请将文件拖入或
        <em>点击上传</em>
      </div>
      <div v-else class="el-upload__text">
        文件已上传
      </div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'FileUpload',
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      action: `${process.env.VUE_APP_BASE_API}/upload_file`,
      name: 'myfile',
      data: {
        part: 'newtest',
        type: 'Voice',
        level: 'N5'
      }
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
      const { code, msg, results } = response
      if (code !== 1) {
        this.$message({
          message: (msg && `上传失败，失败原因：${msg}`) || '上传失败',
          type: 'error'
        })
        this.$emit('onError', results)
      } else {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.$emit('onSuccess', results)
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
  .upload-container
    width 100%
    height 100%
    position relative
    .image-uploader
      height 100%
</style>
