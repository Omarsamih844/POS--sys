import React, { useState } from 'react';

const CustomizeModal = ({ isOpen, onClose, onApply, product }) => {
    const [selectedOptions, setSelectedOptions] = useState({});

    // Define product-specific customization options
    const getProductCustomizations = (product) => {
        const customizations = {
            // Food items
            'Bacon Burger': [
                {
                    name: 'Cooking Preference',
                    type: 'single',
                    options: ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done']
                },
                {
                    name: 'Add Extra',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Cheese', price: 5 },
                        { name: 'Extra Bacon', price: 8 },
                        { name: 'Extra Patty', price: 15 }
                    ]
                },
                {
                    name: 'Remove',
                    type: 'multiple',
                    options: ['Onions', 'Tomatoes', 'Lettuce', 'Pickles']
                }
            ],
            'Burger Menu Combo': [
                {
                    name: 'Cooking Preference',
                    type: 'single',
                    options: ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done']
                },
                {
                    name: 'Add Extra',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Cheese', price: 5 },
                        { name: 'Extra Bacon', price: 8 },
                        { name: 'Extra Patty', price: 15 }
                    ]
                },
                {
                    name: 'Remove',
                    type: 'multiple',
                    options: ['Onions', 'Tomatoes', 'Lettuce', 'Pickles']
                }
            ],
            'Cheese Burger': [
                {
                    name: 'Cooking Preference',
                    type: 'single',
                    options: ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done']
                },
                {
                    name: 'Add Extra',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Cheese', price: 5 },
                        { name: 'Extra Bacon', price: 8 },
                        { name: 'Extra Patty', price: 15 }
                    ]
                },
                {
                    name: 'Remove',
                    type: 'multiple',
                    options: ['Onions', 'Tomatoes', 'Lettuce', 'Pickles']
                }
            ],
            'Chicken Curry Sandwich': [
                {
                    name: 'Spice Level',
                    type: 'single',
                    options: ['Mild', 'Medium', 'Hot', 'Extra Hot']
                },
                {
                    name: 'Add Extra',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Cheese', price: 5 },
                        { name: 'Extra Chicken', price: 12 },
                        { name: 'Extra Sauce', price: 3 }
                    ]
                },
                {
                    name: 'Remove',
                    type: 'multiple',
                    options: ['Onions', 'Tomatoes', 'Lettuce', 'Mayo']
                }
            ],
            'Club Sandwich': [
                {
                    name: 'Add Extra',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Bacon', price: 8 },
                        { name: 'Extra Chicken', price: 12 },
                        { name: 'Extra Cheese', price: 5 }
                    ]
                },
                {
                    name: 'Remove',
                    type: 'multiple',
                    options: ['Onions', 'Tomatoes', 'Lettuce', 'Mayo']
                }
            ],
            'Double Cheeseburger': [
                {
                    name: 'Cooking Preference',
                    type: 'single',
                    options: ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done']
                },
                {
                    name: 'Add Extra',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Cheese', price: 5 },
                        { name: 'Extra Patty', price: 15 }
                    ]
                },
                {
                    name: 'Remove',
                    type: 'multiple',
                    options: ['Onions', 'Tomatoes', 'Lettuce', 'Pickles']
                }
            ],
            'Big Tasty': [
                {
                    name: 'Cooking Preference',
                    type: 'single',
                    options: ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done']
                },
                {
                    name: 'Add Extra',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Cheese', price: 5 },
                        { name: 'Extra Patty', price: 15 },
                        { name: 'Extra Sauce', price: 3 }
                    ]
                },
                {
                    name: 'Remove',
                    type: 'multiple',
                    options: ['Onions', 'Tomatoes', 'Lettuce', 'Pickles']
                }
            ],
            'Big Chili': [
                {
                    name: 'Spice Level',
                    type: 'single',
                    options: ['Mild', 'Medium', 'Hot', 'Extra Hot']
                },
                {
                    name: 'Add Extra',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Cheese', price: 5 },
                        { name: 'Extra Patty', price: 15 },
                        { name: 'Extra Chili Sauce', price: 3 }
                    ]
                },
                {
                    name: 'Remove',
                    type: 'multiple',
                    options: ['Onions', 'Tomatoes', 'Lettuce', 'Pickles']
                }
            ],
            'McChicken': [
                {
                    name: 'Spice Level',
                    type: 'single',
                    options: ['Mild', 'Medium', 'Hot']
                },
                {
                    name: 'Add Extra',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Cheese', price: 5 },
                        { name: 'Extra Chicken', price: 12 }
                    ]
                },
                {
                    name: 'Remove',
                    type: 'multiple',
                    options: ['Onions', 'Tomatoes', 'Lettuce', 'Mayo']
                }
            ],
            'Filet-O-Fish': [
                {
                    name: 'Add Extra',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Cheese', price: 5 },
                        { name: 'Extra Fish', price: 12 },
                        { name: 'Extra Tartar Sauce', price: 3 }
                    ]
                },
                {
                    name: 'Remove',
                    type: 'multiple',
                    options: ['Lettuce', 'Tartar Sauce']
                }
            ],
            'Big Mac': [
                {
                    name: 'Cooking Preference',
                    type: 'single',
                    options: ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done']
                },
                {
                    name: 'Add Extra',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Cheese', price: 5 },
                        { name: 'Extra Patty', price: 15 },
                        { name: 'Extra Sauce', price: 3 }
                    ]
                },
                {
                    name: 'Remove',
                    type: 'multiple',
                    options: ['Onions', 'Tomatoes', 'Lettuce', 'Pickles', 'Special Sauce']
                }
            ],
            'Triple Cheese': [
                {
                    name: 'Cooking Preference',
                    type: 'single',
                    options: ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done']
                },
                {
                    name: 'Add Extra',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Cheese', price: 5 },
                        { name: 'Extra Patty', price: 15 }
                    ]
                },
                {
                    name: 'Remove',
                    type: 'multiple',
                    options: ['Onions', 'Tomatoes', 'Lettuce', 'Pickles']
                }
            ],
            // Drink items
            'Coca Cola': [
                {
                    name: 'Size',
                    type: 'single',
                    options: [
                        { name: 'Small', price: -3 },
                        { name: 'Regular', price: 0 },
                        { name: 'Large', price: 5 }
                    ]
                },
                {
                    name: 'Ice Level',
                    type: 'single',
                    options: ['No Ice', 'Light Ice', 'Regular Ice', 'Extra Ice']
                }
            ],
            'Fanta': [
                {
                    name: 'Size',
                    type: 'single',
                    options: [
                        { name: 'Small', price: -3 },
                        { name: 'Regular', price: 0 },
                        { name: 'Large', price: 5 }
                    ]
                },
                {
                    name: 'Ice Level',
                    type: 'single',
                    options: ['No Ice', 'Light Ice', 'Regular Ice', 'Extra Ice']
                },
                {
                    name: 'Add-ons',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Fizz', price: 2 }
                    ]
                }
            ],
            'Strawberry Milkshake': [
                {
                    name: 'Size',
                    type: 'single',
                    options: [
                        { name: 'Small', price: -5 },
                        { name: 'Regular', price: 0 },
                        { name: 'Large', price: 8 }
                    ]
                },
                {
                    name: 'Add-ons',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Whipped Cream', price: 3 },
                        { name: 'Extra Strawberries', price: 5 },
                        { name: 'Extra Ice Cream', price: 4 }
                    ]
                },
                {
                    name: 'Topping',
                    type: 'single',
                    options: [
                        { name: 'No Topping', price: 0 },
                        { name: 'Strawberry Sauce', price: 3 },
                        { name: 'Chocolate Sauce', price: 3 }
                    ]
                }
            ],
            'Oreo Milkshake': [
                {
                    name: 'Size',
                    type: 'single',
                    options: [
                        { name: 'Small', price: -5 },
                        { name: 'Regular', price: 0 },
                        { name: 'Large', price: 8 }
                    ]
                },
                {
                    name: 'Add-ons',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Whipped Cream', price: 3 },
                        { name: 'Extra Oreos', price: 5 },
                        { name: 'Extra Ice Cream', price: 4 }
                    ]
                },
                {
                    name: 'Topping',
                    type: 'single',
                    options: [
                        { name: 'No Topping', price: 0 },
                        { name: 'Chocolate Sauce', price: 3 },
                        { name: 'Caramel Sauce', price: 3 }
                    ]
                }
            ],
            'Milkshake Banana': [
                {
                    name: 'Size',
                    type: 'single',
                    options: [
                        { name: 'Small', price: -5 },
                        { name: 'Regular', price: 0 },
                        { name: 'Large', price: 8 }
                    ]
                },
                {
                    name: 'Add-ons',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Whipped Cream', price: 3 },
                        { name: 'Extra Banana', price: 5 },
                        { name: 'Extra Ice Cream', price: 4 }
                    ]
                },
                {
                    name: 'Topping',
                    type: 'single',
                    options: [
                        { name: 'No Topping', price: 0 },
                        { name: 'Caramel Sauce', price: 3 },
                        { name: 'Chocolate Sauce', price: 3 }
                    ]
                }
            ],
            'Chocolate Milkshake': [
                {
                    name: 'Size',
                    type: 'single',
                    options: [
                        { name: 'Small', price: -5 },
                        { name: 'Regular', price: 0 },
                        { name: 'Large', price: 8 }
                    ]
                },
                {
                    name: 'Add-ons',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Whipped Cream', price: 3 },
                        { name: 'Extra Chocolate', price: 5 },
                        { name: 'Extra Ice Cream', price: 4 }
                    ]
                },
                {
                    name: 'Topping',
                    type: 'single',
                    options: [
                        { name: 'No Topping', price: 0 },
                        { name: 'Chocolate Sauce', price: 3 },
                        { name: 'Caramel Sauce', price: 3 }
                    ]
                }
            ],
            'Espresso': [
                {
                    name: 'Size',
                    type: 'single',
                    options: [
                        { name: 'Small', price: -2 },
                        { name: 'Regular', price: 0 },
                        { name: 'Large', price: 3 }
                    ]
                },
                {
                    name: 'Add-ons',
                    type: 'multiple',
                    options: [
                        { name: 'Extra Shot', price: 5 },
                        { name: 'Whipped Cream', price: 3 },
                        { name: 'Caramel Syrup', price: 3 }
                    ]
                }
            ],
            'Ice Tea': [
                {
                    name: 'Size',
                    type: 'single',
                    options: [
                        { name: 'Small', price: -2 },
                        { name: 'Regular', price: 0 },
                        { name: 'Large', price: 3 }
                    ]
                },
                {
                    name: 'Ice Level',
                    type: 'single',
                    options: ['No Ice', 'Light Ice', 'Regular Ice', 'Extra Ice']
                },
                {
                    name: 'Flavor',
                    type: 'single',
                    options: ['Lemon', 'Peach', 'Raspberry']
                }
            ]
        };

        // Return default options if no specific customization exists for the product
        return customizations[product.name] || [];
    };

    const handleOptionSelect = (category, option) => {
        if (category.type === 'single') {
            setSelectedOptions({
                ...selectedOptions,
                [category.name]: option
            });
        } else {
            const currentOptions = selectedOptions[category.name] || [];
            
            // Check if option is already selected by comparing name or value
            const optionName = typeof option === 'object' ? option.name : option;
            const isAlreadySelected = currentOptions.some(opt => 
                (typeof opt === 'object' ? opt.name : opt) === optionName
            );
            
            const updatedOptions = isAlreadySelected
                ? currentOptions.filter(opt => (typeof opt === 'object' ? opt.name : opt) !== optionName)
                : [...currentOptions, option];
            
            setSelectedOptions({
                ...selectedOptions,
                [category.name]: updatedOptions
            });
        }
    };

    const calculateExtraCharge = () => {
        let total = 0;
        Object.entries(selectedOptions).forEach(([category, selection]) => {
            if (Array.isArray(selection)) {
                selection.forEach(option => {
                    if (typeof option === 'object' && option.price) {
                        total += option.price;
                    }
                });
            } else if (typeof selection === 'object' && selection.price) {
                total += selection.price;
            }
        });
        return total;
    };

    const handleApply = () => {
        const customizationData = {
            options: selectedOptions,
            extraCharge: calculateExtraCharge()
        };
        onApply(product, customizationData);
        onClose();
    };

    if (!isOpen || !product) return null;

    const options = getProductCustomizations(product);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Personnaliser {product.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    {options.map((category, index) => (
                        <div key={index} className="space-y-3">
                            <h3 className="font-medium text-gray-900">{
                                // French translations for category names
                                category.name === 'Spice Level' ? 'Niveau d\'Épices' :
                                category.name === 'Add Extra' ? 'Ajouter un supplément' :
                                category.name === 'Remove' ? 'Retirer' :
                                category.name === 'Cooking Preference' ? 'Cuisson' :
                                category.name === 'Size' ? 'Taille' :
                                category.name === 'Ice Level' ? 'Niveau de glace' :
                                category.name === 'Add-ons' ? 'Suppléments' :
                                category.name === 'Topping' ? 'Garniture' :
                                category.name === 'Flavor' ? 'Saveur' :
                                category.name // fallback
                            }</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {category.options.map((option, optIndex) => {
                                    // French translations for option names
                                    let optionName = typeof option === 'object' ? option.name : option;
                                    optionName =
                                        optionName === 'Mild' ? 'Doux' :
                                        optionName === 'Medium' ? 'Moyen' :
                                        optionName === 'Hot' ? 'Épicé' :
                                        optionName === 'Extra Hot' ? 'Très Épicé' :
                                        optionName === 'Extra Cheese' ? 'Fromage supplémentaire' :
                                        optionName === 'Extra Chicken' ? 'Poulet supplémentaire' :
                                        optionName === 'Extra Sauce' ? 'Sauce supplémentaire' :
                                        optionName === 'Onions' ? 'Oignons' :
                                        optionName === 'Tomatoes' ? 'Tomates' :
                                        optionName === 'Lettuce' ? 'Laitue' :
                                        optionName === 'Mayo' ? 'Mayonnaise' :
                                        optionName === 'Rare' ? 'Saignant' :
                                        optionName === 'Medium Rare' ? 'À point saignant' :
                                        optionName === 'Medium Well' ? 'À point bien cuit' :
                                        optionName === 'Well Done' ? 'Bien cuit' :
                                        optionName === 'Extra Bacon' ? 'Bacon supplémentaire' :
                                        optionName === 'Extra Patty' ? 'Steak supplémentaire' :
                                        optionName === 'Pickles' ? 'Cornichons' :
                                        optionName === 'Extra Fish' ? 'Poisson supplémentaire' :
                                        optionName === 'Extra Tartar Sauce' ? 'Sauce tartare supplémentaire' :
                                        optionName === 'No Ice' ? 'Sans glace' :
                                        optionName === 'Light Ice' ? 'Peu de glace' :
                                        optionName === 'Regular Ice' ? 'Glace normale' :
                                        optionName === 'Extra Ice' ? 'Beaucoup de glace' :
                                        optionName === 'Extra Fizz' ? 'Bulles supplémentaires' :
                                        optionName === 'Extra Whipped Cream' ? 'Crème fouettée supplémentaire' :
                                        optionName === 'Extra Strawberries' ? 'Fraises supplémentaires' :
                                        optionName === 'Extra Ice Cream' ? 'Glace supplémentaire' :
                                        optionName === 'No Topping' ? 'Sans garniture' :
                                        optionName === 'Strawberry Sauce' ? 'Sauce à la fraise' :
                                        optionName === 'Chocolate Sauce' ? 'Sauce au chocolat' :
                                        optionName === 'Caramel Sauce' ? 'Sauce caramel' :
                                        optionName === 'Extra Oreos' ? 'Oreos supplémentaires' :
                                        optionName === 'Extra Banana' ? 'Banane supplémentaire' :
                                        optionName === 'Extra Chocolate' ? 'Chocolat supplémentaire' :
                                        optionName === 'Extra Shot' ? 'Dose supplémentaire' :
                                        optionName === 'Whipped Cream' ? 'Crème fouettée' :
                                        optionName === 'Caramel Syrup' ? 'Sirop de caramel' :
                                        optionName === 'Lemon' ? 'Citron' :
                                        optionName === 'Peach' ? 'Pêche' :
                                        optionName === 'Raspberry' ? 'Framboise' :
                                        optionName === 'Special Sauce' ? 'Sauce spéciale' :
                                        optionName;
                                    const isSelected = category.type === 'single'
                                        ? (typeof selectedOptions[category.name] === 'object' 
                                            ? selectedOptions[category.name].name === (typeof option === 'object' ? option.name : option)
                                            : selectedOptions[category.name] === option)
                                        : (selectedOptions[category.name] || []).some(opt => 
                                            (typeof opt === 'object' ? opt.name : opt) === (typeof option === 'object' ? option.name : option));

                                    return (
                                        <button
                                            key={optIndex}
                                            onClick={() => handleOptionSelect(category, option)}
                                            className={`p-2 text-sm rounded-lg border ${
                                                isSelected
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span>{optionName}</span>
                                                {typeof option === 'object' && option.price !== undefined && (
                                                    <span className={option.price >= 0 ? 'text-green-600' : 'text-red-600'}>
                                                        {option.price > 0 ? '+' : ''}{option.price} DH
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div className="border-t pt-4">
                        <div className="flex justify-between text-sm mb-4">
                            <span className="font-medium">Frais supplémentaires :</span>
                            <span className="text-green-600 font-medium">{calculateExtraCharge()} DH</span>
                        </div>
                        <button
                            onClick={handleApply}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Appliquer la personnalisation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomizeModal; 