<template>
  <div class="test">
    <el-button @click="open">打开cron表达式选择</el-button>
    <CronUi ref="CronUi" @cronResult="resultValue"></CronUi>
    <p>最终生成的表达式为：{{result}}</p>
  </div>
</template>
<script>
import CronUi from "./cron/cron-ui/index";
export default {
  components: {
    CronUi
  },
  data() {
    return {
      result: ""
    };
  },
  methods: {
    open() {
      this.$refs["CronUi"].dialogVisible = true;
    },
    resultValue(data) {
      // 最终产生出来的cron表达式
      console.log(data);
      this.result = data;
    }
  }
};
</script>