import React from 'react';
import { Link } from 'react-router';
import { type MegaMenuColumn, type MegaMenuPromo } from '@/types/api';
import { Circle, Diamond, Heart, Square } from 'lucide-react';
import { mapMenuToBackendFilters, generateFilterQuery } from '@/lib/menuFilterUtils';

interface MegaMenuProps {
  layoutType?: 'default' | 'split';
  columns: MegaMenuColumn[];
  promos: MegaMenuPromo[];
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  baseCategory?: string;
  singleColumnMode?: boolean;
}

const SubMenuIcon = ({ type, label }: { type: string; label: string }) => {
  if (type === 'SHAPE') {
    if (label.includes('Round')) return <Circle className="size-3 text-gray-400" />;
    if (label.includes('Princess') || label.includes('Emerald')) return <Square className="size-3 text-gray-400" />;
    if (label.includes('Heart')) return <Heart className="size-3 text-gray-400" />;
    return <Diamond className="size-3 text-gray-400" />;
  }
  if (type === 'STONE') {
    return <div className="size-3 rounded-full bg-[#B4975A]/40" />;
  }
  return null;
};

const MegaMenu: React.FC<MegaMenuProps> = ({ 
  layoutType = 'default', 
  columns, 
  promos, 
  isVisible, 
  onMouseEnter, 
  onMouseLeave,
  baseCategory = '',
  singleColumnMode = false
}) => {
  if (!isVisible) return null;

  const generateFilterHref = (
  columnTitle: string,
  itemLabel: string,
  itemHref?: string
) => {
  if (itemHref && itemHref.includes("?")) return itemHref;

  const filters = mapMenuToBackendFilters(itemLabel, columnTitle, baseCategory);

  if (!filters.minPrice) filters.minPrice = "0";
  if (!filters.maxPrice) filters.maxPrice = "500000";

  if (filters.metal) {
    filters.color = filters.metal;
    delete filters.metal;
  }

  const queryString = generateFilterQuery(filters);
  return `/product?${queryString}`;
};


  const generatePromoHref = (promo: MegaMenuPromo): string => {
    if (promo.href) return promo.href;
    
    const filters: Record<string, string> = {};
    if (baseCategory) {
      filters.tags = baseCategory.toLowerCase().replace(/\s+/g, '-');
    }
    
    const queryString = generateFilterQuery(filters);
    return `/product${queryString ? `?${queryString}` : ''}`;
  };


  const isSingleColumn = columns.length === 1 || singleColumnMode;

  return (
    <div 
      className="absolute top-full left-0 w-full bg-white text-gray-800 shadow-2xl border-t border-gray-100 z-9999 transition-opacity duration-300"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-6 py-10 flex flex-wrap lg:flex-nowrap">

        <div className={`flex-1 ${isSingleColumn ? 'grid grid-cols-1 gap-8' : layoutType === 'split' ? 'grid grid-cols-2 gap-12' : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'}`}>
          {columns.map((column, idx) => (
            <div key={idx} className="flex flex-col">
              <h2 className={`${isSingleColumn ? 'text-2xl font-playfair font-semibold mb-8' : layoutType === 'split' ? 'text-2xl font-playfair font-semibold mb-6' : 'text-[#B4975A] font-semibold text-xs tracking-widest mb-4 uppercase'}`}>
                {column.title}
              </h2>
              
              {column.groups ? (
                <div className="space-y-8">
                  {column.groups.map((group, gIdx) => (
                    <div key={gIdx}>
                      <h3 className="text-[#B4975A] font-semibold text-[10px] tracking-widest mb-3 uppercase opacity-80">
                        {group.title}
                      </h3>
                      <ul className="space-y-2">
                        {group.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link 
                              to={generateFilterHref(group.title, item.label, item.href)}
                              className="text-[13px] text-gray-600 hover:text-[#B4975A] transition-colors flex items-center gap-2 group"
                            >
                              <SubMenuIcon type={group.title} label={item.label} />
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className={`${isSingleColumn ? 'grid grid-cols-2 md:grid-cols-3 gap-4' : 'space-y-3'}`}>
                  {column.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link 
                        to={generateFilterHref(column.title, item.label, item.href)}
                        className="text-[13px] text-gray-600 hover:text-[#B4975A] transition-colors flex items-center gap-2 group"
                      >
                        <SubMenuIcon type={column.title} label={item.label} />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {(!isSingleColumn || columns.some(col => col.title === 'GIFTS BY RECIPIENT' || col.title === 'GIFTS BY OCCASION')) && (
          <div className="lg:w-1/3 border-l border-gray-100 pl-8 ml-8">
            <h3 className="font-playfair text-xl text-gray-800 mb-6 italic">Popular Categories</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {promos.map((promo, idx) => (
                <Link key={idx} to={generatePromoHref(promo)} className="group block">
                  <div className="overflow-hidden rounded-sm mb-3 aspect-4/3 bg-gray-100 border border-gray-50">
                    <img 
                      src={promo.image} 
                      alt={promo.label} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-[11px] font-semibold text-gray-800 leading-tight group-hover:text-[#B4975A] transition-colors uppercase tracking-tight">
                    {promo.label}
                  </p>
                </Link>
              ))}
            </div>
            {/* <div className="mt-10 border-t border-gray-100 pt-6">
               <Link to="/gift-cards" className="font-playfair text-lg text-[#B4975A] hover:underline">Gift Cards</Link>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MegaMenu;