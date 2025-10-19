Real-Time UI Customizer for Product Displays

Ever wanted to design a beautiful product card and tweak every little detail—from the roundness of the buttons to the angle of a background gradient—all in real-time? That's precisely what this project is all about. It's a highly interactive playground, built with React, that allows you to create and perfect a product display component on the fly.

It comes with a powerful editor, a live preview, a full undo/redo history, and even lets you test your designs in a mobile view.

What's Under the Hood?

The app is split into the Editor Panel (your creative toolkit on the left) and the Live Preview (your masterpiece on the right).

1. The Magic of the Live Preview

The preview panel looks incredibly crisp and isolated from the editor's styling. That's not an accident! Here's our little secret:

First, we render your ProductDisplayCard component in a hidden div, safely tucked away off-screen where no one can see it.

Next, whenever you make a change, we use the html-to-image library to snap a quick "screenshot" of that hidden component.

Finally, we draw that fresh image onto the visible <canvas> element.

This canvas approach is great because it guarantees a pixel-perfect preview immune to style conflicts. What you see is truly what you get.

2. Your Control Center

The editor panel is where all the fun happens. It's packed with features to make designing a breeze:

Clean & Tidy Sections: We've grouped all the controls into collapsible sections like Typography, Button, and Layout, so you can easily find what you're looking for.

Instant Gratification: Change a color, adjust a slider, or pick a new font. You'll see the result the very instant you make the change.

Swap It Out: Not sure how your design looks with different products? Just toggle between a cabinet and a chair to see how your style holds up.

Quick-Start Themes: If you don't want to start from scratch, apply a built-in preset like "Midnight Blue" or "Sunset Fade" to get going instantly.

3. Your Safety Net: State & History

We know that creativity can be messy. That's why we built a robust history feature powered by React's useReducer hook.

Undo, Redo, Reset: Made a change you don't like? Just hit undo. Changed your mind again? Hit redo. Want to start over? The reset button is your best friend.

Time-Travel Included: Hop over to the "History" tab to see a complete list of every change you've made. You can click on any point in the past to instantly jump back to that version.

Your Playground: The config Object

The heart of this whole tool is a single JavaScript object: config. Every style you can change in the editor corresponds to a property in this object. Think of it as the complete style guide for your component.

Here's a peek at what it looks like:

const config = {
  // 1. Typography: Controls all text styling
  typography: {
    fontFamily: 'Inter',      // String: CSS font-family
    fontWeight: 400,          // Number: 400, 500, 600, 700
    fontSize: 16,             // Number: Font size in pixels for body copy
    textColor: '#1F2937'       // String: Hex color code for all text
  },

  // 2. Button: Styles for the primary call-to-action button
  button: {
    borderRadius: 8,          // Number: Border radius in pixels
    shadow: 'md',             // String: 'none', 'sm', 'md', 'lg'
    alignment: 'center',      // String: 'left', 'center', 'right'
    bgColor: '#111827',       // String: Hex color code for background
    textColor: '#FFFFFF'      // String: Hex color code for text
  },

  // and so on for Gallery, Layout, Stroke, and Effects!
};


Our Philosophy: Why We Built It This Way

We made a few key decisions to make this app a pleasure and easy to build upon.

Just React: We're using modern React with Hooks (useReducer, useCallback, etc.). It keeps the codebase clean and powerful without heavy external libraries like Redux.

Zero Dependencies (Almost!): We wanted this tool to be as lightweight as possible.

Built-in Icons: All the icons are actually tiny, hand-coded SVG components. No need to install a heavy icon library!

Framework-Free Styling: While we use Tailwind for the editor's UI, the ProductDisplayCard uses inline styles so you can drop it into any project, regardless of the CSS framework.

Powerful State Management: We chose useReducer over useState specifically for its ability to handle complex state changes. It makes the undo/redo and history features so clean and reliable.

User Experience Focus:

Helpful Feedback: Little toast messages let you know when actions are successful.

No Guessing Games: All icon buttons have helpful tooltips.

Focus on the Design: The whole editor panel can be collapsed, giving you a beautiful, distraction-free view of your work.

Mobile-Ready: Instantly check how your design looks on a phone with our responsive preview toggle.

Ready to Dive In?

Getting this running on your own machine is simple.

Clone the repository:

git clone <repository-url>


Hop into the directory:

cd <project-directory>


Install the goodies:

npm install


(You'll also need the html-to-image package for our canvas magic!)

npm install html-to-image


Start it up:

npm start


The app will be running live at http://localhost:3000. Happy customizing!