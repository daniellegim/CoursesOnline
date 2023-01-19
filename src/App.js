import {Route,Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
function App() {
  
  return (
    <Layout>
    <Routes>
      <Route exact  path='/auth' element={<AuthPage />}>
        
      </Route>
    </Routes>
  </Layout>
  );
}

export default App;
