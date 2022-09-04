<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleunCheckList()" style="margin-left: 20px">未检查</el-button>
      <el-button size="mini" class="btn-add" @click="handleCheckedList()" style="margin-left: 10px">已检查</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="checkTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="id" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="poi_id" width="100" align="center">
          <template slot-scope="scope">{{scope.row.poiId}}</template>
        </el-table-column>
        <el-table-column label="admin_id" width="100" align="center">
          <template slot-scope="scope">{{scope.row.adminId}}</template>
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
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">{{scope.row.checkStatus}}</template>
        </el-table-column>
        <el-table-column label="审核描述" align="center">
          <template slot-scope="scope">{{scope.row.checkDesc}}</template>
        </el-table-column>
        <el-table-column label="产线" align="center">
          <template slot-scope="scope">{{scope.row.src}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="是否已检查" width="140" align="center">
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
                       修改
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleOffline(scope.$index, scope.row)">
                       下线
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
      :title="修改审核poi"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="check"
               ref="checkForm"
               label-width="150px" size="small">

        <el-form-item label="id：">
          <el-input v-model="check.id" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="poi_id：">
          <el-input v-model="check.poiId" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="admin_id：">
          <el-input v-model="check.adminId" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input v-model="check.displayname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="大类：">
          <el-input v-model="check.categoryLevel1" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="中类：">
          <el-input v-model="check.categoryLevel2" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="小类：">
          <el-input v-model="check.categoryLevel3" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="check.address" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="省：">
          <el-input v-model="check.province" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="市：">
          <el-input v-model="check.city" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="区：">
          <el-input v-model="check.county" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="市：">
          <el-input v-model="check.city" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="经度：">
          <el-input v-model="check.lng" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="纬度：">
          <el-input v-model="check.lat" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="审核状态：">
          <el-input v-model="check.checkStatus" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="审核描述：">
          <el-input v-model="check.checkDesc" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="产线：">
          <el-input v-model="check.src" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否已检查：">
          <el-radio-group v-model="check.status">
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
  import {fetchList,updateCheck,updateStatus,offlineCheck} from '@/api/check';
  import {getCookie} from '@/utils/support';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    status: 0,
    username: null
  };
  const defaultCheck = {
    id: null,
    poiId: null,
    adminId: null,
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
    checkStatus: null,
    checkDesc: null,
    src: null,
    status: 0
  };
  export default {
    name: 'checkList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        check: Object.assign({}, defaultCheck),
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
        this.listQuery.username = getCookie("username")
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      handleunCheckList() {
        this.listQuery.status = 0;
        this.getList();
      },
      handleCheckedList() {
        this.listQuery.status = 1;
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
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.check = Object.assign({},row);
      },
      handleDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.check);
          updateCheck(this.check.id,this.check).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        })
      },
      handleOffline(index, row) {
        this.$confirm('是否要下线该poi?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          offlineCheck(row.id, {poi_id: row.poiId}).then(response => {
            this.$message({
              type: 'success',
              message: '下线成功!'
            });
            this.getList();
          });
        });
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
