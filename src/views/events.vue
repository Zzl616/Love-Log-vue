<template>
  <div class="window">
    <el-button text @click="dialogVisible = true"> 点击上传事件 </el-button>

    <el-dialog
      v-model="dialogVisible"
      title="上传事件"
      width="30%"
      draggable
      @close="clearInputs"
    >
      <el-input
        v-model="input"
        placeholder="请输入事件名称"
        style="width: 100%"
      />
      <el-date-picker
        style="width: 100%"
        v-model="value1"
        type="date"
        placeholder="请选择年月日"
        value-format="YYYY-MM-DD"
      />
      <el-time-picker
        style="width: 100%"
        v-model="value2"
        placeholder="请选择时分秒"
        value-format="HH:mm:ss"
      />
      <el-input
        v-model="description"
        placeholder="请输入事件描述"
        style="width: 100%"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="SubmitEvent"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :data="data"
          :width="width"
          :height="height"
          fixed
        />
      </template>
    </el-auto-resizer>
  </div>
</template>

<script lang="jsx">
import { ref, onMounted, onUnmounted } from "vue";
import axios from "../util/axios";
import config from "../util/config";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const input = ref("");
    const value1 = ref("");
    const value2 = ref("");
    const description = ref("");
    const dialogVisible = ref(false);
    const columns = ref([]);

    const clearInputs = () => {
      input.value = "";
      value1.value = "";
      value2.value = "";
      description.value = "";
    };
    const setColumnWidths = () => {
      const width = document.querySelector(".window").offsetWidth / 6;
      return [
        {
          key: "starttime",
          title: "起始日期",
          dataKey: "starttime",
          width: width,
          cellRenderer: ({ cellData: starttime }) => (
            <ElTooltip
              content={dayjs(starttime).format("YYYY年MM月DD日 HH:ss")}
            >
              {
                <span class="flex items-center">
                  <ElIcon class="mr-3">
                    <Timer />
                  </ElIcon>
                  {dayjs(starttime).format("YYYY年MM月DD日 HH:ss")}
                </span>
              }
            </ElTooltip>
          ),
        },
        {
          key: "eventsname",
          title: "事件名称",
          dataKey: "eventsname",
          width: width,
          // cellRenderer: ({ cellData: name }) => <ElTag>{name}</ElTag>,
        },
        {
          key: "nexttimename",
          title: "下一个重要时间",
          dataKey: "nexttimename",
          width: width,
        },
        {
          key: "nexttime",
          title: "重要日期",
          dataKey: "nexttime",
          width: width,
          cellRenderer: ({ cellData: nexttime }) => (
            <el-countdown
              title="Start to grab"
              value={nexttime}
              format="D [天] HH:mm:ss"
            />
          ),
        },
        {
          key: "description",
          title: "描述",
          dataKey: "description",
          width: width,
          // cellRenderer: ({ cellData: name }) => <ElTag>{name}</ElTag>,
        },
        {
          key: "Operations",
          title: "操作",
          dataKey: "Operations",
          width: width,
          cellRenderer: ({ rowData }) => (
            <ElButton
              size="small"
              type="danger"
              onClick={() => deleteRow(rowData.eventsname)}
            >
              Delete
            </ElButton>
          ),
        },
      ];
    };
    const updateColumnWidths = () => {
      columns.value = setColumnWidths();
    };

    onMounted(() => {
      updateColumnWidths(); // 初始化列的宽度
      window.addEventListener("resize", updateColumnWidths);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateColumnWidths);
    });
    const SubmitEvent = async () => {
      const response = await axios.post(
        `${config.server_address}/events/saveevents`,
        {
          description: description.value,
          eventsname: input.value,
          startTime: value1.value + "T" + value2.value,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      if (response.data.code === "200") {
        ElMessage({
          message: "保存成功",
          type: "success",
        });
        uploadevents();
        dialogVisible.value = false;
      } else {
        ElMessage.error("保存失败");
      }
      console.log(input.value);
      console.log(description.value);
      console.log(value1.value);
      console.log(value2.value);
      console.log(value1.value + " " + value2.value);
      // dialogVisible.value = false;
    };

    const deleteRow = async (eventsname) => {
      console.log("eventsname:", eventsname);
      try {
        const response = await axios.post(
          `${config.server_address}/events/deleteevents`,
          {
            eventsname: eventsname,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.code === "200") {
          ElMessage({
            message: "删除成功",
            type: "success",
          });
          data.value = data.value.filter(
            (row) => row.eventsname !== eventsname
          );
        } else {
          ElMessage.error("删除失败");
        }
      } catch (error) {
        ElMessage.error("删除失败");
      }
    };
    const data = ref([]);
    // const data = [
    //   {
    //     time: "12",
    //     eventsname: "牛逼",
    //     nexttime: time1.value,
    //     description: "暂时没有",
    //   },
    // ];
    const uploadevents = async () => {
      const response = await axios.post(
        `${config.server_address}/events/showevents`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      data.value = response.data.data;
      const len = data.value.length;
      const nowdate = dayjs();

      for (let i = 0; i < len; i++) {
        const date = dayjs(data.value[i].starttime); //开始时间
        const diffday = nowdate.diff(date, "day"); //现在和开始时间相差的天数
        const diffyear = nowdate.diff(date, "year"); //现在和开始时间相差的年数
        console.log("相差天数" + diffday);
        console.log("相差年数" + diffyear);

        if (diffyear < 1) {
          if (diffday <= 100) {
            let date100 = date.add(100, "day");
            data.value[i].nexttime = date100;
            data.value[i].nexttimename = "100天纪念日";

            console.log(
              date100.format("YYYY年MM月DD日 HH:ss") + "日期小于100天"
            );
          } else {
            let date1year = date.add(1, "year");
            data.value[i].nexttime = date1year;
            data.value[i].nexttimename = "1年纪念日";
            console.log(
              date1year.format("YYYY年MM月DD日 HH:ss") + "日期小于一年"
            );
          }
        } else if (diffyear < 2) {
          let date2year = date.add(2, "year");
          data.value[i].nexttime = date2year;
          data.value[i].nexttimename = "2年纪念日";
          console.log(
            date2year.format("YYYY年MM月DD日 HH:ss") + "日期小于两年"
          );
        } else if (diffyear < 3) {
          if (diffday <= 1000) {
            let date1000 = date.add(1000, "day");
            data.value[i].nexttime = date1000;
            data.value[i].nexttimename = "1000天纪念日";
            console.log(
              date1000.format("YYYY年MM月DD日 HH:ss") + "日期小于1000天"
            );
          } else {
            let date3year = date.add(3, "year");
            data.value[i].nexttime = date3year;
            data.value[i].nexttimename = "3年纪念日";
            console.log(
              date3year.format("YYYY年MM月DD日 HH:ss") + "日期小于三年"
            );
          }
        } else {
          let dateNyear = date.add(diffyear + 1, "year");
          data.value[i].nexttime = dateNyear;
          data.value[i].nexttimename = diffyear + 1 + "年纪念日";
          console.log(
            dateNyear.format("YYYY年MM月DD日 HH:ss") + "日期小于",
            diffyear,
            "年"
          );
        }
      }

      // console.log(json);
      // console.log(events);
      // console.log(events);
    };
    uploadevents();
    return {
      columns,
      data,
      dialogVisible,
      uploadevents,
      input,
      value1,
      value2,
      description,
      clearInputs,
      SubmitEvent,
      deleteRow,
    };
  },
};
</script>
<style>
.window {
  width: 100%;
  height: 100vh;
  /* 只是为了可视化这个div，实际开发中可去掉 */
}
</style>
