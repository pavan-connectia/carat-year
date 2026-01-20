import type React from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type SidebarProps = {
  onChange: (filters: Record<string, any>) => void;
  isMobile?: boolean;
  onClose?: () => void;
};

const PRICE_OPTIONS = [
  { id: "under50", label: "Under ₹50,000", min: 0, max: 50000 },
  { id: "50to100", label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
  { id: "100to200", label: "₹1,00,000 - ₹2,00,000", min: 100000, max: 200000 },
  { id: "above200", label: "Above ₹2,00,000", min: 200000, max: 10000000 },
];

export function Sidebar({ onChange, isMobile = false, onClose }: SidebarProps) {
  const [sections, setSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    gender: false,
    designType: false,
    carat: false,
    shape: false,
    metal: false,
  });

  const [categories, setCategories] = useState<Record<string, boolean>>({
    rings: false,
    necklaces: false,
    earrings: false,
    bangles: false,
    bracelets: false,
    pendants: false,
    nosepins: false,
  });

  const [designType, setDesignType] = useState<Record<string, boolean>>({});
  const [carat, setCarat] = useState<Record<string, boolean>>({});
  const [style, setStyle] = useState<Record<string, boolean>>({});
  const [shape, setShape] = useState<Record<string, boolean>>({});
  const [metal, setMetal] = useState<Record<string, boolean>>({});
  const [gender, setGender] = useState<Record<string, boolean>>({});
  const [occsasion, setOccsasion] = useState<Record<string, boolean>>({});


  // Track selected price bucket ID
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);

  const buildFilters = (overrides: Partial<Record<string, any>> = {}) => {
    const finalCategories = overrides.categories ?? categories;
    const finalDesignType = overrides.designType ?? designType;
    const finalCarat = overrides.carat ?? carat;
    const finalStyle = overrides.style ?? style;
    const finalShape = overrides.shape ?? shape;
    const finalMetal = overrides.metal ?? metal;
    const finalGender = overrides.gender ?? gender;
    const finalOccsasion = overrides.occsasion ?? occsasion;

    // Determine price range based on selection or override
    let finalPriceRange = [0, 10000000];
    const priceId = overrides.priceId !== undefined ? overrides.priceId : selectedPriceId;

    if (priceId) {
      const option = PRICE_OPTIONS.find(opt => opt.id === priceId);
      if (option) finalPriceRange = [option.min, option.max];
    }

    onChange({
      categories: Object.keys(finalCategories).filter((k) => finalCategories[k]),
      designType: Object.keys(finalDesignType).filter((k) => finalDesignType[k]),
      carat: Object.keys(finalCarat).filter((k) => finalCarat[k]),
      style: Object.keys(finalStyle).filter((k) => finalStyle[k]),
      shape: Object.keys(finalShape).filter((k) => finalShape[k]),
      metal: Object.keys(finalMetal).filter((k) => finalMetal[k]),
      gender: Object.keys(finalGender).filter(k => finalGender[k]),
      occsasion: Object.keys(finalOccsasion).filter(k => finalOccsasion[k]),
      priceRange: finalPriceRange,
    });
  };

  const toggleState = (
    key: string,
    state: Record<string, boolean>,
    setState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    filterKey: string
  ) => {
    const updated = { ...state, [key]: !state[key] };
    setState(updated);
    buildFilters({ [filterKey]: updated });
  };

  const handlePriceChange = (id: string) => {
    const newId = selectedPriceId === id ? null : id;
    setSelectedPriceId(newId);
    buildFilters({ priceId: newId });
  };

  const toggleSection = (section: string) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const FilterHeader = ({ title, sectionId }: { title: string; sectionId: string }) => (
    <button
      onClick={() => toggleSection(sectionId)}
      className="flex w-full items-center justify-between px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
    >
      <h3 className={`font-semibold ${isMobile ? "text-base" : "text-sm"}`}>
        {title}
      </h3>
      {sections[sectionId] ? (
        <ChevronUp className={`${isMobile ? "h-5 w-5" : "h-4 w-4"}`} />
      ) : (
        <ChevronDown className={`${isMobile ? "h-5 w-5" : "h-4 w-4"}`} />
      )}
    </button>
  );

  const FilterOptions = ({
    options,
    selectedState,
    setState,
    filterKey,
  }: {
    options: string[];
    selectedState: Record<string, boolean>;
    setState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    filterKey: string;
  }) => (
    <div className={`space-y-2 p-4 ${isMobile ? "space-y-3" : "space-y-2"}`}>
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-3">
          <Checkbox
            id={option}
            checked={!!selectedState[option]}
            onCheckedChange={() => toggleState(option, selectedState, setState, filterKey)}
            className={`${isMobile ? "h-5 w-5" : "h-4 w-4"}`}
          />
          <label htmlFor={option} className={`cursor-pointer ${isMobile ? "text-sm" : "text-xs"}`}>
            {option}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <aside
      className={`${isMobile
        ? "fixed inset-0 z-50 bg-white flex flex-col"
        : "hidden lg:block w-full lg:w-72 xl:w-80 overflow-y-auto border-r border-gray-200"
        }`}
    >
      {isMobile && (
        <>
          <div className="flex items-center justify-between border-b px-4 py-3 bg-gray-50">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 py-3 border-b">
            <button
              onClick={() => {
                setCategories({
                  rings: false, necklaces: false,
                  earrings: false, bangles: false, bracelets: false,
                  pendants: false, nosepins: false,
                });
                setDesignType({});
                setCarat({});
                setStyle({});
                setShape({});
                setMetal({});
                setGender({});
                setOccsasion({});
                setSelectedPriceId(null);
                buildFilters({
                  categories: {}, designType: {}, carat: {},
                  style: {}, shape: {}, metal: {}, gender: {}, occsasion: {}, priceId: null
                });
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all filters
            </button>
          </div>
        </>
      )}

      <div className={`${isMobile ? "flex-1 overflow-y-auto" : ""}`}>
        {/* GENDER */}
        <FilterHeader title="Gender" sectionId="gender" />
        {sections.gender && (
          <FilterOptions
            options={["Men", "Women", "Kids"]}
            selectedState={gender}
            setState={setGender}
            filterKey="gender"
          />
        )}

        {/* CATEGORY */}
        <FilterHeader title="Category" sectionId="category" />
        {sections.category && (
          <div className={`space-y-${isMobile ? "3" : "2"} p-4`}>
            {Object.entries(categories).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-3">
                <Checkbox
                  checked={value}
                  onCheckedChange={() => toggleState(key, categories, setCategories, "categories")}
                  className={`${isMobile ? "h-5 w-5" : "h-4 w-4"}`}
                />
                <span className={`${isMobile ? "text-sm" : "text-xs"} capitalize`}>
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* PRICE - Updated to options */}
        <FilterHeader title="Price" sectionId="price" />
        {sections.price && (
          <div className={`space-y-2 p-4 ${isMobile ? "space-y-3" : "space-y-2"}`}>
            {PRICE_OPTIONS.map((option) => (
              <div key={option.id} className="flex items-center space-x-3">
                <Checkbox
                  id={option.id}
                  checked={selectedPriceId === option.id}
                  onCheckedChange={() => handlePriceChange(option.id)}
                  className={`${isMobile ? "h-5 w-5" : "h-4 w-4"}`}
                />
                <label htmlFor={option.id} className={`cursor-pointer ${isMobile ? "text-sm" : "text-xs"}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}

        {/* DESIGN TYPE */}
        <FilterHeader title="Design Type" sectionId="designType" />
        {sections.designType && (
          <FilterOptions
            options={["Classic", "Minimalist", "Solitaire"]}
            selectedState={designType}
            setState={setDesignType}
            filterKey="designType"
          />
        )}

        {/* CARAT */}
        <FilterHeader title="Carat" sectionId="carat" />
        <p className="text-xs text-muted-foreground mt-1 text-center">
          Total diamond weight of the jewellery piece
        </p>
        {sections.carat && (
          <FilterOptions
            options={["Below 0.25 ct", "0.25 – 0.50 ct", "0.50 – 1 ct", "1 – 1.5 ct", "1.5 – 2 ct", "Above 2 ct"]}
            selectedState={carat}
            setState={setCarat}
            filterKey="carat"
          />
        )}

        {/* OCCASION */}
        <FilterHeader title="occsasion" sectionId="occsasion" />
        {sections.occsasion && (
          <FilterOptions
            options={["Everyday", "Office Wear", "Casual", "Party", "Engagement", "Wedding", "Luxury Collection"]}
            selectedState={occsasion}
            setState={setOccsasion}
            filterKey="occsasion"
          />
        )}

        {/* SHAPE */}
        <FilterHeader title="Shape" sectionId="shape" />
        {sections.shape && (
          <FilterOptions
            options={["Round", "Oval", "Princess", "Cushion", "Emerald", "Marquise", "Heart", "Pear", "Radiant"]}
            selectedState={shape}
            setState={setShape}
            filterKey="shape"
          />
        )}

        {/* METAL */}
        <FilterHeader title="Metal" sectionId="metal" />
        {sections.metal && (
          <FilterOptions
            options={["Yellow Gold", "White Gold", "Rose Gold", "Platinum", "Silver"]}
            selectedState={metal}
            setState={setMetal}
            filterKey="metal"
          />
        )}
      </div>

      {isMobile && (
        <div className="border-t p-4 bg-white sticky bottom-0">
          <button
            onClick={() => onClose?.()}
            className="w-full bg-[#957127] text-white py-3 rounded-lg font-medium hover:bg-[#7a5c20] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </aside>
  );
}