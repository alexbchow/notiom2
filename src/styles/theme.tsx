// styles/theme.tsx
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    // Define your dark theme colors
    dark: {
      900: "#121212", // Very dark base color
      800: "#1a1a1a", // Slightly lighter
      700: "#222", // And so on...
    },
    primary: {
      500: "#0070f3", // Primary color for your theme
      // Add more shades as needed
    },

  },
  styles: {
    global: ({
      "html, body": {
        color: "white",
        background: "grey.800", // Use the dark base color
        lineHeight: "tall",
      },
      a: {
        color: "primary.500",
        _hover: {
          textDecoration: "underline",
        },
        textShadow: "glow.blue", // Use the glow effect for links
      },
      
      // You can add more global styles or specific component styles here
    }),
  },
  components: {
    Button: {
      // Example of adding a glow effect to a Button component
      baseStyle:({
        boxShadow: "glow.blue", // Apply a blue glow effect
      }),
    },
    // Define other component styles as needed
  },
  fonts: {
    heading: "'DM Sans', sans-serif",
    body: "'DM Sans', sans-serif",
    
  },

});

export default theme;
