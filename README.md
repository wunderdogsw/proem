# Proem

TypeScript standard library.

The library is divided into npm packages under the @proem umbrella.

`@proem/all` is a meta package that depends on all the other packages,
this way the user gets all the packages by adding a single dependency.

## Packages

- [`@proem/all`](packages/all/README.md) A meta packagage for everything included in `@proem`
- [`@proem/array`](packages/array/README.md) A package for handling arrays
- [`@proem/dict`](./packages/dict/README.md) A package for handling dictionaries (or maps if you'd like).
- [`@proem/function`](packages/function/README.md) A package for function type aliases and function composition
- [`@proem/pipe`](packages/pipe/README.md) A package for composing functions as pipelines
- [`@proem/some`](packages/some/README.md) A package for dealing with `null`able values
- [`@proem/variant`](packages/variant/README.md) A package for processing variant types (discriminant unions, algebraic types, etc)

## Developing

[`yarn`](https://yarnpkg.com/lang/en/docs/install) is required, editor with [Prettier](https://prettier.io/) and [TSLint](https://palantir.github.io/tslint/) support is recommended.

```
yarn install
```

Build & watch:

```
yarn build:watch
```

Test & watch:

```
yarn test:watch
```

Remove built files:

```
yarn clean
```

Development dependencies are added to the root package:

```
yarn add -D -W <npm-package>
```

Add a dependency for a specific package:

```
yarn workspace @proem/<package> add <npm-package>
```

## Tests

Project must be built before running tests.

Run `yarn test` or `yarn test:watch` in the repository root.

## Package structure

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
npx lerna create @proem/<package>
```

The package must have an entry point called `src/index.ts`.

Copy `tsconfig.esm.json` and `tsconfig.json` from another module.

Edit `package.json`:

```
{
  "main": "lib/index.js",
  "module": "esm/index.js",
  "types": "lib/index.d.ts",

  ...

  "files": [
    "lib",
    "esm"
  ],

  ...

  "scripts": {
    "build:commonjs": "tsc -b .",
    "build:esm": "tsc -b ./tsconfig.esm.json",
    "prepublishOnly": "yarn build:commonjs && yarn build:esm",
    ...
  }
```

Add a row for the package in TS project composite configurations. You might also need to add
references to the packages own tsconfig files, if the package depends on other proem packages.

`./tsconfig.json`:

```
  "references": [
    ...
    { "path": packages/"<package>" }
  ]
```

`./tsconfig.esm.json`:

```
  "references": [
    ...
    { "path": "packages/<package>/tsconfig.esm.json" }
  ]
```

## Publishing

You need to be logged in NPM as a user that is a member of the `@proem` NPM organization.

```
yarn release
```
