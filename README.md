# Portfolio VS Code

A React portfolio styled as a VS Code editor — dark theme, tab-bar navigation, command palette, integrated terminal, minimap, and theme/language switchers.

## Quick start

```bash
bun install
bun dev
```

Build for production:

```bash
bun run build
```

## Editing your content

All portfolio content lives in **`src/data/portfolio.json`**. Edit this file to update your info without touching component code.

### Profile

- `profile.name`, `profile.role`, `profile.location`, `profile.email`
- `profile.bio` — array of paragraph strings for the About section
- `profile.focus` — drives the hero code block across all languages
- `profile.social` — `{ label, url }` pairs for contact links
- `profile.hero.headline` / `profile.hero.subheadline` — hero section copy

### Skills

Each category under `skills` has a `name` and `skills` array. Optional `accentColor` per skill sets the left border color on tags.

### Projects

Add or remove entries in `projects`. Each project needs `id`, `name`, `description`, `tech`, and `date`. Optional `status` and `links`.

### Themes & languages

Twelve themes (six dark, six light) and six syntax languages are defined in `themes` and `languages`.

## Résumé preview

Set your Google Drive file ID in `portfolio.json`:

```json
"resume": {
  "googleDriveFileId": "YOUR_GOOGLE_DRIVE_FILE_ID"
}
```

The preview modal embeds `https://drive.google.com/file/d/{id}/preview`. Make sure the file is shared so anyone with the link can view it.

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS v4
- shadcn/ui primitives (Dialog, DropdownMenu)
- Framer Motion
- Bun
