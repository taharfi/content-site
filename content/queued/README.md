Place prewritten `.mdx` articles in this folder to have them published automatically.

How it works:

1. Add fully written article files here with the same frontmatter format used in `content/articles/`.
2. The publish script moves up to 10 queued files per day into `content/articles/`.
3. Each published file gets its `date` frontmatter updated to the publish day.

Notes:

- Files are published alphabetically, so prefix names if you want a specific order.
- Do not queue a filename that already exists in `content/articles/`.
- The automation publishes content. It does not generate article text for you.
