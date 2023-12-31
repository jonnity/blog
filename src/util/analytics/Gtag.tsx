import Script from "next/script";

const GA_ID = "G-2Z7BZJHYWR";

export const Gtag = () => {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <Script id="define-gtag">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-2Z7BZJHYWR');
      `}</Script>
    </>
  );
};

export const EmitPageView: React.FC<{ url: string }> = ({ url }) => {
  return (
    <Script id="page-view">{`
      gtag('event', 'page_view', {page_location: '${url}'});
    `}</Script>
  );
};
