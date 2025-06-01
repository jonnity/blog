"use client";

import { useEffect, useState } from "react";
const purposeIds = ["PVgO"];

// デバッグ用:イベントをシミュレート
type ZarazEvent = "zarazConsentAPIReady" | "zarazConsentChoicesUpdated";
const simulateEvent = (eventName: ZarazEvent) => {
  const event = new Event(eventName);
  document.dispatchEvent(event);
};

// デバッグ用:Cookieを設定
const setDebugCookie = () => {
  document.cookie = `zaraz-consent={${purposeIds.map((id) => `"${id}": true`).join(",")}}; path=/`;
};

// デバッグ用:Cookieを削除
const clearDebugCookie = () => {
  document.cookie =
    "zaraz-consent=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
};
// zarazのモック実装
const mockZaraz = {
  consent: {
    modal: false,
    setAll: (status: boolean) => {
      console.log("setAll called with:", status);
      simulateEvent("zarazConsentChoicesUpdated");
    },
    sendQueuedEvents: () => console.log("sendQueuedEvents called"),
  },
};

// プロダクション環境のzaraz型定義
declare global {
  interface Window {
    zaraz?: typeof mockZaraz;
  }
}

export const Consent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDebugMode, setIsDebugMode] = useState(
    process.env.NODE_ENV === "development",
  );

  // zarazのインスタンスを取得(開発環境ではモックを使用)
  const getZaraz = () => {
    if (typeof window === "undefined") return null;
    return window.zaraz || (isDebugMode ? mockZaraz : null);
  };

  const checkCookieConsent = () => {
    const consentCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("zaraz-consent="));

    if (!consentCookie) return false;

    try {
      const cookieValue = decodeURIComponent(consentCookie.split("=")[1]);
      const consentData = JSON.parse(cookieValue);
      return purposeIds.every((id) => Object.keys(consentData).includes(id));
    } catch (error) {
      console.error("Error parsing consent cookie:", error);
      return false;
    }
  };

  const handleConsentAPIReady = () => {
    const hasConsent = checkCookieConsent();
    if (!hasConsent) {
      const zaraz = getZaraz();
      if (zaraz) {
        setIsVisible(true);
      }
    }
    document.addEventListener(
      "zarazConsentChoicesUpdated",
      handleConsentUpdate,
    );
  };

  const handleShowDetails = () => {
    const zaraz = getZaraz();
    if (zaraz) {
      zaraz.consent.modal = true;
    }
  };

  const handleAccept = () => {
    const zaraz = getZaraz();
    if (zaraz) {
      zaraz.consent.setAll(true);
      zaraz.consent.sendQueuedEvents();
      setIsVisible(false);
    }
  };

  const handleReject = () => {
    const zaraz = getZaraz();
    if (zaraz) {
      zaraz.consent.setAll(false);
      setIsVisible(false);
    }
  };

  const handleConsentUpdate = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    handleConsentAPIReady(); // If zaraz is not ready, only Cookies are read in this line.
    document.addEventListener("zarazConsentAPIReady", handleConsentAPIReady);

    return () => {
      document.removeEventListener(
        "zarazConsentAPIReady",
        handleConsentAPIReady,
      );
      document.removeEventListener(
        "zarazConsentChoicesUpdated",
        handleConsentUpdate,
      );
    };
  }, []);

  // コンポーネントの表示状態が変更されたときにbodyのパディングを調整
  useEffect(() => {
    if (isVisible) {
      // バナーの高さを取得して下部パディングを設定
      const banner = document.querySelector("[data-consent-banner]");
      if (banner) {
        const height = banner.getBoundingClientRect().height;
        document.body.style.paddingBottom = `${height}px`;
      }
    } else {
      document.body.style.paddingBottom = "0";
    }

    return () => {
      document.body.style.paddingBottom = "0";
    };
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <div
          data-consent-banner
          className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-700">
              当サイトはCookieを利用します。
              Cookieの使用を許可することで、より良いサービスを提供することができます。
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleReject}
                className="rounded-sm border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
              >
                拒否
              </button>
              <button
                onClick={handleShowDetails}
                className="rounded-sm border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
              >
                詳細
              </button>
              <button
                onClick={handleAccept}
                className="rounded-sm bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
              >
                同意
              </button>
            </div>
          </div>
        </div>
      )}

      {/* デバッグパネル */}
      {isDebugMode && (
        <div className="fixed top-4 right-4 z-50 max-w-md rounded-sm border bg-white p-4 shadow-lg">
          <h3 className="mb-2 font-bold">Debug Panel</h3>
          <div className="space-y-2 text-sm">
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => simulateEvent("zarazConsentAPIReady")}
                className="rounded-sm bg-blue-100 px-2 py-1 text-xs"
              >
                Simulate API Ready
              </button>
              <button
                onClick={() => simulateEvent("zarazConsentChoicesUpdated")}
                className="rounded-sm bg-blue-100 px-2 py-1 text-xs"
              >
                Simulate Consent Updated
              </button>
              <button
                onClick={setDebugCookie}
                className="rounded-sm bg-green-100 px-2 py-1 text-xs"
              >
                Set Cookie
              </button>
              <button
                onClick={clearDebugCookie}
                className="rounded-sm bg-red-100 px-2 py-1 text-xs"
              >
                Clear Cookie
              </button>
              <button
                onClick={() => {
                  setIsDebugMode(false);
                }}
                className="rounded-sm bg-gray-200 px-2 py-1 text-xs"
              >
                Close Debug Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
