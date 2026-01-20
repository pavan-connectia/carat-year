import { type NavItem } from '@/types/api';

export const NAV_LINKS: NavItem[] = [
  {
    id: "rings",
    name: "Rings",
    href: "/product?q=rings",
    hasMegaMenu: true,
    megaMenuData: {
      layoutType: 'default',
      columns: [
        {
          id: "style",
          title: "STYLE",
          items: [
            { label: "Solitaire", href: "/q=solitaire" },
            { label: "Side Stone", href: "/q=side-stone" },
            { label: "Toi Et Moi", href: "/q=toi-et-moi" },
            { label: "3 Stone", href: "/q=3-stone" },
            { label: "5 Stone", href: "/q=5-stone" },
            { label: "7 Stone", href: "/q=7-stone" },
            { label: "Eternity", href: "/q=eternity" },
          ]
        },
        // {
        //   id: "stone",
        //   title: "STONE",
        //   items: [
        //     { label: "Lab Grown", href: "/q=lab-grown" },
        //     { label: "Diamond with Coloured Gemstone", href: "/q=coloured-gemstone" },
        //   ]
        // },
   
        { id: "shape", title: "SHAPE", items: [{ label: "Round", href: "/q=rou" }, { label: "Princess", href: "/q=pri" }, { label: "Emerald", href: "/q=eme" }, { label: "Pear", href: "/q=pea" }, { label: "Oval", href: "/q=ova" }] },
        {
          id: "metal",
          title: "METAL",
          items: [
            { label: "White Gold", href: "/q=white-gold" },
            { label: "Yellow Gold", href: "/q=yellow-gold" },
            { label: "Rose Gold", href: "/q=rose-gold" },
            { label: "Platinum", href: "/q=platinum" },
            { label: "Silver", href: "/q=silver" },
          ]
        },
        {
          id: "price",
          title: "PRICE",
          items: [
            { label: "Under ₹50,000", href: "/q=under-50000" },
            { label: "₹50,000 – ₹1,00,000", href: "/q=50000-100000" },
            { label: "₹1,00,000 – ₹2,00,000", href: "/q=100000-200000" },
            { label: "Above ₹2,00,000", href: "/q=above-200000" },
          ]
        }

      ],
      promos: [
        { image: "https://res.cloudinary.com/dsmrucsek/image/upload/v1765345354/2.1742_q5szdm.jpg", label: "Shop All Engagement Rings", href: "/product?q=mens-rings" },
        { image: "https://res.cloudinary.com/dsmrucsek/image/upload/v1765345354/2.1742_q5szdm.jpg", label: "Shop Last Chance Engagement Rings", href: "/product?q=womens-rings" },
      ]
    }
  },
  {
    id: "earrings",
    name: "Earrings",
    href: "/product?q=earrings",
    hasMegaMenu: true,
    megaMenuData: {
      layoutType: 'default',
      columns: [
        {
          id: "style",
          title: "STYLE",
          items: [
            { label: "Solitaire", href: "/q=solitaire" },
            { label: "Side Stone", href: "/q=side-stone" },
            { label: "Toi Et Moi", href: "/q=toi-et-moi" },
            { label: "3 Stone", href: "/q=3-stone" },
            { label: "5 Stone", href: "/q=5-stone" },
            { label: "7 Stone", href: "/q=7-stone" },
            { label: "Eternity", href: "/q=eternity" },
          ]
        },
        // {
        //   id: "stone",
        //   title: "STONE",
        //   items: [
        //     { label: "Lab Grown", href: "/q=lab-grown" },
        //     { label: "Diamond with Coloured Gemstone", href: "/q=coloured-gemstone" },
        //   ]
        // },
        { id: "shape", title: "SHAPE", items: [{ label: "Round", href: "/q=rou" }, { label: "Princess", href: "/q=pri" }, { label: "Emerald", href: "/q=eme" }, { label: "Pear", href: "/q=pea" }, { label: "Oval", href: "/q=ova" }] },
        {
          id: "metal",
          title: "METAL",
          items: [
            { label: "White Gold", href: "/q=white-gold" },
            { label: "Yellow Gold", href: "/q=yellow-gold" },
            { label: "Rose Gold", href: "/q=rose-gold" },
            { label: "Platinum", href: "/q=platinum" },
            { label: "Silver", href: "/q=silver" },
          ]
        },
        {
          id: "price",
          title: "PRICE",
          items: [
            { label: "Under ₹50,000", href: "/q=under-50000" },
            { label: "₹50,000 – ₹1,00,000", href: "/q=50000-100000" },
            { label: "₹1,00,000 – ₹2,00,000", href: "/q=100000-200000" },
            { label: "Above ₹2,00,000", href: "/q=above-200000" },
          ]
        }

      ],
      promos: [
        { image: "https://res.cloudinary.com/dsmrucsek/image/upload/v1765170052/33_2_bfbb1i.jpg", label: "Shop All Diamond Earrings", href: "/product?q=earrings" },
        { image: "https://res.cloudinary.com/dsmrucsek/image/upload/v1765170052/33_2_bfbb1i.jpg", label: "Shop Last Chance Diamond Earrings", href: "/product?q=latest-earrings" },
      ]
    }
  },
  {
    id: "pendants-necklaces",
    name: "Pendants & Necklaces",
    href: "/product?q=pendants-necklaces",
    hasMegaMenu: true,
    megaMenuData: {
      layoutType: 'default',
      columns: [
        {
          id: "style",
          title: "STYLE",
          items: [
            { label: "Solitaire", href: "/q=solitaire" },
            { label: "Side Stone", href: "/q=side-stone" },
            { label: "Toi Et Moi", href: "/q=toi-et-moi" },
            { label: "3 Stone", href: "/q=3-stone" },
            { label: "5 Stone", href: "/q=5-stone" },
            { label: "7 Stone", href: "/q=7-stone" },
            { label: "Eternity", href: "/q=eternity" },
          ]
        },

        // {
        //   id: "stone",
        //   title: "STONE",
        //   items: [
        //     { label: "Lab Grown", href: "/q=lab-grown" },
        //     { label: "Diamond with Coloured Gemstone", href: "/q=coloured-gemstone" },
        //   ]
        // },
        { id: "shape", title: "SHAPE", items: [{ label: "Round", href: "/q=rou" }, { label: "Pear", href: "/q=pea" }, { label: "Emerald", href: "/q=eme" }, { label: "Heart", href: "/q=hea" }] },

        {
          id: "metal",
          title: "METAL",
          items: [
            { label: "White Gold", href: "/q=white-gold" },
            { label: "Yellow Gold", href: "/q=yellow-gold" },
            { label: "Rose Gold", href: "/q=rose-gold" },
            { label: "Platinum", href: "/q=platinum" },
            { label: "Silver", href: "/q=silver" },
          ]
        },
        {
          id: "price",
          title: "PRICE",
          items: [
            { label: "Under ₹50,000", href: "/q=under-50000" },
            { label: "₹50,000 – ₹1,00,000", href: "/q=50000-100000" },
            { label: "₹1,00,000 – ₹2,00,000", href: "/q=100000-200000" },
            { label: "Above ₹2,00,000", href: "/q=above-200000" },
          ]
        }

      ],
      promos: [
        { image: "https://res.cloudinary.com/dsmrucsek/image/upload/v1765517942/NK-004_12_twodko.png", label: "Shop All Pendants", href: "/product?q=pendants-necklaces" },
        { image: "https://res.cloudinary.com/dsmrucsek/image/upload/v1765517942/NK-004_12_twodko.png", label: "Shop Pendants, Ready To Be Delivered Within 7-Working-Days", href: "/product?q=ready" }
      ]
    }
  },
  {
    id: "bangles-bracelets",
    name: "Bangles & Bracelets",
    href: "/product?q=bangles-bracelets",
    hasMegaMenu: true,
    megaMenuData: {
      layoutType: 'default',
      columns: [
        {
          id: "style",
          title: "STYLE",
          items: [
            { label: "Solitaire", href: "/q=solitaire" },
            { label: "Side Stone", href: "/q=side-stone" },
            { label: "Toi Et Moi", href: "/q=toi-et-moi" },
            { label: "3 Stone", href: "/q=3-stone" },
            { label: "5 Stone", href: "/q=5-stone" },
            { label: "7 Stone", href: "/q=7-stone" },
            { label: "Eternity", href: "/q=eternity" },
          ]
        },

        // {
        //   id: "stone",
        //   title: "STONE",
        //   items: [
        //     { label: "Lab Grown", href: "/q=lab-grown" },
        //     { label: "Diamond with Coloured Gemstone", href: "/q=coloured-gemstone" },
        //   ]
        // },
        { id: "shape", title: "SHAPE", items: [{ label: "Round", href: "/q=rou" }, { label: "Princess", href: "/q=pri" }, { label: "Oval", href: "/q=ova" }, { label: "Emerald", href: "/q=eme" }] },
        {
          id: "metal",
          title: "METAL",
          items: [
            { label: "White Gold", href: "/q=white-gold" },
            { label: "Yellow Gold", href: "/q=yellow-gold" },
            { label: "Rose Gold", href: "/q=rose-gold" },
            { label: "Platinum", href: "/q=platinum" },
            { label: "Silver", href: "/q=silver" },
          ]
        }, {
          id: "price",
          title: "PRICE",
          items: [
            { label: "Under ₹50,000", href: "/q=under-50000" },
            { label: "₹50,000 – ₹1,00,000", href: "/q=50000-100000" },
            { label: "₹1,00,000 – ₹2,00,000", href: "/q=100000-200000" },
            { label: "Above ₹2,00,000", href: "/q=above-200000" },
          ]
        }

      ],
      promos: [
        { image: "https://res.cloudinary.com/dsmrucsek/image/upload/v1765518092/TBR56_9_iinjay.jpg", label: "Shop All Bracelets", href: "/product?q=all" },
        { image: "https://res.cloudinary.com/dsmrucsek/image/upload/v1765518092/TBR56_9_iinjay.jpg", label: "Shop Last Chance Bracelets", href: "/product?q=lc" }
      ]
    }
  },
  {
    id: "gifts",
    name: "Gifts",
    href: "/product?q=gifts",
    hasMegaMenu: true,
    megaMenuData: {
      layoutType: 'split',
      columns: [
        { id: "recipient", title: "GIFTS BY RECIPIENT", items: [{ label: "For Friends", href: "/q=fri" }, { label: "For Girlfriend", href: "/q=gf" }, { label: "For Boyfriend", href: "/q=bf" }, { label: "For Wife", href: "/q=wife" }, { label: "For Husband", href: "/q=hus" }, { label: "For Mum", href: "/q=mum" }, { label: "For Dad", href: "/q=dad" }, { label: "For Sister", href: "/q=sis" }, { label: "For Brother", href: "/q=bro" }] },
        { id: "occasion", title: "GIFTS BY OCCASION", items: [{ label: "For Bridesmaids", href: "/q=brid" }, { label: "For Birthdays", href: "/q=birth" }, { label: "For Anniversaries", href: "/q=anni" }, { label: "For Milestones", href: "/q=mile" }] },
        {
          id: "price",
          title: "PRICE",
          items: [
            { label: "Under ₹50,000", href: "/q=under-50000" },
            { label: "₹50,000 – ₹1,00,000", href: "/q=50000-100000" },
            { label: "₹1,00,000 – ₹2,00,000", href: "/q=100000-200000" },
            { label: "Above ₹2,00,000", href: "/q=above-200000" },
          ]
        }

      ],
      promos: [
        { image: "https://picsum.photos/seed/gift1/300/200", label: "Gift Sets", href: "product?/q=sets" },
        { image: "https://picsum.photos/seed/gift2/300/200", label: "Gift Guide", href: "product?/q=guide" },
      ]
    }
  },
  {
    id: "new-arrivals",
    name: "New Arrivals",
    href: "/product?q=new-arrivals"
  },
];