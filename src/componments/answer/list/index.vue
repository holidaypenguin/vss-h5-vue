<template>
  <div class="p-list">
    <div class="p-list-body">
      <panel>
      <div class="p-list-wrap"
        v-for="(item, index) in list" :key="item.id"
        v-show="index === currentIndex">
        <div class="p-list-title">
          第{{currentIndex + 1}}题：（{{item.kind | enum(kindOpts)}}）
          <span class="p-list-title-num">{{currentIndex + 1}}</span>/{{listLength}}
        </div>
        <div class="p-list-head">
          <!-- <b>{{item.remark}}</b><br> -->
          {{item.text.replace('{}', '')}}
        </div>
        <div class="p-list-msg" v-if="item.kind === '2'">
          <span v-if="item.min">请至少选择{{item.min}}项，</span>
          <span v-if="item.max">请最多选择{{item.max}}项，</span>
          <span v-if="!item.min && !item.max">请选择多项，</span>
          请您认真选择
        </div>
        <div v-else-if="item.kind === '5'">
        </div>
        <div class="p-list-msg" v-else>
          {{item.kind | enum(msgOpts)}}
        </div>
        <!-- 排序题 -->
        <div class="p-list-choice" v-if="item.kind == 5">
          <van-checkbox-group v-model="params[index].checkList"
            :max="item.max || 0"
            @change="orderchangeHandler(index)"
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
              <span class="p-list-choice-body"
                v-if="option.regulars && option.regulars[0]">
                {{option.text.replace('{}', '')}}
                <div class="p-list-choice-input">
                  <c-input
                    v-model="params[index].text"
                    :disabled="params[index].checked !== option.id"
                    :type="option.regulars[0].kind"
                    :max="option.regulars[0].maxval"
                    :min="option.regulars[0].minval"
                  />
                </div>
              </span>
              <span v-else>{{option.text}}</span>
            </van-checkbox>
          </van-checkbox-group>
        </div>
        <!-- 填空题 -->
        <div class="p-list-choice" v-else-if="item.kind == 4">
          <div class="p-list-choice-input">
            <c-input
              v-model="params[index].text"
              :type="item.regulars[0].kind"
              :max="item.regulars[0].maxval"
              :min="item.regulars[0].minval"
            />
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
              <span class="p-list-choice-body"
                v-if="option.regulars && option.regulars[0]">
                {{option.text.replace('{}', '')}}
                <div class="p-list-choice-input">
                  <c-input
                    v-model="params[index].text"
                    :disabled="params[index].checked !== option.id"
                    :type="option.regulars[0].kind"
                    :max="option.regulars[0].maxval"
                    :min="option.regulars[0].minval"
                  />
                </div>
              </span>
              <span v-else>{{option.text}}</span>
            </van-checkbox>
          </van-checkbox-group>

        </div>
        <!-- 单选 判断题 -->
        <div class="p-list-choice" v-else-if="item.kind == 1 || item.kind == 3">
          <van-radio-group v-model="params[index].checked"
            @change="singleChangeHandler(index)">
            <van-radio
              v-for="option in item.options"
              :key="option.id"
              :name="option.id">

              <span class="p-list-choice-body"
                v-if="option.regulars && option.regulars[0]">
                {{option.text.replace('{}', '')}}
                <div class="p-list-choice-input">
                  <c-input
                    v-model="params[index].text"
                    :disabled="params[index].checked !== option.id"
                    :type="option.regulars[0].kind"
                    :max="option.regulars[0].maxval"
                    :min="option.regulars[0].minval"
                  />
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
      </panel>
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
          @click="nextHandler">提交</van-button>
      </div>

      <!-- <div class="p-list-bottom-num">
        {{currentIndex + 1}} / {{listLength}}
      </div> -->
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
