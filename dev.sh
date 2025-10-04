# VITE_TEST_DATA_MODE="happy" yarn dev
# VITE_TEST_DATA_MODE="long sentence with tranlation" yarn dev
# VITE_TEST_DATA_MODE="long sentence" yarn dev
# VITE_TEST_DATA_MODE="short sentence" yarn dev
# VITE_TEST_DATA_MODE="umlaut" yarn dev
# VITE_TEST_DATA_MODE="sidebar open" yarn dev 
# VITE_TEST_DATA_MODE="dark mode" yarn dev
# VITE_TEST_DATA_MODE="short sentences mixed with with/no question" yarn dev
# VITE_TEST_DATA_MODE="short sentences with no question" yarn dev
# VITE_TEST_DATA_MODE="short sentences with one question" yarn dev


# node node_modules/prettier/bin/prettier.cjs --write src/styles/select-article.css
# =============================
yarn lint:files /home/w/repos/select-correct-word/src/main.tsx
# yarn lint:files /home/w/repos/select-correct-word/src/styles/select-correct-word.css
# node_modules/eslint/bin/eslint.js --fix /home/we/repos/select-correct-word/src/styles/select-correct-word.css
# node scripts/tasks/lint/lint-files.js /home/we/repos/select-correct-word/src/modules/get-selection-choices.ts
# =============================

# report
# npx fta-cli src > scripts/tasks/outputs/fta-report.txt



# ========================
# LESS NEEDED
# ========================

# yarn test:file src/modules/utils.spec.ts
# yarn lint:file src/select-article/SelectArticle.tsx
# ========================
# yarn lint:file src/News/Article.tsx
# ========================
# biome testing
# npx biome check --write --unsafe --javascript-formatter-line-width=85 --jsx-quote-style=single --organize-imports-enabled=true --line-width=85 src/select-article/SelectArticle.tsx
# ========================
# oxlint testing
# node_modules/@oxlint/linux-x64-gnu/oxlint src/select-article/SelectArticle.tsx
# node_modules/@oxlint/linux-x64-musl/oxlint --fix-dangerously --fix-suggestions --fix src
# node_modules/@oxlint/linux-x64-musl/oxlint --fix-dangerously --fix-suggestions --fix src/select-article/SelectArticle.tsx
# translate all
# node scripts/translate/translate.js
    # "preview": "vite preview",
    # "dev": "vite --host",
# 