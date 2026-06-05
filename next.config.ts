import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  basePath: '/finance-calculator-hub',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/finance-calculator-hub',
        basePath: false,
        permanent: false,
      },
    ]
  },
  /* config options here */
};
  async redirects() {
    return [
      {
        source: "/",
        destination: "/finance-calculator-hub",
        basePath: false,
        permanent: false,
      },
    ];
    12;
  },
};

export default nextConfig;
