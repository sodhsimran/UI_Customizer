import React, { useState, useCallback, useRef, useReducer, useEffect } from 'react';
import pic1 from "./assets/pic1.jpg?resize&width=100%&height=100%"; 
import pic2 from "./assets/pic2.jpg";
import pic3 from "./assets/pic3.jpg?resize&width=100vw&height=100vh";
import pic4 from "./assets/pic4.jpg";
import pic5 from "./assets/pic5.jpg";
// ===== SELF-CONTAINED SVG ICONS (Replaces external library) ===== //
const SVGIcons = {
    RotateCcw: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>),
    RotateCw: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>),
    Upload: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>),
    Download: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>),
    Code: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>),
    Undo2: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a8.5 8.5 0 1 1 0 17H11"/></svg>),
    ChevronDown: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>),
    ChevronLeft: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6"/></svg>),
    ChevronRight: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>),
    Copy: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>),
    Type: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>),
    PictureInPicture: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 3H3C1.9 3 1 3.9 1 5v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/><path d="M15 9h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2z"/></svg>),
    AlignLeft: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>),
    AlignCenter: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/></svg>),
    AlignRight: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/></svg>),
    GalleryHorizontal: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3v18h20V3Z"/><path d="M12 9v12"/></svg>),
    Settings: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.87l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2.87l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>),
    Eraser: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 12 5 5"/></svg>),
    Wand2: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 21 8.02-14.26a.5.5 0 0 1 .96 0L21 21"/><path d="M12 21v-3.5"/><path d="M12 3v.01"/></svg>),
    Box: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>),
    Armchair: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 10V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 12h18"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M5 12H3v-2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2h-2"/></svg>),
    X: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>),
    Laptop: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.28 20H3.72a1 1 0 0 1-.9-1.45L4 16"/></svg>),
    Smartphone: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>),
    Sparkles: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>),
    History: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>),
    Maximize: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>),
    Move: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>),
    ZoomIn: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>),
    ZoomOut: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>),
    Ruler: (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L3 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0L15.3 9"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/><path d="M3 21l18-18"/></svg>)
};

const OuterStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;600;700&family=Merriweather:wght@400;700&family=Playfair+Display:wght@400;700&family=Inconsolata:wght@400;700&display=swap');
        body, #root, .h-screen { height: 100vh; }
        body { margin: 0; font-family: 'Inter', sans-serif; overflow: hidden; }
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
        input[type="color"] { -webkit-appearance: none; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; padding: 0; overflow: hidden; }
        // input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
        // input[type="color"]::-webkit-color-swatch { border: none; border-radius: 50%; }
        .tooltip { position: relative; display: inline-block; }
        .tooltip .tooltiptext { visibility: hidden; width: auto; white-space: nowrap; background-color: #555; color: #fff; text-align: center; border-radius: 6px; padding: 5px 10px; position: absolute; z-index: 50; bottom: 125%; left: 50%; transform: translateX(-50%); opacity: 0; transition: opacity 0.3s; }
        .tooltip:hover .tooltiptext { visibility: visible; opacity: 1; }
        .preview-frame { transition: all 0.4s ease-in-out; }
        .code-modal pre { background-color: #2d2d2d; color: #f8f8f2; padding: 1.5rem; border-radius: 0.5rem; font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.5; overflow-x: auto; max-height: 60vh; }
    `}</style>
);

const FONT_FAMILIES = ['Roboto', 'Inter', 'Poppins', 'Merriweather', 'Playfair Display', 'Inconsolata'];
const FONT_WEIGHTS = [400, 500, 600, 700];
const SHADOW_OPTIONS = { none: 'shadow-none', sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-lg' };
const GALLERY_ALIGNMENTS = { left: 'justify-start', center: 'justify-center', right: 'justify-end' };
const BUTTON_ALIGNMENTS = { left: 'justify-start', center: 'justify-center', right: 'justify-end' };
const LAYOUT_STYLES = ['A', 'B'];

const CONFIG_MAIN = {
    typography: { fontFamily: 'Inter', fontWeight: 400, fontSize: 16, textColor: '#1F2937' },
    button: { borderRadius: 8, shadow: 'md', alignment: 'center', bgColor: '#111827', textColor: '#FFFFFF' },
    gallery: { alignment: 'center', spacing: 4, imageBorderRadius: 12 },
    layout: { 
        cardCornerRadius: 24, 
        containerPadding: 0, 
        background: {
            type: 'solid',
            color1: '#FFFFFF',
            color2: '#E5E7EB',
            angle: 145,
        }
    },
    stroke: { color: '#E5E7EB', weight: 0 },
    effects: { blur: 0, brightness: 100, contrast: 100 }
};
<>
<img src={pic3} alt="Cabinet" className="w-[50vw] h-[50vh] object-contain" />
<img src={pic4} alt="Cabinet" className="w-[50vw] h-[50vh] object-contain" />
</>
const PRODUCTS_INFO = {
    cabinet: { 
        id: 'cabinet', name: 'Classic Wooden Cabinet', description: 'A timeless piece for elegant storage solutions.', 
        price: '$599.00', originalPrice: '$750.00',
        images: [
          pic1,pic1,pic2,
           
            // 'https://images.unsplash.com/photo-1594042822435-f25266885b54?w=100',
            // 'https://images.unsplash.com/photo-1616464916356-3a777b2b60b1?w=100',
            // 'https://images.unsplash.com/photo-1558997519-83ea72b42d20?w=100',
            // 'https://images.unsplash.com/photo-1533090481721-33f2b2ce3688?w=100',
        ], 
        customizer: { 
            title: 'Customize your Cabinet',
            sections: [
                { title: '1. Handle Design', options: ['Bar Pull', 'Modern Knob', 'Vintage Drop'] },
                { title: '2. Wood Finish', materials: [{ name: 'Oak', colors: [ { name: 'Natural Oak', value: '#e6c8b4' }, { name: 'Honey Oak', value: '#c5a992' }, { name: 'Golden Oak', value: '#a38771' }, { name: 'Dark Oak', value: '#846c59' } ] }, { name: 'Walnut', colors: [ { name: 'Light Walnut', value: '#6b4f4b' }, { name: 'Classic Walnut', value: '#5a3a2e' }, { name: 'Dark Walnut', value: '#472d25' }, { name: 'Espresso', value: '#331e1a' } ] }] },
                { title: '3. Leg Style', options: ['Tapered', 'Plinth Base', 'Metal Frame'] }
            ]
        }
    },
    chair: { 
        id: 'chair', name: 'Cozy Lounge Chair', description: 'Experience unparalleled comfort and style.', 
        price: '$899.00', originalPrice: '$1100.00',
        images: [
          pic3,pic3,pic4,pic5,
            // 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500',
            // 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100',
            // 'https://images.unsplash.com/photo-1540574163026-6addea634e68?w=100',
            // 'https://images.unsplash.com/photo-1634712282210-d4b6b38834ea?w=100',
            // 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=100'
        ], 
        customizer: { 
            title: 'Customize your Chair',
            sections: [
                { title: '1. Arm Design', options: ['Fixed Arms', 'No Arms', 'Padded Arms'] },
                { title: '2. Finish', materials: [ 
                    { name: 'Leather', colors: [ { name: 'Saddle Brown', value: '#78350f' }, { name: 'Charcoal Gray', value: '#374151' }, { name: 'Oxblood', value: '#7f1d1d' }, { name: 'Forest Green', value: '#14532d' }, { name: 'Midnight Blue', value: '#312e81' }, { name: 'Deep Plum', value: '#701a75' } ] }, 
                    { name: 'Silicon', colors: [ { name: 'Stone Gray', value: '#a1a1aa' }, { name: 'Graphite', value: '#6b7280' }, { name: 'Crimson Red', value: '#ef4444' }, { name: 'Sky Blue', value: '#3b82f6' }, { name: 'Amethyst', value: '#8b5cf6' }, { name: 'Emerald', value: '#10b981' } ] },
                    { name: 'Polyester', colors: [ { name: 'Crimson Red', value: '#ef4444' },{ name: 'Beige', value: '#f5f5dc' }, { name: 'Teal', value: '#008080' }, { name: 'Mustard', value: '#ffdb58' }, { name: 'Saddle Brown', value: '#78350f' },{ name: 'Forest Green', value: '#14532d' } ] },
                    { name: 'Plastic', colors: [ { name: 'Forest Green', value: '#14532d' },{ name: 'White', value: '#ffffff' }, { name: 'Black', value: '#000000' },{ name: 'Graphite', value: '#6b7280' } ,{ name: 'Beige', value: '#f5f5dc' },{ name: 'Crimson Red', value: '#ef4444' }] }
                  ]},
                { title: '3. Legs Finish', materials: [ 
                    { name: 'Wood', colors: [ { name: 'Light Wood', value: '#8d6e63' }, { name: 'Dark Wood', value: '#a1887f' } ] }, 
                    { name: 'Steel', colors: [ { name: 'Brushed Nickel', value: '#c0c0c0' }, { name: 'Matte Black', value: '#333333' }, { name: 'Gold', value: '#ffd700' }] } 
                ]}
            ]
        }
    }
};

const Predef = [
    { name: 'Default', config: CONFIG_MAIN },
    { name: 'Terracotta', config: { ...CONFIG_MAIN, typography: { ...CONFIG_MAIN.typography, textColor: '#D9C59B' }, layout: { ...CONFIG_MAIN.layout, background: { ...CONFIG_MAIN.layout.background, type: 'solid', color1: '#4B1B12' } }, button: { ...CONFIG_MAIN.button,  bgColor: '#D9C59B', textColor: '#0a192f',hoverBgColor: '#52e0c4' },stroke: { color: '#4db6ac', weight: 0 } } },
    { name: 'Pastel Dream', config: { ...CONFIG_MAIN, typography: { ...CONFIG_MAIN.typography, textColor: '#4c423d' }, layout: { ...CONFIG_MAIN.layout, background: { ...CONFIG_MAIN.layout.background, type: 'solid', color1: '#fdf6e3' } }, button: { ...CONFIG_MAIN.button, bgColor: '#f6a6b2' },stroke: { color: '#4db6ac', weight: 0 } } },
    { name: 'Midnight Blue', config: { ...CONFIG_MAIN, typography: { ...CONFIG_MAIN.typography, textColor: '#A8DADC' }, layout: { ...CONFIG_MAIN.layout, background: { ...CONFIG_MAIN.layout.background, type: 'solid', color1: '#0D1B2A' } }, button: { ...CONFIG_MAIN.button, bgColor: '#6d4c41', textColor: '#ffffff' } ,stroke: { color: '#4db6ac', weight: 0 }} },
    { name: 'Sunset Fade', config: { ...CONFIG_MAIN, typography: { ...CONFIG_MAIN.typography, textColor: '#6D2E5C' }, layout: { ...CONFIG_MAIN.layout, background: { type: 'gradient', color1: '#FF8C00', color2: '#9400D3', angle: 135 } }, button: { ...CONFIG_MAIN.button, bgColor: 'rgba(255, 255, 255, 0.2)', textColor: '#FFFFFF' }, stroke: { color: 'rgba(255, 255, 255, 0.3)', weight: 0 } } },
    { name: 'Oceanic Fade', config: { ...CONFIG_MAIN, typography: { ...CONFIG_MAIN.typography, textColor: '#e0f2f1' }, layout: { ...CONFIG_MAIN.layout, background: { type: 'gradient', color1: '#004d40', color2: '#009688', angle: 90 } }, button: { ...CONFIG_MAIN.button, bgColor: '#80cbc4', textColor: '#004d40' }, stroke: { color: '#4db6ac', weight: 0 } } }
];

const Action_desc = (prev, next) => { for (const section in next) { for (const key in next[section]) { if(typeof next[section][key] === 'object' && next[section][key] !== null) { for(const subKey in next[section][key]) { if (prev[section]?.[key]?.[subKey] !== next[section][key][subKey]) { return `Set ${key} ${subKey} to ${next[section][key][subKey]}`; } } } else if (prev[section]?.[key] !== next[section][key]) { return `Set ${key} to ${next[section][key]}`; } } } return "Config updated"; };
        
const stateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CONFIG': {
            if (JSON.stringify(action.payload.config) === JSON.stringify(state.present)) return state;
            const newPast = [...state.past, { config: state.present, description: state.actionDescription }];
            return { past: newPast, present: action.payload.config, future: [], actionDescription: action.payload.description };
        }
        case 'UNDO': {
            if (state.past.length <= 1) return state;
            const previous = state.past[state.past.length - 1];
            const newPast = state.past.slice(0, state.past.length - 1);
            return { past: newPast, present: previous.config, future: [{config: state.present, description: state.actionDescription}, ...state.future], actionDescription: previous.description };
        }
        case 'REDO': {
            if (state.future.length === 0) return state;
            const next = state.future[0];
            const newFuture = state.future.slice(1);
            return { past: [...state.past, {config: state.present, description: state.actionDescription}], present: next.config, future: newFuture, actionDescription: next.description };
        }
         case 'BACK': {
            const { index } = action.payload;
            const newPresent = state.past[index];
            const newPast = state.past.slice(0, index);
            const newFuture = [ ...state.past.slice(index + 1), { config: state.present, description: state.actionDescription }, ...state.future ];
            return { past: newPast, present: newPresent.config, future: newFuture, actionDescription: newPresent.description };
         }
        default: return state;
    }
};


const EditorSec = ({
  onExport,
  onImport,
  onReset,
  onExportCode,
  canUndo,
  canRedo,
  onUndo,
  onRedo
}) => (
  <div className="p-4 border-b border-gray-200 bg-gray-50 shrink-0">
    <h2 className="text-lg font-semibold text-gray-800">UI Customizer</h2>
    <p className="text-sm text-gray-500">Modify the design in real-time</p>

    <div className="flex items-center space-x-2 mt-4">

      {/* Undo Button */}
      <div className="tooltip">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 
                     disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <SVGIcons.RotateCcw className="w-4 h-4" />
        </button>
        <span className="tooltiptext">Undo</span>
      </div>

      {/* Redo Button */}
      <div className="tooltip">
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 
                     disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <SVGIcons.RotateCw className="w-4 h-4" />
        </button>
        <span className="tooltiptext">Redo</span>
      </div>

      <div className="flex-1"></div> {/* Spacer */}

      {/* Import JSON
      <div className="tooltip">
      
        <button
          onClick={onImport}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <SVGIcons.Upload className="w-4 h-4" />
        </button>
        <span className="tooltiptext">Import JSON</span>
      </div>

      {/* Export JSON */}
      {/* <div className="tooltip">
        <button
          onClick={onExport}
          className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          <SVGIcons.Download className="w-4 h-4" />
        </button>
        <span className="tooltiptext">Export JSON</span>
      </div>

   

      {/* Reset All */}
      <div className="tooltip">
        <button
          onClick={onReset}
          className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          <SVGIcons.Undo2 className="w-4 h-4" />
        </button>
        <span className="tooltiptext">Reset All</span>
      </div>  
    </div>
  </div>
);
// ✅ Accordion — collapsible section for customization panels
const Accordion = ({ title, icon: Icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 
                   focus:outline-none hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center bg-white border rounded-lg mr-3">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
          <span className="font-semibold text-gray-700">{title}</span>
        </div>

        <SVGIcons.ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && <div className="p-4 bg-gray-50">{children}</div>}
    </div>
  );
};
// ✅ Wrapper for Label + Input/Children
const WrapperSelect = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
    {children}
  </div>
);
// ✅ Color Picker with Copy Function
const ChooseColor = ({ label, value, onChange, addToast }) => {
  const handleCopy = () => {
    document.execCommand('copy', false, value);
    addToast(`Copied ${value} to clipboard!`, 'success');
  };

  return (
    <WrapperSelect label={label}>
      <div className="flex items-center space-x-2">
        <input type="color" value={value} onChange={onChange} className="h-10 p-0" />

        <div className="flex-1 flex items-center justify-between p-2 border border-gray-300 
                        rounded-md bg-white">
          <span className="text-sm text-gray-700">{value}</span>
          <button onClick={handleCopy} className="p-1 text-gray-500 hover:text-gray-800">
            <SVGIcons.Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </WrapperSelect>
  );
};
// ✅ Product Selector (Cabinet / Chair)
const ProductSelect = ({ selectedProduct, onProductChange }) => (
  <div className="p-4 border-b border-gray-200">
    <WrapperSelect label="Select Product to Customize">
      <div className="flex space-x-2">
        {/* Cabinet Button */}
        <button
          onClick={() => onProductChange('cabinet')}
          className={`flex-1 flex items-center justify-center p-2 rounded-md border-2 ${
            selectedProduct === 'cabinet'
              ? 'border-blue-500 bg-blue-50'
              : 'border-transparent hover:bg-gray-100'
          }`}
        >
          <SVGIcons.Box className="w-5 h-5 mr-2" /> Cabinet
        </button>

        {/* Chair Button */}
        <button
          onClick={() => onProductChange('chair')}
          className={`flex-1 flex items-center justify-center p-2 rounded-md border-2 ${
            selectedProduct === 'chair'
              ? 'border-blue-500 bg-blue-50'
              : 'border-transparent hover:bg-gray-100'
          }`}
        >
          <SVGIcons.Armchair className="w-5 h-5 mr-2" /> Chair
        </button>
      </div>
    </WrapperSelect>
  </div>
);
// ✅ Typography Settings Section
const TypographySelect = ({ config, onConfigChange, addToast }) => (
  <Accordion title="Typography" icon={SVGIcons.Type}>
    <WrapperSelect label="Font Family">
      <select
        value={config.fontFamily}
        onChange={(e) => onConfigChange('typography', 'fontFamily', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      >
        {FONT_FAMILIES.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </WrapperSelect>

    <WrapperSelect label={`Font Weight: ${config.fontWeight}`}>
      <select
        value={config.fontWeight}
        onChange={(e) =>
          onConfigChange('typography', 'fontWeight', parseInt(e.target.value))
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      >
        {FONT_WEIGHTS.map((weight) => (
          <option key={weight} value={weight}>
            {weight}
          </option>
        ))}
      </select>
    </WrapperSelect>

    <WrapperSelect label={`Font Size: ${config.fontSize}px`}>
      <input
        type="range"
        min="10"
        max="60"
        value={config.fontSize}
        onChange={(e) =>
          onConfigChange('typography', 'fontSize', parseInt(e.target.value))
        }
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </WrapperSelect>

    <ChooseColor
      label="Text Color"
      value={config.textColor}
      onChange={(e) => onConfigChange('typography', 'textColor', e.target.value)}
      addToast={addToast}
    />
  </Accordion>
);
// ✅ Button Styling Section
const Buttons = ({ config, onConfigChange, addToast }) => (
  <Accordion title="Button" icon={SVGIcons.PictureInPicture}>
    <div className="grid grid-cols-2 gap-4">
      <ChooseColor
        label="Text Color"
        value={config.textColor}
        onChange={(e) => onConfigChange('button', 'textColor', e.target.value)}
        addToast={addToast}
      />
      <ChooseColor
        label="BG Color"
        value={config.bgColor}
        onChange={(e) => onConfigChange('button', 'bgColor', e.target.value)}
        addToast={addToast}
      />
    </div>

    <WrapperSelect label={`Border Radius: ${config.borderRadius}px`}>
      <input
        type="range"
        min="0"
        max="32"
        value={config.borderRadius}
        onChange={(e) =>
          onConfigChange('button', 'borderRadius', parseInt(e.target.value))
        }
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </WrapperSelect>

    <WrapperSelect label="Shadow">
      <select
        value={config.shadow}
        onChange={(e) => onConfigChange('button', 'shadow', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      >
        {Object.keys(SHADOW_OPTIONS).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </WrapperSelect>

    {/* Button Alignment */}
    <WrapperSelect label="Alignment">
      <div className="flex justify-around p-1 bg-gray-200 rounded-md">
        {['left', 'center', 'right'].map((align) => (
          <button
            key={align}
            onClick={() => onConfigChange('button', 'alignment', align)}
            className={`p-2 rounded transition-all ${
              config.alignment === align ? 'bg-white shadow' : 'hover:bg-gray-300'
            }`}
          >
            {align === 'left' && <SVGIcons.AlignLeft className="w-5 h-5" />}
            {align === 'center' && <SVGIcons.AlignCenter className="w-5 h-5" />}
            {align === 'right' && <SVGIcons.AlignRight className="w-5 h-5" />}
          </button>
        ))}
      </div>
    </WrapperSelect>
  </Accordion>
);
// ✅ Image Gallery Controls
const ImageGallery = ({ config, onConfigChange }) => (
  <Accordion title="Gallery / Images" icon={SVGIcons.GalleryHorizontal}>
    <WrapperSelect label={`Image Spacing: ${config.spacing * 4}px`}>
      <input
        type="range"
        min="0"
        max="8"
        value={config.spacing}
        onChange={(e) => onConfigChange('gallery', 'spacing', parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </WrapperSelect>

    <WrapperSelect label={`Image Border Radius: ${config.imageBorderRadius}px`}>
      <input
        type="range"
        min="0"
        max="32"
        value={config.imageBorderRadius}
        onChange={(e) =>
          onConfigChange('gallery', 'imageBorderRadius', parseInt(e.target.value))
        }
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </WrapperSelect>

    {/* Alignment */}
    <WrapperSelect label="Alignment">
      <div className="flex justify-around p-1 bg-gray-200 rounded-md">
        {['left', 'center', 'right'].map((align) => (
          <button
            key={align}
            onClick={() => onConfigChange('gallery', 'alignment', align)}
            className={`p-2 rounded transition-all ${
              config.alignment === align ? 'bg-white shadow' : 'hover:bg-gray-300'
            }`}
          >
            {align === 'left' && <SVGIcons.AlignLeft className="w-5 h-5" />}
            {align === 'center' && <SVGIcons.AlignCenter className="w-5 h-5" />}
            {align === 'right' && <SVGIcons.AlignRight className="w-5 h-5" />}
          </button>
        ))}
      </div>
    </WrapperSelect>
  </Accordion>
);

const GeneralLayoutSection = ({ config, onConfigChange, addToast }) => (
    <Accordion title="General Layout" icon={SVGIcons.Settings}>
        <WrapperSelect label="Background Type">
            <div className="flex gap-2">
                {['solid', 'gradient'].map(type => (
                    <button key={type} onClick={() => onConfigChange('layout', 'background', { ...config.background, type })} className={`flex-1 p-2 text-sm rounded-md ${config.background.type === type ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</button>
                ))}
            </div>
        </WrapperSelect>
        {config.background.type === 'solid' ? (
            <ChooseColor label="Background Color" value={config.background.color1} onChange={(e) => onConfigChange('layout', 'background', { ...config.background, color1: e.target.value })} addToast={addToast} />
        ) : (
            <>
                <div className="grid grid-cols-2 gap-4">
                    <ChooseColor label="Color 1" value={config.background.color1} onChange={(e) => onConfigChange('layout', 'background', { ...config.background, color1: e.target.value })} addToast={addToast} />
                    <ChooseColor label="Color 2" value={config.background.color2} onChange={(e) => onConfigChange('layout', 'background', { ...config.background, color2: e.target.value })} addToast={addToast} />
                </div>
                <WrapperSelect label={`Angle: ${config.background.angle}°`}>
                    <input type="range" min="0" max="360" value={config.background.angle} onChange={(e) => onConfigChange('layout', 'background', { ...config.background, angle: parseInt(e.target.value) })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </WrapperSelect>
            </>
        )}
        <WrapperSelect label={`Container Padding: ${config.containerPadding*4}px`}><input type="range" min="0" max="12" value={config.containerPadding} onChange={(e) => onConfigChange('layout', 'containerPadding', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></WrapperSelect>
        <WrapperSelect label={`Card Corner Radius: ${config.cardCornerRadius}px`}><input type="range" min="0" max="48" value={config.cardCornerRadius} onChange={(e) => onConfigChange('layout', 'cardCornerRadius', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></WrapperSelect>
        <WrapperSelect label="Layout Style"><select value={config.layoutStyle} onChange={(e) => onConfigChange('layout', 'layoutStyle', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">{LAYOUT_STYLES.map(style => <option key={style} value={style}>Layout {style}</option>)}</select></WrapperSelect>
    </Accordion>
);

const StrokeBorderSection = ({ config, onConfigChange, addToast }) => ( <Accordion title="Stroke/Border" icon={SVGIcons.Eraser}><ChooseColor label="Stroke Color" value={config.color} onChange={(e) => onConfigChange('stroke', 'color', e.target.value)} addToast={addToast} /><WrapperSelect label={`Stroke Weight: ${config.weight}px`}><input type="range" min="0" max="8" value={config.weight} onChange={(e) => onConfigChange('stroke', 'weight', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></WrapperSelect></Accordion> );

const PredefSection = ({ onPredefelect }) => ( <Accordion title="Theme " icon={SVGIcons.Wand2} defaultOpen={false}><div className="grid grid-cols-2 gap-2">{Predef.map(preset => (<button key={preset.name} onClick={() => onPredefelect(preset.config)} className="p-2 text-sm border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white transition-colors">{preset.name}</button>))}</div></Accordion> );

const HistoryPanel = ({ history, currentAction, onJump }) => (
    <div className="p-2">
        <ul className="text-sm text-gray-600 space-y-1">
            {[...history, { description: currentAction }].reverse().map((item, index) => {
                 const historyIndex = history.length - index;
                 const isCurrent = index === 0;
                 return (
                    <li 
                        key={historyIndex} 
                        className={`p-2 rounded-md transition-colors ${isCurrent ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-200 cursor-pointer'}`}
                        onClick={() => !isCurrent && onJump(historyIndex - 1)}
                    >
                        {item.description || `State ${historyIndex}`}
                    </li>
                 );
            })}
        </ul>
    </div>
);

const EditorDash = ({ state, dispatch, addToast, onExportCode, selectedProduct, onProductChange }) => {
    const importRef = useRef(null);
    const [activeTab, setActiveTab] = useState('controls');
    const config = state.present;
    const handleConfigChange = useCallback((section, key, value) => {
        const newConfig = { ...config, [section]: { ...config[section], [key]: value } };
        const description = Action_desc(config, newConfig);
        dispatch({ type: 'SET_CONFIG', payload: { config: newConfig, description } }); 
    }, [config, dispatch]);
    const handleExport = useCallback(() => { const jsonString = JSON.stringify(config, null, 2); const blob = new Blob([jsonString], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ui-config.json'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(a.href); addToast('Configuration exported!', 'success'); }, [config, addToast]);
    const handleFileChange = useCallback((event) => { const file = event.target.files[0]; if (file) { const reader = new FileReader(); reader.onload = (e) => { try { const importedConfig = JSON.parse(e.target.result); if (importedConfig.typography && importedConfig.button) { dispatch({ type: 'SET_CONFIG', payload: {config: importedConfig, description: "Imported from file"} }); addToast('Configuration imported!', 'success'); } else { addToast('Invalid config file format.', 'error'); } } catch (error) { addToast('Error parsing JSON file.', 'error'); } }; reader.readAsText(file); } event.target.value = null; }, [dispatch, addToast]);
    const handleReset = useCallback(() => { dispatch({ type: 'SET_CONFIG', payload: {config: CONFIG_MAIN, description: "Reset to defaults"} }); addToast('Configuration has been reset.', 'info'); }, [dispatch, addToast]);
    
    return (
        <aside className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col h-full">
            <EditorSec onExport={handleExport} onImport={() => importRef.current.click()} onReset={handleReset} onExportCode={onExportCode} canUndo={state.past.length > 1} canRedo={state.future.length > 0} onUndo={() => dispatch({ type: 'UNDO' })} onRedo={() => dispatch({ type: 'REDO' })} />
            <div className="border-b">
                <div className="flex">
                    <button onClick={() => setActiveTab('controls')} className={`flex-1 p-3 text-sm font-semibold ${activeTab === 'controls' ? 'bg-white border-b-2 border-blue-500 text-blue-600' : 'bg-gray-50 text-gray-500'}`}>Controls</button>
                    <button onClick={() => setActiveTab('history')} className={`flex-1 p-3 text-sm font-semibold ${activeTab === 'history' ? 'bg-white border-b-2 border-blue-500 text-blue-600' : 'bg-gray-50 text-gray-500'}`}>History</button>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto">
                {activeTab === 'controls' ? (
                    <>
                        <ProductSelect selectedProduct={selectedProduct} onProductChange={onProductChange} />
                        <PredefSection onPredefelect={(presetConfig) => dispatch({ type: 'SET_CONFIG', payload: {config: presetConfig, description: `Loaded Theme`} })} />
                        <TypographySelect config={config.typography} onConfigChange={handleConfigChange} addToast={addToast} />
                        <Buttons config={config.button} onConfigChange={handleConfigChange} addToast={addToast} />
                        <ImageGallery config={config.gallery} onConfigChange={handleConfigChange} />
                        <GeneralLayoutSection config={config.layout} onConfigChange={handleConfigChange} addToast={addToast} />
                        <StrokeBorderSection config={config.stroke} onConfigChange={handleConfigChange} addToast={addToast} />
                    </>
                ) : (
                    <HistoryPanel history={state.past} currentAction={state.actionDescription} onJump={(index) => dispatch({type: 'BACK', payload: {index}})} />
                )}
            </div>
            <input type="file" ref={importRef} className="hidden" accept=".json" onChange={handleFileChange} />
        </aside>
    );
};

const ProductCustomizer = ({ data }) => {
    // --- NEW: State to control the visibility of the *entire* customizer body ---
    const [isBodyOpen, setIsBodyOpen] = useState(true);

    // This state controls the individual sections inside (e.g., "1. Handle Design")
    const [openSections, setOpenSections] = useState([data.sections[0].title]);
    
    const [selections, setSelections] = useState(() => {
        const initialState = {};
        data.sections.forEach(section => {
            if (section.options) {
                initialState[section.title] = section.options[0];
            } else if (section.materials) {
                initialState[section.title] = section.materials[0].colors[0].value;
            }
        });
        return initialState;
    });

    const handleSelect = (category, value) => {
        setSelections(prev => ({...prev, [category]: value}));
    };

    // This toggles the internal sections
    const toggleSection = (title) => {
        setOpenSections(prevOpenSections => {
            if (prevOpenSections.includes(title)) {
                return prevOpenSections.filter(item => item !== title);
            } else {
                return [...prevOpenSections, title];
            }
        });
    };

    return (
        <div className="mt-6 border-t pt-6">
            {/* --- MODIFIED: This is now a button to toggle the whole section --- */}
            <button 
                onClick={() => setIsBodyOpen(!isBodyOpen)} 
                className="w-full flex justify-between items-center"
            >
                <h3 className="font-semibold text-lg">{data.title}</h3>
                <SVGIcons.ChevronDown className={`w-5 h-5 transition-transform ${isBodyOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* --- MODIFIED: This entire div is now conditional --- */}
            {isBodyOpen && (
                <div className="space-y-2 pt-4 mt-4 border-t">
                    {data.sections.map(section => {
                        // Check if the *internal* section is open
                        const isOpen = openSections.includes(section.title);
                        
                        return (
                            <div key={section.title} className="border-b last:border-b-0">
                                <button onClick={() => toggleSection(section.title)} className="w-full flex justify-between items-center p-3 hover:bg-gray-50 rounded-md">
                                    <span className="font-semibold text-sm">{section.title}</span>
                                    <SVGIcons.ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isOpen && (
                                    <div className="p-4">
                                        {section.options && (
                                            <div className="flex flex-wrap gap-2">
                                                {section.options.map(opt => (
                                                    <button key={opt} onClick={() => handleSelect(section.title, opt)} className={`px-3 py-1 text-sm rounded-full border ${selections[section.title] === opt ? 'bg-blue-500 text-white border-blue-500' : 'bg-white'}`}>{opt}</button>
                                                ))}
                                            </div>
                                        )}
                                        {section.materials && (
                                            <div className="space-y-4">
                                                {section.materials.map(mat => (
                                                    <div key={mat.name}>
                                                        <h4 className="text-xs font-semibold mb-2 uppercase tracking-wider text-gray-500">{mat.name}</h4>
                                                        <div className="flex flex-wrap gap-3">
                                                            {mat.colors.map(color => ( 
                                                                <div key={color.value} className="tooltip">
                                                                    <button onClick={() => handleSelect(section.title, color.value)} className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${selections[section.title] === color.value ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-gray-200'}`} style={{backgroundColor: color.value}}></button>
                                                                    <span className="tooltiptext">{color.name}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
const ProductDisplayCard = React.memo(({ config, product }) => {
    const { background } = config.layout;
    const backgroundStyle = background.type === 'gradient'
        ? { backgroundImage: `linear-gradient(${background.angle}deg, ${background.color1}, ${background.color2})` }
        : { backgroundColor: background.color1 };

    const cardStyles = { ...backgroundStyle, borderRadius: `${config.layout.cardCornerRadius}px`, borderWidth: `${config.stroke.weight}px`, borderColor: config.stroke.color, fontFamily: `'${config.typography.fontFamily}', sans-serif`, boxShadow: `var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), ${SHADOW_OPTIONS[config.button.shadow] || 'none'}`};
    const buttonStyle = { backgroundColor: config.button.bgColor, color: config.button.textColor, borderRadius: `${config.button.borderRadius}px`, fontSize: `${config.typography.fontSize}px`, fontWeight: config.typography.fontWeight };
    
const GALLERY_ALIGNMENTS = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

// ... inside ProductDisplayCard component ...

     const ProductImageGallery = ({ images, config }) => { 
        const [mainImage, setMainImage] = useState(images[0]);
        const [scale, setScale] = useState(1);
        const [position, setPosition] = useState({ x: 0, y: 0 });
        const [isPanning, setIsPanning] = useState(false);
        const [startPos, setStartPos] = useState({ x: 0, y: 0 });
        const [isFullscreen, setIsFullscreen] = useState(false);
        const imageRef = useRef(null);

        useEffect(() => { 
            setMainImage(images[0]);
            setScale(1);
            setPosition({ x: 0, y: 0 });
        }, [images]); 
        
        const handleZoomIn = (e) => { e.stopPropagation(); setScale(s => Math.min(s + 0.2, 3)); };
        const handleZoomOut = (e) => {
            e.stopPropagation();
            const newScale = Math.max(scale - 0.2, 1);
            if (newScale === 1) setPosition({ x: 0, y: 0 });
            setScale(newScale);
        };
        
        const toggleFullscreen = (e) => { e.stopPropagation(); setIsFullscreen(!isFullscreen); };
        
        const imageStyle = { borderRadius: `${config.gallery.imageBorderRadius}px` }; 
        
        return ( 
            <>
                <div className="w-full flex flex-col gap-4">
                    <div className="order-1 relative overflow-hidden" style={imageStyle}>
                        <img 
                            ref={imageRef} 
                            src={mainImage} 
                            alt="Main Product" 
                            className="w-full h-full object-cover transition-transform duration-300"
                            style={{ 
                                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                            }}
                        />
                        <div className="absolute top-4 right-4 hidden md:flex flex-col space-y-2 z-10">
                            <div className="tooltip"><button onClick={toggleFullscreen} className="p-2 bg-white/80 rounded-md shadow hover:bg-white"><SVGIcons.Maximize className="w-5 h-5 text-gray-700"/></button><span className="tooltiptext">Fullscreen</span></div>
                            <div className="tooltip"><button className="p-2 bg-white/80 rounded-md shadow hover:bg-white cursor-help"><SVGIcons.Ruler className="w-5 h-5 text-gray-700"/></button><span className="tooltiptext">Measure (3D Only)</span></div>
                            <div className="tooltip"><button onClick={handleZoomIn} className="p-2 bg-white/80 rounded-md shadow hover:bg-white"><SVGIcons.ZoomIn className="w-5 h-5 text-gray-700"/></button><span className="tooltiptext">Zoom In</span></div>
                            <div className="tooltip"><button onClick={handleZoomOut} className="p-2 bg-white/80 rounded-md shadow hover:bg-white"><SVGIcons.ZoomOut className="w-5 h-5 text-gray-700"/></button><span className="tooltiptext">Zoom Out</span></div>
                        </div>
                    </div>
                    <div className="order-2">
                        <div className="flex flex-row gap-4 overflow-x-auto pb-2">
                            {images.map((img, i) => ( 
                                <img 
                                    key={i} 
                                    src={img}
                                    alt={`Thumbnail ${i + 1}`} 
                                    onClick={() => setMainImage(img)} 
                                    className="w-20 h-20 object-cover cursor-pointer flex-shrink-0 transition-all duration-300 hover:opacity-75" 
                                    style={imageStyle} 
                                /> 
                            ))}
                        </div>
                    </div>
                </div> 
                {isFullscreen && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={toggleFullscreen}>
                        <img src={mainImage} alt="Main Product Fullscreen" className="max-w-full max-h-full" />
                        <button onClick={toggleFullscreen} className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white"><SVGIcons.X className="w-6 h-6 text-gray-800" /></button>
                    </div>
                )}
            </>
        ); 
    };
    
    const ProductInfo = ({ product, config }) => ( 
        <div style={{ color: config.typography.textColor }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 transition-all duration-300" style={{ fontWeight: config.typography.fontWeight + 200 > 700 ? 700 : config.typography.fontWeight + 200 }}>{product.name}</h1>
            <p className="opacity-80 mb-4" style={{ fontSize: `${config.typography.fontSize}px`, fontWeight: config.typography.fontWeight }}>{product.description}</p>
            <div className="mb-6">
                <span className="text-3xl font-bold" >{product.price}</span>
                <span className="text-lg opacity-50 line-through ml-2">{product.originalPrice}</span>
            </div>
            {product.customizer && <ProductCustomizer data={product.customizer} />}
            <div className={`flex mt-8 ${BUTTON_ALIGNMENTS[config.button.alignment]}`}><button className="px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105" style={buttonStyle}>Add to Cart</button></div>
        </div> 
    );
    
    const LayoutA = ({product, config}) => ( <div className="flex flex-col lg:flex-row gap-8 items-start"><ProductImageGallery images={product.images} config={config} /><ProductInfo product={product} config={config} /></div> );
    const LayoutB = ({product, config}) => ( <div className="flex flex-col lg:flex-row gap-8 items-start"><div className="lg:order-2"><ProductImageGallery images={product.images} config={config} /></div><div className="lg:order-1"><ProductInfo product={product} config={config} /></div></div> );
    
    return ( <div className={`w-full max-w-6xl mx-auto p-4 md:p-8 transition-all duration-300`} style={{padding: `${config.layout.containerPadding * 4}px`}}><div className="p-6 md:p-10 transition-all duration-300" style={cardStyles}>{config.layout.layoutStyle === 'A' ? <LayoutA product={product} config={config} /> : <LayoutB product={product} config={config} />}</div></div> );
});


const Toast = ({ message, type, onDismiss }) => { const { X } = SVGIcons; const bgColor = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-blue-500' }[type]; useEffect(() => { const timer = setTimeout(onDismiss, 3000); return () => clearTimeout(timer); }, [onDismiss]); return ( <div className={`${bgColor} text-white px-6 py-4 rounded-md shadow-lg flex items-center justify-between`}><span>{message}</span><button onClick={onDismiss}><X className="w-5 h-5" /></button></div> ); };
const ToastContainer = ({ toasts, dismissToast }) => ( <div className="fixed bottom-5 right-5 z-50 space-y-2">{toasts.map(toast => (<Toast key={toast.id} {...toast} onDismiss={() => dismissToast(toast.id)} />))}</div> );
const Modal = ({ title, content, onClose }) => { const { X } = SVGIcons; return ( <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-lg shadow-xl w-full max-w-2xl"><div className="p-4 border-b flex justify-between items-center"><h3 className="text-lg font-semibold">{title}</h3><button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X className="w-6 h-6"/></button></div><div className="p-6">{content}</div></div></div> ); };
const PreviewToolbar = ({ viewport, setViewport }) => { const { Laptop, Smartphone } = SVGIcons; return ( <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white p-1 rounded-md shadow-md flex space-x-1 z-20"><button onClick={() => setViewport('desktop')} className={`p-2 rounded ${viewport === 'desktop' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}><Laptop className="w-5 h-5"/></button><button onClick={() => setViewport('mobile')} className={`p-2 rounded ${viewport === 'mobile' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}><Smartphone className="w-5 h-5"/></button></div> ); };
const generateStyledComponentCode = (config) => { return `import React from 'react';\nimport styled from 'styled-components';\n\nconst config = ${JSON.stringify(config, null, 2)};\n\nconst CardContainer = styled.div\`\n  background: \${config.layout.background.type === 'solid' ? config.layout.background.color1 : \`linear-gradient(\${config.layout.background.angle}deg, \${config.layout.background.color1}, \${config.layout.background.color2})\`};\n  /* ... etc ... */\n\`;\n\nexport const MyProductDisplay = () => (\n    <CardContainer><h1>Product</h1></CardContainer>\n);`};

function App() {
    const [state, dispatch] = useReducer(stateReducer, { past: [{config: CONFIG_MAIN, description: 'Initial State'}], present: CONFIG_MAIN, future: [], actionDescription: 'Initial State' });
    const [selectedProduct, setSelectedProduct] = useState('cabinet');
    const [toasts, setToasts] = useState([]);
    const [viewport, setViewport] = useState('desktop');
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(true);
    const addToast = useCallback((message, type) => { const id = Date.now(); setToasts(prev => [...prev, { id, message, type }]); }, []);
    const dismissToast = useCallback((id) => { setToasts(prev => prev.filter(t => t.id !== id)); }, []);
    const viewportClass = viewport === 'desktop' ? 'w-full' : 'w-[390px] max-h-[95vh] shadow-2xl rounded-[40px] border-[10px] border-black';
    const currentProductData = PRODUCTS_INFO[selectedProduct];

    return (
        <div className="relative h-screen overflow-hidden bg-gray-100">
            <OuterStyles />
            <div className="flex flex-col lg:flex-row h-full">
                <div className={`transition-all duration-300 ease-in-out bg-white flex-shrink-0 ${isEditorOpen ? 'w-full md:w-96' : 'w-0'}`} style={{ flexBasis: isEditorOpen ? '24rem' : '0' }}>
                    <div className="h-full overflow-hidden">
                       <EditorDash state={state} dispatch={dispatch} addToast={addToast} onExportCode={() => setIsCodeModalOpen(true)} selectedProduct={selectedProduct} onProductChange={setSelectedProduct} />
                    </div>
                </div>
                <main className="flex-1 flex items-center justify-center overflow-auto p-4 bg-gray-200 relative">
                     <button 
                        onClick={() => setIsEditorOpen(!isEditorOpen)} 
                        className="absolute top-1/2 -translate-y-1/2 bg-white p-2 rounded-r-md shadow-lg transition-all duration-300"
                        style={{ left: isEditorOpen ? '0' : '0' }}
                     >
                       {isEditorOpen ? <SVGIcons.ChevronLeft className="w-5 h-5" /> : <SVGIcons.ChevronRight className="w-5 h-5" />}
                     </button>
                    <PreviewToolbar viewport={viewport} setViewport={setViewport} />
                    <div className={`preview-frame bg-white overflow-auto ${viewportClass}`}><ProductDisplayCard config={state.present} product={currentProductData} /></div>
                </main>
            </div>
            <ToastContainer toasts={toasts} dismissToast={dismissToast} />
            {isCodeModalOpen && (<Modal title="Export Component Code" onClose={() => setIsCodeModalOpen(false)} content={<pre>{generateStyledComponentCode(state.present)}</pre>} />)}
        </div>
    );
};

export default App;

