import { Helmet } from "react-helmet";

interface ISEOProps {
  pageTitle?: string;
}

export default function SEO({ pageTitle }: ISEOProps) {
  const siteTitle = "Toy shop";

  return (
    <Helmet>
      <title>{`${siteTitle}${pageTitle ? " | " + pageTitle : ""}`}</title>
    </Helmet>
  );
}
