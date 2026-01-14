
interface StickyBarProps {
    visible: boolean;
    product: any;
    selectedSizeObj: any;
    onAddToCart: () => void;
    token: string | null;
    navigate: any;
}

export default function StickyProductBar({
    visible,
    product,
    selectedSizeObj,
    onAddToCart,
    token,
    navigate
}: StickyBarProps) {
    if (!selectedSizeObj) return null;

    const handleAddToCartClick = () => {
        if (!token) {
            navigate("/signup");
            return;
        }
        onAddToCart();
    };

    const phone = "919870197167";
    const websiteUrl = typeof window !== "undefined" ? window.location.href : "";
    const text = `I need more information about this product (Code: ${product?.productCode})`;
    const message = `${text}\n\nWebsite: ${websiteUrl}`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-100 bg-white border-b shadow-md transition-transform duration-300 transform ${
                visible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
                {/* Mobile Layout (simplified - only show price info) */}
                <div className="md:hidden">
                    <div className="flex items-center justify-between">
                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate max-w-[180px]">{product?.title}</p>
                            <p className="text-[9px] text-gray-500 uppercase tracking-tighter">Ref: {product?.productCode}</p>
                        </div>

                        {/* Price and discount - mobile only */}
                        <div className="flex items-center gap-2">
                            <div className="text-right">
                                {selectedSizeObj.discountValue > 0 && (
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs line-through text-gray-400">
                                            ₹{selectedSizeObj.grossValue?.toLocaleString()}
                                        </span>
                                        <div className="bg-green-100 px-1.5 py-0.5 rounded">
                                            <span className="text-[9px] font-bold text-green-700">
                                                SAVE ₹{selectedSizeObj.discountValue?.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <span className="font-bold text-[#351043] text-sm">
                                    ₹{selectedSizeObj.totalValue?.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout (full features) */}
                <div className="hidden md:flex items-center justify-between">
                    {/* Left side: Product info & breakdown */}
                    <div className="flex items-center gap-4 lg:gap-6">
                        {/* Product info */}
                        <div>
                            <p className="text-sm font-bold truncate max-w-[180px] lg:max-w-[250px]">{product?.title}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Ref: {product?.productCode}</p>
                        </div>

                        {/* Price breakdown - desktop only */}
                        <div className="flex items-center gap-3 text-xs border-l pl-4 lg:pl-6 border-gray-200">
                            <div className="flex flex-col">
                                <span className="text-gray-500">Metal</span>
                                <span className="font-semibold">₹{selectedSizeObj.goldValue?.toLocaleString()}</span>
                            </div>
                            <span className="text-gray-300">+</span>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Labour</span>
                                <span className="font-semibold">₹{selectedSizeObj.labourValue?.toLocaleString()}</span>
                            </div>
                            <span className="text-gray-300">+</span>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Diamond</span>
                                <span className="font-semibold">₹{selectedSizeObj.diamondValue?.toLocaleString()}</span>
                            </div>
                            <span className="text-gray-300 mx-1">=</span>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Total</span>
                                <span className="font-bold text-[#351043] text-sm">₹{selectedSizeObj.totalValue?.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Discount badge - desktop only */}
                        {selectedSizeObj.discountValue > 0 && (
                            <div className="hidden lg:flex items-center bg-green-100 px-2 py-1 rounded">
                                <span className="text-[10px] font-bold text-green-700">SAVE ₹{selectedSizeObj.discountValue?.toLocaleString()}</span>
                            </div>
                        )}
                    </div>

                    {/* Right side: Actions - desktop only */}
                    <div className="hidden md:flex items-center gap-3 lg:gap-4">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm hover:text-green-600 transition-colors"
                        >
                            <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full">
                                <img 
                                    src="/icons/whatsapp.png" 
                                    alt="WhatsApp" 
                                    className="w-5 h-5 object-contain" 
                                />
                            </div>
                            <span className="hidden lg:inline text-gray-700">Chat with us</span>
                        </a>
                        <button
                            onClick={handleAddToCartClick}
                            className="bg-[#351043] text-white px-5 lg:px-6 py-2 rounded-md text-sm font-semibold hover:bg-[#4a165a] transition-colors whitespace-nowrap"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}