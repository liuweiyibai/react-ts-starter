/* eslint-disable */
/// <reference types="react-scripts" />
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.png';
declare module '*.jpg';

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
