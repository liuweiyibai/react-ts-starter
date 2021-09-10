import React from 'react';
import styles from './styles/LiveButton.module.less';

import iconUpper from '../../assets/images/icon-upper.png';
import { Popover } from 'antd';

export interface ILiveButtonProps {
  icon?: string;
  title?: string;
  hasUpperIcon?: boolean;
  hasBadge?: boolean;
  badgeNum?: number;
  isDisable?: boolean;
  hoverTitle?: string;
  PopoverContent?: React.ReactNode;
  onClick?: () => void;
}

class LiveButton extends React.Component<ILiveButtonProps> {
  render() {
    const { props } = this;
    const { PopoverContent } = props;
    return (
      <div className={styles['live-tool-button']}>
        <div className={styles['main']} onClick={props.onClick}>
          <img className={styles['main-icon']} src={props.icon} />
          <div className={styles['title']}>{props.title}</div>
        </div>

        <div className={styles['top-right']}>
          {props.hasBadge && (props.badgeNum as number) > 0 && (
            <span className={styles['badge-num']}>{props.badgeNum}</span>
          )}
          {props.hasUpperIcon && (
            <Popover
              placement="top"
              arrowPointAtCenter
              content={PopoverContent}
              trigger="click"
            >
              <img className={styles['upper-icon']} src={iconUpper} />
            </Popover>
          )}
        </div>
      </div>
    );
  }
}

export default LiveButton;
