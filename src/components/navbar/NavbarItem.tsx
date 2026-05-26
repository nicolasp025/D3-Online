import { useLocation, useNavigate } from "react-router";

interface NavbarItemProps {
  path: string;
  icon: React.ReactNode;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ path, icon }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`navbar-item${location.pathname === `/${path}` ? " active" : ""}`}
      onClick={() => {
        navigate(path);
      }}
    >
      {icon}
    </div>
  );
};

export default NavbarItem;
