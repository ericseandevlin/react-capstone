import { Routes, Route } from 'react-router-dom';

import Navigation from './components/navigation/navigation.component.jsx';
import Home from './routes/home/home.component.jsx'
import Auth from './routes/authentication/authentication.component.jsx';
import Shop from './routes/shop/shop.component.jsx';
import Checkout from './routes/checkout/checkout.component'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Auth />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )

}

export default App;
