<template>
  <div>
    <InputText v-model="value"/>
    <ul v-if="showCitiesList">
      <li
          v-for="city of citiesList"
          :key="city.id"
          @click="selectCity(city)"
      >
        {{ city.name }}
      </li>
    </ul>
    <ButtonAdd :disabled="!valueIsFound" @click="onAddClick">
      add
    </ButtonAdd>
  </div>
</template>

<script>
import ButtonAdd from "@/components/UI/ButtonAdd";
import InputText from "@/components/UI/InputText";
import {forecastApi, searchApi} from "/Users/justc/Desktop/vue2-test/forecastApi"

export default {
  name: "Form",
  components: {ButtonAdd, InputText},
  data: () => {
    return {
      debouncedValue: "",
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
          const {data} = await searchApi.get("", {
            params: {
              name: currentValue
            }
          })
          this.citiesList = data.results
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
      this.$emit("addCityClick", this.city)
      this.value = ""
      this.city = null
      this.valueIsFound = false
    }
  }
}
</script>

<style scoped>

</style>