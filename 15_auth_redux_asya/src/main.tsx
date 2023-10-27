import GlobalStyle from "./GlobalStyle.tsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false, //デフォルトだと、3回retryしてしまう。
			refetchOnWindowFocus: false,
			staleTime: 0, //キャッシュの有効期限
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<>
		<GlobalStyle />
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	</>
	// </React.StrictMode>
);
