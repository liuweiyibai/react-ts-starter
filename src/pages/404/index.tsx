import { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

// interface INoMatchPageProps {}

// interface INoMatchPageState {}

/**
 * 404 page
 */
// export default class NoMatchPage extends Component<
//   INoMatchPageProps,
//   INoMatchPageState
// > {
//   constructor(props: INoMatchPageProps) {
//     super(props);
//   }

//   render() {
//     return (
//       <div style={{ textAlign: 'center', padding: 30 }}>
//         <div style={{ fontSize: 40 }}>404~</div>
//         <Button
//           type="primary"
//           onClick={() => {
//             console.log(3);
//           }}
//         >
//           返回
//         </Button>
//       </div>
//     );
//   }
// }

const NoMatchPage = () => {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    let i = 5;
    const timer = setInterval(() => {
      setSeconds(--i);
      if (i === 0) {
        clearInterval(timer);
        navigate(`/login${'?from=' + encodeURIComponent(location.pathname)}`, {
          replace: true,
        });
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Result
      status="404"
      title="404"
      subTitle="页面未找到"
      extra={
        <Button
          type="primary"
          onClick={() =>
            navigate(
              `/login${'?from=' + encodeURIComponent(location.pathname)}`,
              { replace: true },
            )
          }
        >
          {seconds}后退出登录，您也可以点击返回gloabal.tips.goToLogin
        </Button>
      }
    />
  );
};

export default NoMatchPage;
