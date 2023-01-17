<template>
  <button
      class="button-add"
      :disabled="disabled"
      @click="onClick"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: "ButtonAdd",
  props: {
    disabled: {
      type: Boolean,
      require: false
    }
  },
  methods: {
    onClick() {
      this.$emit("click")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.button-add {
  width: 100px;
  background: #a3aaff;
  color: #ffffff;
  border: none;
  border-radius: 0;
  font-size: 1.1rem;
  cursor: pointer;
  transition: .3s;

  &:first-letter {
    text-transform: uppercase;
  }

  &:hover {
    background: $hover;
  }

  &:disabled {
    cursor: default;
    background: $border;

    &:hover {
      background: $border;
    }
  }
}
</style>