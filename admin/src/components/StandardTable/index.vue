<template>
    <div>
        <el-table
                :data="data"
                stripe
                border
                style="width: 100%"
                v-loading="loading"
                element-loading-text="加载中"
                :selectable="selectable"
                @selection-change="handleSelectionChange"
                @row-click="currentChange"
                :header-cell-style="{background:'#f6f6f6',color:'#505050'}"
                :default-sort = "defaultSort"
                @sort-change="sortChange"
                >
            <el-table-column v-if="selections" type="selection" width="55" :selectable="selectable"></el-table-column>
            <slot></slot>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="current" :limit.sync="size" @pagination="handlePagination" />
    </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
    name: 'StandardTable',
    components: { Pagination },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        selections: {
            type: Array,
        },
        loading: {
            type: Boolean,
            default: () => false
        },
        total: {
            type: Number,
            default: () => 0
        },
        pageNumber: {
            type: Number,
        },
        pageSize: {
            type: Number,
        },
        selectable: {
            type: Function,
            default: () => true
        },
        defaultSort:{
            type:Object
        },
        sortChange:{
            type:Function,
            default: () => {}
        }
    },
    data(){
        return{
            showPagin:true
        }
    },
    computed: {
        current: {
            get() {
                return this.pageNumber
            },
            set(val) {
                this.$emit('update:pageNumber', val)
            }
        },
        size: {
            get() {
                return this.pageSize
            },
            set(val) {
                this.$emit('update:pageSize', val)
            }
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.$emit('update:selections', val)
        },
        handlePagination(data) {
            this.showPagin = false
            this.$nextTick(()=>{
                this.$emit('pagination',data)
                this.showPagin = true
            })
        },
        currentChange(currentRow){
            this.$emit('currentRow',currentRow)
        }
    }
}
</script>

<style>
.pagination-container{
    margin-top: 10px;
}
</style>