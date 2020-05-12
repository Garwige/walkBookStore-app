<template>
  <div class="container" v-loading="loading">
    <div class="file-box">
      <el-button class="add-btn" @click="addImg" type="primary" icon="el-icon-plus"></el-button>
      <span v-show="imgPath" @click="openImg">{{imgPath}}</span>
      <el-button v-show="imgPath" @click="deleteImg" class="delete-btn" type="danger" icon="el-icon-delete"></el-button>
    </div>
    <input style="display:none" id="file" ref="file" type="file" value="" name="imageFile" @clearFiles="clearFiles" @change="fileChange($event)"/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'i-file',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imgPath: '',
      loading: false
    }
  },
  watch: {
    value: {
      handler (value) {
        this.imgPath = value

        if (!value) {
          document.getElementById('file').value = ''
        }
      },
      deep: true
    }
  },
  methods: {
    clearFiles () {
      this.$emit('clearFiles')
      this.$refs.file.clearFiles()
    },
    openImg () {
      window.open(this.imgPath)
    },
    addImg () {
      this.$refs.file.click()
    },
    deleteImg () {
      this.imgPath = ''
      this.$emit('input', this.imgPath)
    },
    fileChange (event) {
      if (event.target.files.length) {
        this.loading = true
        const form = new FormData()
        const imgFile = document.getElementById('file').files[0]
        form.append('file', imgFile, imgFile.name) // 通过append向form对象添加数据
        form.append('access_token', JSON.parse(sessionStorage.getItem('userInfo')).access_token) // 通过append向form对象添加数据

        axios({
          method: 'post',
          url: 'http://20q024h9635.qicp.vip/app/imageUpload/uploadImage',
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(data => {
          this.loading = false
          this.imgPath = data.data.data.url
          this.$emit('input', this.imgPath)
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.imgPath = ''
        this.$emit('input', this.imgPath)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .file-box {
    display: flex;
    justify-content: space-between;
    .add-btn {
      padding: 0px 10px;
    }
    span:nth-child(2) {
      width: 100px;
      flex: 1;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      padding: 0 5px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        color: #409EFF;
      }
    }

    .delete-btn {
      padding: 0 10px;
    }
  }
}
</style>
