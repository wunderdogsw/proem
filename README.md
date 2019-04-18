[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Proem

TypeScript standard library.

## Developing

You need [`yarn`](https://yarnpkg.com/en/docs/install)

Commits should be made with [`commitizen`](https://www.npmjs.com/package/commitizen).
There is a node script for it in `package.json`, so instead of `git commit` just write:

```
yarn commit
```

You can write the commit message yourself, but it has to comply with the "conventional" commit structure.
See https://github.com/conventional-changelog/commitlint#what-is-commitlint

Don't forget to add your name into `package/package.json` contributors!

#### Test with

```
yarn test
```

Run tests in watch mode

```
yarn test:watch
```

#### Add dependencies

The project uses [yarn workspaces](https://yarnpkg.com/lang/en/docs/cli/workspace/).

The root `package.json` is the workspace root, and `package/package.json` is the actual npm package.

You can add a dependency for the root project with

```
yarn add -W dep1
```

and adding deps to the `proem` library works with

```
yarn workspace proem add dep1 dep2
```

#### Build with

```
yarn build
```

The compiled files can be found at `package/`. The files in `package/` are never committed to the repository, except
for `package.json`. The reason for this strange structure is that multi-file packages are difficult to handle with `npm`.

We want the `proem` package to consist of many submodules that can be imported with a syntax like `import * as array from 'proem/array'`.
Because of the way node module resolution works, this is only possible if all the files are at the root of the npm package folder.
Usually we would deploy the repository root as the npm package, but we don't want to pollute it with compilation artifacts.
By building the files into `package/` and treating it as the `proem` npm package root, we can have the nice imports,
and not make a mess of the repository root.

This of course means that if `proem` needs dependencies, they should be added to `package/package.json`, but those should be rare.
The whole point of `proem` is to provide useful utilities while avoiding a ton of external dependencies.

You can clean the `package/` folder with the command

```
yarn clean
```
