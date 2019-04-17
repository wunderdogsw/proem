# Proem

TypeScript standard library.

## Developing

You need [`yarn`](https://yarnpkg.com/en/docs/install)

Test with

```
yarn test
```

Run tests in watch mode

```
yarn test:watch
```

Build with

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
yarn clean:package
```
