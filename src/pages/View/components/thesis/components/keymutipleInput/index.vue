<template>
  <div>
    <div v-for="(item, index) in inputValues" :key="index" class="input-row">
      <el-input placeholder="关键词" v-model="item.key" @input="handleChange"></el-input>
      <el-button
        v-if="index"
        type="primary"
        icon="el-icon-minus"
        circle
        @click="removeInput(index)"
      ></el-button>
    </div>
    <el-button type="primary" icon="el-icon-plus" circle @click="addInput"></el-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "mutipleInput",
  data() {
    return {
      inputValues:
        this.value && this.value.length
          ? this.value.concat()
          : [{ key: ""}],
    };
  },
  computed: {},
  watch: {
    value: {
      handler(val, oldVal) {
        this.inputValues = val && val.length ? val.concat() : [{ key: "" }];
      },
      deep: true
    }
  },
  methods: {
    handleChange() {
      this.$emit("change", this.inputValues);
      this.$emit("input", this.inputValues);
      this.$parent.$emit("el.form.change", this.inputValues);
    },
    addInput() {
      console.log(this.inputValues.length);
      if (this.inputValues.length < 5) {
        this.inputValues.push({ key: "" });
      }
    },
    removeInput(index) {
      this.inputValues.splice(index, 1);
    }
  }
};
</script>

<style lang="stylus" scoped>
.input-row {
  margin-bottom: 10px;
  display: flex;
}

.el-input {
  width: auto;
}

.recommand {
  margin-left: 10px;
  font-size: 13px;
}
</style>
