<template>
  <div id="main-article-content">
    <a-list item-layout="vertical" size="large" :data-source="tempData">
      <a-list-item slot="renderItem" key="item.id" slot-scope="item, index" style="cursor: pointer;"
                   @click="routerArticleDetail(item.id)">
        <div class="article-content">
          <div class="article-content-left">
            <div class="title">{{ item.title }}</div>
            <div class="description">{{ item.description }}</div>
            <div class="foot">
              <div class="foot-user">{{ item.createdUserName }}</div>
              <div style="flex: 1"></div>
              <div class="foot-create" v-text="$utils.showtime(item.createdAt)"></div>
            </div>
          </div>
          <div v-if="item && item.pic" class="article-content-right" :style="{borderColor: $store.state.themeColor}">
            <img :src="item.pic" alt="" class="img">
          </div>
        </div>
      </a-list-item>
    </a-list>
    <div style="text-align: center; padding-bottom: 20px;" v-if="!hasNext && finish">
      <a-divider />
      {{ $t("common.noAgain") }}
    </div>
  </div>
</template>
<script>

export default {
  props: {
    data: { type: Array, default: [] },
    pageSize: { type: Number, default: 0 },
    current: { type: Number, default: 1 },
    finish: { type: Boolean, default: false },
    hasNext: { type: Boolean, default: false },
    isUserCenter: { type: Boolean, default: false },
    userId: { type: Number, default: 0 },
    isAdminAudit: { type: Boolean, default: false }
  },
  data() {
    return {
      tempData: this.data,
      actions: [
        { type: "eye", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" },
        { type: "ellipsis", text: "12" }
      ]
    };
  },

  methods: {
    // 路由到文章详情页面
    routerArticleDetail(articleId) {
      let routeData = this.$router.resolve("/detail/" + articleId);
      window.open(routeData.href, "_blank");
    },

    // 路由到用户中心页面
    routerUserCenter(userId) {
      let routeData = this.$router.resolve("/user/" + userId);
      window.open(routeData.href, "_blank");
    },

    // 路由到标签文章页面
    routerLabelToArticle(labelId) {
      let routeData = this.$router.resolve("/label/" + labelId);
      window.open(routeData.href, "_blank");
    },

    // 路由到Book说明页面
    routerBook() {
      let routeData = this.$router.resolve("/book");
      window.open(routeData.href, "_blank");
    },

    // 路由到文章编辑页面
    routerArticleEdit(articleId) {
      this.$router.push("/edit/" + articleId);
    }
  },

  mounted() {
  },

  watch: {
    // data值改变时触发
    data: {
      handler(newVal, oldVal) {
        this.tempData = newVal;
      }
    }
  }

};
</script>

<style lang="less">

#main-article-content li.ant-list-item {
  padding: 10px;
  // 防止文章内容过长导致的显示异常
  .ant-list-item-main {
    // 随意设置一个比较小的值即可
    width: 50%;
  }
}

@media screen and (max-width: 576px) {
  .ant-list-vertical .ant-list-item-extra {
    margin: 0 auto 16px;
  }
}

.article-content {
  width: 100%;
  max-height: 300px;
  display: flex;

  .article-content-left {
    flex: 1; /* 占据剩余空间 */
    min-width: 0; /* 防止内容溢出 */
    padding-right: 8px; /* 与右侧元素的间距 */

    .title {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      width: 100%;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    .description {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 限制两行 */
      -webkit-box-orient: vertical;
      line-height: 1.5; /* 根据字体大小调整 */

      /* 兼容性处理 */
      word-break: break-word;
      max-height: 3em; /* line-height × 行数 */
      height: 42px;
    }

    .foot {
      width: 100%;
      height: 20px;
      display: flex;
      margin-top: 10px;
      color: #b5b9b9;

      .foot-user {

      }

      .foot-create {
        margin-right: 8px;
      }
    }
  }

  /* 当右侧不存在时的处理 */

  .article-content-left:only-child {
    padding-right: 0;
    width: 100%;
  }

  .article-content-right {
    border-radius: 5px;
    width: 150px;
    max-height: 100px;
    border: #2c3e50 1.5px solid;
  }

  .article-content-right img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    object-fit: cover; /* 保持比例，裁剪多余部分 */
    object-position: center; /* 可选：控制裁剪区域居中 */
  }
}
</style>
