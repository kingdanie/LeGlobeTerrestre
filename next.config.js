const path = require('path')


const allowedImageWordPressDomain ="https://api.holivoo.com";
module.exports = {
  images: {
    domains: [
      "locahost", 
      "api.holivoo.com", 
      allowedImageWordPressDomain, 
      "via.placeholder.com"
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }

    return config;
  },
};
