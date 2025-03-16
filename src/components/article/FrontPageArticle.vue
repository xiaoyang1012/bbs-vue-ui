<template>
  <div id="main-article-content">
    <a-list item-layout="vertical" size="large" :data-source="tempData">
      <a-list-item slot="renderItem" key="item.title" slot-scope="item, index" style="cursor: pointer;" @click="routerArticleDetail(item.id)">
        <!-- 用户/标题 -->
        <a-list-item-meta :description="item.title">
          <a-avatar slot="avatar" :src="item.picture ? item.picture : require('@/assets/img/default_avatar.png')"
                    @click.stop="routerUserCenter(item.createUser)"/>
          <a slot="title" class="username" @click.stop="routerUserCenter(item.createUser)">
            <div class="left">
              <span slot="title" style="padding-right: 2px;"> {{ item.createdUserName }} </span>
              <small style="color: #b5b9b9; padding-left: 10px" v-text="$utils.showtime(item.createdAt)"></small>
            </div>
          </a>
        </a-list-item-meta>
        <div class="article-content">
          {{ item.description }}
        </div>
      </a-list-item>
    </a-list>
    <div style="text-align: center; padding-bottom: 20px;" v-if="!hasNext && finish">
      <a-divider/>
      {{ $t("common.noAgain") }}
    </div>
  </div>
</template>
<script>
import userService from "@/service/userService";
import articleService from "@/service/articleService";

export default {
  props: {
    data: {type: Array, default: []},
    pageSize: {type: Number, default: 0},
    current: {type: Number, default: 1},
    finish: {type: Boolean, default: false},
    hasNext: {type: Boolean, default: false},
    isUserCenter: {type: Boolean, default: false},
    userId: {type: Number, default: 0},
    isAdminAudit: {type: Boolean, default: false},
  },
  data() {
    return {
      tempData: this.data,
      actions: [
        {type: 'eye', text: '156'},
        {type: 'like-o', text: '156'},
        {type: 'message', text: '2'},
        {type: 'ellipsis', text: '12'},
      ],
    };
  },

  methods: {
    // 路由到文章详情页面
    routerArticleDetail(articleId) {
      let routeData = this.$router.resolve("/detail/" + articleId);
      window.open(routeData.href, '_blank');
    },

    // 路由到用户中心页面
    routerUserCenter(userId) {
      let routeData = this.$router.resolve("/user/" + userId);
      window.open(routeData.href, '_blank');
    },

    // 路由到标签文章页面
    routerLabelToArticle(labelId) {
      let routeData = this.$router.resolve("/label/" + labelId);
      window.open(routeData.href, '_blank');
    },

    // 路由到Book说明页面
    routerBook() {
      let routeData = this.$router.resolve("/book");
      window.open(routeData.href, '_blank');
    },

    // 路由到文章编辑页面
    routerArticleEdit(articleId) {
      this.$router.push("/edit/" + articleId);
    },
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
// 浏览量、点赞、评论取消竖杠
#main-article-content em.ant-list-item-action-split {
  display: none;
}

#main-article-content .ant-list-vertical .ant-list-item-action > li:first-child {
  padding-left: 0;
}

#main-article-content .ant-list-vertical .ant-list-item-action > li {
  padding: 0 12px;
}

#main-article-content .label-titleMap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

#main-article-content .label-name {
  color: #8a919f;
}

#main-article-content .label-name:hover {
  color: #13c2c2;
}

#main-article-content .username {
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: baseline;
  }
}

#main-article-content .ant-list-item-meta-description {
  font-weight: 700;
  font-size: 16px;
  color: #1d2129;
  line-height: 22px;
}

#main-article-content .ant-list-item-meta-description, .article-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

#main-article-content .collectLikeComment:hover {
  color: #13c2c2;
}

#main-article-content li.ant-list-item {
  padding: 20px;
  // 防止文章内容过长导致的显示异常
  .ant-list-item-main {
    // 随意设置一个比较小的值即可
    width: 50%;
  }
}

#main-article-content li.ant-list-item:hover {
  background: #f4f5f57a;
}

// 文章题图样式调整
#main-article-content .ant-list-item-extra img {
  max-height: 113px;
  max-width: 150px;
  width: auto;
}

@media screen and (max-width: 576px) {
  .ant-list-vertical .ant-list-item-extra {
    margin: 0 auto 16px;
  }
}
</style>
