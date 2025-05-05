import React, { useState, useEffect, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ServiceTypeModal from './ServiceTypeModal';
import NoteModal from './NoteModal';
import Receipt from './Receipt';
import PromotionModal from './PromotionModal';
import CustomizeModal from './CustomizeModal';
import PaymentModal from './PaymentModal';
import TableOccupancyModal from './TableOccupancyModal';
import Modal from '@/Components/Modal';
import { 
    DocumentTextIcon, 
    ShoppingCartIcon, 
    PencilIcon, 
    TrashIcon, 
    BanknotesIcon, 
    HomeIcon,
    ShoppingBagIcon,
    MapPinIcon,
    PlusIcon,
    ClipboardDocumentIcon,
    ClockIcon,
    XMarkIcon,
    QueueListIcon
} from '@heroicons/react/24/solid';
import OrderDetailsModal from './OrderDetailsModal';
import DiscountModal from './DiscountModal';

// ActiveOrdersModal Component
const ActiveOrdersModal = ({ isOpen, onClose, activeOrders, activeOrderId, onOrderSelect }) => {
    const pendingOrders = activeOrders.filter(order => order.status === 'pending');
    
    return isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-2xl max-h-[80vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center bg-blue-700 text-white rounded-t-lg">
                    <h2 className="text-xl font-bold">Commandes actives</h2>
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-200"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-4 overflow-auto flex-grow">
                    {pendingOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                            <ShoppingCartIcon className="h-12 w-12 mb-2" />
                            <p className="text-lg font-medium">Aucune commande active</p>
                            <p className="text-sm">Créez une nouvelle commande pour commencer</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pendingOrders.map(order => (
                                <div 
                                    key={order.id}
                                    onClick={() => {
                                        onOrderSelect(order.id);
                                        onClose();
                                    }}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                                        activeOrderId === order.id 
                                            ? 'bg-blue-50 border-blue-300 shadow-sm' 
                                            : 'bg-white border-gray-200 hover:border-blue-200'
                                    }`}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                                            order.type === 'eat_in' 
                                                ? 'bg-green-100 text-green-800' 
                                                : order.type === 'takeout' 
                                                    ? 'bg-blue-100 text-blue-800' 
                                                    : 'bg-purple-100 text-purple-800'
                                        }`}>
                                            {order.type === 'eat_in' ? 'Sur Place' : order.type === 'takeout' ? 'À Emporter' : 'Livraison'}
                                        </span>
                                        <span className="font-medium text-sm text-gray-500">{order.timestamp}</span>
                                    </div>
                                    
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">{order.id}</span>
                                        <span className="font-bold text-blue-700">{order.total ? order.total.toFixed(2) : '0.00'} MAD</span>
                                    </div>
                                    
                                    {order.table_number && (
                                        <div className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded inline-block">
                                            Table {order.table_number}
                                            {order.numberOfPeople && ` - ${order.numberOfPeople} pers.`}
                                        </div>
                                    )}
                                    
                                    <div className="mt-2 text-sm text-gray-600">
                                        <span>{order.items ? order.items.reduce((sum, item) => sum + item.quantity, 0) : 0} articles</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="border-t border-gray-200 p-3 bg-gray-50 rounded-b-lg flex justify-between">
                    <div className="text-sm text-gray-600">
                        <span className="font-medium">{pendingOrders.length}</span> commande{pendingOrders.length !== 1 ? 's' : ''} active{pendingOrders.length !== 1 ? 's' : ''}
                    </div>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-medium"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

// Note: menuData is now defined in the PosIndex component to avoid ReferenceError

// ProductGrid Component
const ProductGrid = ({ categoryId, onProductSelect, menuData }) => {
    // Find the selected category and its products
    const category = menuData.find(cat => cat.id === categoryId);
    const products = category ? category.products : [];
    
    // Generate random placeholder images for products without images
    const getRandomImage = (productId) => {
        const imageTypes = ['food', 'drink', 'dessert', 'restaurant'];
        const type = imageTypes[productId % imageTypes.length];
        return `https://source.unsplash.com/300x200/?${type}`;
    };
    
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 p-3">
            {products.map((product) => (
                <div
                    key={product.id}
                    onClick={() => onProductSelect(product)}
                    className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden transform hover:-translate-y-1"
                >
                    <div className="relative h-28 sm:h-32 overflow-hidden">
                        <img
                            src={product.image || getRandomImage(product.id)}
                            alt={product.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                                e.target.src = `https://source.unsplash.com/300x200/?${product.name.split(' ')[0].toLowerCase()}`;
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-xs opacity-90 line-clamp-2">{product.description}</p>
                        </div>
                    </div>
                    <div className="p-2">
                        <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate">{product.name}</h3>
                        <div className="mt-1 flex justify-between items-center">
                            <span className="text-sm font-bold text-blue-600">{product.price.toFixed(2)} MAD</span>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-medium hover:bg-blue-700">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
// Category icons mapping
const categoryIcons = {
    1: "🍱", // Plats
    2: "🥤", // Boissons
    3: "🍕", // Pizzas
    4: "🍰", // Desserts
    5: "🥗", // Salades
    6: "🍝", // Pâtes
    7: "🦞", // Fruits de Mer
    8: "🥪", // Sandwich
};

// Add image URLs for each category
const categoryImages = {
    1: "/images/categ_images/pasta.png", // Plats - using pasta image temporarily, update with appropriate image if available
    2: "/images/categ_images/boisson_image.png", // Boissons (drinks)
    3: "/images/categ_images/pasta.png", // Pizzas - using pasta image temporarily, update with appropriate image if available
    4: "/images/categ_images/cake.png", // Desserts (cake/pastry)
    5: "/images/categ_images/salad.png", // Salades (salad)
    6: "/images/categ_images/pasta.png", // Pâtes (pasta)
    7: "/images/categ_images/seafood.png", // Fruits de Mer (seafood)
    8: "/images/categ_images/pasta.png", // Sandwich - using pasta image temporarily, update with appropriate image if available
};

// CategoryCards Component
const CategoryCards = ({ onCategorySelect, menuData }) => {
    // Category color mapping
    const categoryColors = {
        1: "#FF9AA2", // Plats Principaux - Soft red
        2: "#FFB7B2", // Entrées - Soft salmon
        3: "FFDAC1", // Desserts - Soft peach
        4: "#E2F0CB", // Boissons Non-Alcoolisées - Soft green
        5: "#B5EAD7", // Boissons Alcoolisées - Soft mint
        6: "#C7CEEA", // Snacks - Soft blue
        7: "#F6E6C2", // Produits de Boulangerie - Soft cream
        8: "#E8D7F1"  // Boissons Chaudes - Soft purple
    };

    // Category icon mapping
    const categoryIcons = {
        1: "🍱", // Plats
        2: "🥤", // Boissons
        3: "🍕", // Pizzas
        4: "🍰", // Desserts
        5: "🥗", // Salades
        6: "🍝", // Pâtes
        7: "🦞", // Fruits de Mer
        8: "🥪", // Sandwich
    };

    return (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-4">
            {menuData.map(category => (
                <div
                    key={category.id}
                    onClick={() => onCategorySelect(category.id)}
                    className="relative rounded-lg shadow-md overflow-hidden cursor-pointer group h-32 flex flex-col justify-end bg-gray-100 transition-transform duration-300 transform hover:scale-105"
                    style={{ backgroundColor: categoryColors[category.id] + '30' }}
                >
                    <img
                        src={categoryImages[category.id]}
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 z-0"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 transition-all duration-300 group-hover:from-black/80 group-hover:via-black/50" />
                    <div className="relative z-20 flex flex-col items-center justify-end h-full w-full pb-2 px-2">
                        <h3 className="text-white text-base font-extrabold drop-shadow-lg text-center mb-1 truncate w-full tracking-wide">
                            {category.name}
                        </h3>
                        <span className="inline-block bg-white/80 text-gray-900 text-xs font-semibold rounded-full px-3 py-0.5 mb-1 shadow">
                            {category.products.length} articles
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ProductSection Component
const ProductSection = ({ onProductSelect, activeCategory, menuData }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Update selectedCategory when activeCategory changes (from filter buttons)
    useEffect(() => {
        setSelectedCategory(activeCategory);
    }, [activeCategory]);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };
    const handleBackToCategories = () => {
        setSelectedCategory(null);
    };

    // Get the category name for the selected category
    const categoryName = selectedCategory ? 
        menuData.find(cat => cat.id === selectedCategory)?.name : null;

    // Get the category icon for the selected category
    const getCategoryIcon = (categoryId) => {
        const icons = {
            1: "🍱", // Plats
            2: "🥤", // Boissons
            3: "🍕", // Pizzas
            4: "🍰", // Desserts
            5: "🥗", // Salades
            6: "🍝", // Pâtes
            7: "🦞", // Fruits de Mer
            8: "🥪", // Sandwich
        };
        return icons[categoryId] || "📋";
    };

    return (
        <div className="relative">
            {selectedCategory ? (
                <>
                    <div className="flex items-center mb-2 px-4 pt-3">
                        <button
                            onClick={handleBackToCategories}
                            className="flex items-center gap-1 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 rounded-md"
                        >
                            <svg 
                                className="w-4 h-4 text-gray-600" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Retour</span>
                        </button>
                        
                        {/* Display the category name */}
                        <div className="ml-4 text-lg font-bold text-gray-700 flex items-center">
                            <span className="mr-2 text-xl">{getCategoryIcon(selectedCategory)}</span>
                            <span>{categoryName}</span>
                        </div>
                    </div>
                    <ProductGrid
                        categoryId={selectedCategory}
                        onProductSelect={onProductSelect}
                        menuData={menuData}
                    />
                </>
            ) : (
                <CategoryCards onCategorySelect={handleCategorySelect} menuData={menuData} />
            )}
        </div>
    );
};

const PosIndex = ({ auth }) => {
    // User name for display
    const userName = auth.user.first_name && auth.user.last_name 
        ? `${auth.user.first_name} ${auth.user.last_name}`
        : auth.user.name || auth.user.email;
        
    // Static Categories Data
    const [categories] = useState([
        { id: 1, name: "Plats", color: "#4F46E5" }, // Indigo for main dishes
        { id: 2, name: "Boissons", color: "#10B981" }, // Emerald for drinks
        { id: 3, name: "Pizzas", color: "#F59E0B" }, // Amber for pizzas
        { id: 4, name: "Desserts", color: "#EC4899" }, // Pink for desserts
        { id: 5, name: "Salades", color: "#34D399" }, // Emerald for salads
        { id: 6, name: "Pâtes", color: "#F97316" }, // Orange for pasta
        { id: 7, name: "Fruits de Mer", color: "#87CEEB" }, // Sky blue for seafood
        { id: 8, name: "Sandwich", color: "#8B4513" }, // Brown for sandwiches
    ]);

    // Static Products Data with Images
    const staticProducts = [
        // Plats (category_id: 1)
        {
            id: 4,
            name: "Chicken Curry Sandwich",
            description: "Spicy chicken curry sandwich",
            price: 47.0,
            category_id: 1,
            image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=599",
        },
        {
            id: 5,
            name: "Club Sandwich",
            description: "Triple-decker sandwich with bacon",
            price: 45.0,
            category_id: 1,
            image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?q=80&w=599",
        },
        {
            id: 6,
            name: "Double Cheeseburger",
            description: "Double beef patty with cheese",
            price: 32.0,
            category_id: 1,
            image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=599",
        },
        {
            id: 7,
            name: "Big Tasty",
            description: "Our signature tasty burger",
            price: 49.0,
            category_id: 1,
            image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=599",
        },
        {
            id: 8,
            name: "Big Chili",
            description: "Spicy burger with chili sauce",
            price: 49.0,
            category_id: 1,
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=599",
        },
        {
            id: 9,
            name: "McChicken",
            description: "Classic chicken burger",
            price: 36.0,
            category_id: 1,
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=599",
        },
        {
            id: 10,
            name: "Filet-O-Fish",
            description: "Fish fillet with tartar sauce",
            price: 33.0,
            category_id: 1,
            image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?q=80&w=599",
        },
        {
            id: 11,
            name: "Big Mac",
            description: "The legendary double-decker",
            price: 36.0,
            category_id: 1,
            image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=599",
        },
        
        // Boissons (category_id: 2)
        {
            id: 2,
            name: "Qiwi juice",
            description: "Burger with fries and drink",
            price: 29.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=500",
        },
        {
            id: 16,
            name: "Coca-Cola",
            description: "Classic cola drink",
            price: 15.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=599",
        },
        {
            id: 17,
            name: "Espresso",
            description: "Strong Italian coffee",
            price: 18.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=599",
        },
        {
            id: 18,
            name: "Water",
            description: "Mineral water",
            price: 8.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=599",
        },
        {
            id: 19,
            name: "Ice Tea",
            description: "Refreshing iced tea",
            price: 14.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?q=80&w=599",
        },
        {
            id: 20,
            name: "Fanta",
            description: "Orange flavored soda",
            price: 15.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?q=80&w=599",
        },
        {
            id: 21,
            name: "Green Tea",
            description: "Traditional Japanese green tea",
            price: 12.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=599",
        },
        {
            id: 22,
            name: "Milkshake Banana",
            description: "Creamy banana milkshake topped with whipped cream",
            price: 25.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=599&auto=format&fit=crop",
        },
        {
            id: 23,
            name: "Chocolate Milkshake",
            description: "Rich chocolate milkshake with chocolate syrup",
            price: 25.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=599&auto=format&fit=crop",
        },
        {
            id: 24,
            name: "Strawberry Milkshake",
            description: "Fresh strawberry milkshake with whipped cream",
            price: 25.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=599&auto=format&fit=crop",
        },
        {
            id: 25,
            name: "Oreo Milkshake",
            description: "Creamy vanilla milkshake with crushed Oreos",
            price: 28.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=599&auto=format&fit=crop",
        },
        {
            id: 26,
            name: "Cappuccino",
            description: "Italian coffee with steamed milk foam",
            price: 22.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=599",
        },
        {
            id: 27,
            name: "Latte",
            description: "Espresso with steamed milk",
            price: 20.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=599",
        },
        {
            id: 28,
            name: "Orange Juice",
            description: "Freshly squeezed orange juice",
            price: 18.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=599",
        },
        {
            id: 29,
            name: "Sprite",
            description: "Lemon-lime flavored soda",
            price: 15.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=599",
        },
        {
            id: 30,
            name: "Smoothie",
            description: "Mixed fruit smoothie",
            price: 24.0,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=599",
        },
        
        // Pizzas (category_id: 3)
        {
            id: 31,
            name: "Margherita Pizza",
            description: "Classic pizza with tomato sauce, mozzarella, and basil",
            price: 55.0,
            category_id: 3,
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=599",
        },
        {
            id: 32,
            name: "Pepperoni Pizza",
            description: "Pizza topped with pepperoni slices",
            price: 65.0,
            category_id: 3,
            image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=599",
        },
        {
            id: 33,
            name: "Vegetarian Pizza",
            description: "Pizza with assorted vegetables",
            price: 60.0,
            category_id: 3,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=599",
        },
        {
            id: 34,
            name: "Hawaiian Pizza",
            description: "Pizza with ham and pineapple",
            price: 62.0,
            category_id: 3,
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=599",
        },
        {
            id: 35,
            name: "BBQ Chicken Pizza",
            description: "Pizza with BBQ sauce and chicken",
            price: 68.0,
            category_id: 3,
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=599",
        },
        {
            id: 36,
            name: "Meat Lovers Pizza",
            description: "Pizza loaded with various meats",
            price: 70.0,
            category_id: 3,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=599",
        },
        {
            id: 37,
            name: "Four Cheese Pizza",
            description: "Pizza with four different types of cheese",
            price: 65.0,
            category_id: 3,
            image: "https://images.unsplash.com/photo-1548369937-47519962c11a?q=80&w=599",
        },
        {
            id: 38,
            name: "Mushroom Pizza",
            description: "Pizza with various mushrooms",
            price: 63.0,
            category_id: 3,
            image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?q=80&w=599",
        },
        {
            id: 39,
            name: "Seafood Pizza",
            description: "Pizza with assorted seafood toppings",
            price: 75.0,
            category_id: 3,
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=599",
        },
        {
            id: 40,
            name: "Spicy Pizza",
            description: "Pizza with spicy peppers and jalapeños",
            price: 64.0,
            category_id: 3,
            image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=599",
        },
        
        // Desserts (category_id: 4)
        {
            id: 41,
            name: "Chocolate Cake",
            description: "Rich chocolate cake with ganache",
            price: 35.0,
            category_id: 4,
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=599",
        },
        {
            id: 42,
            name: "Cheesecake",
            description: "Creamy New York style cheesecake",
            price: 38.0,
            category_id: 4,
            image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=599",
        },
        {
            id: 43,
            name: "Ice Cream",
            description: "Assorted flavors of ice cream",
            price: 25.0,
            category_id: 4,
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=599",
        },
        {
            id: 44,
            name: "Apple Pie",
            description: "Traditional apple pie with cinnamon",
            price: 32.0,
            category_id: 4,
            image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?q=80&w=599",
        },
        {
            id: 45,
            name: "Tiramisu",
            description: "Italian coffee-flavored dessert",
            price: 40.0,
            category_id: 4,
            image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=599",
        },
        {
            id: 46,
            name: "Brownie",
            description: "Chocolate brownie with walnuts",
            price: 28.0,
            category_id: 4,
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=599",
        },
        {
            id: 47,
            name: "Crème Brûlée",
            description: "French custard with caramelized sugar top",
            price: 42.0,
            category_id: 4,
            image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=599",
        },
        {
            id: 48,
            name: "Fruit Salad",
            description: "Fresh seasonal fruits",
            price: 30.0,
            category_id: 4,
            image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?q=80&w=599",
        },
        {
            id: 49,
            name: "Panna Cotta",
            description: "Italian cream dessert with berry sauce",
            price: 36.0,
            category_id: 4,
            image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=599",
        },
        {
            id: 50,
            name: "Chocolate Mousse",
            description: "Light and airy chocolate dessert",
            price: 34.0,
            category_id: 4,
            image: "https://images.unsplash.com/photo-1511715282680-fbf93a50e721?q=80&w=599",
        },
        
        // Salades (category_id: 5)
        {
            id: 51,
            name: "Caesar Salad",
            description: "Romaine lettuce with Caesar dressing and croutons",
            price: 45.0,
            category_id: 5,
            image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=599",
        },
        {
            id: 52,
            name: "Greek Salad",
            description: "Tomatoes, cucumbers, olives, and feta cheese",
            price: 48.0,
            category_id: 5,
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=599",
        },
        {
            id: 53,
            name: "Caprese Salad",
            description: "Tomatoes, mozzarella, and basil with balsamic glaze",
            price: 50.0,
            category_id: 5,
            image: "https://images.unsplash.com/photo-1595587870672-b51c2513a641?q=80&w=599",
        },
        {
            id: 54,
            name: "Chicken Salad",
            description: "Mixed greens with grilled chicken",
            price: 55.0,
            category_id: 5,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=599",
        },
        {
            id: 55,
            name: "Tuna Salad",
            description: "Mixed greens with tuna and boiled eggs",
            price: 52.0,
            category_id: 5,
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=599",
        },
        {
            id: 56,
            name: "Waldorf Salad",
            description: "Apples, celery, walnuts with mayonnaise",
            price: 47.0,
            category_id: 5,
            image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=599",
        },
        {
            id: 57,
            name: "Cobb Salad",
            description: "Lettuce, chicken, bacon, eggs, avocado, and blue cheese",
            price: 58.0,
            category_id: 5,
            image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=599",
        },
        {
            id: 58,
            name: "Quinoa Salad",
            description: "Quinoa with vegetables and herbs",
            price: 49.0,
            category_id: 5,
            image: "https://images.unsplash.com/photo-1556386470-bcdc6a5e9b9e?q=80&w=599",
        },
        {
            id: 59,
            name: "Pasta Salad",
            description: "Pasta with vegetables and Italian dressing",
            price: 46.0,
            category_id: 5,
            image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=599",
        },
        {
            id: 60,
            name: "Seafood Salad",
            description: "Mixed seafood with greens and lemon dressing",
            price: 60.0,
            category_id: 5,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=599",
        },
        
        // Pâtes (category_id: 6)
        {
            id: 61,
            name: "Spaghetti Bolognese",
            description: "Spaghetti with meat sauce",
            price: 58.0,
            category_id: 6,
            image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?q=80&w=599",
        },
        {
            id: 62,
            name: "Fettuccine Alfredo",
            description: "Fettuccine with creamy Alfredo sauce",
            price: 56.0,
            category_id: 6,
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=599",
        },
        {
            id: 63,
            name: "Lasagna",
            description: "Layered pasta with meat and cheese",
            price: 62.0,
            category_id: 6,
            image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=599",
        },
        {
            id: 64,
            name: "Penne Arrabbiata",
            description: "Penne with spicy tomato sauce",
            price: 54.0,
            category_id: 6,
            image: "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?q=80&w=599",
        },
        {
            id: 65,
            name: "Carbonara",
            description: "Spaghetti with eggs, cheese, and pancetta",
            price: 59.0,
            category_id: 6,
            image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=599",
        },
        {
            id: 66,
            name: "Ravioli",
            description: "Stuffed pasta with ricotta and spinach",
            price: 60.0,
            category_id: 6,
            image: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?q=80&w=599",
        },
        {
            id: 67,
            name: "Gnocchi",
            description: "Potato dumplings with tomato sauce",
            price: 57.0,
            category_id: 6,
            image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=599",
        },
        {
            id: 68,
            name: "Linguine with Clams",
            description: "Linguine with clams in white wine sauce",
            price: 65.0,
            category_id: 6,
            image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=599",
        },
        {
            id: 69,
            name: "Pesto Pasta",
            description: "Pasta with basil pesto sauce",
            price: 55.0,
            category_id: 6,
            image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=599",
        },
        {
            id: 70,
            name: "Macaroni and Cheese",
            description: "Macaroni with creamy cheese sauce",
            price: 52.0,
            category_id: 6,
            image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?q=80&w=599",
        },
        
        // Fruits de Mer (category_id: 7)
        {
            id: 71,
            name: "Grilled Salmon",
            description: "Salmon fillet with lemon butter sauce",
            price: 75.0,
            category_id: 7,
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=599",
        },
        {
            id: 72,
            name: "Shrimp Scampi",
            description: "Shrimp in garlic butter sauce",
            price: 70.0,
            category_id: 7,
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=599",
        },
        {
            id: 73,
            name: "Fish and Chips",
            description: "Battered fish with french fries",
            price: 65.0,
            category_id: 7,
            image: "https://images.unsplash.com/photo-1579208030886-b937da0925dc?q=80&w=599",
        },
        {
            id: 74,
            name: "Lobster Tail",
            description: "Grilled lobster tail with butter",
            price: 95.0,
            category_id: 7,
            image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=599",
        },
        {
            id: 75,
            name: "Calamari",
            description: "Fried squid rings with marinara sauce",
            price: 60.0,
            category_id: 7,
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=599",
        },
        {
            id: 76,
            name: "Crab Cakes",
            description: "Pan-fried crab cakes with remoulade",
            price: 68.0,
            category_id: 7,
            image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?q=80&w=599",
        },
        {
            id: 77,
            name: "Seafood Paella",
            description: "Spanish rice dish with assorted seafood",
            price: 80.0,
            category_id: 7,
            image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=599",
        },
        {
            id: 78,
            name: "Tuna Steak",
            description: "Seared tuna steak with sesame crust",
            price: 72.0,
            category_id: 7,
            image: "https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?q=80&w=599",
        },
        {
            id: 79,
            name: "Mussels Mariniere",
            description: "Mussels in white wine sauce",
            price: 65.0,
            category_id: 7,
            image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?q=80&w=599",
        },
        {
            id: 80,
            name: "Seafood Soup",
            description: "Rich soup with various seafood",
            price: 62.0,
            category_id: 7,
            image: "https://images.unsplash.com/photo-1614777986387-015c2a89b696?q=80&w=599",
        },
        
        // Sandwich (category_id: 8)
        {
            id: 1,
            name: "Bacon Burger",
            description: "Smashed sweet potatoes",
            price: 49.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=599",
        },
        {
            id: 3,
            name: "Cheese Burger",
            description: "Classic cheeseburger with our special sauce",
            price: 36.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=599",
        },
        {
            id: 12,
            name: "Triple Cheese",
            description: "Triple the cheese, triple the taste",
            price: 38.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1485451456034-3f9391c6f769?q=80&w=599",
        },
        {
            id: 13,
            name: "Veggie Burger",
            description: "Plant-based patty with fresh vegetables",
            price: 42.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=599",
        },
        {
            id: 14,
            name: "Mushroom Swiss Burger",
            description: "Beef patty with sautéed mushrooms and Swiss cheese",
            price: 45.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=599",
        },
        {
            id: 15,
            name: "BBQ Bacon Burger",
            description: "Beef patty with BBQ sauce and crispy bacon",
            price: 47.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=599",
        },
        {
            id: 81,
            name: "Club Sandwich",
            description: "Triple-decker sandwich with chicken, bacon, lettuce, and tomato",
            price: 45.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?q=80&w=1000",
        },
        {
            id: 82,
            name: "Grilled Cheese",
            description: "Classic grilled cheese with multiple cheese blend",
            price: 35.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000",
        },
        {
            id: 83,
            name: "Chicken Sandwich",
            description: "Grilled chicken breast with lettuce and special sauce",
            price: 42.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1000",
        },
        {
            id: 84,
            name: "Veggie Delight",
            description: "Fresh vegetables with hummus and avocado",
            price: 38.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1540914124281-342587941389?q=80&w=1000",
        },
        {
            id: 85,
            name: "BLT Supreme",
            description: "Bacon, lettuce, and tomato with mayo on toasted bread",
            price: 40.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?q=80&w=1000",
        },
        {
            id: 86,
            name: "Tuna Melt",
            description: "Tuna salad with melted cheese on grilled bread",
            price: 43.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1000",
        },
        {
            id: 87,
            name: "Mediterranean Sandwich",
            description: "Grilled vegetables, feta, and olive tapenade",
            price: 41.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=1000",
        },
        {
            id: 88,
            name: "Steak Sandwich",
            description: "Grilled steak with caramelized onions and cheese",
            price: 52.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1511344407683-b1172dce025f?q=80&w=1000",
        },
        {
            id: 89,
            name: "Egg & Avocado",
            description: "Fried egg with mashed avocado and microgreens",
            price: 39.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000",
        },
        {
            id: 90,
            name: "Pulled Pork Sandwich",
            description: "BBQ pulled pork with coleslaw",
            price: 46.0,
            category_id: 8,
            image: "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?q=80&w=1000",
        },
    ];

    // Generate menuData from categories and products
    const menuData = categories.map(category => {
        const categoryProducts = staticProducts.filter(product => product.category_id === category.id);
        return {
            id: category.id,
            name: category.name,
            products: categoryProducts.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image
            }))
        };
    });

    const [activeCategory, setActiveCategory] = useState(null);
    const [cart, setCart] = useState([]);
    const [orderType, setOrderType] = useState('eat_in');
    const [tableNumber, setTableNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [activeTab, setActiveTab] = useState('caisse');
    const [orderNumber, setOrderNumber] = useState(1);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [foodCount, setFoodCount] = useState(0);
    const [drinksCount, setDrinksCount] = useState(0);
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [change, setChange] = useState(0);
    const [showServiceTypeModal, setShowServiceTypeModal] = useState(false);
    const [deliverySurcharge, setDeliverySurcharge] = useState(0);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [showPromotionModal, setShowPromotionModal] = useState(false);
    const [showCustomizeModal, setShowCustomizeModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activePromotion, setActivePromotion] = useState(null);
    const [customizations, setCustomizations] = useState({});
    const [startNewInput, setStartNewInput] = useState(true);
    const [activeOrders, setActiveOrders] = useState([]);
    const [activeOrderId, setActiveOrderId] = useState(null);
    const [showOrderHistory, setShowOrderHistory] = useState(false);
    const [activeHistoryTab, setActiveHistoryTab] = useState('all'); // 'all', 'pending', 'paid', 'cancelled'
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');
    const [alertCallback, setAlertCallback] = useState(null);
    const [isConfirm, setIsConfirm] = useState(false);
    const [showTableOccupancyModal, setShowTableOccupancyModal] = useState(false);
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [tableOccupancies, setTableOccupancies] = useState({});
    const [tableStartTimes, setTableStartTimes] = useState({});
    const [tableTimers, setTableTimers] = useState({});
    const [isSelectedTableOccupied, setIsSelectedTableOccupied] = useState(false);
    const [tables, setTables] = useState([
        { id: '1', status: 'available' },
        { id: '2', status: 'available' },
        { id: '3', status: 'available' },
        { id: '4', status: 'available' },
        { id: '5', status: 'available' },
        { id: '6', status: 'available' },
        { id: '7', status: 'available' },
        { id: '8', status: 'available' },
        { id: '9', status: 'available' },
        { id: '10', status: 'available' },
        { id: '11', status: 'available' },
        { id: '12', status: 'available' }
    ]);
    const [activeFloor, setActiveFloor] = useState('Main Floor');
    const [showDeleteQtyModal, setShowDeleteQtyModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null); // { product_id, quantity }
    const [deleteQty, setDeleteQty] = useState(1);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showActiveOrdersModal, setShowActiveOrdersModal] = useState(false);
    const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
    const [showDiscountModal, setShowDiscountModal] = useState(false);
    const [itemDiscounts, setItemDiscounts] = useState({});
    const [selectedDiscountItem, setSelectedDiscountItem] = useState(null);
    const [showFreeItemModal, setShowFreeItemModal] = useState(false);
    const [selectedFreeItem, setSelectedFreeItem] = useState(null);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        calculateTotals();
        updateCounts();
    }, [cart, orderType]);

    // Set up a timer to update the elapsed time for each table
    useEffect(() => {
        // Function to update timer displays
        const updateTimers = () => {
            const now = new Date().getTime();
            const updated = {};
            
            // For each table with a start time, calculate elapsed time
            Object.keys(tableStartTimes).forEach(tableId => {
                if (tableStartTimes[tableId]) {
                    const startTime = tableStartTimes[tableId];
                    const elapsedMs = now - startTime;
                    
                    // Format the time as mm:ss or hh:mm:ss if over an hour
                    const seconds = Math.floor((elapsedMs / 1000) % 60);
                    const minutes = Math.floor((elapsedMs / (1000 * 60)) % 60);
                    const hours = Math.floor(elapsedMs / (1000 * 60 * 60));
                    
                    if (hours > 0) {
                        updated[tableId] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    } else {
                        updated[tableId] = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    }
                }
            });
            
            setTableTimers(updated);
        };
        
        // Update immediately and then every second
        updateTimers();
        const timerId = setInterval(updateTimers, 1000);
        
        // Clean up interval on unmount
        return () => clearInterval(timerId);
    }, [tableStartTimes]);

    const updateCounts = () => {
        const foodItems = cart.filter(item => {
            // Find the product in any category
            const product = menuData.flatMap(cat => cat.products).find(p => p.id === item.product_id);
            // Check if it's from the food category (id 1)
            return product && (
                // Consider items from category 1, 2, 3, 6, and 7 as food
                [1, 2, 3, 6, 7].includes(menuData.find(cat => 
                    cat.products.some(p => p.id === item.product_id)
                )?.id || 0)
            );
        }).reduce((sum, item) => sum + item.quantity, 0);
        
        const drinkItems = cart.filter(item => {
            // Find the product in any category
            const product = menuData.flatMap(cat => cat.products).find(p => p.id === item.product_id);
            // Check if it's from the drinks categories (id 4, 5, 8)
            return product && (
                [4, 5, 8].includes(menuData.find(cat => 
                    cat.products.some(p => p.id === item.product_id)
                )?.id || 0)
            );
        }).reduce((sum, item) => sum + item.quantity, 0);

        setFoodCount(foodItems);
        setDrinksCount(drinkItems);
    };

    const calculateTotals = () => {
        // Calculate subtotal with proper rounding
        const newSubtotal = cart.reduce((sum, item) => {
            let itemTotal = item.quantity * (item.price || item.unit_price);
            
            // Add customization charges if present
            if (customizations[item.product_id]) {
                itemTotal += customizations[item.product_id].extraCharge * item.quantity;
            }
            
            // Apply item-specific discount if any
            if (itemDiscounts[item.product_id]) {
                const discount = itemDiscounts[item.product_id];
                if (discount.type === 'percentage') {
                    // If discount is 100%, item should be completely free
                    if (discount.value >= 100) {
                        itemTotal = 0;
                    } else {
                        // Apply percentage discount with proper rounding
                        itemTotal = Math.round((itemTotal * (1 - discount.value / 100)) * 100) / 100;
                    }
                } else if (discount.type === 'fixed') {
                    // If fixed discount is greater than or equal to item total, item is free
                    if (discount.amount >= itemTotal) {
                        itemTotal = 0;
                    } else {
                        // Apply fixed discount with proper rounding
                        itemTotal = Math.round((itemTotal - discount.amount) * 100) / 100;
                    }
                }
            }
            
            // Round to 2 decimal places
            return Math.round((sum + itemTotal) * 100) / 100;
        }, 0);

        // Calculate tax with proper rounding
        const newTax = Math.round(newSubtotal * 0.20 * 100) / 100; // 20% tax
        let newTotal = Math.round((newSubtotal + newTax) * 100) / 100;
        
        // Add delivery surcharge if delivery is selected
        if (orderType === 'delivery') {
            const surcharge = Math.round(newSubtotal * 0.10 * 100) / 100;
            setDeliverySurcharge(surcharge);
            newTotal = Math.round((newTotal + surcharge) * 100) / 100;
        } else {
            setDeliverySurcharge(0);
        }

        // Apply promotion or order discount if active
        if (activePromotion) {
            // Handle both discount formats (for backward compatibility)
            const discountAmount = activePromotion.amount || activePromotion.discountAmount || 0;
            newTotal = Math.max(0, Math.round((newTotal - discountAmount) * 100) / 100);
        }

        setSubtotal(Math.round(newSubtotal * 100) / 100);
        setTax(Math.round(newTax * 100) / 100);
        setTotal(Math.round(newTotal * 100) / 100);
    };

    const addToCart = (productId, customizations = null) => {
        if (!activeOrderId) {
            showAlert('Veuillez créer une nouvelle commande d\'abord.', 'Attention');
            return;
        }

        const allProducts = menuData.flatMap(cat => cat.products);
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        // Serialize customizations for comparison
        const customizationKey = customizations ? JSON.stringify(customizations.options) : null;

        // Find if an item with the same product and same customization exists
        const existingItem = cart.find(item =>
            item.product_id === productId &&
            JSON.stringify(item.customizations?.options || {}) === (customizationKey || '{}')
        );

        if (existingItem) {
            const updatedCart = cart.map(item => {
                if (
                    item.product_id === productId &&
                    JSON.stringify(item.customizations?.options || {}) === (customizationKey || '{}')
                ) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        unit_price: item.unit_price || item.price || product.price,
                        total: product.price * (item.quantity + 1)
                    };
                }
                return item;
            });
            setCart(updatedCart);
        } else {
            setCart([
                ...cart,
                {
                    product_id: productId,
                    price: product.price,
                    unit_price: product.price,
                    quantity: 1,
                    total: product.price,
                    name: product.name,
                    customizations: customizations // Store customizations on the cart item
                }
            ]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.product_id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            // If quantity is less than 1, remove the item from cart
            removeFromCart(productId);
            return;
        }
        
        setCart(cart.map(item =>
            item.product_id === productId
                ? { 
                    ...item, 
                    quantity: newQuantity, 
                    subtotal: newQuantity * (item.unit_price || item.price) 
                }
                : item
        ));
    };

    const handleNewOrder = () => {
        // Generate unique ID for the new order
        const newOrderId = `TEMP-${Date.now()}`;
        // Create a new order with initial state
        const newOrder = {
            id: newOrderId,
            items: [],
            type: 'takeout', // Default type, will be updated when user selects
            table_number: '', // No table assigned initially
            numberOfPeople: 0, // Will be set when a table is selected
            notes: '',
            status: 'pending', // En cours
            timestamp: new Date().toLocaleString('fr-FR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }),
            subtotal: 0,
            tax: 0,
            total: 0,
            generateTicket: true // Default to generating ticket
        };
        
        // Add to active orders and set as current
        setActiveOrders([...activeOrders, newOrder]);
        
        // Activate the new order
        setActiveOrderId(newOrderId);
        setCart([]);
        setTableNumber('');
        setNotes('');
        setSelectedProduct(null);
        setActivePromotion(null);
        setCustomizations({});
        // Show service type selection modal
        setShowServiceTypeModal(true);
    };

    const switchToOrder = (orderId) => {
        // Save current order state if an order is active
        if (activeOrderId) {
            saveCurrentOrderState();
        }
        // Load the selected order
        const orderToLoad = activeOrders.find(order => order.id === orderId);
        if (orderToLoad) {
            setActiveOrderId(orderId);
            setCart(orderToLoad.items || []);
            setOrderType(orderToLoad.type || 'takeout');
            setTableNumber(orderToLoad.table_number || '');
            setNotes(orderToLoad.notes || '');
            // Load discounts
            setItemDiscounts(orderToLoad.itemDiscounts || {});
            setActivePromotion(orderToLoad.orderDiscount || null);
            // Recalculate will happen via useEffect
        }
    };

    const saveCurrentOrderState = () => {
        if (!activeOrderId) return;
        
        setActiveOrders(activeOrders.map(order => 
            order.id === activeOrderId
                ? { 
                    ...order, 
                    items: cart,
                    type: orderType,
                    table_number: tableNumber,
                    notes: notes,
                    subtotal: subtotal,
                    tax: tax,
                    total: total,
                    numberOfPeople: tableOccupancies[tableNumber] || order.numberOfPeople || 1,
                    generateTicket: order.generateTicket, // Preserve ticket generation setting
                    itemDiscounts: itemDiscounts, // Save item discounts
                    orderDiscount: activePromotion // Save order discount
                }
                : order
        ));
    };

    const cancelOrder = (orderId) => {
        const orderToCancel = orderId || activeOrderId;
        if (!orderToCancel) return;
        
        showConfirm('Êtes-vous sûr de vouloir annuler cette commande?', (confirmed) => {
            if (confirmed) {
                // Update order status to cancelled
                setActiveOrders(activeOrders.map(order => 
                    order.id === orderToCancel
                        ? { ...order, status: 'cancelled' } // Annulée
                        : order
                ));
                
                // If cancelling the active order, clear the cart
                if (orderToCancel === activeOrderId) {
                    setCart([]);
                    setActiveOrderId(null);
                }
            }
        });
    };

    useEffect(() => {
        if (activeOrderId) {
            saveCurrentOrderState();
        }
    }, [cart, orderType, tableNumber, notes, subtotal, tax, total]);

    const handlePayment = (payment) => {
        try {
            // Validation des données de paiement
            if (!payment || !payment.method) {
                throw new Error('Méthode de paiement invalide');
            }

            // Set the payment amount from the payment details
            const amount = payment.method === 'cash' ? payment.details.amount : total;
            setPaymentAmount(amount);
            
            if (amount < total) {
                throw new Error('Le montant payé doit être supérieur ou égal au montant total');
            }

            // If there's no active order, create one
            if (!activeOrderId) {
                throw new Error('Aucune commande active. Veuillez créer une commande d\'abord.');
            }

            // Find the current active order
            const currentOrder = activeOrders.find(order => order.id === activeOrderId);
            if (!currentOrder) {
                throw new Error('Commande non trouvée.');
            }

            // Create the final paid order
            const finalOrder = {
                id: currentOrder.id.startsWith('TEMP-') 
                    ? `ORD-${String(orderNumber).padStart(4, '0')}` 
                    : currentOrder.id,
                cashier: auth.user.name,
                items: cart.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    unit_price: item.unit_price || item.price || 0, // Use unit_price or price, fallback to 0
                    subtotal: item.quantity * (item.unit_price || item.price || 0),
                    customizations: customizations[item.product_id],
                    discount: itemDiscounts[item.product_id] || null
                })),
                type: orderType,
                table_number: tableNumber,
                notes,
                subtotal,
                tax,
                total,
                status: 'paid', // Payée
                timestamp: currentOrder.timestamp,
                payment: {
                    method: payment.method,
                    details: payment.details,
                    amount: amount
                },
                promotion: activePromotion,
                generateTicket: currentOrder.generateTicket // Transfer ticket generation setting
            };

            // Generate the receipt
            try {
                if (currentOrder.generateTicket) {
                    const receiptGenerator = Receipt();
                    receiptGenerator.generateReceipt(finalOrder);
                }
            } catch (receiptError) {
                console.error('Error generating receipt:', receiptError);
                // Continue the process even if receipt generation fails
                // We just log the error but don't stop the payment process
            }

            // Remove order from activeOrders
            setActiveOrders(activeOrders.filter(order => order.id !== activeOrderId));
            
            // Add to completed orders
            setOrders([...orders, finalOrder]);
            setOrderNumber(orderNumber + 1);
            
            // Reset everything to initial state
            setActiveOrderId(null);
            setCart([]);
            setTableNumber('');
            setNotes('');
            setPaymentAmount(0);
            setChange(0);
            setActivePromotion(null);
            setItemDiscounts({});
            setCustomizations({});
            setSelectedProduct(null);
            setShowPaymentModal(false);
            
            // If it was an eat_in order, clear the table's timer
            if (finalOrder.type === 'eat_in' && finalOrder.table_number) {
                // Calculate the usage time for the table
                const startTime = tableStartTimes[finalOrder.table_number];
                if (startTime) {
                    const endTime = new Date().getTime();
                    const elapsedMs = endTime - startTime;
                    
                    // Format the time for display and store in order
                    const seconds = Math.floor((elapsedMs / 1000) % 60);
                    const minutes = Math.floor((elapsedMs / (1000 * 60)) % 60);
                    const hours = Math.floor(elapsedMs / (1000 * 60 * 60));
                    
                    let formattedTime;
                    if (hours > 0) {
                        formattedTime = `${hours}h ${minutes}m ${seconds}s`;
                    } else {
                        formattedTime = `${minutes}m ${seconds}s`;
                    }
                    
                    // Store both formatted and raw time for flexibility
                    finalOrder.tableUsage = {
                        formatted: formattedTime,
                        raw: {
                            hours,
                            minutes,
                            seconds,
                            totalSeconds: Math.floor(elapsedMs / 1000)
                        },
                        startTime,
                        endTime
                    };
                }
                
                // Remove the table start time
                setTableStartTimes(prev => {
                    const updated = { ...prev };
                    delete updated[finalOrder.table_number];
                    return updated;
                });
                
                // Remove the table occupancy
                setTableOccupancies(prev => {
                    const updated = { ...prev };
                    delete updated[finalOrder.table_number];
                    return updated;
                });
            }
            
            // Show success message
            showAlert('Paiement réussi!', 'Succès');

        } catch (error) {
            console.error('Error processing payment:', error);
            showAlert(error.message || 'Une erreur est survenue lors du traitement du paiement. Veuillez réessayer.', 'Erreur');
        }
    };

    const loadOrder = (order) => {
        setSelectedOrder(order);
        setCart(order.items);
        setTableNumber(order.table_number);
        setNotes(order.notes);
        setOrderType(order.type);
    };

    const handleServiceTypeSelect = (type, showTables = false) => {
        setOrderType(type);
        setShowServiceTypeModal(false);
        
        // If eat_in is selected, switch to tables tab
        if (type === 'eat_in') {
            setActiveTab('tables');
        } else {
            // For takeout and delivery, go to caisse tab
            setActiveTab('caisse');
        }
    };

    const handlePromotionApply = (promotion) => {
        setActivePromotion(promotion);
        calculateTotals();
    };

    const handleCustomize = (product, customizations) => {
        if (!activeOrderId) {
            showAlert('Veuillez créer une nouvelle commande d\'abord.', 'Attention');
            setShowCustomizeModal(false);
            return;
        }

        if (product) {
            addToCart(product.id, customizations); // Pass customizations here
        }
        setShowCustomizeModal(false);
    };

    // Function to get status badge styling
    const getStatusBadgeClass = (status) => {
        switch(status) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Function to translate status to French
    const getStatusText = (status) => {
        switch(status) {
            case 'paid':
                return 'Payée';
            case 'pending':
                return 'En cours';
            case 'cancelled':
                return 'Annulée';
            default:
                return status;
        }
    };
    // Replace alert() function with a modal
    const showAlert = (message, title = 'Information') => {
        setAlertMessage(message);
        setAlertTitle(title);
        setIsConfirm(false);
        setAlertCallback(null);
        setShowAlertModal(true);
    };

    // Replace confirm() function with a modal
    const showConfirm = (message, callback, title = 'Confirmation') => {
        setAlertMessage(message);
        setAlertTitle(title);
        setIsConfirm(true);
        setAlertCallback(() => callback);
        setShowAlertModal(true);
    };

    const handleTableSelect = (tableId) => {
        console.log('Table selected:', tableId);
        
        // Check if table is already occupied
        const tableOccupied = activeOrders.some(order => 
            order.status === 'pending' && order.table_number === tableId
        );
        
        if (tableOccupied) {
            console.log('Table is occupied, showing modify modal');
            // Table is occupied - show modify occupancy modal
            setSelectedTableId(tableId);
            setIsSelectedTableOccupied(true);
            
            // Find the current order for this table to get number of people
            const currentOrder = activeOrders.find(order => 
                order.status === 'pending' && order.table_number === tableId
            );
            
            // Set initial people from the existing order or default to 1
            const currentPeople = currentOrder?.numberOfPeople || 1;
            setShowTableOccupancyModal(true);
        } else {
            // Check if there's an active order before allowing selection of an empty table
            if (!activeOrderId) {
                console.log('No active order, showing alert');
                showAlert('Please create a new order before selecting a table.', 'Action Required');
                return;
            }
            
            console.log('Table is available, showing new occupancy modal');
            // Table is available - show new occupancy modal
            setSelectedTableId(tableId);
            setIsSelectedTableOccupied(false);
            setShowTableOccupancyModal(true);
        }
    };

    // Update table status whenever activeOrders changes
    useEffect(() => {
        const updatedTables = [...tables];
        
        // Reset all tables to available first
        updatedTables.forEach(table => table.status = 'available');
        
        // Mark tables with active orders as occupied
        activeOrders.forEach(order => {
            if (order.status === 'pending' && order.table_number) {
                const tableIndex = updatedTables.findIndex(t => t.id === order.table_number);
                if (tableIndex >= 0) {
                    updatedTables[tableIndex].status = 'occupied';
                }
            }
        });
        
        setTables(updatedTables);
    }, [activeOrders]);

    // Update getTableColor function to remove the 'reserved' status option
    const getTableColor = (tableId, isSelected = false) => {
        const table = tables.find(t => t.id === tableId);
        
        if (table?.status === 'occupied') return 'bg-red-400 border-red-600';
        return 'bg-green-400 border-green-600'; // available
    };

    const formatPrice = (price) => {
        // Handle null or undefined price values
        if (price === undefined || price === null) {
            return '0.00 MAD';
        }
        return `${price.toFixed(2)} MAD`;
    };

    const handleEditCartItem = (index) => {
        // Implement edit functionality
        console.log(`Editing item at index: ${index}`);
    };

    const handleKeypadInput = (num) => {
        if (!selectedProduct) return;
        
        const currentQty = cart.find(item => item.product_id === selectedProduct.id)?.quantity || 0;
        
        if (num === '⌫') {
            if (currentQty < 10) {
                updateQuantity(selectedProduct.id, 0);
            } else {
                updateQuantity(selectedProduct.id, Math.floor(currentQty / 10));
            }
        } else if (num === 'CE') {
            updateQuantity(selectedProduct.id, 0);
            setStartNewInput(true);
        } else {
            if (startNewInput || currentQty === 0) {
                updateQuantity(selectedProduct.id, parseInt(num));
            } else {
                const newQty = parseInt(currentQty.toString() + num);
                updateQuantity(selectedProduct.id, newQty);
            }
            setStartNewInput(false);
        }
    };

    // Add a new function to handle table occupancy
    const handleTableOccupancySave = (tableId, numberOfPeople, cancelOrder = false) => {
        setShowTableOccupancyModal(false);

        if (cancelOrder) {
            // Cancel the order for this table
            const orderToCancel = activeOrders.find(order => 
                order.status === 'pending' && order.table_number === tableId
            );
            
            if (orderToCancel) {
                cancelOrder(orderToCancel.id);
            }
            
            // Update the tableOccupancies
            const updatedOccupancies = { ...tableOccupancies };
            delete updatedOccupancies[tableId];
            setTableOccupancies(updatedOccupancies);
            
            // Remove the table start time and timer
            const updatedStartTimes = { ...tableStartTimes };
            delete updatedStartTimes[tableId];
            setTableStartTimes(updatedStartTimes);
            
            return;
        }

        // If setting number of people, update the tableOccupancies state
        setTableOccupancies({
            ...tableOccupancies,
            [tableId]: numberOfPeople
        });
        
        // Set the start time for the table if not already set
        if (!tableStartTimes[tableId]) {
            setTableStartTimes({
                ...tableStartTimes,
                [tableId]: new Date().getTime()
            });
        }

        if (tableNumber === tableId) {
            // Already selected this table, no need to update
            return;
        }

        // Update existing order with new number of people
        const orderToUpdate = activeOrders.find(order => 
            order.status === 'pending' && order.table_number === tableId
        );
        
        if (orderToUpdate) {
            // If we have an order for this table, update it
            setActiveOrders(activeOrders.map(order =>
                order.id === orderToUpdate.id
                    ? { ...order, numberOfPeople: numberOfPeople }
                    : order
            ));
            
            // Switch to this order
            switchToOrder(orderToUpdate.id);
        } else if (activeOrderId) {
            // We know there's an active order because of the check in handleTableSelect
            // Update the table number for the active order
            setTableNumber(tableId);
            
            // Also update in the activeOrders array
            setActiveOrders(activeOrders.map(order =>
                order.id === activeOrderId
                    ? { ...order, table_number: tableId, type: 'eat_in', numberOfPeople: numberOfPeople }
                    : order
            ));
        }
    };

    // Add function to open order details modal
    const openOrderDetails = (order) => {
        // Ensure the order has properly formatted table usage if it exists but isn't fully formatted
        if (order.type === 'eat_in' && order.tableUsage) {
            // If tableUsage exists but doesn't have the formatted property, format it
            if (!order.tableUsage.formatted && order.tableUsage.raw) {
                const { hours, minutes, seconds } = order.tableUsage.raw;
                
                if (hours > 0) {
                    order.tableUsage.formatted = `${hours}h ${minutes}m ${seconds}s`;
                } else {
                    order.tableUsage.formatted = `${minutes}m ${seconds}s`;
                }
            }
            // If tableUsage exists but only as a string or number, convert it to the proper structure
            else if (typeof order.tableUsage === 'string' || typeof order.tableUsage === 'number') {
                const oldValue = order.tableUsage;
                order.tableUsage = {
                    formatted: typeof oldValue === 'string' ? oldValue : `${Math.floor(oldValue / 60)}m ${oldValue % 60}s`,
                    raw: {
                        totalSeconds: typeof oldValue === 'number' ? oldValue : 0
                    }
                };
            }
        }
        
        setSelectedOrderDetails(order);
        setShowOrderDetailsModal(true);
    };

    // Add handleDiscountApply function
    const handleDiscountApply = (discount) => {
        if (discount.target === 'item' && discount.itemId) {
            // Apply to specific item - normalize the discount format
            const normalizedDiscount = {
                ...discount,
                amount: Math.round(discount.amount * 100) / 100, // Ensure proper rounding
                value: parseFloat(discount.value)
            };

            // Apply to specific item
            setItemDiscounts({
                ...itemDiscounts,
                [discount.itemId]: normalizedDiscount
            });
        } else {
            // Apply to full order - normalize the discount format
            const normalizedDiscount = {
                ...discount,
                amount: Math.round(discount.amount * 100) / 100, // Ensure proper rounding
                discountAmount: Math.round(discount.amount * 100) / 100 // Add for compatibility
            };
            
            // Apply to full order
            setActivePromotion(normalizedDiscount);
        }
        
        // Force recalculation
        setTimeout(() => {
            calculateTotals();
        }, 0);
    };

    // Add openDiscountModal function
    const openDiscountModal = (item = null) => {
        if (!activeOrderId) {
            showAlert('Veuillez créer une nouvelle commande d\'abord.', 'Attention');
            return;
        }
        setSelectedDiscountItem(item);
        setShowDiscountModal(true);
    };

    const handleMakeItemFree = (target) => {
        if (target === 'order') {
            // Apply 100% discount to the entire order
            const orderDiscount = {
                type: 'percentage',
                value: 100,
                amount: subtotal,
                target: 'order',
                name: 'Commande gratuite'
            };
            setActivePromotion(orderDiscount);
        } else if (target === 'item' && selectedProduct) {
            // Apply 100% discount to the selected item
            const itemDiscount = {
                type: 'percentage',
                value: 100,
                amount: selectedProduct.price * (cart.find(item => item.product_id === selectedProduct.id)?.quantity || 0),
                target: 'item',
                itemId: selectedProduct.id,
                name: `Article gratuit: ${selectedProduct.name}`
            };
            setItemDiscounts({
                ...itemDiscounts,
                [selectedProduct.id]: itemDiscount
            });
        } else {
            showAlert('Veuillez sélectionner un article d\'abord', 'Information');
        }
        
        setShowFreeItemModal(false);
        calculateTotals();
    };

    // Add an event listener to close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const remiseDropdown = document.getElementById('remiseDropdown');
            const gratuitDropdown = document.getElementById('gratuitDropdown');
            
            if (remiseDropdown && !event.target.closest('.remise-container')) {
                remiseDropdown.classList.add('hidden');
            }
            
            if (gratuitDropdown && !event.target.closest('.gratuit-container')) {
                gratuitDropdown.classList.add('hidden');
            }
        };

        document.addEventListener('click', handleClickOutside);
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <Head title="Système de Caisse" />
            <div className="min-h-screen bg-gray-100">
                <Head title="Point of Sale" />
                <div className="flex h-screen">
                    {/* Left Side - Cart - Increase width for wider keypad */}
                    <div className="w-1/3 md:w-2/5 lg:w-2/5 xl:w-1/3 bg-white flex flex-col shadow-lg">
                       
                        {/* Cart Header - modern blue gradient design */}
                        <div className="bg-gradient-to-r from-blue-400 to-blue-700 text-white p-2 shadow-lg rounded-b-xl">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <div className="p-1 bg-white/20 backdrop-blur-sm rounded-lg shadow">
                                        <ShoppingCartIcon className="h-4 w-4 text-blue-200" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold tracking-tight">Panier</h2>
                                        <p className="text-blue-100 text-xs font-medium opacity-80">Commande en cours</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={handleNewOrder}
                                        className="px-2 py-1 bg-white text-blue-700 rounded-full font-normal shadow hover:bg-blue-100 hover:scale-105 transition-all flex items-center gap-1 border border-blue-200 text-xs"
                                    >
                                        <PlusIcon className="h-4 w-4" />
                                        Nouvelle
                                    </button>
                                    <button
                                        onClick={() => setShowActiveOrdersModal(true)}
                                        className="px-2 py-1 bg-white text-blue-600 rounded-full font-normal shadow hover:bg-blue-50 hover:scale-105 transition-all flex items-center gap-1 border border-blue-200 text-xs"
                                    >
                                        <QueueListIcon className="h-4 w-4" />
                                        <span>Actives</span>
                                        {activeOrders.filter(o => o.status === 'pending').length > 0 && (
                                            <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {activeOrders.filter(o => o.status === 'pending').length}
                                            </span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setShowOrderHistory(true)}
                                        className="px-2 py-1 bg-white text-blue-500 rounded-full font-normal shadow hover:bg-blue-50 hover:scale-105 transition-all flex items-center gap-1 border border-blue-100 text-xs"
                                    >
                                        <ClockIcon className="h-4 w-4" />
                                        Historique
                                    </button>
                                </div>
                            </div>
                            
                            {/* Order Command Header - Blue style similar to the image */}
                            {activeOrderId && (
                                <div className="bg-blue-600 p-2 rounded-md mt-2 mb-1">
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xs text-blue-200">Commande sur place</span>
                                                <div className="text-base font-bold">{activeOrderId}</div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => {
                                                        // Toggle ticket setting directly
                                                        setActiveOrders(activeOrders.map(order => 
                                                            order.id === activeOrderId
                                                                ? { ...order, generateTicket: !order.generateTicket }
                                                                : order
                                                        ));
                                                    }}
                                                    className={`px-2 py-1 rounded-md flex items-center ${activeOrders.find(o => o.id === activeOrderId)?.generateTicket ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                                    title="Ticket"
                                                >
                                                    <DocumentTextIcon className="h-4 w-4" />
                                                    <span className="text-xs ml-1">{activeOrders.find(o => o.id === activeOrderId)?.generateTicket ? 'On' : 'Off'}</span>
                                                </button>
                                                <div className="relative remise-container">
                                                    <button
                                                        onClick={(e) => {
                                                            if (!selectedProduct && cart.length === 0) {
                                                                showAlert('Ajoutez des articles ou sélectionnez un article pour appliquer une remise', 'Information');
                                                                return;
                                                            }
                                                            const dropdown = document.getElementById('remiseDropdown');
                                                            dropdown.classList.toggle('hidden');
                                                            e.stopPropagation();
                                                        }}
                                                        className="bg-white text-blue-600 px-2 py-1 rounded-md hover:bg-blue-50"
                                                        title="Remise"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </button>
                                                    <div id="remiseDropdown" className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg z-10 hidden">
                                                        <button 
                                                            onClick={() => {
                                                                document.getElementById('remiseDropdown').classList.add('hidden');
                                                                if (selectedProduct) {
                                                                    openDiscountModal(cart.find(item => item.product_id === selectedProduct.id));
                                                                } else {
                                                                    showAlert('Sélectionnez un article d\'abord', 'Information');
                                                                }
                                                            }}
                                                            className="block px-4 py-2 text-xs text-left text-gray-700 hover:bg-blue-100 w-full rounded-t-md"
                                                        >
                                                            Article
                                                        </button>
                                                        <button 
                                                            onClick={() => {
                                                                document.getElementById('remiseDropdown').classList.add('hidden');
                                                                openDiscountModal();
                                                            }}
                                                            className="block px-4 py-2 text-xs text-left text-gray-700 hover:bg-blue-100 w-full rounded-b-md"
                                                        >
                                                            Commande
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="relative gratuit-container">
                                                    <button
                                                        onClick={(e) => {
                                                            if (!selectedProduct && cart.length === 0) {
                                                                showAlert('Ajoutez des articles ou sélectionnez un article pour le rendre gratuit', 'Information');
                                                                return;
                                                            }
                                                            const dropdown = document.getElementById('gratuitDropdown');
                                                            dropdown.classList.toggle('hidden');
                                                            e.stopPropagation();
                                                        }}
                                                        className="bg-white text-green-600 px-2 py-1 rounded-md hover:bg-green-50"
                                                        title="Gratuit"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m-8-6h16" />
                                                        </svg>
                                                    </button>
                                                    <div id="gratuitDropdown" className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg z-10 hidden">
                                                        <button 
                                                            onClick={() => {
                                                                document.getElementById('gratuitDropdown').classList.add('hidden');
                                                                if (selectedProduct) {
                                                                    handleMakeItemFree('item');
                                                                } else {
                                                                    showAlert('Sélectionnez un article d\'abord', 'Information');
                                                                }
                                                            }}
                                                            className="block px-4 py-2 text-xs text-left text-gray-700 hover:bg-green-100 w-full rounded-t-md"
                                                        >
                                                            Article
                                                        </button>
                                                        <button 
                                                            onClick={() => {
                                                                document.getElementById('gratuitDropdown').classList.add('hidden');
                                                                handleMakeItemFree('order');
                                                            }}
                                                            className="block px-4 py-2 text-xs text-left text-gray-700 hover:bg-green-100 w-full rounded-b-md"
                                                        >
                                                            Commande
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => cancelOrder(activeOrderId)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                                    title="Annuler"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Cart Items - More compact display */}
                        <div className="flex-1 overflow-auto px-2 py-2">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <ShoppingCartIcon className="h-12 w-12 mb-2" />
                                    <p className="text-base font-medium">Le panier est vide</p>
                                    <p className="text-xs">Ajoutez des produits depuis la grille</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {cart.map((item, index) => (
                                        <div 
                                            key={index} 
                                            onClick={() => {
                                                const product = menuData.flatMap(cat => cat.products).find(p => p.id === item.product_id);
                                                if (product) {
                                                    setSelectedProduct(product);
                                                    setStartNewInput(true);
                                                }
                                            }}
                                            className={`bg-white rounded-lg shadow p-2 flex justify-between items-center cursor-pointer transition-colors ${
                                                selectedProduct?.id === item.product_id ? 'bg-blue-50 border-l-4 border-l-blue-500 pl-2' : ''
                                            }`}
                                        >
                                            <div className="flex-1 pr-2">
                                                <div className="font-medium text-sm">
                                                    {item.name}
                                                    {itemDiscounts[item.product_id] && (
                                                        <span className={`ml-2 text-xs font-normal ${
                                                            itemDiscounts[item.product_id].type === 'percentage' && 
                                                            itemDiscounts[item.product_id].value >= 100 ? 
                                                            'text-red-600 font-semibold' : 'text-green-600'
                                                        }`}>
                                                            {itemDiscounts[item.product_id].type === 'percentage' && 
                                                             itemDiscounts[item.product_id].value >= 100 ? 
                                                             '(GRATUIT)' : 
                                                             `(-${itemDiscounts[item.product_id].type === 'percentage' 
                                                                ? itemDiscounts[item.product_id].value + '%' 
                                                                : itemDiscounts[item.product_id].amount.toFixed(2) + ' MAD'})`}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-gray-600 text-xs">
                                                    {formatPrice(item.unit_price || item.price)} x {item.quantity}
                                                    {itemDiscounts[item.product_id] && (
                                                        <span className="ml-1">
                                                            ⟶ {
                                                                itemDiscounts[item.product_id].type === 'percentage' && 
                                                                itemDiscounts[item.product_id].value >= 100 ? 
                                                                '0.00' : 
                                                                (() => {
                                                                    let price = item.unit_price || item.price;
                                                                    const discount = itemDiscounts[item.product_id];
                                                                    if (discount.type === 'percentage') {
                                                                        price = price * (1 - discount.value / 100);
                                                                    } else if (discount.type === 'fixed') {
                                                                        price = Math.max(0, price - (discount.amount / item.quantity));
                                                                    }
                                                                    return formatPrice(price);
                                                                })()
                                                            } MAD
                                                        </span>
                                                    )}
                                                </div>
                                                {item.notes && (
                                                    <div className="text-xs text-gray-500 italic">
                                                        Note: {item.notes}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <div className="font-bold text-gray-800 text-sm">
                                                    {itemDiscounts[item.product_id] && 
                                                    ((itemDiscounts[item.product_id].type === 'percentage' && 
                                                      itemDiscounts[item.product_id].value >= 100) ||
                                                     (itemDiscounts[item.product_id].type === 'fixed' && 
                                                      itemDiscounts[item.product_id].amount >= (item.unit_price || item.price) * item.quantity)) ? 
                                                     '0.00 MAD' :
                                                     formatPrice(
                                                         itemDiscounts[item.product_id]
                                                             ? itemDiscounts[item.product_id].type === 'percentage'
                                                                ? (item.unit_price || item.price) * item.quantity * (1 - itemDiscounts[item.product_id].value / 100)
                                                                : (item.unit_price || item.price) * item.quantity - itemDiscounts[item.product_id].amount
                                                            : (item.unit_price || item.price) * item.quantity
                                                     )
                                                    }
                                                </div>
                                                <div className="flex flex-col space-y-1">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const product = menuData.flatMap(cat => cat.products).find(p => p.id === item.product_id);
                                                            if (product) {
                                                                setSelectedProduct(product);
                                                                setShowCustomizeModal(true); // Open update modal
                                                            }
                                                        }}
                                                        className="rounded hover:bg-gray-100 flex items-center justify-center w-8 h-8"
                                                        style={{ minWidth: 0, minHeight: 0, padding: 0 }}
                                                    >
                                                        <PencilIcon className="h-5 w-5 text-blue-500" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openDiscountModal(item);
                                                        }}
                                                        className="rounded hover:bg-gray-100 flex items-center justify-center w-8 h-8"
                                                        style={{ minWidth: 0, minHeight: 0, padding: 0 }}
                                                        title="Appliquer une remise"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (item.quantity > 1) {
                                                                setDeleteTarget({ product_id: item.product_id, quantity: item.quantity });
                                                                setDeleteQty(1);
                                                                setShowDeleteQtyModal(true);
                                                            } else {
                                                                showConfirm(
                                                                    "Êtes-vous sûr de vouloir supprimer ce produit du panier ?",
                                                                    (confirmed) => {
                                                                        if (confirmed) {
                                                                            removeFromCart(item.product_id);
                                                                            if (selectedProduct?.id === item.product_id) {
                                                                                setSelectedProduct(null);
                                                                            }
                                                                        }
                                                                    },
                                                                    "Confirmation"
                                                                );
                                                            }
                                                        }}
                                                        className="rounded hover:bg-gray-100 flex items-center justify-center w-8 h-8"
                                                        style={{ minWidth: 0, minHeight: 0, padding: 0 }}
                                                        title="Supprimer"
                                                    >
                                                        <TrashIcon className="h-5 w-5 text-red-500" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>  
                        {/* Taxes and Total - more compact */}
                        <div className="border-t border-gray-200 p-1 bg-gray-50">
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>Sous-total</span>
                                    <span>{subtotal.toFixed(2)} MAD</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>TVA (20%)</span>
                                    <span>{tax.toFixed(2)} MAD</span>
                                </div>
                                {deliverySurcharge > 0 && (
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>Frais livraison</span>
                                        <span>{deliverySurcharge.toFixed(2)} MAD</span>
                                    </div>
                                )}
                                {activePromotion && (
                                    <div className="flex justify-between text-xs text-green-600">
                                        <span className="truncate">{activePromotion.name}</span>
                                        <span>-{(activePromotion.amount || activePromotion.discountAmount || 0).toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="h-px bg-gray-200 my-1"></div>
                                <div className="flex justify-between text-sm font-bold text-blue-900">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)} MAD</span>
                                </div>
                                <div className="flex justify-center">
                                    <button 
                                        onClick={() => calculateTotals()}
                                        className="px-3 py-1 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full mt-1"
                                    >
                                        Mise à jour
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Numeric Keypad - traditional calculator layout */}
                        <div className="border-t border-gray-200 bg-gray-50 p-2">
                            <div className="grid grid-cols-4 gap-2">
                                <div className="col-span-3">
                                    <div className="grid grid-cols-3 gap-2">
                                        <button 
                                            onClick={() => handleKeypadInput(1)}
                                            className="flex items-center justify-center text-lg font-medium bg-white hover:bg-gray-100 text-gray-800 rounded transition-colors h-8 shadow"
                                        >
                                            1
                                        </button>
                                        <button 
                                            onClick={() => handleKeypadInput(2)}
                                            className="flex items-center justify-center text-lg font-medium bg-white hover:bg-gray-100 text-gray-800 rounded transition-colors h-8 shadow"
                                        >
                                            2
                                        </button>
                                        <button 
                                            onClick={() => handleKeypadInput(3)}
                                            className="flex items-center justify-center text-lg font-medium bg-white hover:bg-gray-100 text-gray-800 rounded transition-colors h-8 shadow"
                                        >
                                            3
                                        </button>
                                        <button 
                                            onClick={() => handleKeypadInput(4)}
                                            className="flex items-center justify-center text-lg font-medium bg-white hover:bg-gray-100 text-gray-800 rounded transition-colors h-8 shadow"
                                        >
                                            4
                                        </button>
                                        <button 
                                            onClick={() => handleKeypadInput(5)}
                                            className="flex items-center justify-center text-lg font-medium bg-white hover:bg-gray-100 text-gray-800 rounded transition-colors h-8 shadow"
                                        >
                                            5
                                        </button>
                                        <button 
                                            onClick={() => handleKeypadInput(6)}
                                            className="flex items-center justify-center text-lg font-medium bg-white hover:bg-gray-100 text-gray-800 rounded transition-colors h-8 shadow"
                                        >
                                            6
                                        </button>
                                        <button 
                                            onClick={() => handleKeypadInput(7)}
                                            className="flex items-center justify-center text-lg font-medium bg-white hover:bg-gray-100 text-gray-800 rounded transition-colors h-8 shadow"
                                        >
                                            7
                                        </button>
                                        <button 
                                            onClick={() => handleKeypadInput(8)}
                                            className="flex items-center justify-center text-lg font-medium bg-white hover:bg-gray-100 text-gray-800 rounded transition-colors h-8 shadow"
                                        >
                                            8
                                        </button>
                                        <button 
                                            onClick={() => handleKeypadInput(9)}
                                            className="flex items-center justify-center text-lg font-medium bg-white hover:bg-gray-100 text-gray-800 rounded transition-colors h-8 shadow"
                                        >
                                            9
                                        </button>
                                        <button 
                                            onClick={() => handleKeypadInput(0)}
                                            className="flex items-center justify-center text-lg font-medium bg-white hover:bg-gray-100 text-gray-800 rounded transition-colors h-8 shadow"
                                        >
                                            0
                                        </button>
                                        <button 
                                            onClick={() => handleKeypadInput('CE')}
                                            className="flex items-center justify-center text-lg font-medium bg-blue-100 hover:bg-blue-200 text-blue-800 rounded transition-colors h-8 shadow"
                                        >
                                            CE
                                        </button>
                                        <button 
                                            onClick={() => handleKeypadInput('⌫')}
                                            className="flex items-center justify-center text-lg font-medium bg-red-100 hover:bg-red-200 text-red-800 rounded transition-colors h-8 shadow"
                                        >
                                            ⌫
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => {
                                            if (selectedProduct) {
                                                const currentQty = cart.find(item => item.product_id === selectedProduct.id)?.quantity || 0;
                                                updateQuantity(selectedProduct.id, currentQty + 1);
                                            }
                                        }}
                                        className="flex items-center justify-center text-lg font-medium bg-green-100 hover:bg-green-200 text-green-800 rounded transition-colors h-8 shadow"
                                    >
                                        +
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if (selectedProduct) {
                                                const currentQty = cart.find(item => item.product_id === selectedProduct.id)?.quantity || 0;
                                                if (currentQty > 1) {
                                                    updateQuantity(selectedProduct.id, currentQty - 1);
                                                }
                                            }
                                        }}
                                        className="flex items-center justify-center text-lg font-medium bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded transition-colors h-8 shadow"
                                    >
                                        -
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if (selectedProduct) {
                                                removeFromCart(selectedProduct.id);
                                                setSelectedProduct(null);
                                            }
                                        }}
                                        className="flex items-center justify-center text-lg font-medium bg-red-100 hover:bg-red-200 text-red-800 rounded transition-colors h-8 shadow"
                                    >
                                        C
                                    </button>
                                    <button 
                                        onClick={() => setShowPaymentModal(true)}
                                        className="flex items-center justify-center text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors flex-1 rounded shadow-md"
                                    >
                                        ↵
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Navigation - Payment button */}
                        <div className="p-2 bg-white border-t">
                            <button
                                onClick={() => setShowPaymentModal(true)}
                                disabled={!activeOrderId || cart.length === 0}
                                className={`w-full p-3 rounded-md transition-colors text-base font-medium h-8 flex items-center justify-center ${
                                    !activeOrderId || cart.length === 0
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                                }`}
                            >   
                                <BanknotesIcon className="h-5 w-5 mr-2" />
                                Payer ({total.toFixed(2)} MAD)
                            </button>
                        </div>
                    </div>
                    {/* Right Side - Products or Tables - Adjust width to match left side changes */}
                    <div className="w-2/3 md:w-3/5 lg:w-3/5 xl:w-2/3 flex flex-col bg-gray-100">
                        {/* Top Navigation Tabs */}
                        <div className="bg-white shadow-md mb-2">
                            <div className="max-w-7xl mx-auto p-2">
                                <div className="flex items-center justify-between">
                                    {/* Left: Tab Buttons */}
                                    <div className="flex items-center">
                                        <button 
                                            onClick={() => setActiveTab('tables')} 
                                            className={`px-4 py-2 mr-2 rounded-md ${activeTab === 'tables' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                        >
                                            Tables
                                        </button>
                                        <button 
                                            onClick={() => setActiveTab('caisse')} 
                                            className={`px-4 py-2 rounded-md ${activeTab === 'caisse' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                        >
                                            Caisse
                                        </button>
                                    </div>
                                    {/* Right: Connection Status Indicator */}
                                    <div className={`flex items-center px-3 py-1 ml-4 rounded-full font-semibold text-sm shadow-md select-none ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        {isOnline ? (
                                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.53 16.11a6 6 0 016.95 0M5.07 12.66a10 10 0 0113.86 0M1.64 9.21a14 14 0 0120.72 0M12 20h.01" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636A9 9 0 005.636 18.364M1 1l22 22M8.53 16.11a6 6 0 016.95 0" />
                                            </svg>
                                        )}
                                        {isOnline ? `${userName} - Connecté` : 'Hors ligne'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table Management View */}
                        {activeTab === 'tables' && (
                            <div className="flex-1 flex flex-col bg-gray-100 overflow-auto">
                                <div className="p-4">
                                    <div className="max-w-7xl mx-auto">
                                        {/* Floor Selection */}
                                        <div className="flex justify-end mb-4">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => setActiveFloor('Main Floor')}
                                                    className={`px-4 py-2 rounded-md border ${activeFloor === 'Main Floor' ? 'bg-blue-600 text-white' : 'bg-white'}`}
                                                >
                                                    Main Floor
                                                </button>
                                                <button 
                                                    onClick={() => setActiveFloor('Patio')}
                                                    className={`px-4 py-2 rounded-md border ${activeFloor === 'Patio' ? 'bg-blue-600 text-white' : 'bg-white'}`}
                                                >
                                                    Patio
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Floor Plan */}
                                        <div className="bg-gray-700 p-4 rounded-lg shadow-xl">
                                            {/* Restaurant Layout - Main Floor */}
                                            {activeFloor === 'Main Floor' && (
                                                <div className="bg-amber-100 p-6 rounded-md min-h-[600px] relative">
                                                    {/* Tables Area - kitchen removed, full width */}
                                                    <div className="w-full grid grid-cols-3 gap-8 p-6 justify-items-center">
                                                        {tables.filter(table => parseInt(table.id) < 20).map(table => (
                                                            <div 
                                                                key={table.id}
                                                                onClick={() => handleTableSelect(table.id)}
                                                                className={`relative w-full h-48 max-w-xs rounded-xl shadow-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105
                                                                    ${table.status === 'occupied' ? 'bg-red-100 border-red-400' : 'bg-green-100 border-green-400'}
                                                                `}
                                                            >
                                                                {/* Status Badge */}
                                                                <div className={`absolute top-2 right-2 w-4 h-4 rounded-full ${table.status === 'occupied' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                                                {/* Table Number */}
                                                                <span className="text-3xl font-bold text-gray-800">{table.id}</span>
                                                                {/* Occupancy */}
                                                                {table.status === 'occupied' && (
                                                                    <div className="mt-2 px-2 py-1 bg-white rounded-full text-xs font-semibold shadow">
                                                                        {tableOccupancies[table.id] || 1} {tableOccupancies[table.id] === 1 ? 'person' : 'people'}
                                                                    </div>
                                                                )}
                                                                
                                                                {/* Timer display */}
                                                                {table.status === 'occupied' && tableTimers[table.id] && (
                                                                    <div className="mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold shadow flex items-center">
                                                                        <span className="mr-1">⏱️</span> {tableTimers[table.id]}
                                                                    </div>
                                                                )}
                                                                
                                                                {/* Round Table Chairs */}
                                                                <div className="absolute -top-6 left-12 w-8 h-8 bg-blue-300 rounded-full"></div>
                                                                <div className="absolute top-12 -right-6 w-8 h-8 bg-blue-300 rounded-full"></div>
                                                                <div className="absolute -bottom-6 left-12 w-8 h-8 bg-blue-300 rounded-full"></div>
                                                                <div className="absolute top-12 -left-6 w-8 h-8 bg-blue-300 rounded-full"></div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Patio Area */}
                                            {activeFloor === 'Patio' && (
                                                <div className="bg-emerald-100 p-6 rounded-md min-h-[600px] relative">
                                                    <div className="grid grid-cols-3 gap-8 p-6">
                                                        {tables.filter(table => parseInt(table.id) >= 20).map(table => (
                                                            <div 
                                                                key={table.id}
                                                                onClick={() => handleTableSelect(table.id)}
                                                                className={`relative ${
                                                                    table.status === 'occupied' 
                                                                        ? 'bg-red-400 border-red-600' 
                                                                        : 'bg-green-400 border-green-600'
                                                                } w-32 h-32 rounded-full flex flex-col items-center justify-center cursor-pointer shadow-md border-2 transition-transform transform hover:scale-105`}
                                                            >
                                                                <span className="text-2xl font-bold">{table.id}</span>
                                                                
                                                                {/* Show number of people if table is occupied */}
                                                                {table.status === 'occupied' && (
                                                                    <div className="mt-1 px-2 py-1 bg-white rounded-full text-xs font-medium">
                                                                        {tableOccupancies[table.id] || 1} {tableOccupancies[table.id] === 1 ? 'person' : 'people'}
                                                                    </div>
                                                                )}
                                                                
                                                                {/* Timer display */}
                                                                {table.status === 'occupied' && tableTimers[table.id] && (
                                                                    <div className="mt-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center">
                                                                        <span className="mr-1">⏱️</span> {tableTimers[table.id]}
                                                                    </div>
                                                                )}
                                                                
                                                                {/* Round Table Chairs */}
                                                                <div className="absolute -top-6 left-12 w-8 h-8 bg-blue-300 rounded-full"></div>
                                                                <div className="absolute top-12 -right-6 w-8 h-8 bg-blue-300 rounded-full"></div>
                                                                <div className="absolute -bottom-6 left-12 w-8 h-8 bg-blue-300 rounded-full"></div>
                                                                <div className="absolute top-12 -left-6 w-8 h-8 bg-blue-300 rounded-full"></div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Legend */}
                                        <div className="mt-4 flex gap-6 text-sm">
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 bg-green-400 mr-2 rounded-sm"></div>
                                                <span>Disponible</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 bg-red-400 mr-2 rounded-sm"></div>
                                                <span>Occupée</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Cash Register (Caisse) View */}
                        {activeTab === 'caisse' && (
                            <>
                                {/* Products Section */}
                                <div className="flex-1 overflow-auto">
                                    <ProductSection 
                                        onProductSelect={(product) => {
                                            setSelectedProduct(product);
                                            setShowCustomizeModal(true);
                                        }}
                                        activeCategory={activeCategory} 
                                        menuData={menuData}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ServiceTypeModal
                isOpen={showServiceTypeModal}
                onClose={() => setShowServiceTypeModal(false)}
                onSelect={handleServiceTypeSelect}
                currentType={orderType}
            />

            <NoteModal
                isOpen={showNoteModal}
                onClose={() => setShowNoteModal(false)}
                onSave={setNotes}
                initialNote={notes}
            />

            <PromotionModal
                isOpen={showPromotionModal}
                onClose={() => setShowPromotionModal(false)}
                onApply={handlePromotionApply}
                subtotal={subtotal}
            />

            <CustomizeModal
                isOpen={showCustomizeModal}
                onClose={() => setShowCustomizeModal(false)}
                onApply={handleCustomize}
                product={selectedProduct}
            />

            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                onComplete={handlePayment}
                total={total}
            />

            <TableOccupancyModal
                isOpen={showTableOccupancyModal}
                onClose={() => setShowTableOccupancyModal(false)}
                onSave={handleTableOccupancySave}
                tableId={selectedTableId}
                initialPeople={tableOccupancies[selectedTableId] || 1}
                isOccupied={isSelectedTableOccupied}
            />

            {/* Order History Log overlay */}
            {showOrderHistory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-4xl max-h-[80vh] flex flex-col">
                        <div className="p-4 border-b flex justify-between items-center bg-blue-900 text-white rounded-t-lg">
                            <h2 className="text-xl font-bold">Historique des commandes</h2>
                            <button 
                                onClick={() => setShowOrderHistory(false)}
                                className="text-white hover:text-gray-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 overflow-auto flex-grow">
                            {/* Tab Navigation */}
                            <div className="flex gap-2 mb-4">
                                <button 
                                    onClick={() => setActiveHistoryTab('all')}
                                    className={`px-4 py-3 rounded-md text-sm font-medium flex items-center ${
                                        activeHistoryTab === 'all' 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                    Toutes
                                </button>
                                <button 
                                    onClick={() => setActiveHistoryTab('pending')}
                                    className={`px-4 py-3 rounded-md text-sm font-medium flex items-center ${
                                        activeHistoryTab === 'pending' 
                                            ? 'bg-yellow-500 text-white' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    En cours
                                    <span className="ml-2 bg-white text-yellow-600 rounded-full h-6 w-6 flex items-center justify-center text-xs">
                                        {[...activeOrders, ...orders].filter(order => order.status === 'pending').length}
                                    </span>
                                </button>
                                <button 
                                    onClick={() => setActiveHistoryTab('paid')}
                                    className={`px-4 py-3 rounded-md text-sm font-medium flex items-center ${
                                        activeHistoryTab === 'paid' 
                                            ? 'bg-green-600 text-white' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Payées
                                    <span className="ml-2 bg-white text-green-600 rounded-full h-6 w-6 flex items-center justify-center text-xs">
                                        {[...activeOrders, ...orders].filter(order => order.status === 'paid').length}
                                    </span>
                                </button>
                                <button 
                                    onClick={() => setActiveHistoryTab('cancelled')}
                                    className={`px-4 py-3 rounded-md text-sm font-medium flex items-center ${
                                        activeHistoryTab === 'cancelled' 
                                            ? 'bg-red-600 text-white' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Annulées
                                    <span className="ml-2 bg-white text-red-600 rounded-full h-6 w-6 flex items-center justify-center text-xs">
                                        {[...activeOrders, ...orders].filter(order => order.status === 'cancelled').length}
                                    </span>
                                </button>
                            </div>
                            
                            {/* All Orders */}
                            {activeHistoryTab === 'all' && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2 bg-blue-100 p-2 rounded-md text-blue-800">Toutes les commandes</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {[...activeOrders, ...orders].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(order => (
                                                    <tr key={order.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.timestamp}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            {order.type === 'eat_in' ? 'Sur Place' : order.type === 'takeout' ? 'À Emporter' : 'Livraison'}
                                                            {order.table_number && ` - Table ${order.table_number}`}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.total.toFixed(2)} MAD</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                                                                {getStatusText(order.status)}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <div className="flex gap-2">
                                                                <button 
                                                                    onClick={() => openOrderDetails(order)}
                                                                    className="px-2 py-1 bg-gray-600 text-white rounded"
                                                                >
                                                                    Détails
                                                                </button>
                                                                {order.status === 'pending' && (
                                                                    <>
                                                                        <button 
                                                                            onClick={() => {
                                                                                switchToOrder(order.id);
                                                                                setShowOrderHistory(false);
                                                                            }}
                                                                            className="px-2 py-1 bg-blue-600 text-white rounded"
                                                                        >
                                                                            Modifier
                                                                        </button>
                                                                        <button 
                                                                            onClick={() => cancelOrder(order.id)}
                                                                            className="px-2 py-1 bg-red-600 text-white rounded"
                                                                        >
                                                                            Annuler
                                                                        </button>
                                                                    </>
                                                                )}
                                                                {order.status === 'paid' && (
                                                                    <button 
                                                                        onClick={() => {
                                                                            if (order.generateTicket) {
                                                                                const receiptGenerator = Receipt();
                                                                                receiptGenerator.generateReceipt(order);
                                                                            } else {
                                                                                showAlert('La génération de ticket est désactivée pour cette commande', 'Information');
                                                                            }
                                                                        }}
                                                                        className={`px-2 py-1 rounded ${order.generateTicket ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}
                                                                    >
                                                                        Imprimer
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {[...activeOrders, ...orders].length === 0 && (
                                                    <tr>
                                                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">Aucune commande trouvée</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                            
                            {/* Pending Orders */}
                            {activeHistoryTab === 'pending' && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2 bg-yellow-100 p-2 rounded-md text-yellow-800">Commandes en cours</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {[...activeOrders, ...orders]
                                                    .filter(order => order.status === 'pending')
                                                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                                    .map(order => (
                                                        <tr key={order.id} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.timestamp}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                {order.type === 'eat_in' ? 'Sur Place' : order.type === 'takeout' ? 'À Emporter' : 'Livraison'}
                                                                {order.table_number && ` - Table ${order.table_number}`}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.total.toFixed(2)} MAD</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <div className="flex gap-2">
                                                                    <button 
                                                                        onClick={() => openOrderDetails(order)}
                                                                        className="px-2 py-1 bg-gray-600 text-white rounded"
                                                                    >
                                                                        Détails
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => {
                                                                            switchToOrder(order.id);
                                                                            setShowOrderHistory(false);
                                                                        }}
                                                                        className="px-2 py-1 bg-blue-600 text-white rounded"
                                                                    >
                                                                        Modifier
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => cancelOrder(order.id)}
                                                                        className="px-2 py-1 bg-red-600 text-white rounded"
                                                                    >
                                                                        Annuler
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                {[...activeOrders, ...orders].filter(order => order.status === 'pending').length === 0 && (
                                                    <tr>
                                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">Aucune commande en cours</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                            
                            {/* Paid Orders */}
                            {activeHistoryTab === 'paid' && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2 bg-green-100 p-2 rounded-md text-green-800">Commandes payées</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {[...activeOrders, ...orders]
                                                    .filter(order => order.status === 'paid')
                                                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                                    .map(order => (
                                                        <tr key={order.id} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.timestamp}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                {order.type === 'eat_in' ? 'Sur Place' : order.type === 'takeout' ? 'À Emporter' : 'Livraison'}
                                                                {order.table_number && ` - Table ${order.table_number}`}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.total.toFixed(2)} MAD</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <div className="flex gap-2">
                                                                    <button 
                                                                        onClick={() => openOrderDetails(order)}
                                                                        className="px-2 py-1 bg-gray-600 text-white rounded"
                                                                    >
                                                                        Détails
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => {
                                                                            if (order.generateTicket) {
                                                                                const receiptGenerator = Receipt();
                                                                                receiptGenerator.generateReceipt(order);
                                                                            } else {
                                                                                showAlert('La génération de ticket est désactivée pour cette commande', 'Information');
                                                                            }
                                                                        }}
                                                                        className={`px-2 py-1 rounded ${order.generateTicket ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}
                                                                    >
                                                                        Imprimer
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                {[...activeOrders, ...orders].filter(order => order.status === 'paid').length === 0 && (
                                                    <tr>
                                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">Aucune commande payée</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                            
                            {/* Cancelled Orders */}
                            {activeHistoryTab === 'cancelled' && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2 bg-red-100 p-2 rounded-md text-red-800">Commandes annulées</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {[...activeOrders, ...orders]
                                                    .filter(order => order.status === 'cancelled')
                                                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                                    .map(order => (
                                                        <tr key={order.id} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.timestamp}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                {order.type === 'eat_in' ? 'Sur Place' : order.type === 'takeout' ? 'À Emporter' : 'Livraison'}
                                                                {order.table_number && ` - Table ${order.table_number}`}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.total.toFixed(2)} MAD</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <button 
                                                                    onClick={() => openOrderDetails(order)}
                                                                    className="px-2 py-1 bg-gray-600 text-white rounded"
                                                                >
                                                                    Détails
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                {[...activeOrders, ...orders].filter(order => order.status === 'cancelled').length === 0 && (
                                                    <tr>
                                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">Aucune commande annulée</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t bg-gray-50 rounded-b-lg flex justify-end">
                            <button 
                                onClick={() => setShowOrderHistory(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-base shadow-md min-w-[120px]"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* AlertModal */}
            {showAlertModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">{alertTitle}</h3>
                            <div className="mt-3">
                                {typeof alertMessage === 'string' 
                                    ? <p className="text-gray-600">{alertMessage}</p>
                                    : alertMessage
                                }
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            {isConfirm && (
                                <button
                                    onClick={() => {
                                        setShowAlertModal(false);
                                        if (alertCallback) alertCallback(false);
                                    }}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                >
                                    Annuler
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setShowAlertModal(false);
                                    if (alertCallback) alertCallback(true);
                                }}
                                className={`px-4 py-2 rounded text-white ${isConfirm ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {isConfirm ? 'Confirmer' : 'OK'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showDeleteQtyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xs">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Supprimer du panier</h3>
                        <p className="mb-4 text-gray-700">Combien d'articles voulez-vous supprimer ?</p>
                        <input
                            type="number"
                            min={1}
                            max={deleteTarget?.quantity || 1}
                            value={deleteQty}
                            onChange={e => setDeleteQty(Math.max(1, Math.min(deleteTarget?.quantity || 1, Number(e.target.value))))}
                            className="w-full p-2 border rounded mb-4 text-center"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowDeleteQtyModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => {
                                    if (deleteTarget) {
                                        if (deleteQty >= deleteTarget.quantity) {
                                            removeFromCart(deleteTarget.product_id);
                                            if (selectedProduct?.id === deleteTarget.product_id) {
                                                setSelectedProduct(null);
                                            }
                                        } else {
                                            updateQuantity(deleteTarget.product_id, deleteTarget.quantity - deleteQty);
                                        }
                                    }
                                    setShowDeleteQtyModal(false);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Active Orders Modal */}
            <ActiveOrdersModal 
                isOpen={showActiveOrdersModal}
                onClose={() => setShowActiveOrdersModal(false)}
                activeOrders={activeOrders}
                activeOrderId={activeOrderId}
                onOrderSelect={switchToOrder}
            />
            <OrderDetailsModal
                isOpen={showOrderDetailsModal}
                onClose={() => setShowOrderDetailsModal(false)}
                order={selectedOrderDetails}
            />
            <DiscountModal
                isOpen={showDiscountModal}
                onClose={() => setShowDiscountModal(false)}
                onApply={handleDiscountApply}
                selectedItem={selectedDiscountItem}
                subtotal={subtotal}
            />
            {/* Free Item Modal */}
            <Modal show={showFreeItemModal} onClose={() => setShowFreeItemModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Article Gratuit</h2>
                    <p className="mb-4">Que souhaitez-vous rendre gratuit?</p>
                    
                    <div className="flex flex-col space-y-3 mb-4">
                        <button
                            onClick={() => handleMakeItemFree('order')}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Commande entière
                        </button>
                        <button
                            onClick={() => handleMakeItemFree('item')}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            disabled={!selectedProduct}
                        >
                            Article sélectionné
                            {selectedProduct && <span className="ml-1">({selectedProduct.name})</span>}
                        </button>
                    </div>
                    
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowFreeItemModal(false)}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default PosIndex;