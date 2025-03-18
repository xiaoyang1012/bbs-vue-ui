<template>
  <a-layout>
    <a-layout id="components-layout-basic">
      <IndexHeader class="header"/>
      <a-layout-content>
        <main class="content">
          <!-- 最新评论 -->
          <LatestComment style="background: #fff;"/>
          <a-row>
            <a-col :span="24" style="height: 10px;"/>
          </a-row>
        </main>
      </a-layout-content>
      <FooterButtons v-if="!$store.state.collapsed"/>
    </a-layout>
  </a-layout>
</template>

<script>
  import IndexHeader from "@/components/index/head/IndexHeader";
  import FooterButtons from "@/components/utils/FooterButtons";
  import LatestComment from "@/components/right/LatestComment";

  export default {
    name: "",

    components: {
      IndexHeader,
      FooterButtons,
      LatestComment
    }

  }
</script>

<style scoped>
  #components-layout-basic .header {
    position: fixed;
    z-index: 999;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #00000021;
  }

  #components-layout-basic .content {
    margin-top: 64px;
    width: 100%;
    max-width: 400px;
  }

  #components-layout-basic .ant-layout-header, .ant-layout-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #components-layout-basic .ant-layout-header {
    background: #fff;
    height: auto;
    line-height: 2.3;
  }
</style>