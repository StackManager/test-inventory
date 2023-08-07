import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import PublicLayout from './components/layout/PublicLayout';
import { HomeController } from './pages/HomeController';
import { HomeDashboard } from './pages/HomeDashboard';
import { HomeItems } from './pages/HomeItems';
import { SignUpController } from './pages/SignUpController';
import { PublicMiddleware } from './utils/middleware/Route/PublicMiddleware';
import { RequireAuthMiddleware } from './utils/middleware/Route/RequireAuthMiddleware';

export const AppRoutes = () => {
  return (
    
      <Routes>
        <Route 
          path="/" 
          element={<PublicMiddleware><PublicLayout /></PublicMiddleware>}>
          
          <Route 
            path="/" 
            element={<HomeController />} ></Route>

          <Route 
            path="/signup" 
            element={<SignUpController />} ></Route>
          
        </Route>

        <Route element={
          <RequireAuthMiddleware>
            <AdminLayout />
          </RequireAuthMiddleware>}>

                <Route
                          path="/dashboard"
                          element={<HomeDashboard />}>
              
                </Route>
                <Route
                          path="/items"
                          element={<HomeItems />}>
              
                </Route>
      
          </Route>  

      </Routes>
      
  );
};


