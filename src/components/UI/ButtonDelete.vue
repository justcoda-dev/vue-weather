<template>
  <button class="button-delete" @click="onClick">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ButtonDelete',
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/variables';

.button-delete {
  width: 70px;
  background: #ff7979;
  color: #ffffff;
  border: none;
  border-radius: 0;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.3s;

  &:first-letter {
    text-transform: uppercase;
  }

  &:hover {
    background: #ff3939;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;

    &:hover {
      background: #ff7979;
    }
  }
}
</style>
