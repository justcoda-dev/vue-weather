<template>
  <div class='input-search'>
    <div class='input-search__input'>
      <InputText :placeholder="'Search city'" v-model='value' />
      <ButtonAdd :disabled='!valueIsFound' @click='onAddClick'>
        add
      </ButtonAdd>
    </div>
    <ul class='input-search-list' v-if='showCitiesList && citiesList.length'>
      <li
        class='input-search-list__item'
        v-for='city of citiesList'
        :key='city.id'
        @click='selectCity(city)'
      >
        {{ city.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import ButtonAdd from '@/components/UI/ButtonAdd'
import InputText from '@/components/UI/InputText'
import { searchApi } from '/Users/justc/Desktop/vue2-test/forecastApi'

export default {
  name: 'InputSearch',
  components: { ButtonAdd, InputText },
  data: () => {
    return {
      debouncedValue: '',
      timeout: null,
      time: 300,
      citiesList: [],
      showCitiesList: false,
      valueIsFound: false,
      city: null
    }
  },
  computed: {
    value: {
      get() {
        return this.debouncedValue
      },
      set(value) {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(() => {
          this.debouncedValue = value
        }, this.time)

        this.valueIsFound = false
      }
    }
  },
  watch: {
    async debouncedValue(currentValue) {
      try {
        if (!this.valueIsFound) {
          const { data } = await searchApi.get('', {
            params: {
              name: currentValue
            }
          })
          this.citiesList = data.results ? data.results : []
          this.showCitiesList = true
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  methods: {
    selectCity(city) {
      this.value = city.name
      this.valueIsFound = true
      this.showCitiesList = false
      this.city = city
    },
    onAddClick() {
      this.$emit('addCityClick', this.city)
      this.value = ''
      this.city = null
      this.valueIsFound = false
      this.showCitiesList = false
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'src/assets/variables';

.input-search {
  position: relative;

  &__input {
    display: flex;

  }
}

.input-search-list {
  position: absolute;
  left: 0;
  right: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 1.1rem;
  max-height: 300px;
  overflow: auto;
  border: 1px solid $border;
  background: #ffffff;

  &__item {
    cursor: pointer;
    padding: 10px;

    &:hover {
      background: $border;
    }
  }
}
</style>
