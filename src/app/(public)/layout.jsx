import React from "react";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import AOSProvider from "./_components/AOSProvider";
import QueryProvider from "./_components/QueryProvider";

export default function PublicLayout({ children }) {
  return (
    <QueryProvider>
      <AOSProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </AOSProvider>
    </QueryProvider>
  );
}
