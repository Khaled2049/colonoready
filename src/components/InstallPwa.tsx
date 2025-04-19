import React, { useState, useEffect } from "react";

let deferredPrompt: any;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

export const installPWA = async () => {
  if (!deferredPrompt) return false;

  deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;

  deferredPrompt = null;

  return outcome === "accepted";
};

const InstallPWA: React.FC = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    setIsInstallable(!!deferredPrompt);

    const handleBeforeInstallPrompt = () => {
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    await installPWA();
    setIsInstallable(false);
  };

  if (!isInstallable && !isIOS) {
    return null;
  }

  const bannerStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "#f8f9fa",
    padding: "10px",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    textAlign: "center",
    fontSize: "14px",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#0056b3",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "8px",
  };

  const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    right: "10px",
    top: "10px",
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  };

  if (isIOS) {
    return (
      <div style={bannerStyle}>
        <button style={closeButtonStyle} onClick={() => setIsIOS(false)}>
          ✕
        </button>
        <p>To install Endoready on your iPhone:</p>
        <ol style={{ textAlign: "left", paddingLeft: "20px", margin: "8px 0" }}>
          <li>Tap the Share button</li>
          <li>Scroll down and tap "Add to Home Screen"</li>
          <li>Tap "Add" in the top right</li>
        </ol>
      </div>
    );
  }

  if (isInstallable) {
    return (
      <div style={bannerStyle}>
        <button
          style={closeButtonStyle}
          onClick={() => setIsInstallable(false)}
        >
          ✕
        </button>
        <p>Install Endoready for easier access and offline use</p>
        <button style={buttonStyle} onClick={handleInstallClick}>
          Install App
        </button>
      </div>
    );
  }

  return null;
};

export default InstallPWA;
