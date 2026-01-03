import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname: "scontent.cdninstagram.com",
        pathname: "/**"
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
