// utils/menuFilterUtils.ts

// Map MegaMenu labels to backend filter values
export const mapMenuToBackendFilters = (
  menuLabel: string,
  menuType: string,
  baseCategory?: string
): Record<string, string> => {
  const filters: Record<string, string> = {};

  if (baseCategory) {
    filters.tags = baseCategory.toLowerCase().replace(/\s+/g, '-');
  }

  const fieldMap: Record<string, string> = {
    'STYLE': 'style',
    'STONE': 'stone',
    'SHAPE': 'shape',
    'METAL': 'metal',
    'PRICE': 'price',
    'GIFTS BY RECIPIENT': 'tags',
    'GIFTS BY OCCASION': 'tags',
    'JEWELLERY TYPE': 'tags'
  };

  const backendField = fieldMap[menuType.toUpperCase()];
  if (!backendField) return filters;

  let backendValue = menuLabel;

  switch (backendField) {
    case 'style':
      backendValue = mapStyleToBackend(menuLabel);
      break;
    case 'stone':
      backendValue = mapStoneToBackend(menuLabel);
      break;
    case 'shape':
      backendValue = mapShapeToBackend(menuLabel);
      break;
    case 'metal':
      backendValue = mapMetalToBackend(menuLabel);
      break;
    case 'price':
      return { ...filters, ...mapPriceToBackend(menuLabel) };
  }

  filters[backendField] = backendValue;
  return filters;
};


// Helper mapping functions
const mapStyleToBackend = (style: string): string => {
  const styleMap: Record<string, string> = {
    'Solitaire': 'solitaire',
    'Side Stone': 'side-stone', // Matches JSON "side-stone"
    'Toi Et Moi': 'toi-et-moi',
    '3 Stone': '3-stone',
    '5 Stone': '5-stone',
    '7 Stone': '7-stone',
    'Eternity': 'eternity',
  };
  return styleMap[style] || style.toLowerCase().replace(/\s+/g, '-');
};

const mapStoneToBackend = (stone: string): string => {
  const stoneMap: Record<string, string> = {
    'Natural Diamond': 'natural-diamond',
    'Lab Grown': 'lab-grown',
    'Yellow Diamond': 'yellow-diamond',
    'Black Diamond': 'black-diamond',
    'Moissanite': 'moissanite'
  };
  return stoneMap[stone] || stone.toLowerCase().replace(/\s+/g, '-');
};

const mapShapeToBackend = (shape: string): string => {
  const shapeMap: Record<string, string> = {
    'Round': 'Round',
    'Princess': 'Princess',
    'Emerald': 'Emerald',
    'Pear': 'Pear',
    'Oval': 'Oval',
    'Heart': 'Heart',
    'Marquise': 'Marquise'
  };
  return shapeMap[shape] || shape.toLowerCase().replace(/\s+/g, '-');
};

const mapMetalToBackend = (metal: string): string => {
  const metalMap: Record<string, string> = {
    'Platinum': 'platinum',
    'White Gold': 'white-gold',
    'Yellow Gold': 'yellow-gold',
    'Rose Gold': 'rose-gold',
    'Silver': 'silver'
  };
  return metalMap[metal] || metal.toLowerCase().replace(/\s+/g, '-');
};

const mapPriceToBackend = (priceLabel: string): Record<string, string> => {
  const filters: Record<string, string> = {};

  // ✅ Normalize EN DASH / EM DASH → normal hyphen
  const normalized = priceLabel.replace(/–|—/g, "-");

  if (normalized.includes("Under")) {
    const match = normalized.match(/[\d,]+/);
    if (match) {
      filters.maxPrice = match[0].replace(/,/g, "");
    }
  }
  else if (normalized.includes("+")) {
    const match = normalized.match(/[\d,]+/);
    if (match) {
      filters.minPrice = match[0].replace(/,/g, "");
    }
  }
  else if (normalized.includes("-")) {
    const match = normalized.match(/[\d,]+/g);
    if (match && match.length >= 2) {
      filters.minPrice = match[0].replace(/,/g, "");
      filters.maxPrice = match[1].replace(/,/g, "");
    }
  }

  return filters;
};

// Generate query string for React Router
export const generateFilterQuery = (filters: Record<string, string>): string => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    // Handle tags specially for backend
    if (key === 'tags') {
      const tagArray = value.split(',').filter(tag => tag.trim());
      if (tagArray.length > 0) {
        params.append('tags', tagArray.join(','));
      }
    } else {
      params.append(key, value);
    }
  });

  return params.toString();
};