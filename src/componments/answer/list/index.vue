<template>
  <div class="p-list">
    <div class="p-list-body">
      <div class="p-list-wrap"
        v-for="(item, index) in list" :key="item.id"
        v-show="index === currentIndex">
        <div class="p-list-head">
          <!-- <b>{{item.remark}}</b><br> -->
          {{item.text.replace('{}', '')}}
        </div>
        <!-- 排序题 -->
        <div class="p-list-choice" v-if="item.kind == 5">
          <van-checkbox-group v-model="params[index].checkList"
            :max="item.max || 0"
            >
            <van-checkbox
              v-for="option in item.options"
              :key="option.id"
              :name="option.id"
              shape="square"
              :disabled="disabledOption(option, index)"
              @click="optionHandler(option, index)"
              :class="[
                'p-list-choice-check',
                `p-list-choice-check--${getIndex(option, index)}`,
              ]"
              >
              <span v-if="option.regulars" style="display: flex; width: 100%;">
                {{option.text.replace('{}', '')}}
                <div class="p-list-choice-input">
                  <van-field v-model="params[index].text" label=""  @click.prevent.stop/>
                </div>
              </span>
              <span v-else>{{option.text}}</span>
            </van-checkbox>
          </van-checkbox-group>
        </div>
        <!-- 填空题 -->
        <div class="p-list-choice" v-else-if="item.kind == 4">
          <div class="p-list-choice-input">
            <van-field v-model="params[index].text" label="" />
          </div>
        </div>
        <!-- 多选 -->
        <div class="p-list-choice" v-else-if="item.kind == 2">
          <van-checkbox-group v-model="params[index].checkList"
            :max="item.max || 0"
            @change="changeHandler(index)"
            >
            <van-checkbox
              v-for="option in item.options"
              :key="option.id"
              :name="option.id"
              shape="square"
              :disabled="disabledOption(option, index)"
              @click="optionHandler(option, index)"
              >
              <span v-if="option.regulars" style="display: flex; width: 100%;">
                {{option.text.replace('{}', '')}}
                <div class="p-list-choice-input">
                  <van-field v-model="params[index].text" label=""  @click.prevent.stop/>
                </div>
              </span>
              <span v-else>{{option.text}}</span>
            </van-checkbox>
          </van-checkbox-group>

        </div>
        <!-- 单选 判断题 -->
        <div class="p-list-choice" v-else-if="item.kind == 1 || item.kind == 3">
          <van-radio-group v-model="params[index].checked">
            <van-radio
              v-for="option in item.options"
              :key="option.id"
              :name="option.id">

              <span v-if="option.regulars" style="display: flex; width: 100%;">
                {{option.text.replace('{}', '')}}
                <div class="p-list-choice-input">
                  <van-field v-model="params[index].text" label="" @click.prevent.stop/>
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

        <div class="p-list-error" v-if="item.error">
          {{item.error}}
        </div>
      </div>
    </div>
    <div class="p-list-bottom" v-if="listLength > 0">
      <div class="p-list-bottom-button">
        <van-button type="info" plain :disabled="isFirst"
          @click="prepareHandler">上一题</van-button>
      </div>
      <div class="p-list-bottom-button">
        <van-button type="info" plain v-if="!isEnd"
          @click="nextHandler">下一题</van-button>
        <van-button type="info" plain v-else
          @click="commitHandler">提交</van-button>
      </div>

      <div class="p-list-bottom-num">
        {{currentIndex + 1}} / {{listLength}}
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
