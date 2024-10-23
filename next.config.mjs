/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });

    return config;
  },
  // experimental: {
  //   serverActions: true,
  // },
  reactStrictMode: false,
  output: "export",
};

export default nextConfig;
