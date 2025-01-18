import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  label: string;
  className?: string;
  onClick?: MouseEvent;
}

function NavLink({ to, label, className }: NavLinkProps) {
  return (
    <Link  to={to} className={className}> {label} </Link>
  );
}
export default NavLink;