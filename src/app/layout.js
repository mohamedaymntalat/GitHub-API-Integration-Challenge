// src/app/layout.js
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>GitHub Profile Explorer</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
