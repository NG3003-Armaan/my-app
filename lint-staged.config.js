module.exports = {
  "*.{js,jsx,ts,tsx}": ["next lint . --fix", "next lint .", "npm run format"],
  "**/*.ts?(x)": () => "npm run check-types",
  "*.json": ["npm run format"],
}
