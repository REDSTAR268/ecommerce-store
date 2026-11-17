
function NavIcon({ name }) {
  const common = {
    width: 21,
    height: 21,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true
  };

  switch (name) {
    case "Cart":
      return (
        <svg {...common}>
          <path d="M3 3h2l2.5 12h11l2-8H6" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
      );

    case "Checkout":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18M7 15h4" />
        </svg>
      );

    default:
      return null;
  }
}

function Navbar({
  activePage,
  onNavigate,
  cartCount,
  theme,
  toggleTheme
}) {
  const pages = [
  "Home",
  "Categories",
  "Products",
  "Contact",
  "Cart",
  "Checkout"
  ];

  return (
    <nav className="navbar">
      <button
        className="navbar-logo"
        onClick={() => onNavigate("Home")}
      >
        NOVA STORE<span>.</span>
      </button>

      <div className="nav-links">
        {pages.map((page) => (
          <button
            key={page}
            className={`nav-link ${activePage === page ? "active" : ""}`}
            onClick={() => onNavigate(page)}
            title={page}
            aria-label={page}
            aria-current={activePage === page ? "page" : undefined}
          >
            {["Home", "Categories", "Products", "Contact"].includes(page) ? (
              <span>{page}</span>
            ) : (
              <NavIcon name={page} />
            )}

            {page === "Cart" && cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        ))}

        <button
          className="theme-button"
          onClick={toggleTheme}
          title={theme === "light" ? "Dark Mode" : "Light Mode"}
          aria-label={
            theme === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
        >
          <span className="theme-icon">
            {theme === "light" ? "☾" : "☀"}
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
