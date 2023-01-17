<template>
  <input
      class="input-text"
      @input="onInput"
      type="text"
      :value="value"
      :placeholder="placeholder"
  >
</template>

<script>
export default {
  name: "InputText",
  props: {
    value: {
      type: String,
      require: false
    },
    placeholder: {
      type: String,
      require: false
    }
  },
  methods: {
    onInput({target: {value}}) {
      this.$emit("input", value)
    }
  },

}
</script>

<style scoped lang="scss">
@import "src/assets/variables";

.input-text {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  outline: none;
  border: 1px solid $border;
  font-size: 1.1rem;
}
</style>