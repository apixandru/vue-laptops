<template>
  <div class="content-custom">
    <section>
      <vue-table-dynamic :params="params" ref="table"></vue-table-dynamic>
    </section>
    <vue-msg :timeout="2000" :top="100" :right="20" ref="vueMsg"></vue-msg>
  </div>
</template>

<script>
import VueButton from './VueButton.vue'
import VueMsg from 'vue-msgs'

const cloneDeep = require('lodash.clonedeep')

const random = (length) => {
  if (!(length > 0 && length < 10)) length = 5
  let num = parseInt(Date.now() + Math.random() * 10000000)
  return num.toString(16).slice(0 - length)
}

const defaultTableParams = {
  data: [
    [' Index', `Data1`, `Data2`, `Data3`]
  ],
  header: 'row',
  height: '',
  sharedWidth: true,
  headerHeight: 48,
  rowHeight: 36,
  enableSelectRow: true,
  // wordWrap: 'break-word',
  // whiteSpace: 'normal',
  // textOverflow: 'clip',
  border: false,
  stripe: false,
  showCheck: false,
  enableSearch: true,
  columnWidth: [{column: 0, width: 120}, {column: 1, width: 170}, {column: 2, width: 120}, {column: 3, width: 220}],
  fixed: 1,
  sort: [0, {
    column: 1,
    ascending: (a, b) => {
      return parseInt(a) > parseInt(b) ? 1 : -1
    },
    descending: (a, b) => {
      return parseInt(b) > parseInt(a) ? 1 : -1
    }
  }
  ],
  edit: {},
  highlight: {},
  filter: [{
    column: 0,
    content: [{text: '> 3', value: 3}, {text: '> 5', value: 5}, {text: '> 7', value: 7}],
    method: (value, tableCell) => {
      return tableCell.data > value
    }
  }, {
    column: 2,
    content: [{text: '1-Cell', value: '1-Cell'}, {text: '2-Cell', value: '2-Cell'}, {text: '3-Cell', value: '3-Cell'}],
    method: (value, tableCell) => {
      return String(tableCell.data).toLocaleLowerCase().includes(String(value).toLocaleLowerCase())
    }
  }],
  pagination: true,
  showTotal: true,
  pageSize: 20,
  scrollbarBorderRadius: 4,
  scrollbar: 'hover',
  scrollbarColor: 'rgba(0, 0, 0, 0.45)',
  scrollbarHoverColor: 'rgba(0, 0, 0, 0.65)',
  language: '',
  useHTMLAsHeaderName: true
}

for (let i = 0; i < 70; i++) {
  defaultTableParams.data.push([i + 1, `${random()}-Cell`, `${random()}-Cell`, `${random()}-Cell`])
}

const tableHeaderTypes = ['', 'row', 'column']

export default {
  name: 'CustomStyle',
  data() {
    return {
      params: cloneDeep(defaultTableParams),
      widthIncrement: 1,
      heightIncrement: 1,
      rowHeightIncrement: 1,
      useSlot: false
    }
  },
  methods: {
    reset() {
      this.params = cloneDeep(defaultTableParams)
    },
    showMsg(type, info) {
      if (this.$refs && this.$refs.vueMsg && typeof this.$refs.vueMsg.showMsg === 'function') {
        this.$refs.vueMsg.showMsg(type, info)
      }
    }
  },
  components: {VueButton, VueMsg}
}
</script>

<style lang="scss" scoped>
.content-custom {
  height: 100%;
  width: 100%;
  position: relative;

  section {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 25px;
    overflow-y: auto;
  }
}

$scrollbar-size: 6px;
*::-webkit-scrollbar {
  width: 2px;
  opacity: 0.1;
  cursor: pointer;
}

*::-webkit-scrollbar:horizontal {
  height: $scrollbar-size;
  cursor: pointer;
}

*::-webkit-scrollbar:vertical {
  width: $scrollbar-size;
  cursor: pointer;
}

*::-webkit-scrollbar-track {
  background-color: transparent;
  opacity: 0.3;
}

* {
  &:hover::-webkit-scrollbar-thumb {
    visibility: visible;
  }
}

*::-webkit-scrollbar-thumb {
  opacity: 0.1;
  background-color: rgba(0, 0, 0, .45);
  border-radius: $scrollbar-size;
  visibility: hidden;
  cursor: -webkit-grab;
  cursor: pointer;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.65);
}

*::-webkit-scrollbar-thumb:active {
  background-color: rgba(0, 0, 0, 0.65);
}
</style>

<style lang="scss">
.cell--slot-1, .cell--slot-2 {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}


// $g_table_header_bg: rgba(89, 126, 247, 0.15);
$g_table_header_bg: #f7f8fb;
$g_table_header_border_color: #FFFFFF;
$g_table_header_height: 30px;
$g_table_row_bg: #518beb0a;
$g_table_row_bg2: #FFFFFF;
$g_table_row_height: 30px;
$g_table_hover_color: #e9f3fc;
$g_table_active_color: rgba(217, 243, 240, 1);
$g_table_size: 13px;
$g_table_color: rgba(0, 0, 0, 0.65);

.content-custom {
  .v-table::before, .v-table-fixed {
    border-bottom: none !important;
  }

  .v-table-row {
    font-family: Arial, Helvetica, sans-serif !important;
    font-size: $g_table_size !important;
    color: $g_table_color !important;
    cursor: auto;
    border-top: none !important;
    border-right: 1px solid $g_table_row_bg !important;
    border-bottom: 1px solid $g_table_row_bg !important;
    background: $g_table_row_bg2 !important;

    .table-cell, .table-check {
      border-left: 1px solid $g_table_row_bg !important;
    }
  }

  .v-table-row.is-odd {
    background: $g_table_row_bg !important;
    border-right: 1px solid $g_table_row_bg2 !important;
    border-bottom: 1px solid $g_table_row_bg2 !important;

    .table-cell, .table-check {
      border-left: 1px solid $g_table_row_bg2 !important;
    }
  }

  .v-table-row.is-hovering, .table-row.is-odd.is-hovering {
    background: $g_table_hover_color !important;
  }

  .v-table-row.is-selected,
  .v-table-row.is-selected.is-hovering,
  .table-row.is-odd.is-selected.is-hovering {
    background-color: $g_table_active_color !important;
  }

  .v-table-row.is-header {
    background: $g_table_header_bg !important;
    border-top: 1px solid $g_table_header_border_color !important;
    border-right: 1px solid $g_table_header_border_color !important;
    border-bottom: 1px solid $g_table_header_border_color !important;

    .table-cell, .table-check {
      border-left: 1px solid $g_table_header_border_color !important;
    }
  }
}

</style>