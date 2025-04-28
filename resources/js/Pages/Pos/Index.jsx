import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ServiceTypeModal from './ServiceTypeModal';
import NoteModal from './NoteModal';
import Receipt from './Receipt';
import PromotionModal from './PromotionModal';
import CustomizeModal from './CustomizeModal';
import PaymentModal from './PaymentModal';
import TableOccupancyModal from './TableOccupancyModal';
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
    XMarkIcon
} from '@heroicons/react/24/solid';

<<<<<<< HEAD
// Menu Data Structure
const menuData = [
        {
            id: 1,
    name: "Plats Principaux",
    products: [
      { id: 1, name: "Poulet rôti", description: "Roast Chicken", price: 15.99 },
      { id: 2, name: "Bœuf bourguignon", description: "Beef Bourguignon", price: 18.99 },
      { id: 3, name: "Lasagne", description: "Classic Lasagna", price: 14.99 },
      { id: 4, name: "Poisson grillé", description: "Grilled Fish", price: 17.99 },
      { id: 5, name: "Curry de légumes", description: "Vegetable Curry", price: 13.99 },
      { id: 6, name: "Tacos de viande", description: "Meat Tacos", price: 12.99 },
      { id: 7, name: "Risotto aux champignons", description: "Mushroom Risotto", price: 16.99 },
      { id: 8, name: "Pizza Margherita", description: "Classic Margherita Pizza", price: 13.99 },
      { id: 9, name: "Quiche Lorraine", description: "Classic Quiche", price: 11.99 },
      { id: 10, name: "Couscous aux légumes", description: "Vegetable Couscous", price: 12.99 },
      { id: 11, name: "Sauté de porc", description: "Pork Stir-fry", price: 15.99 },
      { id: 12, name: "Chili con carne", description: "Spicy Chili", price: 14.99 }
    ]
        },
        {
            id: 2,
    name: "Entrées",
    products: [
      { id: 13, name: "Salade César", description: "Caesar Salad", price: 8.99 },
      { id: 14, name: "Soupe à l'oignon", description: "French Onion Soup", price: 7.99 },
      { id: 15, name: "Bruschetta", description: "Italian Bruschetta", price: 6.99 },
      { id: 16, name: "Bouchées de fromage", description: "Cheese Bites", price: 7.99 },
      { id: 17, name: "Calamars frits", description: "Fried Calamari", price: 9.99 },
      { id: 18, name: "Mini quiches", description: "Mini Quiches", price: 8.99 },
      { id: 19, name: "Tapenade avec pain", description: "Tapenade with Bread", price: 6.99 },
      { id: 20, name: "Croquettes de pommes de terre", description: "Potato Croquettes", price: 7.99 },
      { id: 21, name: "Antipasti platter", description: "Italian Antipasti", price: 12.99 },
      { id: 22, name: "Hummus avec pita", description: "Hummus with Pita", price: 7.99 },
      { id: 23, name: "Gyoza", description: "Japanese Dumplings", price: 8.99 },
      { id: 24, name: "Nachos avec salsa", description: "Nachos with Salsa", price: 8.99 }
    ]
        },
        {
            id: 3,
    name: "Desserts",
    products: [
      { id: 25, name: "Tarte aux pommes", description: "Apple Pie", price: 6.99 },
      { id: 26, name: "Crème brûlée", description: "Classic Crème Brûlée", price: 7.99 },
      { id: 27, name: "Mousse au chocolat", description: "Chocolate Mousse", price: 6.99 },
      { id: 28, name: "Tiramisu", description: "Italian Tiramisu", price: 7.99 },
      { id: 29, name: "Cheesecake", description: "New York Cheesecake", price: 7.99 },
      { id: 30, name: "Panna cotta", description: "Italian Panna Cotta", price: 6.99 },
      { id: 31, name: "Macarons", description: "French Macarons", price: 8.99 },
      { id: 32, name: "Brownies", description: "Chocolate Brownies", price: 5.99 },
      { id: 33, name: "Profiteroles", description: "Cream Puffs", price: 7.99 },
      { id: 34, name: "Gâteau au chocolat", description: "Chocolate Cake", price: 6.99 },
      { id: 35, name: "Crêpes Suzette", description: "Classic French Crêpes", price: 8.99 },
      { id: 36, name: "Glaces artisanales", description: "Artisanal Ice Cream", price: 5.99 }
    ]
        },
        {
            id: 4,
    name: "Boissons Non-Alcoolisées",
    products: [
      { id: 37, name: "Eau minérale", description: "Mineral Water", price: 2.99 },
      { id: 38, name: "Soda", description: "Soft Drinks", price: 3.99 },
      { id: 39, name: "Jus d'orange", description: "Orange Juice", price: 3.99 },
      { id: 40, name: "Limonade", description: "Fresh Lemonade", price: 3.99 },
      { id: 41, name: "Thé glacé", description: "Iced Tea", price: 3.99 },
      { id: 42, name: "Smoothie aux fruits", description: "Fruit Smoothie", price: 5.99 },
      { id: 43, name: "Lait au chocolat", description: "Chocolate Milk", price: 3.99 },
      { id: 44, name: "Café décaféiné", description: "Decaf Coffee", price: 3.99 },
      { id: 45, name: "Boisson énergisante", description: "Energy Drink", price: 4.99 },
      { id: 46, name: "Eau aromatisée", description: "Flavored Water", price: 3.99 },
      { id: 47, name: "Jus de pomme", description: "Apple Juice", price: 3.99 },
      { id: 48, name: "Boisson au yaourt", description: "Yogurt Drink", price: 4.99 }
    ]
        },
        {
            id: 5,
    name: "Boissons Alcoolisées",
    products: [
      { id: 49, name: "Vin rouge", description: "Red Wine", price: 6.99 },
      { id: 50, name: "Vin blanc", description: "White Wine", price: 6.99 },
      { id: 51, name: "Bière blonde", description: "Blonde Beer", price: 5.99 },
      { id: 52, name: "Bière brune", description: "Brown Beer", price: 5.99 },
      { id: 53, name: "Whisky", description: "Premium Whisky", price: 8.99 },
      { id: 54, name: "Vodka", description: "Premium Vodka", price: 7.99 },
      { id: 55, name: "Rhum", description: "Caribbean Rum", price: 7.99 },
      { id: 56, name: "Tequila", description: "Mexican Tequila", price: 7.99 },
      { id: 57, name: "Champagne", description: "French Champagne", price: 12.99 },
      { id: 58, name: "Sangria", description: "Spanish Sangria", price: 6.99 },
      { id: 59, name: "Cocktails variés", description: "Various Cocktails", price: 9.99 },
      { id: 60, name: "Liqueurs", description: "Assorted Liqueurs", price: 7.99 }
    ]
        },
        {
            id: 6,
    name: "Snacks",
    products: [
      { id: 61, name: "Chips de pommes de terre", description: "Potato Chips", price: 3.99 },
      { id: 62, name: "Popcorn", description: "Fresh Popcorn", price: 3.99 },
      { id: 63, name: "Amandes grillées", description: "Roasted Almonds", price: 4.99 },
      { id: 64, name: "Barres granola", description: "Granola Bars", price: 2.99 },
      { id: 65, name: "Fruits secs", description: "Dried Fruits", price: 4.99 },
      { id: 66, name: "Crackers", description: "Assorted Crackers", price: 3.99 },
      { id: 67, name: "Fromage en cubes", description: "Cheese Cubes", price: 5.99 },
      { id: 68, name: "Olives", description: "Mixed Olives", price: 4.99 },
      { id: 69, name: "Bâtonnets de légumes avec dip", description: "Veggie Sticks with Dip", price: 5.99 },
      { id: 70, name: "Mini pretzels", description: "Mini Pretzels", price: 3.99 },
      { id: 71, name: "Mélange de noix", description: "Mixed Nuts", price: 5.99 },
      { id: 72, name: "Gâteaux apéritifs", description: "Savory Cakes", price: 4.99 }
    ]
        },
        {
            id: 7,
    name: "Produits de Boulangerie",
    products: [
      { id: 73, name: "Baguette", description: "French Baguette", price: 2.99 },
      { id: 74, name: "Pain de seigle", description: "Rye Bread", price: 3.99 },
      { id: 75, name: "Croissant", description: "Butter Croissant", price: 2.99 },
      { id: 76, name: "Pain au chocolat", description: "Chocolate Bread", price: 3.99 },
      { id: 77, name: "Brioche", description: "French Brioche", price: 3.99 },
      { id: 78, name: "Pain pita", description: "Pita Bread", price: 2.99 },
      { id: 79, name: "Muffins", description: "Assorted Muffins", price: 3.99 },
      { id: 80, name: "Scones", description: "English Scones", price: 3.99 },
      { id: 81, name: "Focaccia", description: "Italian Focaccia", price: 4.99 },
      { id: 82, name: "Pain aux noix", description: "Nut Bread", price: 4.99 },
      { id: 83, name: "Tartes salées", description: "Savory Tarts", price: 5.99 },
      { id: 84, name: "Gâteaux de mariage", description: "Wedding Cakes", price: 99.99 }
    ]
        },
        {
            id: 8,
    name: "Boissons Chaudes",
    products: [
      { id: 85, name: "Espresso", description: "Strong Espresso", price: 2.99 },
      { id: 86, name: "Cappuccino", description: "Italian Cappuccino", price: 3.99 },
      { id: 87, name: "Latte", description: "Café Latte", price: 3.99 },
      { id: 88, name: "Thé noir", description: "Black Tea", price: 2.99 },
      { id: 89, name: "Thé vert", description: "Green Tea", price: 2.99 },
      { id: 90, name: "Thé aux fruits", description: "Fruit Tea", price: 3.99 },
      { id: 91, name: "Chocolat chaud épicé", description: "Spiced Hot Chocolate", price: 4.99 },
      { id: 92, name: "Infusion de camomille", description: "Chamomile Infusion", price: 2.99 },
      { id: 93, name: "Lait chaud au miel", description: "Hot Milk with Honey", price: 3.99 },
      { id: 94, name: "Tisane à la menthe", description: "Mint Herbal Tea", price: 2.99 },
      { id: 95, name: "Café au lait", description: "Coffee with Milk", price: 3.99 },
      { id: 96, name: "Chai latte", description: "Spiced Chai Latte", price: 4.99 }
    ]
  }
];
=======
// Note: menuData is now defined in the PosIndex component to avoid ReferenceError
>>>>>>> d79a3b6e97f5872204d126a5db3674431e4ff0c9

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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
            {menuData.map(category => (
                <div
                    key={category.id}
                    onClick={() => onCategorySelect(category.id)}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden transform hover:-translate-y-1 h-32"
                    style={{ backgroundColor: categoryColors[category.id] + '30' }}
                >
                    <div className="p-4 flex flex-col items-center justify-center h-full">
                        <div className="text-4xl mb-2">{categoryIcons[category.id]}</div>
                        <h3 className="font-semibold text-sm text-gray-800 text-center">{category.name}</h3>
                        <p className="text-xs text-gray-600 mt-1">{category.products.length} articles</p>
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
    const [orderFromBar, setOrderFromBar] = useState(false);
    const [showOrderBarDropdown, setShowOrderBarDropdown] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

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
        const newSubtotal = cart.reduce((sum, item) => {
            let itemTotal = item.quantity * (item.price || item.unit_price);
            
            // Add customization charges if present
            if (customizations[item.product_id]) {
                itemTotal += customizations[item.product_id].extraCharge * item.quantity;
            }
            
            return sum + itemTotal;
        }, 0);

        const newTax = newSubtotal * 0.20; // 20% tax
        let newTotal = newSubtotal + newTax;
        
        // Add delivery surcharge if delivery is selected
        if (orderType === 'delivery') {
            const surcharge = newSubtotal * 0.10;
            setDeliverySurcharge(surcharge);
            newTotal += surcharge;
        } else {
            setDeliverySurcharge(0);
        }

        // Apply promotion discount if active
        if (activePromotion) {
            newTotal -= activePromotion.discountAmount;
        }

        setSubtotal(newSubtotal);
        setTax(newTax);
        setTotal(newTotal);
    };

    const addToCart = (productId) => {
        // Check if there's an active order first
        if (!activeOrderId) {
            showAlert('Veuillez créer une nouvelle commande d\'abord.', 'Attention');
            return;
        }

        // Find the product in any category
        const allProducts = menuData.flatMap(cat => cat.products);
        const product = allProducts.find(p => p.id === productId);
        
        if (!product) return;
        
        const existingItem = cart.find(item => item.product_id === productId);

        if (existingItem) {
            const updatedCart = cart.map(item => {
                if (item.product_id === productId) {
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
                    unit_price: product.price, // Make sure unit_price is set
                quantity: 1,
                    total: product.price,
                    name: product.name
                }
            ]);
        }
        
        // The calculateTotals will be called via useEffect when cart changes
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
            total: 0
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
                    numberOfPeople: tableOccupancies[tableNumber] || order.numberOfPeople || 1
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
                    customizations: customizations[item.product_id]
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
                promotion: activePromotion
            };

            // Generate the receipt
            try {
            const receiptGenerator = Receipt();
            receiptGenerator.generateReceipt(finalOrder);
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
            setCustomizations({});
            setSelectedProduct(null);
            setShowPaymentModal(false);
            
            // Remove success message
            // showAlert('Paiement réussi!', 'Succès');

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
        // Check if there's an active order before proceeding
        if (!activeOrderId) {
            showAlert('Veuillez créer une nouvelle commande d\'abord.', 'Attention');
            setShowCustomizeModal(false);
            return;
        }

        if (product) {
            // Store customizations if any
        if (customizations) {
                setCustomizations({
                    ...customizations,
                    [product.id]: customizations
                });
        }
            
            // Add product to cart
            addToCart(product.id);
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
        if (cancelOrder) {
            // Cancel the order for this table
            const orderToCancel = activeOrders.find(order => 
                order.status === 'pending' && order.table_number === tableId
            );
            
            if (orderToCancel) {
                setActiveOrders(activeOrders.map(order => 
                    order.id === orderToCancel.id
                        ? { ...order, status: 'cancelled' } 
                        : order
                ));
                
                // If cancelling the active order, clear the cart
                if (orderToCancel.id === activeOrderId) {
                    setCart([]);
                    setActiveOrderId(null);
                }
            }
            
            // Update table occupancies
            const updatedOccupancies = { ...tableOccupancies };
            delete updatedOccupancies[tableId];
            setTableOccupancies(updatedOccupancies);
            
            return;
        }
        
        // Store the number of people for this table
        setTableOccupancies({
            ...tableOccupancies,
            [tableId]: numberOfPeople
        });
        
        if (isSelectedTableOccupied) {
            // Update existing order with new number of people
            const orderToUpdate = activeOrders.find(order => 
                order.status === 'pending' && order.table_number === tableId
            );
            
            if (orderToUpdate) {
                setActiveOrders(activeOrders.map(order => 
                    order.id === orderToUpdate.id
                        ? { ...order, numberOfPeople: numberOfPeople } 
                        : order
                ));
                
                // If updating the active order, update the state
                if (orderToUpdate.id === activeOrderId) {
                    // Just update the number of people in the current order
                }
            }
        } else {
            // We know there's an active order because of the check in handleTableSelect
            // Just update the current active order with the table number and people
            setTableNumber(tableId);
            setOrderType('eat_in');
            
            // Update the current active order with the table number and people
            saveCurrentOrderState();
            
            setActiveOrders(activeOrders.map(order => 
                order.id === activeOrderId
                    ? { 
                        ...order, 
                        type: 'eat_in',
                        table_number: tableId,
                        numberOfPeople: numberOfPeople
                    }
                    : order
            ));
        }
        
        // Switch to the Caisse tab
        setActiveTab('caisse');
    };

    return (
        <>
            <Head title="Système de Caisse" />
            <div className="flex h-screen bg-gray-100">
                {/* Connection Status Indicator */}
                <div className="absolute top-2 right-2 z-50">
                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 ${isOnline ? 'text-green-500' : 'text-red-500'}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d={isOnline 
                                    ? "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" 
                                    : "M12 18h.01M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                                }
                            />
                        </svg>
                        <span className="text-sm font-medium">
                            {isOnline ? 'Connecté' : 'Déconnecté'}
                        </span>
                    </div>
                </div>

                {/* Left Side - Cart */}
                <div className="w-2/5 bg-white flex flex-col shadow-lg">
                    {/* Cart Header - more compact with active orders */}
                    <div className="p-3 bg-blue-900 text-white">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Panier</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleNewOrder}
                                    className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm font-medium min-w-[100px] h-10 flex items-center justify-center shadow-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Nouvelle
                                </button>
                                <div className="relative group">
                                    <button
                                        onClick={() => setShowOrderBarDropdown(!showOrderBarDropdown)}
                                        className="px-3 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 text-sm font-medium min-w-[100px] h-10 flex items-center justify-center shadow-md"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Commandes <span className="ml-1 bg-white text-blue-900 rounded-full h-5 w-5 flex items-center justify-center text-xs">{activeOrders.filter(o => o.status === 'pending').length}</span>
                                    </button>
                                    
                                    {/* Active Orders Dropdown */}
                                    {showOrderBarDropdown && (
                                        <div className="absolute right-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden z-10 w-72">
                                        <div className="py-1 max-h-80 overflow-y-auto">
                                            {activeOrders.filter(o => o.status === 'pending').length === 0 ? (
                                                <div className="px-4 py-3 text-sm text-gray-500">Aucune commande active</div>
                                            ) : (
                                                activeOrders.filter(o => o.status === 'pending').map(order => (
                                                    <div 
                                                        key={order.id} 
                                                        className={`px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer ${activeOrderId === order.id ? 'bg-blue-50' : ''}`}
                                                            onClick={() => {
                                                                // Load the order into the cart
                                                                setCart(order.items);
                                                                setTableNumber(order.table_number || '');
                                                                setNotes(order.notes || '');
                                                                setOrderType(order.type || 'takeout');
                                                                setActiveOrderId(order.id);
                                                                // Set a flag to indicate this order was selected from the order bar
                                                                setOrderFromBar(true);
                                                                // Close the dropdown
                                                                setShowOrderBarDropdown(false);
                                                            }}
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">
                                                                    {order.type === 'eat_in' ? 'Sur Place' : order.type === 'takeout' ? 'À Emporter' : 'Livraison'}
                                                                    {order.table_number && ` - Table ${order.table_number}`}
                                                                </span>
                                                                <span className="text-xs text-gray-500">{order.timestamp}</span>
                                                            </div>
                                                            <span className="font-medium">{order.total.toFixed(2)} MAD</span>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                    )}
                                </div>
                                
                                {/* History Button */}
                                <button
                                    onClick={() => setShowOrderHistory(!showOrderHistory)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium min-w-[100px] h-10 flex items-center justify-center shadow-md ${
                                        showOrderHistory ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Historique
                                </button>
                            </div>
                        </div>
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
                                            <div className="font-medium text-sm">{item.name}</div>
                                            <div className="text-gray-600 text-xs">
                                                {formatPrice(item.unit_price || item.price)} x {item.quantity}
                                    </div>
                                            {item.notes && (
                                                <div className="text-xs text-gray-500 italic">
                                                    Note: {item.notes}
                                                            </div>
                                                        )}
                                                    </div>
                                        <div className="flex items-center space-x-1">
                                            <div className="font-bold text-gray-800 text-sm">
                                                {formatPrice((item.unit_price || item.price) * item.quantity)}
                                                </div>
                                            <div className="flex flex-col space-y-1">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const product = menuData.flatMap(cat => cat.products).find(p => p.id === item.product_id);
                                                        if (product) {
                                                            setSelectedProduct(product);
                                                            setStartNewInput(true);
                                                        }
                                                    }}
                                                    className="p-1 rounded hover:bg-gray-100"
                                                >
                                                    <PencilIcon className="h-3 w-3 text-blue-500" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromCart(item.product_id);
                                                        if (selectedProduct?.id === item.product_id) {
                                                            setSelectedProduct(null);
                                                        }
                                                    }}
                                                    className="p-1 rounded hover:bg-gray-100"
                                                >
                                                    <TrashIcon className="h-3 w-3 text-red-500" />
                                                </button>
                                            </div>
                                            </div>
                                        </div>
                                ))}
                                    </div>
                        )}
                    </div>

                    {/* Current Product Display - more compact */}
                    {selectedProduct && (
                        <div className="border-t border-gray-200 p-2 bg-blue-50">
                            <div className="flex justify-between items-center">
                                <div className="truncate">
                                    <h3 className="font-medium text-sm truncate">{selectedProduct.name}</h3>
                                    <p className="text-xs text-gray-600">{selectedProduct.price.toFixed(2)} MAD</p>
                                </div>
                                <div className="text-xl font-bold ml-2">
                                    {(cart.find(item => item.product_id === selectedProduct.id)?.quantity || 0)}
                                </div>
                            </div>
                        </div>
                    )}

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
                                    <span>-{activePromotion.discountAmount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="h-px bg-gray-200 my-1"></div>
                            <div className="flex justify-between text-sm font-bold text-blue-900">
                                <span>Total</span>
                                <span>{total.toFixed(2)} MAD</span>
                            </div>
                        </div>
                    </div>

                    {/* Numeric Keypad - traditional calculator layout */}
                    <div className="border-t border-gray-200 bg-gray-50 p-2">
                        <div className="grid grid-cols-4 gap-2">
                            <div className="col-span-3">
                                <div className="grid grid-cols-3 gap-2">
                                    {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, 'CE', '⌫'].map((num) => (
                                        <button 
                                            key={num}
                                            onClick={() => handleKeypadInput(num)}
                                            className={`flex items-center justify-center text-lg font-medium bg-white hover:bg-gray-100 text-gray-800 rounded transition-colors h-14 shadow ${
                                                (num === 'CE') ? 'bg-blue-100 hover:bg-blue-200 text-blue-800' : 
                                                (num === '⌫') ? 'bg-red-100 hover:bg-red-200 text-red-800' : ''
                                            }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
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
                                    className="flex items-center justify-center text-lg font-medium bg-green-100 hover:bg-green-200 text-green-800 rounded transition-colors h-14 shadow"
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
                                    className="flex items-center justify-center text-lg font-medium bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded transition-colors h-14 shadow"
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
                                    className="flex items-center justify-center text-lg font-medium bg-red-100 hover:bg-red-200 text-red-800 rounded transition-colors h-14 shadow"
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

                    {/* Action Buttons - Moved to top */}
                    <div className="p-2 bg-white border-b">
                        <div className="flex gap-2">
                            {activeOrderId && orderFromBar ? (
                        <button
                            onClick={() => setShowPaymentModal(true)}
                            disabled={!activeOrderId || cart.length === 0}
                                    className={`flex-1 p-3 rounded-md transition-colors text-base font-medium h-14 flex items-center justify-center shadow-md ${
                                !activeOrderId || cart.length === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Payer ({total.toFixed(2)} MAD)
                        </button>
                            ) : null}
                    </div>
                </div>

                    {/* Validate Button */}
                    {!activeOrderId || !orderFromBar ? (
                        <div className="p-2 bg-white border-t">
                            <button
                                onClick={() => {
                                    if (cart.length === 0) {
                                        showAlert('Le panier est vide', 'Erreur');
                                        return;
                                    }
                                    // Create a new order
                                    const newOrder = {
                                        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
                                        items: [...cart],
                                        notes: notes,
                                        table_number: tableNumber,
                                        type: orderType,
                                        status: 'pending',
                                        timestamp: new Date().toLocaleString(),
                                        subtotal: subtotal,
                                        tax: tax,
                                        total: total,
                                        readyToPay: false
                                    };
                                    // Add to orders history
                                    setOrders([...orders, newOrder]);
                                    
                                    // Print kitchen ticket
                                    const kitchenTicket = {
                                        ...newOrder,
                                        isKitchenTicket: true,
                                        header: 'TICKET DE CUISINE',
                                        footer: 'Merci de préparer cette commande'
                                    };
                                    const receiptGenerator = Receipt();
                                    receiptGenerator.generateReceipt(kitchenTicket);

                                    // Clear cart and reset states
                                    setCart([]);
                                    setNotes('');
                                    setTableNumber('');
                                    setOrderType('takeout');
                                    setActiveOrderId(null);
                                    setActivePromotion(null);
                                }}
                                className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 text-base font-medium h-14 flex items-center justify-center shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Envoyer à la cuisine
                            </button>
                        </div>
                    ) : null}
                </div>

                {/* Right Side - Products or Tables - Adjust width to match left side changes */}
                <div className="w-2/3 md:w-3/5 lg:w-3/5 xl:w-2/3 flex flex-col bg-gray-100">
                    {/* Top Navigation Tabs */}
                    <div className="bg-white shadow-md mb-2">
                        <div className="max-w-7xl mx-auto p-2">
                            <div className="flex flex-wrap items-center">
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
                                                {/* Kitchen Area */}
                                                <div className="absolute top-6 left-6 w-80 h-64 bg-gray-300 rounded-md border-2 border-gray-400 flex items-center justify-center">
                                                    <div className="absolute top-2 left-2 text-sm font-bold bg-gray-200 px-2 py-1 rounded">
                                                        Kitchen
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 p-4">
                                                        {/* Kitchen equipment */}
                                                        <div className="bg-gray-500 h-16 w-16 rounded-full"></div>
                                                        <div className="bg-gray-500 h-16 w-16 rounded-full"></div>
                                                        <div className="bg-gray-500 h-16 w-16 rounded-full"></div>
                                                        <div className="bg-gray-500 h-16 w-16 rounded-full"></div>
                                                        
                                                        {/* Sinks */}
                                                        <div className="bg-white h-16 w-16 rounded-full border-2 border-gray-400 flex items-center justify-center">
                                                            <div className="bg-gray-400 h-1 w-8 rounded"></div>
                                                        </div>
                                                        <div className="bg-white h-16 w-16 rounded-full border-2 border-gray-400 flex items-center justify-center">
                                                            <div className="bg-gray-400 h-1 w-8 rounded"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Tables Area */}
                                                <div className="ml-96 grid grid-cols-3 gap-8 p-6">
                                                    {tables.filter(table => parseInt(table.id) < 20).map(table => (
                                                        <div 
                                                            key={table.id}
                                                            onClick={() => table.status !== 'occupied' && handleTableSelect(table.id)}
                                                            className={`relative ${
                                                                table.status === 'occupied' 
                                                                    ? 'bg-red-400 border-red-600' 
                                                                    : 'bg-green-400 border-green-600'
                                                            } ${
                                                                parseInt(table.id) > 8 ? 'w-48 h-32' : 'w-32 h-32'
                                                            } rounded-md flex items-center justify-center cursor-pointer shadow-md border-2 transition-transform transform hover:scale-105`}
                                                        >
                                                            <span className="text-2xl font-bold">{table.id}</span>
                                                            
                                                            {/* Table Chairs */}
                                                            <div className="absolute -top-6 left-10 w-12 h-6 bg-blue-300 rounded-t-full"></div>
                                                            <div className="absolute -right-6 top-10 w-6 h-12 bg-blue-300 rounded-r-full"></div>
                                                            <div className="absolute -bottom-6 left-10 w-12 h-6 bg-blue-300 rounded-b-full"></div>
                                                            <div className="absolute -left-6 top-10 w-6 h-12 bg-blue-300 rounded-l-full"></div>
                                                            
                                                            {parseInt(table.id) > 8 && (
                                                                <>
                                                                    <div className="absolute -top-6 right-10 w-12 h-6 bg-blue-300 rounded-t-full"></div>
                                                                    <div className="absolute -bottom-6 right-10 w-12 h-6 bg-blue-300 rounded-b-full"></div>
                                                                </>
                                                            )}
                                                        </div>
<<<<<<< HEAD
                                                    ))}
                                                </div>
                                            </div>
                                        )}
=======
                                                    </div>
                                                    
                                                    {/* Tables Area */}
                                                    <div className="ml-96 grid grid-cols-3 gap-8 p-6">
                                                        {tables.filter(table => parseInt(table.id) < 20).map(table => (
                                                            <div 
                                                                key={table.id}
                                                                onClick={() => handleTableSelect(table.id)}
                                                                className={`relative ${
                                                                    table.status === 'occupied' 
                                                                        ? 'bg-red-400 border-red-600' 
                                                                        : 'bg-green-400 border-green-600'
                                                                } ${
                                                                    parseInt(table.id) > 8 ? 'w-48 h-32' : 'w-32 h-32'
                                                                } rounded-md flex flex-col items-center justify-center cursor-pointer shadow-md border-2 transition-transform transform hover:scale-105`}
                                                            >
                                                                <span className="text-2xl font-bold">{table.id}</span>
                                                                
                                                                {/* Show number of people if table is occupied */}
                                                                {table.status === 'occupied' && (
                                                                    <div className="mt-1 px-2 py-1 bg-white rounded-full text-xs font-medium">
                                                                        {tableOccupancies[table.id] || 1} {tableOccupancies[table.id] === 1 ? 'person' : 'people'}
                                                                    </div>
                                                                )}
                                                                
                                                                {/* Table Chairs */}
                                                                <div className="absolute -top-6 left-10 w-12 h-6 bg-blue-300 rounded-t-full"></div>
                                                                <div className="absolute -right-6 top-10 w-6 h-12 bg-blue-300 rounded-r-full"></div>
                                                                <div className="absolute -bottom-6 left-10 w-12 h-6 bg-blue-300 rounded-b-full"></div>
                                                                <div className="absolute -left-6 top-10 w-6 h-12 bg-blue-300 rounded-l-full"></div>
                                                                
                                                                {parseInt(table.id) > 8 && (
                                                                    <>
                                                                        <div className="absolute -top-6 right-10 w-12 h-6 bg-blue-300 rounded-t-full"></div>
                                                                        <div className="absolute -bottom-6 right-10 w-12 h-6 bg-blue-300 rounded-b-full"></div>
                                                                    </>
                                                                )}
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
>>>>>>> d79a3b6e97f5872204d126a5db3674431e4ff0c9
                                        
                                        {/* Patio Area */}
                                        {activeFloor === 'Patio' && (
                                            <div className="bg-emerald-100 p-6 rounded-md min-h-[600px] relative">
                                                <div className="grid grid-cols-3 gap-8 p-6">
                                                    {tables.filter(table => parseInt(table.id) >= 20).map(table => (
                                                        <div 
                                                            key={table.id}
                                                            onClick={() => table.status !== 'occupied' && handleTableSelect(table.id)}
                                                            className={`relative ${
                                                                table.status === 'occupied' 
                                                                    ? 'bg-red-400 border-red-600' 
                                                                    : 'bg-green-400 border-green-600'
                                                            } w-32 h-32 rounded-full flex items-center justify-center cursor-pointer shadow-md border-2 transition-transform transform hover:scale-105`}
                                                        >
                                                            <span className="text-2xl font-bold">{table.id}</span>
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

<<<<<<< HEAD
                    {/* Cash Register (Caisse) View */}
                    {activeTab === 'caisse' && (
                        <>
                            {/* Categories Menu - Replaces Service Type Pills */}
                            <div className="bg-white p-3 mb-2 border-b overflow-x-auto">
                                <div className="flex items-center space-x-4 px-2">
                                    {menuData.map(category => (
                                            <button
                                                key={category.id}
                                                onClick={() => setActiveCategory(category.id)}
                                            className={`px-4 py-2 rounded-full flex items-center whitespace-nowrap ${
                                                activeCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            <span className="mr-2">{
                                                category.id === 1 ? '🍽️' : 
                                                category.id === 2 ? '🥗' : 
                                                category.id === 3 ? '🍰' : 
                                                category.id === 4 ? '🥤' : 
                                                category.id === 5 ? '🍷' : 
                                                category.id === 6 ? '🍿' : 
                                                category.id === 7 ? '🥖' : '☕'
                                            }</span>
                                                {category.name}
                                            </button>
                                        ))}
                                </div>
                            </div>

                            {/* Products Section */}
                            <div className="flex-1 overflow-auto">
                                <ProductSection 
                                    onProductSelect={(product) => {
                                                setSelectedProduct(product);
                                                setShowCustomizeModal(true);
                                            }}
                                    activeCategory={activeCategory} 
                                />
                            </div>
                        </>
                    )}
=======
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
>>>>>>> d79a3b6e97f5872204d126a5db3674431e4ff0c9
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
                                                                    <div className="flex gap-2">
                                                                    <button 
                                                                        onClick={() => {
                                                                            const receiptGenerator = Receipt();
                                                                            receiptGenerator.generateReceipt(order);
                                                                        }}
                                                                        className="px-2 py-1 bg-green-600 text-white rounded"
                                                                    >
                                                                        Imprimer
                                                                    </button>
                                                                    </div>
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
                                                        <tr 
                                                            key={order.id} 
                                                            className="hover:bg-gray-50 cursor-pointer"
                                                            onClick={() => {
                                                                // Load the order into the cart
                                                                setCart(order.items);
                                                                setTableNumber(order.table_number || '');
                                                                setNotes(order.notes || '');
                                                                setOrderType(order.type || 'takeout');
                                                                setActiveOrderId(order.id);
                                                                
                                                                // Close the order history modal
                                                                setShowOrderHistory(false);
                                                            }}
                                                        >
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
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            switchToOrder(order.id);
                                                                            setShowOrderHistory(false);
                                                                        }}
                                                                        className="px-2 py-1 bg-blue-600 text-white rounded"
                                                                    >
                                                                        Modifier
                                                                    </button>
                                                                    <button 
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            cancelOrder(order.id);
                                                                        }}
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
                                                                    onClick={() => {
                                                                        const receiptGenerator = Receipt();
                                                                        receiptGenerator.generateReceipt(order);
                                                                    }}
                                                                    className="px-2 py-1 bg-green-600 text-white rounded"
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
                                                        </tr>
                                                    ))
                                                }
                                                {[...activeOrders, ...orders].filter(order => order.status === 'cancelled').length === 0 && (
                                                    <tr>
                                                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">Aucune commande annulée</td>
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
        </>
    );
};

export default PosIndex;