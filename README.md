
# Dynamic UI Customizer 
Real-Time UI Customizer for Product Displays.

Ever wanted to design a beautiful product card and tweak every little detail—from the roundness of the buttons to the angle of a background gradient—all in real-time? That's precisely what this project is all about. It's a highly interactive playground, built with React, that allows you to create and perfect a product display component on the fly.

It comes with a powerful editor, a live preview, a full undo/redo history, and even lets you test your designs in a mobile view.


## Features

-Live Preview: See style changes reflected on the product card instantly.

-Component-Based Editor: All editor controls (sliders, color pickers) are reusable React components.

-Undo/Redo: Step backward and forward through your design changes.

-State History Panel: View a list of all changes and jump to any previous state.

-Product Switching: Toggle between different product data (Cabinet vs. Chair) to see the design's versatility.

-Responsive Viewport Toggle: Instantly switch the preview between desktop and mobile-sized frames.


## Component API & Configurable Props

The entire visual style of the ProductDisplayCard is controlled by the config object (the state.present from the reducer). This object is the central API for the component.

The default configuration (CONFIG_MAIN) is structured as follows

```http
 {
  // Typography for all text
  "typography": {
    "fontFamily": "Inter",
    "fontWeight": 400,
    "fontSize": 16,
    "textColor": "#1F2937"
  },
  
  // "Add to Cart" button styles
  "button": {
    "borderRadius": 8,
    "shadow": "md",
    "alignment": "center", // 'left', 'center', 'right'
    "bgColor": "#111827",
    "textColor": "#FFFFFF"
  },
  
  // Thumbnail gallery styles
  "gallery": {
    "alignment": "center", // 'left', 'center', 'right'
    "spacing": 4,          // Multiplied by a factor (e.g., 4*4 = 16px)
    "imageBorderRadius": 12
  },
  
  // Overall card and background styles
  "layout": {
    "cardCornerRadius": 24,
    "containerPadding": 0,  // Padding around the card
    "layoutStyle": "A",     // 'A' (Image Left) or 'B' (Image Right)
    "background": {
      "type": "solid",      // 'solid' or 'gradient'
      "color1": "#FFFFFF",
      "color2": "#E5E7EB",  // Used only for gradient
      "angle": 145           // Used only for gradient
    }
  },
  
  // Main card border
  "stroke": {
    "color": "#E5E7EB",
    "weight": 0
  },

```
## How the editor works


The core of the application's state is managed by a single useReducer hook, which is ideal for complex state logic and handling actions like undo/redo.

State Management: useReducer
The stateReducer manages a state object with a specific structure designed to track history:

**JavaScript:-**
```http
{
  past: [],             // An array of previous state objects
  present: { ...config }, // The current, active configuration object
  future: [],           // An array of "undone" state objects
  actionDescription: "..." // A human-readable string for the history panel
}
```
This structure is manipulated by the following actions:

**SET_CONFIG:** 

This is the most common action, dispatched whenever a user changes a slider, color, or option.

-It pushes the current present state into the past array.

-It sets the new, updated config as the new present state.

-It clears the future array (since a new change invalidates the old "redo" path).

-It uses the Action_desc helper function to generate a description (e.g., "Set text color to #FF0000").


**UNDO:**

-It "pops" the most recent state from the past array.

-It sets this popped state as the new present.

-It pushes the old present (which is now being undone) to the beginning of the future array.

**REDO:**

-It "pops" the first state from the future array.

-It sets this popped state as the new present.

-It pushes the old present state back onto the end of the past array.

**BACK (History Panel Jump):**

-This is a more advanced undo. When a user clicks an item in the history list, this action is dispatched with an index.

-It splits the past array at that index.

-The item at index becomes the new present.

-All items before index become the new past.

-All items after index (plus the old present state) become the new future.


## Design Decisions & UX Improvements



**1. The Collapsible ProductCustomizer:**

The primary UX challenge for a product page with customization is information overload. The user is presented with product info, images, and a complex set of options, which can be overwhelming, especially on mobile.

1.Decision: The entire "Customize your Cabinet/Chair" block was made collapsible.

2.Implementation: The ProductCustomizer component (which renders the list of options) was wrapped in a new isBodyOpen state. The component's title (e.g., "Customize your Cabinet") was converted into a button that toggles this state.

3.Why: This provides a much cleaner initial view. The user can first read the product name, description, and price. They can then opt-in to seeing the customization options by clicking the title. This "progressive disclosure" is a key UX pattern for managing complexity.

**2.Independently Collapsible Sections:**

The initial implementation of the customizer was a single, long list of options ("1. Handle Design", "2. Wood Finish", "3. Leg Style"). This created "scroll hell" within an already-long page.

1.Decision: Make each internal section independently collapsible, rather than a single-open accordion.

2.Implementation: The openSection state was changed from a single string (useState("...")) to an array of strings (useState([...])).

3.Before: const [openSection, setOpenSection] = useState(data.sections[0].title); (Clicking "Wood Finish" would close "Handle Design").

4.After: const [openSections, setOpenSections] = useState([data.sections[0].title]); (Clicking a section title now checks if its title is in the array. If it is, it's removed (closed). If it's not, it's added (opened).

5.Why: This allows the user to have multiple sections open (e.g., to compare "Wood Finish" and "Legs Finish") or to close all sections for a compact view. It gives the user full control over the editor's layout.

**3. Other Key UX Enhancements:**

1. Tooltips: Added to all icon-only buttons (Undo, Redo, Zoom, Fullscreen) and color swatches. This is critical for accessibility and clarity, as icons are not universally understood.

2. Image Gallery Tools: A simple list of thumbnails isn't enough for a high-value item. We added Zoom and Fullscreen controls to the main image, which are standard, expected features in modern e-commerce.

3. Full History Panel: Most apps only offer Undo/Redo buttons. By displaying a list of past actions (made readable by Action_desc), we give the user a clear "paper trail." The ability to click any past action to "time travel" (BACK action) is a powerful feature that gives users confidence to experiment, knowing they can always return to a specific good-looking state.

4. Toast Notifications: Non-blocking feedback is essential. When a color hex code is copied, a small "Toast" appears and fades away. This confirms the action was successful without interrupting the user's flow with a disruptive alert().

**4. Non-Destructive:** "Reset All":Decision: Implement "Reset All" as a new, recorded action rather than a hard reset that clears the history.
1.Implementation: The "Reset All" button (<SVGIcons.Undo2 />) dispatches a SET_CONFIG action, just like any other style change. Its payload is simply the original CONFIG_MAIN object and the description "Reset to defaults".

2.Why: This is a crucial, non-destructive UX choice. A user might reset the design and then immediately change their mind. Because the reset is just another entry in the past array, the user can simply click "Undo" to get their complex, custom design back. A destructive reset that clears the history would cause the user to lose all their work.
