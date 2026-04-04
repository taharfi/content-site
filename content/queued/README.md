Place prewritten or auto-generated `.mdx` articles in this folder to have them published automatically.

How it works:

1. Add fully written article files here with the same frontmatter format used in `content/articles/`.
2. The generator can refill this folder automatically from the topic bank.
3. The publish script moves up to 10 queued files per day into `content/articles/`.
4. Each published file gets its `date` frontmatter updated to the publish day.

Notes:

- Files are published alphabetically, so prefix names if you want a specific order.
- Do not queue a filename that already exists in `content/articles/`.
- The automation can also generate drafts automatically from the topic bank.
