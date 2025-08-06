
let cart = [];
let products = [];


const sampleProducts = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 2999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        description: "High-quality wireless headphones with noise cancellation and 20-hour battery life."
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: 8999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring."
    },
    {
        id: 3,
        name: "Portable Phone Charger",
        price: 1499,
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop",
        description: "10000mAh power bank with fast charging support for all your devices."
    },
    {
        id: 4,
        name: "Cotton Casual T-Shirt",
        price: 599,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        description: "Comfortable 100% cotton t-shirt available in multiple colors and sizes."
    },
    {
        id: 5,
        name: "Leather Wallet",
        price: 1299,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop",
        description: "Premium genuine leather wallet with multiple card slots and coin pocket."
    },
    {
        id: 6,
        name: "Wireless Mouse",
        price: 899,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        description: "Ergonomic wireless mouse with precision tracking and long battery life."
    },
    {
        id: 7,
        name: "Stainless Steel Water Bottle",
        price: 799,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
        description: "Insulated water bottle that keeps drinks hot for 12 hours or cold for 24 hours."
    },
    {
        id: 8,
        name: "Bluetooth Speaker",
        price: 2499,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
        description: "Portable Bluetooth speaker with 360-degree sound and waterproof design."
    },
    {
        id: 9,
        name: "Reading Glasses",
        price: 1199,
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
        description: "Stylish reading glasses with anti-glare coating and comfortable fit."
    },
    {
        id: 10,
        name: "Desk Organizer",
        price: 1599,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
        description: "Bamboo desk organizer with multiple compartments for office supplies."
    },
    {
        id: 11,
        name: "Phone Case",
        price: 499,
        image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=300&fit=crop",
        description: "Protective phone case with shock absorption and wireless charging compatibility."
    },
    {
        id: 12,
        name: "Coffee Mug Set",
        price: 899,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=300&fit=crop",
        description: "Set of 2 ceramic coffee mugs with elegant design and comfortable handles."
    }
];


document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeApp();
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Failed to initialize the application. Please refresh the page.');
    }
});


function initializeApp() {
    products = [...sampleProducts];
    loadProducts();
    updateCartCount();
    setupEventListeners();
    console.log('App initialized successfully');
}


function setupEventListeners() {
    try {
        
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', function() {
                showCartSummary();
            });
        }

        
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}


function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) {
        console.error('Products grid element not found');
        return;
    }

    try {
        
        productsGrid.innerHTML = '<div class="loading">Loading products...</div>';

        
        setTimeout(() => {
            renderProducts();
        }, 500);

    } catch (error) {
        console.error('Error loading products:', error);
        showError('Failed to load products. Please try again.');
    }
}


function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) {
        console.error('Products grid element not found');
        return;
    }

    try {
        if (products.length === 0) {
            productsGrid.innerHTML = '<div class="error">No products available at the moment.</div>';
            return;
        }

        const productsHTML = products.map(product => createProductCard(product)).join('');
        productsGrid.innerHTML = productsHTML;

        
        setupAddToCartButtons();

    } catch (error) {
        console.error('Error rendering products:', error);
        productsGrid.innerHTML = '<div class="error">Error displaying products. Please refresh the page.</div>';
    }
}


function createProductCard(product) {
    try {
        return `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="product-image"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="product-image" style="display: none;">Image not available</div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">₹${product.price.toLocaleString()}</div>
                    <p class="product-description">${product.description}</p>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error creating product card:', error);
        return '<div class="error">Error loading product</div>';
    }
}


function setupAddToCartButtons() {
    try {
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = parseInt(this.getAttribute('data-product-id'));
                addToCart(productId);
            });
        });

    } catch (error) {
        console.error('Error setting up add to cart buttons:', error);
    }
}


function addToCart(productId) {
    try {
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            console.error('Product not found:', productId);
            showNotification('Product not found!', 'error');
            return;
        }

        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCartCount();
        showNotification(`${product.name} added to cart!`, 'success');
        
        console.log('Cart updated:', cart);

    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Failed to add item to cart!', 'error');
    }
}


function updateCartCount() {
    try {
        const cartCountElement = document.getElementById('cartCount');
        
        if (cartCountElement) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = totalItems;
            
            
            cartCountElement.classList.add('updated');
            setTimeout(() => {
                cartCountElement.classList.remove('updated');
            }, 500);
        }

    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}


function showCartSummary() {
    try {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const cartItems = cart.map(item => 
            `${item.name} - ₹${item.price.toLocaleString()} x ${item.quantity}`
        ).join('\n');
        
        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const cartSummary = `Cart Items:\n${cartItems}\n\nTotal: ₹${totalAmount.toLocaleString()}`;
        
        alert(cartSummary);

    } catch (error) {
        console.error('Error showing cart summary:', error);
        alert('Error loading cart summary!');
    }
}


function showNotification(message, type = 'info') {
    try {
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#10b981';
                break;
            case 'error':
                notification.style.backgroundColor = '#ef4444';
                break;
            default:
                notification.style.backgroundColor = '#3b82f6';
        }

        
        document.body.appendChild(notification);

        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);

    } catch (error) {
        console.error('Error showing notification:', error);
        
        alert(message);
    }
}


function showError(message) {
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.innerHTML = `<div class="error">${message}</div>`;
    }
    console.error(message);
}


function scrollToProducts() {
    try {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    } catch (error) {
        console.error('Error scrolling to products:', error);
    }
}


function formatCurrency(amount) {
    try {
        return `₹${amount.toLocaleString()}`;
    } catch (error) {
        console.error('Error formatting currency:', error);
        return `₹${amount}`;
    }
}


function searchProducts(query) {
    try {
        if (!query || query.trim() === '') {
            products = [...sampleProducts];
        } else {
            const searchTerm = query.toLowerCase().trim();
            products = sampleProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        }
        renderProducts();
    } catch (error) {
        console.error('Error searching products:', error);
        showError('Error performing search. Please try again.');
    }
}


function filterByCategory(category) {
    try {
        if (!category || category === 'all') {
            products = [...sampleProducts];
        } else {
            products = sampleProducts.filter(product =>
                product.category && product.category.toLowerCase() === category.toLowerCase()
            );
        }
        renderProducts();
    } catch (error) {
        console.error('Error filtering products:', error);
        showError('Error filtering products. Please try again.');
    }
}


function clearCart() {
    try {
        cart = [];
        updateCartCount();
        showNotification('Cart cleared!', 'info');
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
}


window.MyShop = {
    addToCart,
    clearCart,
    searchProducts,
    filterByCategory,
    showCartSummary,
    scrollToProducts
};


document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden - pausing activities');
    } else {
        console.log('Page visible - resuming activities');
    }
});


window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    showNotification('An unexpected error occurred!', 'error');
});


window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('An unexpected error occurred!', 'error');
});

console.log('MyShop script loaded successfully');
