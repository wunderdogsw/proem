# Proem

TypeScript standard library.

The library is divided into npm packages under the @proem umbrella.

`@proem/all` is a meta package that depends on all the other packages,
this way the user gets all the packages with a single import.

## Developing

The project is setup as a [Lerna](https://lernajs.io/) monorepository.

If you wish to develop a new package, open an issue about it so we can discuss what names
we should use, etc.

Each package should be about a single concept, roughly useful in 2/3rds of programs.

The module should be designed so that it is most commonly imported as a wildcard import:

```ts
import array from '@proem/array'

array.map([1, 2], ...)
```

Dependencies should be kept to a minimum.

The code should be single functions and tiny objects or classes to make it easily tree shakeable.

The code should be reasonably well tested.

The code should be as type safe as is possible while keeping the use ergonomic.

Functional combinators (map, filter, ...) should be fully applied by default, and have a partially applied version:

```ts
map([1, 2, 3], n => n * n)

map.partial(n => n * n)([1, 2, 3])
```

In the fully applied version, the target (array, promise, ...) should be the first argument, to make use of type inference.

In the partially applied version the target should be the last argument.

## Creating a new package

Lerna handles the creation of the package, but the new package requires some extra configuration
for TypeScript and for compiling different versions for ES6 and CommonJS modules.

```
lerna create @proem/<package>
```

Copy `tsconfig.esm.json` and `tsconfig.json` from another module.

Edit `package.json`:

```
{
  "main": "lib/<package>.js",
  "module": "esm/<package>.js",
  "types": "lib/<package>.d.ts",

  ...

  "files": [
    "lib",
    "esm"
  ],

  ...

  "scripts": {
    "build:commonjs": "tsc -b .",
    "build:esm": "tsc -b ./tsconfig.esm.json",
    "prepublishOnly": "npm run build:commonjs && npm run build:esm",
    ...
  }
}
```

Add a row for the package in TS project composite configurations. References order is also the build order,
so packages that are dependencies for other packages needs to first in the array.

`packages/tsconfig.json`:

```
  "references": [
    ...
    { "path": "<package>" }
  ]
```

`packages/tsconfig.esm.json`:

```
  "references": [
    ...
    { "path": "<package>/tsconfig.esm.json" }
  ]
```

## Publishing

You need to be logged in NPM as a user that is a member of the `@proem` NPM organization.

```
npm run publish
```
