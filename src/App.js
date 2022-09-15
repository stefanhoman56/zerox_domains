import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

function App() {
  return (
    <BrowserRouter basename='/zerox_test'>
      <Router />
    </BrowserRouter>
  );
}

export default App;
