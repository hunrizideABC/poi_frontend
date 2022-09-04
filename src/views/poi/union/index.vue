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
        <el-button
          style="float:right;margin-right: 10px"
          @click="handlePoiSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.displaynamekeyword" class="input-width" placeholder="名称" clearable></el-input>
            <el-input v-model="listQuery.addresskeyword" class="input-width" placeholder="地址" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="poi查询：">
            <el-input v-model="listQuery.poi_id" class="input-width" placeholder="poi_id" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
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
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
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
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit?'编辑用户':'添加用户'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="union"
               ref="unionForm"
               label-width="150px" size="small">

        <el-form-item label="poi_id：">
          <el-input v-model="union.id" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input v-model="union.displayname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="大类：">
          <el-input v-model="union.categoryLevel1" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="中类：">
          <el-input v-model="union.categoryLevel2" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="小类：">
          <el-input v-model="union.categoryLevel3" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="union.address" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="省：">
          <el-input v-model="union.province" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="市：">
          <el-input v-model="union.city" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="区：">
          <el-input v-model="union.county" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="市：">
          <el-input v-model="union.city" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="经度：">
          <el-input v-model="union.lng" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="纬度：">
          <el-input v-model="union.lat" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="union.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {fetchList,createUnion,updateUnion,updateStatus,deleteUnion} from '@/api/union';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    poi_id: -1,
    displaynamekeyword: null,
    addresskeyword: null
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
        dialogVisible: false,
        union: Object.assign({}, defaultUnion),
        isEdit: false,
        allocDialogVisible: false,
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
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUnion(row.id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.union = Object.assign({},row);
      },
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.union = Object.assign({},defaultUnion);
      },
      handleDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            console.log(this.union);
            updateUnion(this.union.id,this.union).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          } else {
            createUnion(this.union).then(response => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          }
        })
      },
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateStatus(row.id, {status: row.status}).then(response => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
          this.getList();
        });
      },
    }
  }
</script>
<style></style>
