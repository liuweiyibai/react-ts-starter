import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const handleCallback = () => navigate(-1);
  return (
    <div>
      发大幅度
      <Button onClick={handleCallback}>返回上一页</Button>
    </div>
  );
}

export default Dashboard;
