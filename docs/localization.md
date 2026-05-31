# Localization

OpenAlgoLab visualizer text is localized through plain JavaScript locale files.

Current locale files:

```text
visualizer/locales/en.js
visualizer/locales/ru.js
```

Each locale registers itself on the global `window.OPENALGOLAB_LOCALES` object:

```javascript
window.OPENALGOLAB_LOCALES = window.OPENALGOLAB_LOCALES || {};

window.OPENALGOLAB_LOCALES.en = {
  meta: {
    label: "English",
    htmlLang: "en"
  },
  // translated content
};
```

## Adding A New Language

1. Copy `visualizer/locales/en.js`.
2. Rename it to the target language code, for example `es.js`.
3. Replace `window.OPENALGOLAB_LOCALES.en` with the new language key, for example `window.OPENALGOLAB_LOCALES.es`.
4. Translate all text values, but keep the object structure unchanged.
5. Add the new script in `visualizer/index.html` before `app.js`:

```html
<script src="./locales/es.js"></script>
```

6. Add a language button in `visualizer/index.html`:

```html
<button class="language-button" type="button" data-lang="es">ES</button>
```

## Rules

- Keep trace state language-agnostic in `app.js`.
- Translate explanation text, labels, menu items, and step explanations in locale files.
- Do not duplicate renderer logic per language.
- Keep locale object keys identical across languages.
- Prefer clear educational language over literal word-for-word translation.

## Why This Structure

The visualizer can stay simple and dependency-free while still allowing contributors to add new languages by editing one locale file and one script/button entry.
