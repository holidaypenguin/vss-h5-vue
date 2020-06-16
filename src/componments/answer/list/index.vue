<template>
  <div class="p-list">
    <div class="p-list-body">
      <div class="p-list-wrap"
        v-for="(item, index) in list" :key="item.id">
        <div class="p-list-head">
          <b>{{item.remark}}</b><br>
          {{item.text}}
        </div>
        <!-- 排序题 -->
        <div class="p-list-choice" v-if="item.kind === 5">
        </div>
        <!-- 填空题 -->
        <div class="p-list-choice" v-else-if="item.kind === 4">
        </div>
        <!-- 多选 -->
        <div class="p-list-choice" v-else-if="item.kind === 2">
          <van-checkbox-group v-model="params[index].checkList"
            :max="item.max || 0"
            >
            <van-checkbox
              v-for="option in item.optoins"
              :key="option.id"
              :name="option.id"
              shape="square"
              :disabled="disabledOption(option, index)"
              @click="optionHandler(option, index)"
              >
              <span v-if="option.regulars" style="display: flex">
                {{option.text.replace('{}', '')}}
                <div class="p-list-choice-input">
                  <van-field v-model="params[index].text" label="" />
                </div>
              </span>
              <span v-else>{{option.text}}</span>
            </van-checkbox>
          </van-checkbox-group>

        </div>
        <!-- 单选 判断题 -->
        <div class="p-list-choice" v-else-if="item.kind === 1 || item.kind === 3">
          <van-radio-group v-model="params[index].checked">
            <van-radio
              v-for="option in item.optoins"
              :key="option.id"
              :name="option.id">

              <span v-if="option.regulars" style="display: flex">
                {{option.text.replace('{}', '')}}
                <div class="p-list-choice-input">
                  <van-field v-model="params[index].text" label="" />
                </div>
              </span>
              <span v-else>{{option.text}}</span>
            </van-radio>
          </van-radio-group>

          <!-- <div class="p-list-item">
            <div class="p-list-item-left"></div>
            <div class="p-list-item-right"></div>
          </div>

          <div class="p-list-item">
            <div class="p-list-item-left"></div>
            <div class="p-list-item-right"></div>
          </div> -->

        </div>
      </div>
    </div>
    <div class="p-list-bottom">
      <div class="p-list-bottom-button">
        <van-button type="info" plain>上一题</van-button>
      </div>
      <div class="p-list-bottom-button">
        <van-button type="info" plain>下一题</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import vm from './vm'
export default vm
</script>

<style lang="postcss">
@import './index.postcss'
</style>
