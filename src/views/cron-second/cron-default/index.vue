<template>
  <!-- 快捷生成完全可以由自己根据需求进行定义，因此这里仅开发了部分功能 -->
  <div class="cron-default">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="天" name="day">
        <el-radio-group v-model="type" size="mini" @change="getValue">
          <div class="box-bottom cycle">
            <el-radio label="2" size="mini" border>自定义时分</el-radio>
            <div style="margin-top: 8px">
              <span style="margin-right: 8px">每天</span>
              <el-input-number
                @change="getChangeDayHourTime"
                v-model="day.hour"
                :min="0"
                :max="23"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin: 0 8px">点</span>
              <el-input-number
                @change="getChangeDayHourTime"
                v-model="day.minute"
                :min="0"
                :max="59"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin-left: 8px">分开始执行</span>
            </div>
            <div style="margin-top: 8px">
              <span style="margin-right: 8px">每天</span>
              <el-input-number
                @change="getChangeDayHourTime"
                v-model="day.hourEnd"
                :min="parseInt(day.hour)"
                :max="23"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin: 0 8px">点</span>
              <el-input-number
                @change="getChangeDayHourTime"
                v-model="day.minuteEnd"
                :min="day.hourEnd == day.hour ? parseInt(day.minute) : 0"
                :max="59"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin-left: 8px">分结束执行</span>
            </div>
          </div>
        </el-radio-group>
      </el-tab-pane>
      <el-tab-pane label="周" name="week">
        <!-- 自定义周时间 -->
        <el-radio-group v-model="type" size="mini" @change="getValue">
          <div class="box-bottom cycle">
            <el-radio label="14" size="mini" border
              >自定义执行星期和时分</el-radio
            >
            <div style="margin-top: 8px">
              <span style="margin-right: 8px">每周</span>
              <el-select
                v-model="weekDay.week"
                placeholder="请选择"
                style="width: 100px"
                size="mini"
                @change="getChangeWeekTime(true)"
              >
                <el-option label="一" :value="'2'"></el-option>
                <el-option label="二" :value="'3'"></el-option>
                <el-option label="三" :value="'4'"></el-option>
                <el-option label="四" :value="'5'"></el-option>
                <el-option label="五" :value="'6'"></el-option>
                <el-option label="六" :value="'7'"></el-option>
                <el-option label="日" :value="'1'"></el-option>
              </el-select>
              <el-input-number
                @change="getChangeWeekTime(false)"
                v-model="weekDay.hour"
                :min="0"
                :max="23"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin: 0 8px">点</span>
              <el-input-number
                @change="getChangeWeekTime(false)"
                v-model="weekDay.minute"
                :min="0"
                :max="59"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin-left: 8px">分开始执行</span>
            </div>
            <div style="margin-top: 8px">
              <span style="margin-right: 8px">每周</span>
              <el-select
                v-model="weekDay.weekEnd"
                placeholder="结束时间"
                style="width: 100px"
                size="mini"
                @change="getChangeWeekTime(false)"
              >
                <el-option
                  label="一"
                  :value="'2'"
                  :disabled="parseInt(weekDay.week) > 2"
                ></el-option>
                <el-option
                  label="二"
                  :value="'3'"
                  :disabled="parseInt(weekDay.week) > 3"
                ></el-option>
                <el-option
                  label="三"
                  :value="'4'"
                  :disabled="parseInt(weekDay.week) > 4"
                ></el-option>
                <el-option
                  label="四"
                  :value="'5'"
                  :disabled="parseInt(weekDay.week) > 5"
                ></el-option>
                <el-option
                  label="五"
                  :value="'6'"
                  :disabled="parseInt(weekDay.week) > 6"
                ></el-option>
                <el-option
                  label="六"
                  :value="'7'"
                  :disabled="parseInt(weekDay.week) > 7"
                ></el-option>
                <el-option label="日" :value="'1'"></el-option>
              </el-select>
              <el-input-number
                @change="getChangeWeekTime(false)"
                v-model="weekDay.hourEnd"
                :min="
                  weekDay.weekEnd == weekDay.week ? parseInt(weekDay.hour) : 0
                "
                :max="23"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin: 0 8px">点</span>
              <el-input-number
                @change="getChangeWeekTime(false)"
                v-model="weekDay.minuteEnd"
                :min="
                  weekDay.weekEnd == weekDay.week &&
                  weekDay.hourEnd == weekDay.hour
                    ? parseInt(weekDay.minute)
                    : 0
                "
                :max="59"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin-left: 8px">分结束执行</span>
            </div>
          </div>
        </el-radio-group>
        <!-- 自定义周期 -->
        <el-radio-group v-model="type" size="mini" @change="getValue">
          <div class="box-bottom cycle">
            <el-radio label="15" size="mini" border>自定义执行周期</el-radio>
            <div style="margin-top: 8px">
              <span style="margin-right: 8px">每周</span>
              <el-select
                v-model="weekDayCycle.week"
                placeholder="请选择周期"
                style="width: 270px"
                size="mini"
                multiple
                filterable
                default-first-option
                @change="getChangeWeekTimeCycle"
              >
                <el-option label="一" :value="'2'"></el-option>
                <el-option label="二" :value="'3'"></el-option>
                <el-option label="三" :value="'4'"></el-option>
                <el-option label="四" :value="'5'"></el-option>
                <el-option label="五" :value="'6'"></el-option>
                <el-option label="六" :value="'7'"></el-option>
                <el-option label="日" :value="'1'"></el-option>
              </el-select>
            </div>
            <div style="margin-top: 8px">
              <el-input-number
                @change="getChangeWeekTimeCycle"
                v-model="weekDayCycle.hour"
                :min="0"
                :max="23"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin: 0 8px">点</span>
              <el-input-number
                @change="getChangeWeekTimeCycle"
                v-model="weekDayCycle.minute"
                :min="0"
                :max="59"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin-left: 8px">分开始执行</span>
            </div>
            <div style="margin-top: 8px">
              <el-input-number
                @change="getChangeWeekTimeCycle"
                v-model="weekDayCycle.hourEnd"
                :min="parseInt(weekDayCycle.hour)"
                :max="23"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin: 0 8px">点</span>
              <el-input-number
                @change="getChangeWeekTimeCycle"
                v-model="weekDayCycle.minuteEnd"
                :min="
                  weekDayCycle.hour == weekDayCycle.hourEnd
                    ? parseInt(weekDayCycle.minute)
                    : 0
                "
                :max="59"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin-left: 8px">分结束执行</span>
            </div>
          </div>
        </el-radio-group>
      </el-tab-pane>
      <el-tab-pane label="月" name="mouth">
        <!-- 自定义月日期 -->
        <el-radio-group v-model="type" size="mini" @change="getValue">
          <div class="box-bottom cycle">
            <el-radio label="23" size="mini" border
              >自定义执行日和时分</el-radio
            >
            <div style="margin-top: 8px">
              <span style="margin-right: 8px">每月</span>
              <el-input-number
                @change="getChangeMonthTime"
                v-model="month.day"
                :min="1"
                :max="31"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin: 0 8px">(号)</span>
              <el-input-number
                @change="getChangeMonthTime"
                v-model="month.hour"
                :min="0"
                :max="23"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin: 0 8px">点</span>
              <el-input-number
                @change="getChangeMonthTime"
                v-model="month.minute"
                :min="0"
                :max="59"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin-left: 8px">分开始执行</span>
            </div>
            <div style="margin-top: 8px">
              <span style="margin-right: 8px">每月</span>
              <el-input-number
                @change="getChangeMonthTime"
                v-model="month.dayEnd"
                :min="parseInt(month.day)"
                :max="31"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin: 0 8px">(号)</span>
              <el-input-number
                @change="getChangeMonthTime"
                v-model="month.hourEnd"
                :min="month.day == month.dayEnd ? parseInt(month.hour) : 0"
                :max="23"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin: 0 8px">点</span>
              <el-input-number
                @change="getChangeMonthTime"
                v-model="month.minuteEnd"
                :min="
                  month.day == month.dayEnd && month.hour == month.hourEnd
                    ? parseInt(month.minute)
                    : 0
                "
                :max="59"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin-left: 8px">分结束执行</span>
            </div>
          </div>
        </el-radio-group>
        <!-- 自定义月周期 -->
        <el-radio-group v-model="type" size="mini" @change="getValue">
          <div class="box-bottom cycle">
            <el-radio label="24" size="mini" border>自定义执行周期</el-radio>
            <div style="margin-top: 8px">
              <span style="margin-right: 8px">每月</span>
              <el-select
                v-model="monthCycle.day"
                placeholder="请选择周期"
                style="width: 270px"
                size="mini"
                multiple
                filterable
                default-first-option
                @change="getChangeMonthTimeCycle"
              >
                <el-option label="1" :value="'1'"></el-option>
                <el-option label="2" :value="'2'"></el-option>
                <el-option label="3" :value="'3'"></el-option>
                <el-option label="4" :value="'4'"></el-option>
                <el-option label="5" :value="'5'"></el-option>
                <el-option label="6" :value="'6'"></el-option>
                <el-option label="7" :value="'7'"></el-option>
                <el-option label="8" :value="'8'"></el-option>
                <el-option label="9" :value="'9'"></el-option>
                <el-option label="10" :value="'10'"></el-option>
                <el-option label="11" :value="'11'"></el-option>
                <el-option label="12" :value="'12'"></el-option>
                <el-option label="13" :value="'13'"></el-option>
                <el-option label="14" :value="'14'"></el-option>
                <el-option label="15" :value="'15'"></el-option>
                <el-option label="16" :value="'16'"></el-option>
                <el-option label="17" :value="'17'"></el-option>
                <el-option label="18" :value="'18'"></el-option>
                <el-option label="19" :value="'19'"></el-option>
                <el-option label="20" :value="'20'"></el-option>
                <el-option label="21" :value="'21'"></el-option>
                <el-option label="22" :value="'22'"></el-option>
                <el-option label="23" :value="'23'"></el-option>
                <el-option label="24" :value="'24'"></el-option>
                <el-option label="25" :value="'25'"></el-option>
                <el-option label="26" :value="'26'"></el-option>
                <el-option label="27" :value="'27'"></el-option>
                <el-option label="28" :value="'28'"></el-option>
                <el-option label="29" :value="'29'"></el-option>
                <el-option label="30" :value="'30'"></el-option>
                <el-option label="31" :value="'31'"></el-option>
              </el-select>
              <span style="margin: 0 8px">(号)</span>
            </div>
            <div style="margin-top: 8px">
              <el-input-number
                @change="getChangeMonthTimeCycle"
                v-model="monthCycle.hour"
                :min="0"
                :max="23"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin: 0 8px">点</span>
              <el-input-number
                @change="getChangeMonthTimeCycle"
                v-model="monthCycle.minute"
                :min="0"
                :max="59"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin-left: 8px">分开始执行</span>
            </div>
            <div style="margin-top: 8px">
              <el-input-number
                @change="getChangeMonthTimeCycle"
                v-model="monthCycle.hourEnd"
                :min="parseInt(monthCycle.hour)"
                :max="23"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin: 0 8px">点</span>
              <el-input-number
                @change="getChangeMonthTimeCycle"
                v-model="monthCycle.minuteEnd"
                :min="
                  monthCycle.hour == monthCycle.hourEnd
                    ? parseInt(monthCycle.minute)
                    : 0
                "
                :max="59"
                size="mini"
                style="width: 100px"
              ></el-input-number>
              <span style="margin-left: 8px">分结束执行</span>
            </div>
          </div>
        </el-radio-group>
      </el-tab-pane>
    </el-tabs>
    <div class="table-box">
      <div>生成的开始时间表达式为：{{ cronExpression }}</div>
      <div>生成的结束时间表达式为：{{ cronExpressionEnd }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 当前tab类型
      activeName: "day",
      // 当前单项选择
      type: "2",
      // 每天几点开始执行 - 几点几分结束执行
      day: {
        hour: "0", // 开始
        minute: "0",
        hourEnd: "1", // 结束
        minuteEnd: "0",
      },
      // 周 --- 每周几 几点开始执行  - 每周几 几点结束执行
      weekDay: {
        week: "2", // 开始
        hour: "0",
        minute: "0",
        weekEnd: "", // 结束
        hourEnd: "0",
        minuteEnd: "0",
      },
      // 周 --- 自定义周期 - 几点几分开始几点几分结束
      weekDayCycle: {
        week: [],
        hour: "0",
        minute: "",
        hourEnd: "1",
        minuteEnd: "",
      },
      // 月 --- 每月几号几点几分开始执行
      month: {
        day: "1",
        hour: "0",
        minute: "0",
        dayEnd: "1",
        hourEnd: "1",
        minuteEnd: "0",
      },
      // 月 --- 月周期
      monthCycle: {
        day: [],
        hour: "0",
        minute: "0",
        hourEnd: "1",
        minuteEnd: "0",
      },
      // 开始表达式
      cronExpression: "0 0 0 * * ?",
      // 结束表达式
      cronExpressionEnd: "0 0 1 * * ?",
    };
  },
  methods: {
    // 重置字段内容
    resetValue() {
      // 天
      this.day = {
        hour: "0",
        minute: "0",
        hourEnd: "1",
        minuteEnd: "0",
      };
      // 周---每周几 几点开始执行  - 每周几 几点结束执行
      this.weekDay = {
        week: "2", // 开始
        hour: "0",
        minute: "0",
        weekEnd: "", // 结束
        hourEnd: "0",
        minuteEnd: "0",
      };
      // 周--- 自定义周期 - 几点几分开始几点几分结束
      this.weekDayCycle = {
        week: [],
        hour: "0",
        minute: "",
        hourEnd: "1",
        minuteEnd: "",
      };
      // 月 -- 自定义时间
      this.month = {
        day: "1",
        hour: "0",
        minute: "0",
        dayEnd: "1",
        hourEnd: "1",
        minuteEnd: "0",
      };
      // 月---自定义周期
      this.monthCycle = {
        day: [],
        hour: "0",
        minute: "0",
        hourEnd: "1",
        minuteEnd: "0",
      };
    },
    // 获取当前值
    getValue() {
      this.resetValue();
      if (this.type == "2") {
        // 每天*点*分开始执行
        this.cronExpression =
          "0 " + this.day.minute + " " + this.day.hour + " * * ?";
        // 每天*点*分结束执行
        this.cronExpressionEnd =
          "0 " + this.day.minuteEnd + " " + this.day.hourEnd + " * * ?";
      } else if (this.type == "14") {
        // 周----每周几 几点几分执行
        this.cronExpression =
          "0 " +
          this.weekDay.minute +
          " " +
          this.weekDay.hour +
          " ? * " +
          this.weekDay.week;
        // 周----每周几 几点几分结束执行
        this.cronExpressionEnd =
          "0 " +
          this.weekDay.minuteEnd +
          " " +
          this.weekDay.hourEnd +
          " ? * " +
          this.weekDay.weekEnd;
      } else if (this.type == "15") {
        // 周----自定义执行周期
        let weeks = this.weekDayCycle.week.join(",");
        if (!weeks) {
          return;
        }
        // 开始
        this.cronExpression =
          "0 " +
          this.weekDayCycle.minute +
          " " +
          this.weekDayCycle.hour +
          " ? * " +
          weeks;
        // 结束
        this.cronExpressionEnd =
          "0 " +
          this.weekDayCycle.minuteEnd +
          " " +
          this.weekDayCycle.hourEnd +
          " ? * " +
          weeks;
      } else if (this.type == "23") {
        // 月 --- 每月几号几点几分执行
        this.cronExpression =
          "0 " +
          this.month.minute +
          " " +
          this.month.hour +
          " " +
          this.month.day +
          " * ?";
        // 每月几号几点几分结束执行
        this.cronExpressionEnd =
          "0 " +
          this.month.minuteEnd +
          " " +
          this.month.hourEnd +
          " " +
          this.month.dayEnd +
          " * ?";
      } else if (this.type == "24") {
        let days = this.monthCycle.day.join(",");
        if (!days) {
          return;
        }
        // 月--- 周期
        this.cronExpression =
          "0 " +
          this.monthCycle.minute +
          " " +
          this.monthCycle.hour +
          " " +
          days +
          " * ?";
        // 每月几号几点几分结束执行
        this.cronExpressionEnd =
          "0 " +
          this.monthCycle.minuteEnd +
          " " +
          this.monthCycle.hourEnd +
          " " +
          days +
          " * ?";
      }
    },
    // 天 --- 每天几点开始执行
    getChangeDayHourTime() {
      this.type = "2";
      // 限定开始时间小于结束时间
      if (this.day.hour > this.day.hourEnd) {
        // 如果开始小时大于结束小时,则结束小时不能小于开始小时
        this.day.hourEnd = this.day.hour;
      } else if (this.day.hour == this.day.hourEnd) {
        //如果开始小时等于结束小时，则判断开始分钟不能小于结束分钟
        if (this.day.minute > this.day.minuteEnd) {
          this.day.minuteEnd = this.day.minute;
        } else {
        }
      } else {
      }
      // 开始
      this.cronExpression =
        "0 " + this.day.minute + " " + this.day.hour + " * * ?";
      // 结束
      this.cronExpressionEnd =
        "0 " + this.day.minuteEnd + " " + this.day.hourEnd + " * * ?";
    },
    // 周 --- 每周几 几点几分执行 --- IsFirst用于控制周几的结束选择项
    getChangeWeekTime(IsFirst) {
      this.type = "14";
      // 当周几相等时限定开始时间小于结束时间
      if (this.weekDay.week == this.weekDay.weekEnd) {
        if (this.weekDay.hour > this.weekDay.hourEnd) {
          // 如果开始小时大于结束小时,则结束小时不能小于开始小时
          this.weekDay.hourEnd = this.weekDay.hour;
        } else if (this.weekDay.hour == this.weekDay.hourEnd) {
          //如果开始小时等于结束小时，则判断开始分钟不能小于结束分钟
          if (this.weekDay.minute > this.weekDay.minuteEnd) {
            this.weekDay.minuteEnd = this.weekDay.minute;
          } else {
          }
        } else {
        }
      } else {
      }
      // 每周开始时间选择时候，结束的周要跟随变化
      if (IsFirst) {
        this.weekDay.weekEnd = this.weekDay.week;
      }
      // 开始
      this.cronExpression =
        "0 " +
        this.weekDay.minute +
        " " +
        this.weekDay.hour +
        " ? * " +
        this.weekDay.week;
      // 结束
      this.cronExpressionEnd =
        "0 " +
        this.weekDay.minuteEnd +
        " " +
        this.weekDay.hourEnd +
        " ? * " +
        this.weekDay.weekEnd;
    },
    // 周 --- 自定义执行周
    getChangeWeekTimeCycle() {
      this.type = "15";
      let weeks = this.weekDayCycle.week.join(",");
      if (!weeks) {
        this.$message.warning("请先选择周期");
        this.resetValue();
        return;
      }
      // 限定开始时间小于结束时间
      if (this.weekDayCycle.hour > this.weekDayCycle.hourEnd) {
        // 如果开始小时大于结束小时,则结束小时不能小于开始小时
        this.weekDayCycle.hourEnd = this.weekDayCycle.hour;
      } else if (this.weekDayCycle.hour == this.weekDayCycle.hourEnd) {
        //如果开始小时等于结束小时，则判断开始分钟不能小于结束分钟
        if (this.weekDayCycle.minute > this.weekDayCycle.minuteEnd) {
          this.weekDayCycle.minuteEnd = this.weekDayCycle.minute;
        } else {
        }
      } else {
      }
      // 开始
      this.cronExpression =
        "0 " +
        this.weekDayCycle.minute +
        " " +
        this.weekDayCycle.hour +
        " ? * " +
        weeks;
      // 结束
      this.cronExpressionEnd =
        "0 " +
        this.weekDayCycle.minuteEnd +
        " " +
        this.weekDayCycle.hourEnd +
        " ? * " +
        weeks;
    },
    // 月 --- 每月几号几点几分开始执行
    getChangeMonthTime() {
      this.type = "23";
      // 如果开始日期等于结束日期
      if (this.month.day == this.month.dayEnd) {
        // 限定开始时间小于结束时间
        if (this.month.hour > this.month.hourEnd) {
          // 如果开始小时大于结束小时,则结束小时不能小于开始小时
          this.month.hourEnd = this.month.hour;
        } else if (this.month.hour == this.month.hourEnd) {
          //如果开始小时等于结束小时，则判断开始分钟不能小于结束分钟
          if (this.month.minute > this.month.minuteEnd) {
            this.month.minuteEnd = this.month.minute;
          } else {
          }
        } else {
        }
      } else if (this.month.day > this.month.dayEnd) {
        // 每月结束日小于开始日
        this.month.dayEnd = this.month.day;
      } else {
      }
      // 开始
      this.cronExpression =
        "0 " +
        this.month.minute +
        " " +
        this.month.hour +
        " " +
        this.month.day +
        " * ?";
      // 结束
      this.cronExpressionEnd =
        "0 " +
        this.month.minuteEnd +
        " " +
        this.month.hourEnd +
        " " +
        this.month.dayEnd +
        " * ?";
    },
    // 月 --- 自定义周期
    getChangeMonthTimeCycle() {
      this.type = "24";
      let days = this.monthCycle.day.join(",");
      if (!days) {
        this.$message.warning("请先选择周期");
        this.resetValue();
        return;
      }
      // 限定开始时间小于结束时间
      if (this.monthCycle.hour > this.monthCycle.hourEnd) {
        // 如果开始小时大于结束小时,则结束小时不能小于开始小时
        this.monthCycle.hourEnd = this.monthCycle.hour;
      } else if (this.monthCycle.hour == this.monthCycle.hourEnd) {
        //如果开始小时等于结束小时，则判断开始分钟不能小于结束分钟
        if (this.monthCycle.minute > this.monthCycle.minuteEnd) {
          this.monthCycle.minuteEnd = this.monthCycle.minute;
        } else {
        }
      } else {
      }
      // 开始
      this.cronExpression =
        "0 " +
        this.monthCycle.minute +
        " " +
        this.monthCycle.hour +
        " " +
        days +
        " * ?";
      // 结束
      this.cronExpressionEnd =
        "0 " +
        this.monthCycle.minuteEnd +
        " " +
        this.monthCycle.hourEnd +
        " " +
        days +
        " * ?";
    },
    // tab选择重置内容
    handleClick(tab, event) {
      if (this.activeName == "day") {
        this.type = "2";
        this.getValue();
      } else if (this.activeName == "week") {
        this.type = "14";
        this.getValue();
      } else {
        this.type = "23";
        this.getValue();
      }
    },
  },
};
</script>
<style lang="css">
.cron-default .box-bottom {
  margin-bottom: 8px;
}
.cron-default .cycle {
  font-size: 12px;
}
.cron-default .el-tabs .el-tabs__content {
  overflow-x: hidden;
  overflow-y: auto;
  height: 307px;
}
.cron-default .table-box {
  border-top: 1px solid #ebebeb;
  margin-top: 10px;
  padding-top: 10px;
  min-width: 400px;
}
</style>