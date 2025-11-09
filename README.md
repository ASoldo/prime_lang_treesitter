# Prime Language Tree-sitter Grammar

This repository contains the **Tree-sitter grammar** and bindings for the Prime language. It includes definitions for syntax highlighting, parsing, and symbol extraction used in editors like Neovim, via the `nvim-treesitter` plugin.

---

## Repository Structure

```
prime_lang_treesitter/
├── src/
│   ├── grammar.json          # Generated grammar JSON
│   ├── node-types.json       # Node type definitions
│   └── parser.c              # Generated C parser
├── grammar.js                # Source grammar definition
├── queries/
│   └── prime/
│       ├── highlights.scm    # Syntax highlighting queries
│       └── aerial.scm        # Symbol outline queries (Aerial.nvim)
├── Cargo.toml                # Rust binding (optional)
├── Makefile                  # Makefile for building parser
├── package.json              # Node bindings for Tree-sitter CLI
├── tree-sitter.json          # Metadata for Tree-sitter registry
└── README.md                 # This file
```

---

## Prerequisites

Make sure you have the following installed:

* [Tree-sitter CLI](https://tree-sitter.github.io/tree-sitter/):

  ```bash
  npm install -g tree-sitter-cli
  ```
* GCC / Clang / MSVC (for compiling the parser)
* Node.js (for running Tree-sitter)

---

## Regenerating the Grammar

Whenever you update `grammar.js`, you must **regenerate** the parser and node type files.

### 1. Generate parser files

```bash
tree-sitter generate
```

This regenerates:

* `src/parser.c`
* `src/node-types.json`

If you see errors, check `grammar.js` for syntax mistakes or missing rule definitions.

### 2. Compile and test

To quickly validate the grammar:

```bash
tree-sitter test
```

or manually build:

```bash
make
```

### 3. View parse output (optional)

You can inspect the AST for a `.prime` file:

```bash
tree-sitter parse examples/main.prime
```

---

## Using in Neovim

1. Add this repo to your Neovim config:

   ```lua
   local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
   parser_config.prime = {
     install_info = {
       url = "https://github.com/asoldo/prime_lang_treesitter.git",
       files = { "src/parser.c" },
       branch = "main",
     },
     filetype = "prime",
   }
   ```

2. Add filetype detection:

   ```lua
   vim.filetype.add({ extension = { prime = "prime" } })
   ```

3. Optional queries (already in repo):

   ```text
   queries/prime/highlights.scm
   queries/prime/aerial.scm
   ```

---

## Building for Multiple Languages

To build and test bindings for all supported environments:

```bash
make all
```

or selectively:

```bash
make node   # Build Node.js bindings
make rust   # Build Rust bindings
make c      # Build C library
```

---

## Updating After Grammar Changes

After modifying `grammar.js`, always do:

```bash
rm -f src/parser.c src/node-types.json

tree-sitter generate
make test
```

Commit the updated generated files:

```bash
git add src/parser.c src/node-types.json

git commit -m "chore(grammar): regenerate parser after updates"
```

---

## Debugging Tips

* Run `tree-sitter parse yourfile.prime -d` for debug output.
* Use Neovim's `:TSPlaygroundToggle` to inspect live syntax nodes.
* If queries fail to load, check `:checkhealth nvim-treesitter`.

---

## Notes

* Keep grammar.js as the source of truth; **never edit parser.c manually**.
* Regenerate parser after *any* grammar rule change.
* Queries (`.scm` files) can be safely versioned here for syntax and symbol support.

---

**Author:** Andrej Soldo
**License:** MIT
