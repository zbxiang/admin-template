<template>
  <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
    <sticky :class-name="'sub-navbar'">
      <el-button
        type="success"
        @click="submitForm"
      >
        新增博客
      </el-button>
    </sticky>
    <div class="detail-container">
      <el-row>
        <el-col :span="24">
          <el-form-item prop="category">
            <MdInput v-model="postForm.category" name="category" required>
              类别
            </MdInput>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="title">
            <MdInput v-model="postForm.title" name="title">
              标题
            </MdInput>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <MarkdownEditor
              v-model="postForm.content"
              height="600px"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import sticky from '@/components/Sticky'
import MdInput from '@/components/MDinput'
import MarkdownEditor from '@/components/MarkdownEditor'
import { createBlog } from '@/api/blog'

const fields = {
  category: '类别',
  title: '标题'
}

export default {
  components: {
    sticky,
    MdInput,
    MarkdownEditor
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (!value) {
        callback(new Error(fields[rule.field] + '必须填写'))
      } else {
        callback()
      }
    }
    return {
      postForm: {},
      rules: {
        category: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        console.log(valid, fields)
        if (valid) {
          const blog = Object.assign({}, this.postForm)
          createBlog(blog).then(response => {
          }).catch(() => {})
        } else {
          const message = fields[Object.keys(fields)[0]][0].message
          this.$message({ message, type: 'error' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-container{
    padding: 40px 50px 20px;
  }
</style>
