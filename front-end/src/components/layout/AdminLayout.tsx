import { Outlet } from "react-router-dom";
import { AdminLayoutHeader } from "./AdminLayoutHeader";

const AdminLayout = () => {
  return (
      <>
        <AdminLayoutHeader></AdminLayoutHeader>

        <main className="flex-shrink-0">
          <div className="container">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Outlet />
          </div>
        </main>

        <footer className="footer mt-auto py-3 bg-light">
          <div className="container">
            <span className="text-muted">Inventary - by Angel Ruiz</span>
          </div>
        </footer>
    </>
  )
};

export default AdminLayout;