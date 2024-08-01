import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/NavBar";
import LiveChat from "../components/LiveChat/LiveChat";

function RootLayout() {
  //---redux---

  return (
    <>
      <Navigation></Navigation>
      <LiveChat></LiveChat>
      <Outlet></Outlet>
    </>
  );
}
export default RootLayout;
