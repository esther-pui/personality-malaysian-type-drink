import "./globals.css";
import { AnswerProvider } from "./context/AnswerContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AnswerProvider>{children}</AnswerProvider>
      </body>
    </html>
  );
}
