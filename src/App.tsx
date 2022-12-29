import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import {Header} from "./components/Header";
import {WeatherPage} from "./pages/WeatherPage";
import {CityPage} from "./pages/CityPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<><Header /> <Outlet /></>}>
            <Route path={'/'} element={<WeatherPage />}/>
            <Route path='*' element={<Navigate to={'/'} />}/>
            <Route path={'/city/:city'} element={<CityPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}
export default App
