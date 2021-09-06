import React from 'react';
import {
  observable,
  reaction,
  action,
  runInAction,
  makeObservable,
} from 'mobx';
import { observer, inject } from 'mobx-react';

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
  @observable onClick;
  @observable onUpperClick;

  constructor(props: ILiveButtonProps) {
    super(props);

    this.onClick = props.onClick;
    this.onUpperClick = props.onUpperClick;
  }

  render() {
    const { props } = this;

    return (
      <div className={styles['live-tool-button']}>
        <div className={styles['main']} onClick={this.onClick}>
          <img className={styles['main-icon']} src={props.icon} />
          <div className={styles['title']}>{props.title}</div>
        </div>

        <div className={styles['top-right']}>
          {props.hasBadge && (props.badgeNum as number) > 0 && (
            <span className={styles['badge-num']}>{props.badgeNum}</span>
          )}
          {props.hasUpperIcon && (
            <img
              className={styles['upper-icon']}
              src={iconUpper}
              onClick={this.onUpperClick}
            />
          )}
        </div>
      </div>
    );
  }
}

export default observer(LiveButton);
