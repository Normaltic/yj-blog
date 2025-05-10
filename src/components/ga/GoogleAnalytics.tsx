import Script from "next/script";

function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google_analytics"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gaId}');
          `
        }}
      />
    </>
  );
}

export default GoogleAnalytics;
