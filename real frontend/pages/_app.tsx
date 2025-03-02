import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./navbar"; // Adjust the path as necessary

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Component {...pageProps} />
    </>
  );
}
