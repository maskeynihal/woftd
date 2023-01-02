import "./index.css";
import { App } from "./app";
import { render } from "preact";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById("app")
);
