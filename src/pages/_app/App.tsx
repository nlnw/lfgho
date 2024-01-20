import {
  ConnectKitButton,
  ConnectKitProvider,
  getDefaultConfig,
} from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { MyComponent } from "./MyComponent";

const config = createConfig({
  ...getDefaultConfig({
    // Required API Keys
    alchemyId: import.meta.env.PUBLIC_ALCHEMY_ID,
    walletConnectProjectId: import.meta.env.PUBLIC_WALLETCONNECT_PROJECT_ID,

    // Required
    appName: "lfgho",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png",

    //
    chains: [sepolia],
  }),
});

const App = () => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        options={{
          disclaimer: <>By connecting your wallet you agree to have fun!</>,
        }}
        customTheme={{
          "--ck-body-color": "#000000",
          "--ck-border-radius": "3px",
          "--ck-overlay-background": "rgba(0, 156, 146, 0.5286687779240722)",
          "--ck-overlay-backdrop-filter": "blur(8px)",
          "--ck-primary-button-color": "#ffffff",
          "--ck-primary-button-background": "#009c92",
          "--ck-primary-button-box-shadow": "0px 1px 0px 1px #009c92",
          "--ck-primary-button-border-radius": "3px",
          "--ck-primary-button-font-weight": "500",
          "--ck-primary-button-hover-color": "#ffffff",
          "--ck-primary-button-hover-background": "#8076",
          "--ck-primary-button-hover-box-shadow": "0px 0px 0px 1px #8076",
          "--ck-primary-button-active-background": "#009c92",
          "--ck-primary-button-active-box-shadow": "0px 2px 0px 0px #009c92",
          "--ck-secondary-button-color": "#ffffff",
          "--ck-secondary-button-background": "#009c92",
          "--ck-secondary-button-box-shadow": "0px 1px 0px 0px #009c92",
          "--ck-secondary-button-border-radius": "3px",
          "--ck-secondary-button-font-weight": "100",
          "--ck-secondary-button-hover-color": "#ffffff",
          "--ck-secondary-button-hover-background": "#8076",
          "--ck-secondary-button-hover-box-shadow": "0px 3px 0px 1px #8076",
          "--ck-secondary-button-active-background": "#009c92",
          "--ck-secondary-button-active-box-shadow": "0px 1px 0px 0px #009c92",
          "--ck-tertiary-button-color": "#ffffff",
          "--ck-tertiary-button-background": "#009c92",
          "--ck-tertiary-button-box-shadow": "0px 2px 0px 1px #009c92",
          "--ck-tertiary-button-border-radius": "3px",
          "--ck-tertiary-button-font-weight": "600",
          "--ck-tertiary-button-hover-color": "#ffffff",
          "--ck-tertiary-button-hover-background": "#8076",
          "--ck-tertiary-button-hover-box-shadow": "0px 3px 0px 1px #8076",
          "--ck-modal-box-shadow": "0px 3px 0px 0px #80fff7",
          "--ck-body-background": "#80fff7",
          "--ck-body-background-secondary": "#80fff7",
          "--ck-body-background-tertiary": "#80fff7",
          "--ck-body-color-muted": "#000000",
          "--ck-body-color-muted-hover": "#000000",
          "--ck-body-color-danger": "#000000",
          "--ck-body-color-valid": "#000000",
          "--ck-modal-heading-font-weight": "300",
          "--ck-focus-color": "#000000",
          "--ck-body-action-color": "#000000",
          "--ck-body-divider": "#80fff7",
          "--ck-qr-dot-color": "#000000",
          "--ck-qr-background": "#80fff7",
          "--ck-qr-border-color": "#000000",
          "--ck-qr-border-radius": "3px",
          "--ck-tooltip-color": "#000000",
          "--ck-tooltip-background": "#80fff7",
          "--ck-tooltip-background-secondary": "#80fff7",
          "--ck-tooltip-shadow": "0px 1px 0px 1px #80fff7",
          "--ck-spinner-color": "#000000",
          "--ck-recent-badge-color": "#000000",
          "--ck-recent-badge-background": "#80fff7",
          "--ck-recent-badge-border-radius": "3px",
          "--ck-body-disclaimer-color": "#000000",
          "--ck-body-disclaimer-link-color": "#000000",
          "--ck-body-disclaimer-link-hover-color": "#000000",
          "--ck-body-disclaimer-background": "#80fff7",
          "--ck-connectbutton-font-size": "9px",
          "--ck-connectbutton-border-radius": "3px",
          "--ck-connectbutton-color": "#ffffff",
          "--ck-connectbutton-background": "#009c92",
          "--ck-connectbutton-box-shadow": "0px 0px 0px 1px #009c92",
          "--ck-connectbutton-hover-color": "#ffffff",
          "--ck-connectbutton-hover-background": "#8076",
          "--ck-connectbutton-hover-box-shadow": "0px 3px 0px 1px #8076",
          "--ck-connectbutton-active-color": "#ffffff",
          "--ck-connectbutton-active-background": "#009c92",
          "--ck-connectbutton-active-box-shadow": "0px 3px 0px 0px #009c92",
        }}
      >
        <ConnectKitButton />
        <MyComponent />
        {/* <Charts /> */}
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;
