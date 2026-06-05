import type { NextConfig } from "next";
const nextConfig: NextConfig = {
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
