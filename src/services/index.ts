import HYRequest from "./request";

const hyRequest = new HYRequest({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },

  // 请求拦截器
  interceptors: {
    // 请求成功的拦截,判断token是否存在
    requestSuccessFn: (config) => {
      return config;
    },
  },
});

export default hyRequest;
