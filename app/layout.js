import "./globals.css";


export const metadata = {
  title: {
    template:"%s | Shauna Gourley",
    default:"Shauna Gourley Modern Medicine"
  },
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
