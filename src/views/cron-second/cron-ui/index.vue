<template>
  <el-dialog
    custom-class="cron-box-dialog"
    :visible.sync="dialogVisible"
    v-if="dialogVisible"
  >
    <div slot="title" style="font-size: 16px; color: #666666">
      cron表达式生成器
    </div>
    <el-tabs tab-position="left" style="height: 410px" v-model="activeName">
      <el-tab-pane label="快捷生成" name="first">
        <CronDefault
          ref="CronDefault"
          v-if="activeName == 'first'"
        ></CronDefault>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer">
      <el-button size="mini" @click="confirmClick" type="primary"
        >确定</el-button
      >
      <el-button size="mini" @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import CronDefault from "../cron-default/index";
export default {
  components: {
    CronDefault,
  },
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
      result: "", // 最终的结果开始表达式
      resultEnd: "", // 最终的结果结束表达式
    };
  },
  methods: {
    // 确定生成表达式
    confirmClick() {
      this.result = this.$refs["CronDefault"].cronExpression;
      this.resultEnd = this.$refs["CronDefault"].cronExpressionEnd;
      let arr = {
        result: this.result,
        resultEnd: this.resultEnd,
      };
      console.log(arr);
      this.$emit("cronResult", arr);
      this.dialogVisible = false;
    },
  },
};
</script>
<style lang="css">
.cron-box-dialog {
  width: 700px;
}
.cron-box-dialog .el-dialog__header {
  padding: 10px;
  text-align: center;
}
.cron-box-dialog .el-dialog__header .el-dialog__headerbtn {
  top: 12px;
  right: 8px;
}
.cron-box-dialog .el-dialog__body {
  padding: 0 10px;
}
.cron-box-dialog .el-dialog__footer {
  padding: 10px;
  text-align: center;
}
</style>