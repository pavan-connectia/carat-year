interface StickyBarProps {
    visible: boolean;
    product: any;
    selectedSizeObj: any;
    onAddToCart: () => void;
    token: string | null;
    navigate: any;
    isCalculating?: boolean;
    selectedShape: any;
    selectedMetal: any;
    selectedCarat: any;
    selectedColor: any;
}

export default function StickyProductBar({
    visible,
    product,
    selectedSizeObj,
    onAddToCart,
    token,
    navigate,
    isCalculating,
    selectedShape,
    selectedMetal,
    selectedCarat,
    selectedColor
}: StickyBarProps) {
    if (!selectedSizeObj) return null;

    const handleAddToCartClick = () => {
        if (!token) {
            navigate("/signup");
            return;
        }
        onAddToCart();
    };

    const settingPrice = (selectedSizeObj.goldValue || 0) + (selectedSizeObj.labourValue || 0);

    const phone = "919870197167";
    const websiteUrl = typeof window !== "undefined" ? window.location.href : "";
    const text = `I need more information about this product (Code: ${product?.productCode})`;
    const message = `${text}\n\nWebsite: ${websiteUrl}`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-md transition-transform duration-500 transform ${visible ? "translate-y-0" : "-translate-y-full"}`}
        >
            {isCalculating && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                    <img src="/loader.gif" alt="loading" className="h-6 w-6" />
                </div>
            )}

            {/* Mobile Layout (sm and below) */}
            <div className="block sm:hidden px-3 py-2">
                <div className="flex items-center justify-between">
                    {/* Mobile: Product info and price */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xs font-bold text-gray-900 truncate max-w-[120px]">
                                {product?.title}
                            </h3>
                            {selectedSizeObj.discountValue > 0 && (
                                <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                                    Save ₹{selectedSizeObj.discountValue?.toLocaleString()}
                                </span>
                            )}
                        </div>
                        <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-lg font-bold text-[#96722c]">
                                ₹{selectedSizeObj.totalValue?.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                                ₹{selectedSizeObj.grossValue?.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Mobile: Add to Cart button only */}
                    <button
                        onClick={handleAddToCartClick}
                        className="bg-[#96722c] text-white px-4 py-2 rounded-sm text-xs font-bold hover:bg-[#7a5c24] transition-all uppercase tracking-wider whitespace-nowrap"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Desktop Layout (sm and above) */}
            <div className="hidden sm:block container mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-4 lg:gap-6">
                    {/* LEFT: The Pricing Equation */}
                    <div className="flex items-center gap-4 lg:gap-6">
                        {/* Setting Info */}
                        <div className="flex flex-col items-center text-center">
                            <span className="text-gray-700 text-sm lg:text-base">₹{settingPrice.toLocaleString()}</span>
                            <span className="font-bold text-gray-900 text-sm lg:text-base">Setting</span>
                            <span className="text-[10px] lg:text-xs text-gray-500 truncate max-w-20 **:lg:max-w-[120px]">
                                ({selectedMetal} {selectedColor})
                            </span>
                        </div>

                        <span className="text-xl text-gray-400 font-light">+</span>

                        {/* Diamond Info */}
                        <div className="flex flex-col items-center text-center">
                            <span className="text-gray-700 text-sm lg:text-base">₹{selectedSizeObj.diamondValue?.toLocaleString()}</span>
                            <span className="font-bold text-gray-900 text-sm lg:text-base">Diamond</span>
                            <span className="text-[10px] lg:text-xs text-gray-500 truncate max-w-20 lg:max-w-[120px]">
                                ({selectedCarat} {selectedShape})
                            </span>
                        </div>

                        <span className="text-xl text-gray-400 font-light">=</span>
                    </div>

                    {/* CENTER: Sale Price Info */}
                    <div className="flex items-center gap-4 flex-1 justify-center">
                        <div className="flex flex-col items-center lg:items-start">
                            <h2 className="text-[#96722c] text-base lg:text-lg italic font-bold">
                                Sale Price: ₹{selectedSizeObj.totalValue?.toLocaleString()}
                            </h2>
                            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-1 lg:gap-3 mt-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs lg:text-sm text-gray-400 line-through">
                                        ₹{selectedSizeObj.grossValue?.toLocaleString()}
                                    </span>
                                    <span className="text-[9px] lg:text-xs text-gray-500">(incl. Taxes)</span>
                                </div>
                                {selectedSizeObj.discountValue > 0 && (
                                    <div className="bg-green-100 px-3 py-1 rounded-full">
                                        <span className="text-[10px] lg:text-xs font-medium text-green-700">
                                            You Save ₹{selectedSizeObj.discountValue?.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Action Buttons (hidden on sm, visible on md and above) */}
                    <div className="hidden md:flex items-center gap-3 lg:gap-4">
                        {/* WhatsApp Button */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
                        >
                            <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full">
                                <img
                                    src="/icons/whatsapp.png"
                                    alt="WhatsApp"
                                    className="w-5 h-5 object-contain"
                                />
                            </div>
                            <span className="text-xs lg:text-sm whitespace-nowrap">Chat with us</span>
                        </a>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCartClick}
                            className="bg-[#96722c] text-white px-6 lg:px-8 py-2 lg:py-3 rounded-sm text-xs lg:text-sm font-bold hover:bg-[#7a5c24] transition-all uppercase tracking-wider whitespace-nowrap"
                        >
                            Add to Cart (₹{selectedSizeObj.totalValue?.toLocaleString()})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}