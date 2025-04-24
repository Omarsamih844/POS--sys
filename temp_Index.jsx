import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ServiceTypeModal from './ServiceTypeModal';
import NoteModal from './NoteModal';
import Receipt from './Receipt';
import PromotionModal from './PromotionModal';
import CustomizeModal from './CustomizeModal';
import PaymentModal from './PaymentModal';
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

// Menu Data
export const menuData = [
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

// ProductGrid Component
const ProductGrid = ({ categoryId, onProductSelect }) => {
    // Menu data
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
    
    // Find the selected category and get its products
    const category = menuData.find(cat => cat.id === categoryId);
    const products = category ? category.products : [];
    
    // Generate random placeholder images for products without images
    const getRandomImage = (productId) => {
        const imageTypes = ['food', 'drink', 'dessert', 'restaurant'];
        const type = imageTypes[productId % imageTypes.length];
        return `https://source.unsplash.com/300x200/?${type}`;
    };
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
            {products.map((product) => (
                <div
                    key={product.id}
                    onClick={() => onProductSelect(product)}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
                >
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={product.image || getRandomImage(product.id)}
                            alt={product.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                                e.target.src = `https://source.unsplash.com/300x200/?${product.name.split(' ')[0].toLowerCase()}`;
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-sm opacity-90">{product.description}</p>
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{product.name}</h3>
                        <div className="mt-2 flex justify-between items-center">
                            <span className="text-lg font-bold text-blue-600">{product.price.toFixed(2)} MAD</span>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700">
                                Ajouter
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
    1: "🍽️", // Plats Principaux
    2: "🥗", // Entrées
    3: "🍰", // Desserts
    4: "🥤", // Boissons Non-Alcoolisées
    5: "🍷", // Boissons Alcoolisées
    6: "🍿", // Snacks
    7: "🥖", // Produits de Boulangerie
    8: "☕", // Boissons Chaudes
};

// CategoryCards Component
const CategoryCards = ({ onCategorySelect }) => {
    // Category color mapping
    const categoryColors = {
        1: "#FF9AA2", // Plats Principaux - Soft red
        2: "#FFB7B2", // Entrées - Soft salmon
        3: "#FFDAC1", // Desserts - Soft peach
        4: "#E2F0CB", // Boissons Non-Alcoolisées - Soft green
        5: "#B5EAD7", // Boissons Alcoolisées - Soft mint
        6: "#C7CEEA", // Snacks - Soft blue
        7: "#F6E6C2", // Produits de Boulangerie - Soft cream
        8: "#E8D7F1"  // Boissons Chaudes - Soft purple
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {menuData.map(category => (
                <div
                    key={category.id}
                    onClick={() => onCategorySelect(category.id)}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1 h-48"
                    style={{ backgroundColor: categoryColors[category.id] + '30' }}
                >
                    <div className="p-6 flex flex-col items-center justify-center h-full">
                        <div className="text-5xl mb-4">{categoryIcons[category.id]}</div>
                        <h3 className="font-bold text-xl text-gray-800 text-center">{category.name}</h3>
                        <p className="text-xs text-gray-600 mt-2">{category.products.length} articles</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ProductSection Component
const ProductSection = ({ onProductSelect, activeCategory }) => {
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

    return (
        <div className="relative">
            {selectedCategory ? (
                <>
                    <div className="flex items-center mb-6 px-6 pt-4">
                        <button
                            onClick={handleBackToCategories}
                            className="group relative inline-flex items-center gap-2.5 rounded-md bg-white px-6 py-4 font-semibold text-gray-800 shadow-lg hover:bg-gray-50 hover:text-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            <span className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <svg 
                                className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="relative">Retour aux catégories</span>
                            <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-blue-600 group-hover:w-4/5 group-hover:-translate-x-1/2 transition-all duration-300"></span>
                        </button>
                        
                        {/* Display the category name */}
                        <h2 className="ml-4 text-xl font-bold text-gray-700">
                            {menuData.find(cat => cat.id === selectedCategory)?.name}
                        </h2>
                    </div>
                    <ProductGrid
                        categoryId={selectedCategory}
                        onProductSelect={onProductSelect}
                    />
                </>
            ) : (
                <CategoryCards onCategorySelect={handleCategorySelect} />
            )}
        </div>
    );
};

const PosIndex = ({ auth }) => {
    // Static Categories Data - Replaced by the CategoryCards component
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
        { id: '12', status: 'available' },
        // Patio tables
        { id: '20', status: 'available' },
        { id: '21', status: 'available' },
        { id: '22', status: 'available' },
        { id: '23', status: 'available' },
        { id: '24', status: 'available' },
        { id: '25', status: 'available' },
    ]);
    const [activeFloor, setActiveFloor] = useState('Main Floor');

    useEffect(() => {
        calculateTotals();
        updateCounts();
    }, [cart, orderType]);

    const updateCounts = () => {
        const foodItems = cart.filter(item => 
            menuData.find(p => p.id === item.product_id)?.category_id === 1
        ).reduce((sum, item) => sum + item.quantity, 0);
        
        const drinkItems = cart.filter(item => 
            menuData.find(p => p.id === item.product_id)?.category_id === 2
        ).reduce((sum, item) => sum + item.quantity, 0);

        setFoodCount(foodItems);
        setDrinksCount(drinkItems);
    };

    const calculateTotals = () => {
        const newSubtotal = cart.reduce((sum, item) => {
            let itemTotal = item.quantity * item.unit_price;
            
            // Add customization charges
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

    const addToCart = (product, customizations = null) => {
        // Check if there's an active order
        if (!activeOrderId) {
            showAlert('Veuillez créer une nouvelle commande d\'abord.', 'Attention');
            return;
        }

        const existingItem = cart.find(item => 
            item.product_id === product.id && 
            JSON.stringify(item.customizations) === JSON.stringify(customizations)
        );

        if (existingItem) {
            setCart(cart.map(item =>
                item.product_id === product.id && 
                JSON.stringify(item.customizations) === JSON.stringify(customizations)
                    ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.unit_price }
                    : item
            ));
        } else {
            setCart([...cart, {
                product_id: product.id,
                name: product.name,
                description: product.description,
                image: product.image,
                quantity: 1,
                unit_price: product.price,
                subtotal: product.price,
                customizations: customizations
            }]);
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
            type: 'takeout', // Default type
            table_number: '',
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
        
        // Make sure we're showing the caisse tab with our new order
        setActiveTab('caisse');
        
        // Show service type modal for the new order
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
                    total: total
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
                    unit_price: item.unit_price,
                    subtotal: item.quantity * item.unit_price,
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
            const receiptGenerator = Receipt();
            receiptGenerator.generateReceipt(finalOrder);

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
        
        // If eat_in is selected and showTables is true, switch to tables tab temporarily
        if (type === 'eat_in' && showTables) {
            setActiveTab('tables');
        } else {
            // For other service types, make sure we stay on or return to caisse tab
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

        if (customizations) {
            addToCart(product, customizations);
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
        // Check if table is already occupied
        const tableOccupied = activeOrders.some(order => 
            order.status === 'pending' && order.table_number === tableId
        );
        
        if (tableOccupied) {
            showAlert('Cette table est déjà occupée.', 'Attention');
            return;
        }
        
        // Set the table number
        setTableNumber(tableId);
        setOrderType('eat_in');
        
        // Switch to the Caisse tab
        setActiveTab('caisse');
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

    return (
        <AuthenticatedLayout>
            <Head title="Système de Caisse" />
            
            <div className="min-h-screen bg-gray-100">
                <Head title="Point of Sale" />
                <div className="flex h-screen">
                    {/* Left Side - Cart - Wider to show more content */}
                    <div className="w-2/5 bg-white flex flex-col shadow-lg">
                       
                        {/* Cart Header - more compact with active orders */}
                        <div className="p-3 bg-blue-900 text-white">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">Panier</h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleNewOrder}
                                        className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm font-medium min-w-[100px] h-10 flex items-center justify-center shadow-md"
                                    >
                                        <PlusIcon className="h-5 w-5 mr-1" />
                                        Nouvelle
                                    </button>
                                    <div className="relative group">
                                        <button
                                            className="px-3 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 text-sm font-medium min-w-[100px] h-10 flex items-center justify-center shadow-md"
                                        >
                                            <ClipboardDocumentIcon className="h-5 w-5 mr-1" />
                                            Commandes <span className="ml-1 bg-white text-blue-900 rounded-full h-5 w-5 flex items-center justify-center text-xs">{activeOrders.filter(o => o.status === 'pending').length}</span>
                                        </button>
                                        
                                        {/* Active Orders Dropdown */}
                                        <div className="absolute right-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden z-10 w-64 hidden group-hover:block">
                                            <div className="py-1 max-h-80 overflow-y-auto">
                                                {activeOrders.filter(o => o.status === 'pending').length === 0 ? (
                                                    <div className="px-4 py-3 text-sm text-gray-500">Aucune commande active</div>
                                                ) : (
                                                    activeOrders.filter(o => o.status === 'pending').map(order => (
                                                        <div 
                                                            key={order.id} 
                                                            className={`px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer ${activeOrderId === order.id ? 'bg-blue-50' : ''}`}
                                                            onClick={() => switchToOrder(order.id)}
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
                                    </div>
                                    
                                    {/* History Button */}
                                    <button
                                        onClick={() => setShowOrderHistory(!showOrderHistory)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium min-w-[100px] h-10 flex items-center justify-center shadow-md ${
                                            showOrderHistory ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        <ClockIcon className="h-5 w-5 mr-1" />
                                        Historique
                                    </button>
                                </div>
                            </div>
                            
                            {/* Active Order ID with larger cancel button */}
                            {activeOrderId && (
                                <div className="mt-2 flex justify-between items-center">
                                    <div className="bg-blue-700 text-white px-2 py-1 rounded text-sm flex items-center">
                                        <ClipboardDocumentIcon className="h-4 w-4 mr-1" />
                                        Commande active
                                    </div>
                                    <div>
                                    <span className="text-sm">
                                        {tableNumber ? `Table #${tableNumber}` : 'Aucune table'}
                                    </span>
                                    </div>
                                    <button 
                                        onClick={() => cancelOrder(activeOrderId)}
                                        className="bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center hover:bg-red-700 shadow-md"
                                    >
                                        <XMarkIcon className="h-4 w-4 mr-1" />
                                        Annuler
                                    </button>
                                </div>
                            )}
                            
                            <div className="flex gap-2 mt-2 text-sm">
                                <div className="flex items-center gap-1">
                                    <span>Art.:</span>
                                    <span className="bg-white text-blue-900 px-2 py-1 rounded-full font-medium">
                                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>Total:</span>
                                    <span className="bg-white text-blue-900 px-2 py-1 rounded-full font-medium">
                                        {total.toFixed(2)} MAD
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Cart Items - Improved item display */}
                        <div className="flex-1 overflow-auto px-4 py-2">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <ShoppingCartIcon className="h-16 w-16 mb-4" />
                                    <p className="text-xl font-medium">Le panier est vide</p>
                                    <p className="text-sm">Ajoutez des produits depuis la grille</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {cart.map((item, index) => (
                                        <div 
                                            key={index} 
                                            onClick={() => {
                                                const product = menuData.find(p => p.id === item.product_id);
                                                if (product) {
                                                    setSelectedProduct(product);
                                                    setStartNewInput(true);
                                                }
                                            }}
                                            className={`bg-white rounded-lg shadow p-3 flex justify-between items-center cursor-pointer transition-colors ${
                                                selectedProduct?.id === item.product_id ? 'bg-blue-50 border-l-4 border-l-blue-500 pl-2' : ''
                                            }`}
                                        >
                                            <div className="flex-1">
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-gray-600">
                                                    {formatPrice(item.unit_price || item.price)} x {item.quantity}
                                                </div>
                                                {item.notes && (
                                                    <div className="text-xs text-gray-500 mt-1 italic">
                                                        Note: {item.notes}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="font-bold text-gray-800">
                                                    {formatPrice((item.unit_price || item.price) * item.quantity)}
                                                </div>
                                                <div className="flex flex-col space-y-1">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const product = menuData.find(p => p.id === item.product_id);
                                                            if (product) {
                                                                setSelectedProduct(product);
                                                                setStartNewInput(true);
                                                            }
                                                        }}
                                                        className="p-1 rounded hover:bg-gray-100"
                                                    >
                                                        <PencilIcon className="h-4 w-4 text-blue-500" />
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
                                                        <TrashIcon className="h-4 w-4 text-red-500" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        

                        {/* Taxes and Total - more compact */}
                        <div className="border-t border-gray-200 p-2 bg-gray-50">
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

                        {/* Numeric Keypad - larger for touch */}
                        <div className="border-t border-gray-200">
                            <div className="grid grid-cols-4 gap-0">
                                <div className="col-span-3">
                                    <div className="grid grid-cols-3 gap-0">
                                        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, 'CE', '⌫'].map((num) => (
                                            <button 
                                                key={num}
                                                onClick={() => {
                                                    if (selectedProduct) {
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
                                                    }
                                                }}
                                                className={`p-4 text-xl font-medium hover:bg-gray-100 border-r border-b transition-colors h-16 ${
                                                    (num === 'CE') ? 'text-blue-600' : ''
                                                }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <button
                                        onClick={() => {
                                            if (selectedProduct) {
                                                const currentQty = cart.find(item => item.product_id === selectedProduct.id)?.quantity || 0;
                                                updateQuantity(selectedProduct.id, currentQty + 1);
                                            }
                                        }}
                                        className="p-4 text-xl font-medium hover:bg-gray-100 border-b transition-colors h-16"
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
                                        className="p-4 text-xl font-medium hover:bg-gray-100 border-b transition-colors h-16"
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
                                        className="p-4 text-xl font-medium hover:bg-gray-100 border-b transition-colors text-red-600 h-16"
                                    >
                                        C
                                    </button>
                                    <button 
                                        onClick={() => setShowPaymentModal(true)}
                                        className="p-4 text-xl font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors flex-1"
                                    >
                                        ↵
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Navigation - Payment button */}
                        <div className="p-3 bg-white border-t">
                            <button
                                onClick={() => setShowPaymentModal(true)}
                                disabled={!activeOrderId || cart.length === 0}
                                className={`w-full p-3 rounded-md transition-colors text-base font-medium h-14 flex items-center justify-center ${
                                    !activeOrderId || cart.length === 0
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                                }`}
                            >
                                <BanknotesIcon className="h-6 w-6 mr-2" />
                                Payer ({total.toFixed(2)} MAD)
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Products or Tables - Adjusted width proportion */}
                    <div className="w-3/5 flex flex-col bg-gray-100">
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

                        {/* Cash Register (Caisse) View */}
                        {activeTab === 'caisse' && (
                            <>
                                {/* Service Type Pills */}
                                <div className="bg-white p-3 mb-2 border-b">
                                    <div className="flex items-center justify-center space-x-4">
                                        <button
                                            onClick={() => setOrderType('eat_in')}
                                            className={`px-4 py-2 rounded-full flex items-center ${
                                                orderType === 'eat_in' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                                            }`}
                                        >
                                            <HomeIcon className="w-5 h-5 mr-2" />
                                            Sur Place {tableNumber && `- Table ${tableNumber}`}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setOrderType('takeout');
                                                setTableNumber('');
                                            }}
                                            className={`px-4 py-2 rounded-full flex items-center ${
                                                orderType === 'takeout' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                                            }`}
                                        >
                                            <ShoppingBagIcon className="w-5 h-5 mr-2" />
                                            À Emporter
                                        </button>
                                        <button
                                            onClick={() => {
                                                setOrderType('delivery');
                                                setTableNumber('');
                                            }}
                                            className={`px-4 py-2 rounded-full flex items-center ${
                                                orderType === 'delivery' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                                            }`}
                                        >
                                            <MapPinIcon className="w-5 h-5 mr-2" />
                                            Livraison
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Products Section - Uses the new ProductSection component */}
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
                                                                    <button 
                                                                        onClick={() => {
                                                                            const receiptGenerator = Receipt();
                                                                            receiptGenerator.generateReceipt(order);
                                                                        }}
                                                                        className="px-2 py-1 bg-green-600 text-white rounded"
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
                                                                <button 
                                                                    onClick={() => {
                                                                        const receiptGenerator = Receipt();
                                                                        receiptGenerator.generateReceipt(order);
                                                                    }}
                                                                    className="px-2 py-1 bg-green-600 text-white rounded"
                                                                >
                                                                    Imprimer
                                                                </button>
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
        </AuthenticatedLayout>
    );
};

export default PosIndex;