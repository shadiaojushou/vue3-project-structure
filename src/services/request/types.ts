import type {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  CreateAxiosDefaults,
  AxiosResponse,
} from "axios";

// HYInterceptors: 用于添加拦截器
export interface HYInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: any) => InternalAxiosRequestConfig;
  requestFailureFn?: (err: any) => any;
  responseSuccessFn?: (res: T) => T;
  responseFailureFn?: (err: any) => any;
}

// HYRequestConfig: 用于创建实例时的配置
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYInterceptors<T>;
}

// CreateRequestConfig: 用于创建axios实例时的配置
export interface CreateRequestConfig<T = AxiosResponse>
  extends CreateAxiosDefaults {
  interceptors?: HYInterceptors<T>;
}
