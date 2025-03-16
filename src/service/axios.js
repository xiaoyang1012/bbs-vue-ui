import axios from "axios";
import store from "@/store/index";
// 设置xhr请求超时时间和baseURL（毫秒）
axios.defaults.timeout = 15000;
if (process.env.NODE_ENV === "production") {
  // axios.defaults.baseURL = "http://bbs.nanshengbbs.top";
}
export default (() => {

  // 每次请求前处理
  axios.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
  );

  // 每次请求回来的处理
  axios.interceptors.response.use(
      function (response) {
        // // 后台会在响应头带上用户头像链接，每次和存在store中的比较，不同就替换，实现头像更新
        // if (response.headers["x-user-picture"]) {
        //   store.state.picture = response.headers["x-user-picture"];
        // }
        // // 后台会在响应头带上用户任务提醒和消息通知的数量，存在store里面，
        // if (response.headers["x-system-notify-count"]) {
        //   store.state.systemNotifyCount = response.headers["x-system-notify-count"];
        // }
        // if (response.headers["x-task-notify-count"]) {
        //   store.state.taskNotifyCount = response.headers["x-task-notify-count"];
        // }
        // 和后台约定好响应码为200且响应体的code字段为0的时候才算成功
        console.log('response---> ' + JSON.stringify(response));
        if (response.status === 200) {
          return Promise.resolve(response.data);
        } else {
          // 响应码不是200则返回一个失败的Promise
          return Promise.reject(response);
        }
      },
      function (error) {
        return Promise.reject(error);
      }
  );
})();
