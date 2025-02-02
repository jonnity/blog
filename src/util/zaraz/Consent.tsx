"use client";

import { useEffect, useState } from "react";

// zarazのモック実装
const mockZaraz = {
  consent: {
    modal: false,
    setAll: (status: boolean) => console.log("setAll called with:", status),
    setAllCheckboxes: (status: boolean) =>
      console.log("setAllCheckboxes called with:", status),
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
  const [debugInfo, setDebugInfo] = useState({
    consentCookie: "",
    lastEvent: "",
    zarazAvailable: false,
  });
  const [isDebugMode] = useState(process.env.NODE_ENV === "development");

  // zarazのインスタンスを取得(開発環境ではモックを使用)
  const getZaraz = () => {
    if (typeof window === "undefined") return null;
    return window.zaraz || (isDebugMode ? mockZaraz : null);
  };

  const checkCookieConsent = () => {
    const consentCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("zaraz-consent="));

    // デバッグ情報を更新
    if (isDebugMode) {
      setDebugInfo((prev) => ({
        ...prev,
        consentCookie: consentCookie || "not found",
      }));
    }

    return !!consentCookie;
  };

  const handleConsentAPIReady = () => {
    if (isDebugMode) {
      setDebugInfo((prev) => ({
        ...prev,
        lastEvent: "zarazConsentAPIReady",
        zarazAvailable: !!getZaraz(),
      }));
    }

    const hasConsent = checkCookieConsent();
    if (!hasConsent) {
      const zaraz = getZaraz();
      if (zaraz) {
        setIsVisible(true);
        zaraz.consent.setAll(true);
        zaraz.consent.sendQueuedEvents();
      }
    }
  };

  const handleShowDetails = () => {
    const zaraz = getZaraz();
    if (zaraz) {
      zaraz.consent.modal = true;
    }
  };

  const handleAccept = () => {
    setIsVisible(false);
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

  // デバッグ用:イベントをシミュレート
  const simulateEvent = (eventName: string) => {
    const event = new Event(eventName);
    document.dispatchEvent(event);
  };

  // デバッグ用:Cookieを設定
  const setDebugCookie = () => {
    document.cookie = "zaraz-consent=accepted; path=/";
    checkCookieConsent();
  };

  // デバッグ用:Cookieを削除
  const clearDebugCookie = () => {
    document.cookie =
      "zaraz-consent=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    checkCookieConsent();
  };

  useEffect(() => {
    // handleConsentAPIReady(); // If zaraz is not ready, only Cookies are read in this line.
    document.addEventListener("zarazConsentAPIReady", handleConsentAPIReady);
    document.addEventListener(
      "zarazConsentChoicesUpdated",
      handleConsentUpdate,
    );

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
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-700">
              当サイトではCookieを使用してユーザー体験を向上させています。
              Cookieの使用を許可することで、より良いサービスを提供することができます。
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleReject}
                className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
              >
                拒否
              </button>
              <button
                onClick={handleShowDetails}
                className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
              >
                詳細
              </button>
              <button
                onClick={handleAccept}
                className="rounded bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
              >
                同意
              </button>
            </div>
          </div>
        </div>
      )}

      {/* デバッグパネル */}
      {isDebugMode && (
        <div className="fixed right-4 top-4 z-50 max-w-md rounded border bg-white p-4 shadow-lg">
          <h3 className="mb-2 font-bold">Debug Panel</h3>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Cookie:</strong> {debugInfo.consentCookie}
            </div>
            <div>
              <strong>Last Event:</strong> {debugInfo.lastEvent}
            </div>
            <div>
              <strong>Zaraz Available:</strong>{" "}
              {debugInfo.zarazAvailable.toString()}
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => simulateEvent("zarazConsentAPIReady")}
                className="rounded bg-blue-100 px-2 py-1 text-xs"
              >
                Simulate API Ready
              </button>
              <button
                onClick={() => simulateEvent("zarazConsentChoicesUpdated")}
                className="rounded bg-blue-100 px-2 py-1 text-xs"
              >
                Simulate Consent Updated
              </button>
              <button
                onClick={setDebugCookie}
                className="rounded bg-green-100 px-2 py-1 text-xs"
              >
                Set Cookie
              </button>
              <button
                onClick={clearDebugCookie}
                className="rounded bg-red-100 px-2 py-1 text-xs"
              >
                Clear Cookie
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
