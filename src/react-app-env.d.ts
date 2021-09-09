/* eslint-disable */
/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly REACT_APP_ZEGO_APP_ID: number;
    readonly REACT_APP_ZEGO_SERVER: string;
    readonly REACT_APP_BASE_API: string;
  }
}

declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.png';
declare module '*.jpg';

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.ogg' {
  const value: any;
  export default value;
}
