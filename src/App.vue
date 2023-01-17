<template>
  <div id="app">
    <Table
        :citiesWeatherList="citiesWeatherList"
        @deleteCity="onDeleteCity"
        @sortByType="onSortByType"
        @changeDay="onChangeDay"
    />
    <InputSearch
        class="search"
        @addCityClick="onAddCityClick"
    />
    <div
        v-if="popupShow"
    >
      city is already added
    </div>
  </div>
</template>

<script>


import InputSearch from "@/components/InputSearch";
import Table from "@/components/Table";
import {forecastApi} from "/Users/justc/Desktop/vue2-test/forecastApi"

export default {
  name: 'App',
  components: {
    InputSearch,
    Table
  },
  data: () => {
    return {
      citiesWeatherList: [],
      popupShow: false,
      popupTimeout: null
    }
  },
  watch: {
    popupShow() {
      if (this.popupTimeout) {
        clearTimeout(this.popupTimeout)
      }
      this.popupTimeout = setTimeout(() => this.popupShow = false, 2000)
    }
  },
  methods: {
    async onAddCityClick(city) {
      try {

        const {data} = await forecastApi.get("", {
          params: {
            latitude: city.latitude,
            longitude: city.longitude,
            temperature_unit: "celsius",
            daily: "temperature_2m_max,temperature_2m_min",
            timezone: city.timezone
          }
        })
        const noCityInList = this.citiesWeatherList?.findIndex(value => value.id === city.id)

        if (noCityInList === -1) {
          this.popupShow = false
          this.citiesWeatherList = [...this.citiesWeatherList, {
            ...city,
            temperature_unit: data.daily_units?.temperature_2m_max,
            min: data.daily?.temperature_2m_min[0],
            max: data.daily?.temperature_2m_max[0],
            day: data.daily?.time[0],
            daily: data.daily
          }]
        } else {
          this.popupShow = true
        }

      } catch (error) {
        console.error(error)
      }
    },
    onDeleteCity(city) {
      const index = this.citiesWeatherList.indexOf(city)
      if (index !== -1) {
        this.citiesWeatherList.splice(index, 1)
      }
    },
    onSortByType({key, sortType, toggle}) {
      const sortFunctions = {
        NUMBERS: (a, b) => b[key] - a[key],
        FIRST_LATTER: (a, b) => a[key].localeCompare(b[key]),
        BY_DATE: (a, b) => new Date(a[key]) - new Date(b[key])
      }
      this.citiesWeatherList.sort(sortFunctions[sortType])
      if (toggle) {
        this.citiesWeatherList.reverse()
      }
    },
    async onChangeDay({day, cityIndex, city}) {

      try {
        const {data} = await forecastApi.get("", {
          params: {
            latitude: city.latitude,
            longitude: city.longitude,
            temperature_unit: "celsius",
            daily: "temperature_2m_max,temperature_2m_min",
            timezone: city.timezone,
            start_date: day,
            end_date: day,
          }
        })

        this.citiesWeatherList.splice(cityIndex, 1, {
          ...this.citiesWeatherList[cityIndex],
          min: data.daily?.temperature_2m_min[0],
          max: data.daily?.temperature_2m_max[0],
          day: data.daily?.time[0],
        })

      } catch (error) {
        console.error(error)
      }
    }
  },

}
</script>

<style lang="scss">
@import "assets/variables";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $fontMain;
  display: flex;
  flex-direction: column;
}

.search {
  margin-top: 50px;
}
</style>
