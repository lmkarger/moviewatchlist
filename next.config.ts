import type { NextConfig } from "next";

const nextConfig: NextConfig = {


  images: { //allows images from file storage
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdazgtflcpsorqrfionh.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
