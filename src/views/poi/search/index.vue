<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="搜索内容" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>

    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="unionTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="poi_id" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">{{scope.row.displayname}}</template>
        </el-table-column>
        <el-table-column label="大类" align="center">
          <template slot-scope="scope">{{scope.row.categoryLevel1}}</template>
        </el-table-column>
        <el-table-column label="中类" align="center">
          <template slot-scope="scope">{{scope.row.categoryLevel2}}</template>
        </el-table-column>
        <el-table-column label="小类" align="center">
          <template slot-scope="scope">{{scope.row.categoryLevel3}}</template>
        </el-table-column>
        <el-table-column label="地址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="省" align="center">
          <template slot-scope="scope">{{scope.row.province}}</template>
        </el-table-column>
        <el-table-column label="市" align="center">
          <template slot-scope="scope">{{scope.row.city}}</template>
        </el-table-column>
        <el-table-column label="区" align="center">
          <template slot-scope="scope">{{scope.row.county}}</template>
        </el-table-column>
        <el-table-column label="经度" align="center">
          <template slot-scope="scope">{{scope.row.lng}}</template>
        </el-table-column>
        <el-table-column label="纬度" align="center">
          <template slot-scope="scope">{{scope.row.lat}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="状态" width="140" align="center">
          <template slot-scope="scope">{{scope.row.status}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,20]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList} from '@/api/search';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 0,
    pageSize: 5,
    keyword: null
  };
  const defaultUnion = {
    id: null,
    displayname: null,
    categoryLevel1: null,
    categoryLevel2: null,
    categoryLevel3: null,
    address: null,
    province: null,
    city: null,
    county: null,
    lng: null,
    lat: null,
    status: 1
  };
  export default {
    name: 'unionList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        union: Object.assign({}, defaultUnion),
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      handleSearchList() {
        this.listQuery.pageNum = 0;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
    }
  }
</script>
<style></style>
