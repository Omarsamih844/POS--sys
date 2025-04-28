import React from 'react';

const defaultProducts = [
    // Food Products (category_id: 1)
    {
        id: 1,
        name: 'Bacon Burger',
        description: 'Smashed sweet potatoes',
        price: 49.00,
        category_id: 1,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300'
    },
    {
        id: 2,
        name: 'Burger Menu Combo',
        description: 'Burger with fries and drink',
        price: 52.00,
        category_id: 1,
        image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=300'
    },
    {
        id: 3,
        name: 'Cheese Burger',
        description: 'Classic cheeseburger with our special sauce',
        price: 36.00,
        category_id: 1,
        image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=300'
    },
    {
        id: 4,
        name: 'Chicken Curry Sandwich',
        description: 'Spicy chicken curry sandwich',
        price: 47.00,
        category_id: 1,
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=300'
    },
    {
        id: 5,
        name: 'Club Sandwich',
        description: 'Triple-decker sandwich with bacon',
        price: 45.00,
        category_id: 1,
        image: 'https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?q=80&w=300'
    },
    {
        id: 23,
        name: 'Pizza Margherita',
        description: 'Classic Italian pizza with tomatoes and mozzarella',
        price: 55.00,
        category_id: 1,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=300'
    },
    {
        id: 24,
        name: 'Pepperoni Pizza',
        description: 'Pizza topped with spicy pepperoni',
        price: 65.00,
        category_id: 1,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=300'
    },
    {
        id: 25,
        name: 'Vegetarian Pizza',
        description: 'Fresh vegetables on a crispy crust',
        price: 60.00,
        category_id: 1,
        image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=300'
    },
    {
        id: 26,
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing',
        price: 35.00,
        category_id: 1,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=300'
    },
    {
        id: 27,
        name: 'Greek Salad',
        description: 'Mediterranean style salad with feta cheese',
        price: 40.00,
        category_id: 1,
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=300'
    },
    // Drinks Products (category_id: 2)
    {
        id: 13,
        name: 'Coca-Cola',
        description: 'Classic cola drink',
        price: 15.00,
        category_id: 2,
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=300'
    },
    {
        id: 14,
        name: 'Espresso',
        description: 'Strong Italian coffee',
        price: 18.00,
        category_id: 2,
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=300'
    },
    {
        id: 28,
        name: 'Iced Latte',
        description: 'Chilled espresso with milk',
        price: 22.00,
        category_id: 2,
        image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=300'
    },
    {
        id: 29,
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed oranges',
        price: 20.00,
        category_id: 2,
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=300'
    },
    {
        id: 30,
        name: 'Mango Smoothie',
        description: 'Fresh mango blended with yogurt',
        price: 25.00,
        category_id: 2,
        image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=300'
    },
    {
        id: 31,
        name: 'Green Detox',
        description: 'Healthy blend of green vegetables',
        price: 28.00,
        category_id: 2,
        image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=300'
    }
];
const ProductGrid = ({ categoryId, onProductSelect, products = defaultProducts }) => {
    const filteredProducts = categoryId 
        ? products.filter(product => product.category_id === categoryId)
        : products;
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
            {filteredProducts.map((product) => (
                <div
                    key={product.id}
                    onClick={() => onProductSelect(product)}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
                >
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300?text=No+Image';
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
export default ProductGrid;