import Link from "next/link";

const Navbar: React.VFC = () => {
  return (
    <nav
      className="navbar is-warning"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">
            <h1 className="title">Movis</h1>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
