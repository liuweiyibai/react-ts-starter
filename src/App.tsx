import { FC } from 'react';
import { HashRouter } from 'react-router-dom';
import RenderRouter from 'routes/index';

const App: FC = () => {
  return (
    <HashRouter>
      <RenderRouter />
    </HashRouter>
  );
};

export default App;
