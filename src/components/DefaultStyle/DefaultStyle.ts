import VueButton from '../VueButton.vue'
import VueTableDynamic from "../VueTableDynamic.vue"
import Dropdown from '../Dropdown.vue'
import VueMsg from 'vue-msgs'

import {lenovoLaptops} from '@/utils/lenovo-outlet-laptops'
import {filterValueChanged} from '@/utils/filterLogic'
import {cpuMappings} from '@/utils/cpu-mappings'
import {gpuMappings} from "@/utils/gpu-mappings";
import {ramMappings} from "@/utils/ram-mappings";
import {storageMappings} from "@/utils/storage-mappings";
import {LaptopFilters} from "@/models/models";

const cloneDeep = require('lodash.clonedeep')

const input: LaptopFilters = {
    items: lenovoLaptops,
    cpuMappings,
    gpuMappings,
    ramMappings,
    storageMappings
};

const defaultTableParams = {
    data: [
        ['Name', `CPU`, `GPU`, `RAM`, `Storage`, `Price`]
    ],
    header: 'row',
    height: '',
    headerHeight: 30,
    rowHeight: 60,
    enableSelectRow: true,
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    textOverflow: 'clip',
    border: true,
    stripe: true,
    showCheck: false,
    enableSearch: true,
    // activedColor: '#046FDB',
    headerBgColor: '#efefef',
    // columnWidth: [{column: 0, width: 120}, {column: 1, width: 150}, {column: 2, width: '30%'}, {column: 3, width: 200},],
    columnWidth: [{column: 5, width: 100}],
    fixed: 1,
    sort: [0, 1, 2, 3, 4, 5
    ],
    edit: {},
    highlight: {},
    filter: [],
    // filter: [{
    //     column: 0,
    //     content: [{text: '> 3', value: 3}, {text: '> 5', value: 5}, {text: '> 7', value: 7}],
    //     method: (value, tableCell) => {
    //         return tableCell.data > value
    //     }
    // }, {
    //     column: 2,
    //     content: [{text: '1-Cell', value: '1-Cell'}, {text: '2-Cell', value: '2-Cell'}, {
    //         text: '3-Cell',
    //         value: '3-Cell'
    //     }],
    //     method: (value, tableCell) => {
    //         return String(tableCell.data)
    //             .toLocaleLowerCase()
    //             .includes(String(value).toLocaleLowerCase());
    //     }
    // }],
    pagination: true,
    showTotal: true,
    showPageSizeOptions: false,
    pageSize: 50,
    pageSizes: []
}

const allData = {
    originalItems: lenovoLaptops,
    unfilteredItems: [],
    filteredItems: [],

    ram: [],
    storage: [],

    cpuBrand: [],
    cpuFamily: [],
    cpuModel: [],

    gpuBrand: [],
    gpuFamily: [],
    gpuModel: []
};

allData.unfilteredItems.push(['Name', `CPU`, `GPU`, `RAM`, `Storage`, `Price`]);

allData.filteredItems.push(...allData.unfilteredItems)
defaultTableParams.data = allData.filteredItems

defaultTableParams.filter.splice(0, defaultTableParams.filter.length);
// defaultTableParams.filter = [{
//     column: 0,
//     // @ts-ignore
//     content: [...filters.title]
//         .sort()
//         .map(e => ({text: e, value: e})),
//     method: (value, tableCell) => {
//         return tableCell.data === value
//     }
// }, {
//     column: 1,
//     // @ts-ignore
//     content: [...filters.cpu]
//         .sort()
//         .map(e => ({text: e, value: e})),
//
//     method: (value, tableCell) => {
//         return tableCell.data === value
//     }
// }, {
//     column: 2,
//     // @ts-ignore
//     content: [...filters.gpu]
//         .sort()
//         .map(e => ({text: e, value: e})),
//
//     method: (value, tableCell) => {
//         return tableCell.data === value
//     }
// }];

function doFilterValueChanged() {
    this.params.data = filterValueChanged(input, this.filterValue, allData)
}

export default {
    name: 'DefaultStyle',
    data() {
        return {
            params: cloneDeep(defaultTableParams),
            widthIncrement: 1,
            heightIncrement: 1,
            rowHeightIncrement: 1,
            useSlot: false,
            cpuBrand: allData.cpuBrand,
            cpuFamily: allData.cpuFamily,
            cpuModel: allData.cpuModel,
            gpuBrand: allData.gpuBrand,
            gpuModel: allData.gpuModel,
            gpuFamily: allData.gpuFamily,
            ram: allData.ram,
            storage: allData.storage,
            allData,
            filterValue: {}
        }
    },
    mounted() {
        this.filterValueChanged()
    },
    methods: {
        reset() {
            this.params = cloneDeep(defaultTableParams)
        },
        showMsg(type, info) {
            if (this.$refs && this.$refs.vueMsg && typeof this.$refs.vueMsg.showMsg === 'function') {
                this.$refs.vueMsg.showMsg(type, info)
            }
        },
        filterWasInitialized(title, value) {
            this.filterValue[title] = value
        },
        extractUniqueAndSort: function (values, mappingFunction) {
            return [...new Set(values.map(mappingFunction))]
                .sort();
        }
        , extractAndSet: function (values, mappingFunction, target) {
            const filteredValues = this.extractUniqueAndSort(values, mappingFunction)
                .map(e => ({text: e}))

            target.splice(0, target.length)
            target.push(...filteredValues)
        },
        filterValueChanged: doFilterValueChanged
    },
    components: {VueButton, VueMsg, Dropdown, VueTableDynamic}
}
