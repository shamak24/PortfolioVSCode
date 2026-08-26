# Portfolio VS Code

A React portfolio styled as a VS Code editor themes, tab-bar navigation, command palette, integrated terminal, minimap, and language switchers.

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
- `profile.bio` - array of paragraph strings for the About section
- `profile.focus` - drives the hero code block across all languages
- `profile.social` - `{ label, url }` pairs for contact links
- `profile.hero.headline` / `profile.hero.subheadline` - hero section copy

### Skills

Each category under `skills` has a `name` and `skills` array. Optional `accentColor` per skill sets the left border color on tags.

### Projects

Each entry in `projects` supports:

- `description` — short summary shown on the card
- `longDescription` — array of paragraphs shown in the detail dialog
- `tech`, `date`, optional `status`
- `image` — optional URL for the dialog header background
- `liveDemo` / `github` — optional URLs; link buttons appear top-right on the card only when set

Click a project card to open the detail dialog. Live demo and GitHub buttons on the card open in a new tab without opening the dialog.

### Themes & languages

Twelve themes (six dark, six light) and six syntax languages are defined in `themes` and `languages`.

## Resume preview

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
