module.exports = {
  output: "export",
  trailingSlash: true,

  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "as2.ftcdn.net",
        port: "",
      },
    ],
  },
};
