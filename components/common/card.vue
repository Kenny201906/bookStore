<template>
  <view class="card">
    <!-- header -->
    <view v-if="showHead" class=" p-2 border-bottom main-border-color">
      <slot name="title">
        <text v-if="headerTitle" class="font-md font-weight">{{ headerTitle }}</text>
      </slot>
    </view>
    <!-- body -->
    <view>
      <u-image v-if="bodyCover" :src="bodyCover" mode="widthFix" lazy-load="true"></u-image>
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 头部标题
    headerTitle: String,
    // 是否显示封面
    bodyCover: String,
    showHead: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style></style>
