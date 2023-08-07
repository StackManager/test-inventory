import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="container-fluid">
      {/* <NavBar /> */}
      <div className="App">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  )
};

export default PublicLayout;