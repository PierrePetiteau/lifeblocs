const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@states": path.resolve(__dirname, "src/states/"),
      "@screens": path.resolve(__dirname, "src/screens/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@atoms": path.resolve(__dirname, "src/components/atoms/"),
      "@molecules": path.resolve(__dirname, "src/components/molecules/"),
      "@organisms": path.resolve(__dirname, "src/components/organisms/"),
      "@helpers": path.resolve(__dirname, "src/components/helpers/"),
    },
  },
};
