import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper handling of client-side routing
  trailingSlash: false,
  // Add proper error handling
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

export default nextConfig;
