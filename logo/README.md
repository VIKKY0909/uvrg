# UVR brand assets

Source: `Logo CDR.PDF` / CorelDRAW export

| File | Purpose |
|------|---------|
| `logo.png` | Full logo (auto-generated from PDF) |
| `icon.png` | Square crop for favicon / app icon |
| `Logo CDR.PDF` | Master vector source |

**To update:** replace PDF or add new PNGs, then run:

```powershell
cd uvr-one
python scripts/export_logo.py
```

Copies land in `apps/admin/public/brand/` and `apps/mobile/assets/brand/`.
