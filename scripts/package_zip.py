r"""Zip dist/ into static-deploy.zip with forward-slash entry names.

PowerShell 5.1 Compress-Archive writes backslashes (faber-admin\index.html),
which Amplify (Linux) treats as literal file names, so every path returns 404.
Usage: python -I scripts/package_zip.py [src_dir] [out_zip]
"""
import os
import sys
import zipfile

src = sys.argv[1] if len(sys.argv) > 1 else "dist"
out = sys.argv[2] if len(sys.argv) > 2 else "static-deploy.zip"

count = 0
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zf:
    for root, _dirs, files in os.walk(src):
        for name in files:
            full = os.path.join(root, name)
            arc = os.path.relpath(full, src).replace(os.sep, "/")
            zf.write(full, arc)
            count += 1
print(f"{out}: {count} files")
