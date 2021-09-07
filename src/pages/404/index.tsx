import { Button } from 'antd';
import { Component } from 'react';

/* eslint-disable */
interface INoMatchPageProps {}

interface INoMatchPageState {}

/**
 * 404 page
 */
export default class NoMatchPage extends Component<
  INoMatchPageProps,
  INoMatchPageState
> {
  constructor(props: INoMatchPageProps) {
    super(props);
  }

  render() {
    return (
      <div style={{ textAlign: 'center', padding: 30 }}>
        <div style={{ fontSize: 40 }}>404~</div>
        <Button
          type="primary"
          onClick={() => {
            console.log(3);
          }}
        >
          返回
        </Button>
      </div>
    );
  }
}
