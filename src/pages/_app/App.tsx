import {
  ConnectKitButton,
  ConnectKitProvider,
  getDefaultConfig,
} from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { MyComponent } from "./MyComponent";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: import.meta.env.PUBLIC_ALCHEMY_ID || "", // or infuraId
    walletConnectProjectId:
      import.meta.env.PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    // Required
    appName: "lfgho",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png",
  }),
);

const App = () => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <ConnectKitButton />
        <MyComponent />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;
