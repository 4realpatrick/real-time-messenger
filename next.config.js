/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
  },
  images: {
    domains: ["res.cloudinaary.com", "avatar.githubusercontent.com"],
  },
};

module.exports = nextConfig;
