<template>
  <select @change="onChange" class="select">
    <option
      class="select__option"
      v-for="(option, index) of optionsList"
      :key="index"
      :value="option"
    >
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'Select',
  props: {
    optionsList: {
      type: Array,
      require: true,
    },
  },
  methods: {
    onChange({ target: { value } }) {
      this.$emit('change', value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/variables';

.select {
  font-size: 1.1rem;
  border: none;
  background: none;

  &__option {
    box-shadow: none;
  }
}
</style>
