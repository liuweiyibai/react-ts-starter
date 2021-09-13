import type { FallbackProps } from 'react-error-boundary';
import { Result, Button, Typography } from 'antd';

const { Paragraph, Text } = Typography;

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Result
      status="error"
      title="代码错误"
      subTitle="检查代码"
      extra={[
        <Button type="primary" key="console">
          刷新
        </Button>,
        <Button key="buy" onClick={resetErrorBoundary}>
          重试
        </Button>,
      ]}
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            代码错误
          </Text>
        </Paragraph>
        <Paragraph>
          <pre>{error.message}</pre>
        </Paragraph>
      </div>
    </Result>
  );
}

export default ErrorFallback;
