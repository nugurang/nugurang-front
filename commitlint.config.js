module.exports = {
  parserPreset: "conventional-changelog-conventionalcommits",
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [2, "always", ["sentence-case"]],
  },
};
