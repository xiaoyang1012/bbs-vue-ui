<template>
  <div id="left-buttons">
    <!-- 点赞 -->
    <div class="like-div">
      <a-badge class="badge" :count="likeCount || 0" :overflow-count="999" :number-style="isLike ? {
        backgroundColor: $store.state.themeColor,
        boxShadow: '0 0 0 1px ' + $store.state.themeColor+ ' inset',
      } : {
        backgroundColor: '#c2c8d1',
        boxShadow: '0 0 0 1px #c2c8d1 inset',
      }">
        <div @click="likeAction" class="like-icon-container" style="background: #fff;">
          <i class="iconfont icon-like"
             :style="isLike ? 'color:' + $store.state.themeColor : 'color: #8a919f;'"></i>
        </div>
      </a-badge>
    </div>

    <!-- 评论 -->
    <!--    <div class="comment-div">-->
    <!--      <a-badge class="badge" :count="data.commentCount || 100" :overflow-count="999" :number-style="{-->
    <!--        backgroundColor: '#c2c8d1',-->
    <!--        boxShadow: '0 0 0 1px #c2c8d1 inset',-->
    <!--      }">-->
    <!--        <a href="#article-comment-all">-->
    <!--          <div class="comment-icon-container" style="background: #fff;">-->
    <!--            <i class="iconfont icon-comment" style="color: #8a919f;"></i>-->
    <!--          </div>-->
    <!--        </a>-->
    <!--      </a-badge>-->
    <!--    </div>-->

  </div>
</template>

<script>

import articleService from "@/service/articleService";

export default {
  data() {
    return {
      likeCount: 0,
      isLike: false
    };
  },

  methods: {
    // 获取文章一些统计数据
    getArticleCountById() {
      articleService.getArticleCountById(this.$route.params.id)
        .then((res) => {
          this.likeCount = res.data;
        })
        .catch(err => {
          // this.$message.error(err.desc);
        });
    },

    // 点赞/取消点赞
    likeAction() {
      if (this.isLike) {
        // 取消点赞
        this.isLike = !this.isLike;
        this.likeCount = this.likeCount > 0 ? this.likeCount - 1 : 0;
        console.log("----> isLike = ", this.isLike, "  likeCount = ", this.likeCount);
        return;
      }
      articleService.likeArticleById(this.$route.params.id)
        .then(() => {
          this.isLike = true;
          this.likeCount = this.likeCount > 0 ? this.likeCount + 1 : 1;
          console.log("isLike = ", this.isLike, "  likeCount = ", this.likeCount);
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    }
  },

  mounted() {
    this.getArticleCountById();
  }
};
</script>

<style lang="less">
#left-buttons {
  position: fixed;
  z-index: 888;

  .like-icon-container {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    text-align: center;
    cursor: pointer;

    i {
      font-size: 20px;
      line-height: 45px;
    }
  }

  .comment-div {
    margin-top: 20px;
  }

  .comment-icon-container {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    text-align: center;
    cursor: pointer;

    i {
      line-height: 45px;
      font-size: 20px;
    }
  }
}
</style>
