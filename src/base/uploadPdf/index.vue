<template>
  <div>
    <el-upload
      :drag="drag"
      :action="url"
      :data="data"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-error="handleError"
      :on-preview="handlePictureCardPreview"
      :file-list="fileList"
      :list-type="listType"
      :show-file-list="showFileList"
      ref="upload"
    >
      <slot name="content">
        <el-button v-if="!drag" size="small" :type="buttonType">
          {{ buttonText }}
        </el-button>
        <i v-if="drag" class="el-icon-upload"></i>
        <div v-if="drag" class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </slot>
    </el-upload>
    <el-dialog
      :append-to-body="true"
      class="xt-dialog"
      :visible.sync="dialogVisible"
    >
      <img :src="`${dialogImageUrl}`" alt />
    </el-dialog>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: 'Upload',
  props: {
    value: String,
    data: Object,
    buttonText: { type: String, default: '点击上传' },
    buttonType: { type: String, default: 'primary' },
    showFileList: { type: Boolean, default: true },
    listType: { type: String, default: 'picture' },
    url: { type: String, default: '/api/thesis/uploadPdf' },
    drag: { type: Boolean, default: true }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  computed: {
    fileList() {
      return this.value
        ? this.value.split(',').map(item => {
            return {
              name: item,
              url: item
            };
          })
        : [];
    }
  },
  methods: {
    handleSuccess(file) {
      if (file.code === 0) {
        this.$emit('change', file.data);
        this.$emit('input', file.data);
        this.$emit('uploaded', file.data);
        this.$parent.$emit('el.form.change', file.data);
      } else {
        this.$message.error(file.msg);
        this.handleRemove();
      }
    },
    handleError() {
      this.handleRemove();
    },
    handleRemove() {
      this.$refs['upload'].clearFiles();
      this.$emit('change', '');
      this.$emit('input', '');
      this.$parent.$emit('el.form.change', '');
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>