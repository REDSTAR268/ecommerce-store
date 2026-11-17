import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { products } from "./data/products";
import livingRoom from "./assets/banners/living-room.jpg";
import livingRoomTwo from "./assets/banners/living-2room.jpg";
import market from "./assets/banners/market.jpg";
import pcRoom from "./assets/banners/pc-room.jpg";
import pcRoomTwo from "./assets/banners/pc-2room.jpg";
import ProductCard from "./components/ProductCard";
import Checkout from "./components/Checkout";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
  localStorage.setItem("theme", theme);
  }, [theme]);

  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("activePage") || "Home";
  });

  useEffect(() => {
  localStorage.setItem("activePage", activePage);
  }, [activePage]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  // HOME PAGE IMAGE SLIDER
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    {
      image: livingRoom,
      title: "Beautiful Living Spaces",
      description: "Discover furniture and decorations for your dream home."
    },
    {
      image: livingRoomTwo,
      title: "Make Your Home Special",
      description: "Explore stylish furniture and modern home collections."
    },
    {
      image: market,
      title: "Explore Our Collections",
      description: "Find amazing products for your everyday needs."
    },
    {
      image: pcRoom,
      title: "Upgrade Your Workspace",
      description: "Discover computers and accessories for your workspace."
    },
    {
      image: pcRoomTwo,
      title: "Technology Made Simple",
      description: "Explore electronics designed for your everyday life."
    }
  ];

 // Automatically change slides every 12 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((previous) =>
        (previous + 1) % sliderImages.length
      );
    }, 12000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cartItems");

  return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
  );
  }, [cartItems]);
  
  const cartSubtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
  );

  const pages = [
    "Home",
    "Products",
    "Categories",
    "Product Details",
    "Cart",
    "Checkout"
  ];

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  function formatPrice(price) {
    return `₦${price.toLocaleString("en-NG")}`;
  }

  function handleAddToCart(product) {
  setCartItems((previousItems) => {
    const existingProduct = previousItems.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      return previousItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [
      ...previousItems,
      { ...product, quantity: 1 }
    ];
  });
  }



  // REMOVE PRODUCT FROM CART
  function handleRemoveFromCart(productId) {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => item.id !== productId
      )
    );
  }

  // UPDATE PRODUCT QUANTITY

  function handleQuantityChange(productId, change) {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity + change
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }


  function handlePlaceOrder(orderDetails) {
    console.log("Order received:", orderDetails);

    setCartItems([]);
  }

  // Search, category filtering, and price sorting
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "low-to-high") {
        return a.price - b.price;
      }

      if (sortOrder === "high-to-low") {
        return b.price - a.price;
      }

      return 0;
    });

  function renderPage() {
    switch (activePage) {

        case "Categories":
        return (
        <section className="products-section">

          <div className="section-heading">
            <p className="eyebrow">EXPLORE OUR STORE</p>
            <h1>Shop by Category</h1>
            <p>Discover products from our different collections.</p>
          </div>

          <div className="category-grid">

            {[...new Set(
              products.map((product) => product.category)
            )].map((category) => (

              <button
                className="category-card"
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setActivePage("Products");
                }}
              >
                <h3>{category}</h3>
                <span>Explore Collection →</span>
              </button>

            ))}

          </div>

        </section>
      );

      // HOME PAGE
      case "Home": {
        const homeCategories = [
          ...new Set(products.map((product) => product.category))
        ];

        const featuredProducts = products.slice(0, 4);

        return (
          <div className="home-page">

            {/* 1. HOME PAGE IMAGE SLIDER */}
            <section className="hero-slider">

              <img
                key={currentSlide}
                src={sliderImages[currentSlide].image}
                alt={sliderImages[currentSlide].title}
                className="hero-slide-image"
              />

                <div
                  key={`content-${currentSlide}`}
                  className="hero-slider-overlay"
                >
                <div
                  key={`text-${currentSlide}`}
                  className="hero-slide-text"
                >
                  <p className="eyebrow">WELCOME TO SHOPSPHERE</p>

                  <h1>{sliderImages[currentSlide].title}</h1>

                  <p>
                    Explore quality products, discover amazing
                    collections, and enjoy a simple shopping experience.
                  </p>

                  <p>{sliderImages[currentSlide].description}</p>
                </div>

                {/* SEARCH BAR */}
                <form
                  className="hero-search"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSelectedCategory("All");
                    setActivePage("Products");
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <button type="submit">Search</button>
                </form>

                <button
                  className="primary-button"
                  onClick={() => setActivePage("Products")}
                >
                  Shop Now
                </button>

                {/* SLIDER CONTROLS */}
                <div className="slider-controls">

                  <button
                    onClick={() =>
                      setCurrentSlide((previous) =>
                        (previous - 1 + sliderImages.length) %
                        sliderImages.length
                      )
                    }
                  >
                    ❮
                  </button>

                  <span>
                    {currentSlide + 1} / {sliderImages.length}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentSlide((previous) =>
                        (previous + 1) % sliderImages.length
                      )
                    }
                  >
                    ❯
                  </button>

                </div>

              </div>
            </section>


            {/* 2. SHOP BY CATEGORY */}
            <section className="home-categories">

              <div className="section-heading">

                <p className="eyebrow">EXPLORE OUR COLLECTIONS</p>

                <h1>Shop by Category</h1>

                <p>Find exactly what you are looking for.</p>

              </div>

              <div className="category-grid">

                {homeCategories.map((category) => (

                  <button
                    className="category-card"
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setActivePage("Products");
                    }}
                  >

                    <h3>{category}</h3>

                    <span>Explore Collection →</span>

                  </button>

                ))}

              </div>

            </section>


            {/* 3. FEATURED PRODUCTS */}
            <section className="featured-section">

              <div className="featured-heading">

                <div>

                  <p className="eyebrow">HANDPICKED FOR YOU</p>

                  <h2>Featured Products</h2>

                  <p>Discover some of our popular collections.</p>

                </div>

                <button
                  className="featured-view-all"
                  onClick={() => {
                    setSelectedCategory("All");
                    setActivePage("Products");
                  }}
                >
                  View All Products →
                </button>

              </div>

              <div className="product-grid">

                {featuredProducts.map((product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    formatPrice={formatPrice}
                    onAddToCart={handleAddToCart}
                    onViewDetails={(selected) => {
                      setSelectedProduct(selected);
                      setActivePage("Product Details");
                    }}
                  />

                ))}

              </div>

            </section>


            {/* 4. STORE BENEFITS */}
            <section className="home-benefits">

              <div>

                <h3>🚚 Reliable Delivery</h3>

                <p>
                  Enjoy convenient shopping and delivery
                  information for your orders.
                </p>

              </div>

              <div>

                <h3>🔒 Secure Shopping</h3>

                <p>
                  Enjoy a simple and secure shopping
                  experience.
                </p>

              </div>

              <div>

                <h3>⭐ Quality Products</h3>

                <p>
                  Discover carefully selected products
                  for everyday living.
                </p>

              </div>

            </section>

          </div>
        );
      }

      // PRODUCTS PAGE
      case "Products":
        return (
          <section className="products-section">

            <div className="section-heading">
              <p className="eyebrow">OUR COLLECTION</p>
              <h1>Explore Our Products</h1>
              <p>Discover something special for yourself.</p>
            </div>

            {/* SEARCH, CATEGORY FILTER AND SORTING */}
            <div className="product-controls">

              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>

                {[...new Set(
                  products.map((product) => product.category)
                )].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Default Sorting</option>
                <option value="low-to-high">
                  Price: Low to High
                </option>
                <option value="high-to-low">
                  Price: High to Low
                </option>
              </select>

            </div>

            {/* PRODUCT GRID */}
            <div className="product-grid">

              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    formatPrice={formatPrice}
                    onAddToCart={handleAddToCart}
                    onViewDetails={(selected) => {
                      setSelectedProduct(selected);
                      setActivePage("Product Details");
                    }}
                  />
                ))
              ) : (
                <p className="no-products">
                  No products found. Try another search.
                </p>
              )}

            </div>

          </section>
        );

      // PRODUCT DETAILS PAGE
      case "Product Details":
        return selectedProduct ? (
          <section className="details-section">

            <div className="details-card">

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />

              <div>

                <p className="product-category">
                  {selectedProduct.category}
                </p>

                <h1>{selectedProduct.name}</h1>

                <p>{selectedProduct.description}</p>

                <h2>{formatPrice(selectedProduct.price)}</h2>

                <button
                  className="primary-button"
                  onClick={() => setActivePage("Cart")}
                >
                  Continue to Cart
                </button>

              </div>

            </div>

          </section>
        ) : (
          <section className="page-content">

            <h1>Product Details</h1>

            <p>Select a product from our Products page first.</p>

            <button
              className="primary-button"
              onClick={() => setActivePage("Products")}
            >
              Browse Products
            </button>

          </section>
        );

      // CART PAGE
      case "Cart":
        return (
          <section className="cart-section">

            <div className="section-heading">
              <p className="eyebrow">YOUR SHOPPING</p>
              <h1>Shopping Cart</h1>
              <p>Review your selected products.</p>
            </div>

            {cartItems.length === 0 ? (

              <div className="empty-cart">
                <h2>Your cart is empty.</h2>
                <p>Discover something special in our store.</p>

                <button
                  className="primary-button"
                  onClick={() => setActivePage("Products")}
                >
                  Explore Products
                </button>
              </div>

            ) : (

              <div className="cart-container">

                <div className="cart-items">

                  {cartItems.map((item) => (

                    <div className="cart-item" key={item.id}>

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-info">

                        <p className="product-category">
                          {item.category}
                        </p>

                        <h3>{item.name}</h3>

                        <p>{formatPrice(item.price)}</p>

                        <div className="quantity-controls">

                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, -1)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, 1)
                            }
                          >
                            +
                          </button>

                        </div>

                        <button
                          className="remove-button"
                          onClick={() =>
                            handleRemoveFromCart(item.id)
                          }
                        >
                          Remove
                        </button>

                      </div>

                      <strong className="cart-item-total">
                        {formatPrice(item.price * item.quantity)}
                      </strong>

                    </div>

                  ))}

                </div>

                <div className="cart-summary">

                  <h2>Order Summary</h2>

                  <div className="summary-row">
                    <span>Items</span>
                    <span>
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  </div>

                  <div className="summary-row">
                    <span>Subtotal</span>
                    <strong>{formatPrice(cartSubtotal)}</strong>
                  </div>

                  <div className="summary-total">
                    <span>Total</span>
                    <strong>{formatPrice(cartSubtotal)}</strong>
                  </div>

                  <button
                    className="primary-button"
                    onClick={() => setActivePage("Checkout")}
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    className="view-button"
                    onClick={() => setActivePage("Products")}
                  >
                    Continue Shopping
                  </button>

                </div>

              </div>

            )}

          </section>
        );
        
      // CONTACT PAGE
      case "Contact":
        return <Contact />;

      // CHECKOUT PAGE
        case "Checkout":
          return (
          <Checkout
            cartItems={cartItems}
            formatPrice={formatPrice}
            cartSubtotal={cartSubtotal}
            onPlaceOrder={handlePlaceOrder}
            onReturnHome={() => setActivePage("Home")}
          />
          );

      default:
        return null;
    }
  }

  // MAIN APPLICATION
  return (
    <div className={`app ${theme}`}>

      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
        cartCount={cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        )}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main>
        {renderPage()}
      </main>

      <footer className="footer">
        <p>© 2026 ShopSphere. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
