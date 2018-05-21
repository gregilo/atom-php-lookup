# Atom PHP Lookup

This module aims to provide easy access to the documentation for the core methods in PHP in Atom.

## Usage

### General Usage
`Ctrl` + `⌥` + `p` opens the main panel where you can enter a search term (e.g. `in_array`).

If you'd like to see more information about the highlighted method, hit `Enter` to open its corresponding page on [php.net](https://php.net).

### Filtered Search
Once the main panel is open, you can specify which field to search by:

* `name:<search query>` *(default)*
* `synopsis:<search query>`
* `usage:<search query>`

### Contributing
In case you are wondering, I had to scrape the PHP docs and store their pertinent data in JSON (I wrote a script for this). There is no way the data used by this package is completely clean and correct.

If you see any issues at all, please feel free to create an issue or fork and open a pull request.

## Acknowledgements
The UI for this package is loosely based on the [project-manager](https://atom.io/packages/project-manager) package.
