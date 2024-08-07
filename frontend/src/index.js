import ReactDOM from 'react-dom/client';
import init from './utils/init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init());
};

app();
