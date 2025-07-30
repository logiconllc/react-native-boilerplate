// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  ignorePatterns: ["/dist/*"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
    },
  ],
};
