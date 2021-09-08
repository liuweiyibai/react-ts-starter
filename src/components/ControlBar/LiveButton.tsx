import React from 'react';
// import {
//   observable,
//   reaction,
//   action,
//   runInAction,
//   makeObservable,
// } from 'mobx';
// import { observer } from 'mobx-react';

import styles from './styles/LiveButton.module.less';

import iconUpper from '../../assets/images/icon-upper.png';

export interface ILiveButtonProps {
  icon?: string;
  title?: string;
  hasUpperIcon?: boolean;
  hasBadge?: boolean;
  badgeNum?: number;
  isDisable?: boolean;
  hoverTitle?: string;
  onClick?: () => void;
  onUpperClick?: () => void;
}

class LiveButton extends React.Component<ILiveButtonProps> {
  handleTogglePopover = () => {
    const { props } = this;
    props?.hasUpperIcon && props?.onUpperClick?.();
  };
  render() {
    const { props } = this;
    return (
      <div
        className={styles['live-tool-button']}
        onClick={this.handleTogglePopover}
      >
        <div className={styles['main']} onClick={props.onClick}>
          <img className={styles['main-icon']} src={props.icon} />
          <div className={styles['title']}>{props.title}</div>
        </div>

        <div className={styles['top-right']} onClick={this.handleTogglePopover}>
          {props.hasBadge && (props.badgeNum as number) > 0 && (
            <span className={styles['badge-num']}>{props.badgeNum}</span>
          )}
          {props.hasUpperIcon && (
            <img className={styles['upper-icon']} src={iconUpper} />
          )}
        </div>
      </div>
    );
  }
}

export default LiveButton;
