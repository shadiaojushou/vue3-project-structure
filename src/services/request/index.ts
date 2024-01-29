import axios from "axios";
import type { AxiosInstance } from "axios";
import type {
  HYInterceptors,
  CreateRequestConfig,
  HYRequestConfig,
} from "./types";
import { ElMessageBox } from "element-plus";

class HYRequest {
  instance: AxiosInstance;
  interceptors?: HYInterceptors;

  constructor(config: CreateRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);

    // 保存基本信息

    this.interceptors = config.interceptors;

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    // 针对特定的hyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      // 请求拦截
      (config) => {
        return config;
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      // 响应拦截
      (res) => {
        const { code, msg } = res.data;
        if (code === "00000") {
          return res.data;
        }
        // 响应数据为二进制流处理(Excel导出)
        if (res.data instanceof ArrayBuffer) {
          return res;
        }

        ElMessage.error(msg || "系统出错");
        return Promise.reject(new Error(msg || "Error"));
      },
      (err) => {
        if (err.response.data) {
          const { code, msg } = err.response.data;
          // token 过期,重新登录
          if (code === "A0230") {
            ElMessageBox.confirm("当前页面已失效，请重新登录", "提示", {
              confirmButtonText: "确定",
              type: "warning",
            }).then(() => {
              localStorage.clear();
              window.location.href = "/";
            });
          } else {
            ElMessage.error(msg || "系统出错");
          }
        }
        return Promise.reject(err.message);
      }
    );
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: HYRequestConfig<T>) {
    // 1.单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config as any);
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }

          // 将结果返回
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "GET" });
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "POST" });
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "DELETE" });
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "PATCH" });
  }
  put<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "PUT" });
  }
}

export default HYRequest;
