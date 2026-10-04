# Private audit archive

This directory contains internal AdSense audit reports and evidence. It is intentionally outside `public/` and is never copied by the build. Deploy only the contents of `dist/` to Hostinger; do not upload this directory.

The `.htaccess` file denies direct access if this folder is ever copied accidentally to an Apache/LiteSpeed host.
