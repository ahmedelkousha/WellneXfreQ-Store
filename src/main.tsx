import { createRoot } from "react-dom/client";
import "./i18n";
import App from "./App";
import "./index.css";
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
    gtmId: import.meta.env.VITE_GTM_ID
};

TagManager.initialize(tagManagerArgs);

createRoot(document.getElementById("root")!).render(<App />);
