import { Routes, Route } from 'react-router-dom';

import Navigation from './components/navigation/navigation.component.jsx';
import Home from './routes/home/home.component.jsx'
import Auth from './routes/authentication/authentication.component.jsx';


const Shop = () => {
  return <h1>Shop page</h1>
}

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Auth />} />
      </Route>
    </Routes>
  )

}

export default App;
