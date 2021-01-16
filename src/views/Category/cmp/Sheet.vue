<template>
  <div class="box">
    <div class="tabs" @click="typeShow = true">
      <p>分类</p>
    </div>
    <div class="tabs tabs-statr" @click="playShow = true">
      <p class="">{{ playValue }}</p>
    </div>
    <div class="tabs" @click="scoreShow = true">
      <p>评分</p>
    </div>
  </div>

  <!-- 分类 -->
  <van-action-sheet
    v-model:show="typeShow"
    title="选择分类"
    :style="{ height: '40%' }"
    @close="onClose"
  >
    <div class="score-box">
      <van-checkbox-group v-model="typeArr" direction="horizontal">
        <template v-for="item of typeList" :key="item.name">
          <van-checkbox :name="item.id">{{ item.name }}</van-checkbox>
        </template>
      </van-checkbox-group>

      <div class="but">
        <van-button type="primary" size="small" @click="onDetermine">确定</van-button>
      </div>
    </div>
  </van-action-sheet>

  <!-- 是否上映 -->
  <van-popup v-model:show="playShow" round position="bottom" :style="{ height: '30%' }">
    <van-picker
      show-toolbar
      :columns="playArr"
      value-key="name"
      :default-index="1"
      @confirm="onConfirm"
      @cancel="playShow = false"
    >
    </van-picker>
  </van-popup>

  <!-- 评分 -->
  <van-action-sheet v-model:show="scoreShow" title="选择评分范围" :style="{ height: '30%' }">
    <div class="score-box">
      <p>当前评分范围：<span>&nbsp;{{ scoreArr[0] }}&nbsp;</span>~<span>&nbsp;{{ scoreArr[1] }}&nbsp;</span>分</p>
      <van-slider
        v-model="scoreArr"
        range
        :min="0"
        :max="10"
        @change="onChange">
      </van-slider>
    </div>
  </van-action-sheet>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, computed } from "vue";

import { Picker, Popup, Slider, ActionSheet, Checkbox, CheckboxGroup, Button } from 'vant';

import { Rank, Play, Category, UpdataCategoryData } from "/@/types/rank";

interface Score {
  ids:number
  name:string
}



export default defineComponent({
  props: {
    typeList: {
      type: Array as PropType<Category[] | []>,
      required: true,
    }
  },

  emits: {
    "updataCategory": null
  },

  components: {
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Slider.name]: Slider,
    [ActionSheet.name]: ActionSheet,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Button.name]: Button,
  },

  setup(props, ctx) {
    const typeShowRef = ref(false);
    const typeArrRef = ref<number[]>([]);
    const typeTempArrRef = ref<number[]>([]); // 临时

    const playArrRef = ref<Play[]>([
      { name: "全部", type: "" },
      { name: "已上映", type: "1" },
      { name: "未上映", type: "0" },
    ]);
    const playShowRef = ref(false);
    const playValueRef = ref(playArrRef.value[1].name);
    const playTypeRef = ref(playArrRef.value[1].type);

    const scoreArrRef = ref<number[]>([0, 10]);
    const scoreShowRef = ref(false);

    // 确定
    const onDetermine = () => {
      typeTempArrRef.value = typeArrRef.value;
      typeShowRef.value = false;
      const obj:UpdataCategoryData = {
        type: typeArrRef.value,
        status: playTypeRef.value,
        rate: scoreArrRef.value
      };
      ctx.emit("updataCategory", obj);
    };

    // 关闭分类
    const onClose = () => {
      typeArrRef.value = typeTempArrRef.value;
    };

    // 选择上映类型
    const onConfirm = (value:Play) => {
      playShowRef.value = false;
      playValueRef.value = value.name;
      playTypeRef.value = value.type;

      const obj:UpdataCategoryData = {
        type: typeArrRef.value,
        status: value.type,
        rate: scoreArrRef.value
      };
      console.log(obj);
      
      ctx.emit("updataCategory", obj);
    };

    // 关闭
    const onConfirmScore = (value:Score) => {
      scoreShowRef.value = false;
    }

    const onChange = (val:number[]) => {
      const obj:UpdataCategoryData = {
        type: typeArrRef.value,
        status: playTypeRef.value,
        rate: val
      };
      ctx.emit("updataCategory", obj);
    };


    return {
      typeShow: typeShowRef,
      typeArr: typeArrRef,
      playArr: playArrRef,
      playShow: playShowRef,
      playValue: playValueRef,
      scoreArr: scoreArrRef,
      scoreShow: scoreShowRef,
      onConfirmScore,
      onChange,
      onConfirm,
      onDetermine,
      onClose,
    }
  }
})


</script>

<style lang="less" scoped>
.box {
  // border: 1px solid #000;
  display: flex;
  border-bottom: 1px solid #dcdfe6;
  

  .tabs {
    position: relative;
    top: 0;
    left: 0;
    height: 41px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #606266;
    font-size: 13px;
  }

  .tabs-statr::before,
  .tabs-statr::after {
    position: absolute;
    content: "";
    display: block;
    height: 20px;
    top: 10px;
  }

  .tabs-statr::after {
    right: 0;
    border-right: 1px solid #e8e8e8;
  }

  .tabs-statr::before {
    left: 0;
    border-left: 1px solid #e8e8e8;
  }
}

.score-box {
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 40px;

  .but,
  p {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  p {
    span {
      font-weight: bold;
    }
  }
}
</style>