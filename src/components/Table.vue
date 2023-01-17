<template>
  <table class="table">
    <thead>
    <tr>
      <th @click="onSortTypeClick({key:'name', sortType:SORT_TYPES.FIRST_LATTER } )">
        City
      </th>
      <th @click="onSortTypeClick({key:'min', sortType:SORT_TYPES.NUMBERS } )">
        MinTemp
      </th>
      <th @click="onSortTypeClick({key:'max', sortType:SORT_TYPES.NUMBERS } )">
        MaxTemp
      </th>
      <th @click="onSortTypeClick({key:'day', sortType:SORT_TYPES.BY_DATE } )">
        Day
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(city, cityIndex) of citiesWeatherList" :key="city.id">
      <td>
        {{ city.name }}
      </td>
      <td>
        {{ city.min }} {{ city.temperature_unit }}
      </td>
      <td>
        {{ city.max }} {{ city.temperature_unit }}
      </td>
      <td>
        <Select
            :optionsList="city.daily.time"
            @change="onChangeDay($event, {cityIndex, city})"
        />
      </td>
      <td>
        <ButtonDelete
            @click="onDeleteCityClick(city)"
        >
          delete
        </ButtonDelete>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import ButtonDelete from "@/components/UI/ButtonDelete";
import Select from "@/components/UI/Select";

export default {
  name: "Table",
  components: {Select, ButtonDelete},
  data: () => {
    return {
      SORT_TYPES: {
        NUMBERS: "NUMBERS",
        FIRST_LATTER: "FIRST_LATTER",
        BY_DATE: "BY_DATE"
      },
      sortToggle: false
    }
  },
  props: {
    citiesWeatherList: {
      type: Array,
      require: true
    }
  },
  methods: {
    onDeleteCityClick(city) {
      this.$emit("deleteCity", city)
    },
    onSortTypeClick({key, sortType}) {
      this.sortToggle = !this.sortToggle
      this.$emit("sortByType", {toggle: this.sortToggle, key, sortType})
    },
    onChangeDay(value, {cityIndex, city}) {
      this.$emit("changeDay", {day: value, cityIndex, city})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/variables";

.table {
  font-size: 1.1rem;
  border: 1px solid $border;
  border-collapse: collapse;
  table-layout: fixed;

  th {
    font-weight: bold;
    color: $fontMain;
    padding: 10px 15px;
    cursor: pointer;
  }

  td {
    color: #333;
    border-top: 1px solid $border;
    padding: 10px 15px;
  }

  tr:nth-child(2n) {
    background: $border;
  }
}
</style>