<template>
  <div class="filter" :class="isOpen ? 'dropdown-open' : ''" ref="dropdown">

    <button class="dropdown-menu-toggle" @click="isOpen = !isOpen">
      {{ text }} ({{ selectedValue.length }})
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </button>

    <div class="dropdown-menu">
      <div class="dropdown-title">
        {{ title }}
        <a href="#" class="dropdown-menu-close" @click.prevent="isOpen = false">
          <i class="fa fa-times" aria-hidden="true"></i>
        </a>
      </div>

      <div class="dropdown-input-container" v-if="searchable">
        <input type="text" class="dropdown-input" v-model="filterInputValue" @input="userIsTyping"/>
        <i class="fa fa-search dropdown-input-icon" aria-hidden="true"></i>
      </div>

      <div class="dropdown-content">
        <ul class="dropdown-items">
          <li v-for="item in filteredItems">
            <a
                href="#"
                @click.prevent="handleItemClick(item, $event)"
            >{{ item.text }}</a>
          </li>
        </ul>
      </div>

      <div class="dropdown-footer">
        <div class="d1" style="display: flex; padding: 10px; padding-bottom: 0;">
          <a href="#" @click.prevent="handleFooterClick('Clear', $event)" style="flex: 1; cursor: pointer">Clear</a>
          <a href="#" @click.prevent="handleFooterClick('Apply', $event)" style="cursor: pointer">Apply</a>
        </div>
      </div>

      <div class="dropdown-loading" :class="isLoading ? 'show' : ''">
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </div>

    </div>
  </div>
</template>

<script>
// import debounce from '../utils/debounce'

export default {
  name: 'Dropdown',
  props: {
    text: {
      type: String
    },
    title: {
      type: String,
      default: 'Filter'
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    searchable: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false,
      selectedValue: [],
      filterInputValue: '',
      filteredItems: []
    }
  },
  created() {
    this.handleFilterClick()
  },
  mounted() {
    this.filteredItems = this.items
    this.$emit('filter-init', this.title, this.selectedValue)
  },
  methods: {
    handleFilterClick() {
      window.addEventListener('click', (e) => {
        if (!this.isFilterElement(e.target)) {
          this.isOpen = false
        }
      })
    },

    isFilterElement(e) {
      if (!e.parentNode || e.parentNode.toString() === '[object HTMLDocument]') {
        return false
      }

      if (e.parentNode === this.$refs.dropdown) {
        return true
      }

      return this.isFilterElement(e.parentNode)
    },

    clearAllSelectedItems() {
      this.selectedValue.splice(0, this.selectedValue.length)
      this.$emit('filter-selected', this.selectedValue)
      this.$refs
          .dropdown
          .querySelectorAll('.filter li a.is-selected')
          .forEach((item) => {
            item.classList.remove('is-selected')
          })
    },

    handleItemClick(item, e) {
      const value = item.id ? item.id : item.text

      if (e.target.classList.contains('is-selected')) {
        e.target.classList.remove('is-selected')
        let index = this.selectedValue.indexOf(value)
        this.selectedValue.splice(index, 1)
        this.$emit('filter-selected', JSON.parse(JSON.stringify(this.selectedValue)))
      } else {
        e.target.classList.add('is-selected')

        this.selectedValue.push(value)
        this.$emit('filter-selected', JSON.parse(JSON.stringify(this.selectedValue)))
      }
    },

    handleFooterClick(item, e) {
      if (item === 'Clear') {
        this.clearAllSelectedItems()
      } else {
        this.isOpen = false
      }
    },

    userIsTyping(e) {
      this.$emit('filter-input', e.target.value)
    }
  },
  watch: {
    filterInputValue(newVal, oldVal) {
      const searchString = newVal.toLowerCase()
      this.filteredItems = this.items
          .filter(e => e.text.toLowerCase().indexOf(searchString) !== -1)
    },
    selectedValue(newValue, oldValue) {
      this.$emit('filter-value-changed', this.title, [...newValue])
    }
  }
}
</script>

<style lang="sass" scoped src="./Dropdown.sass"/>
