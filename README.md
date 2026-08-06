# Nature's Creation Contracting — Website

Static marketing site for **Nature's Creation Contracting**, a custom home builder in
Coeur d'Alene, Idaho. Plain HTML/CSS/JS, no build step. Hosted on GitHub Pages.

Pages: home, about, gallery, contact, and four service pages under `services/`.

## GitHub Pages

`.nojekyll` at the repo root turns Jekyll **off**. Keep it there.

GitHub Pages runs Jekyll by default, and Jekyll silently deletes every file and directory
whose name starts with `_` from the published site. There is no error — the deploy goes
green and the files just 404. This already cost densanon.com two Table of War assets that
were broken in production for weeks before anyone noticed. This site is plain static HTML
and uses no Jekyll features, so turning it off costs nothing and also drops a build step
from every deploy.

Deleting `.nojekyll` re-arms that trap. It matters most when dropping in exported or
bundled assets — exporters happily emit `_`-prefixed filenames.
