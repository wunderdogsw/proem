![npm](https://img.shields.io/npm/v/proem.svg)

# Proem

Proem is a standard library for TypeScript.
It includes modules for handling arrays, objects, strings, etc.

## Installation

with yarn:

```
yarn add proem
```

or with npm:

```
npm install proem
```

## Usage

the main proem module includes a selection of utilities
you need constantly:

```ts
import { TODO } from 'proem'
```

proem has various submodules for different purposes:

- `proem/array` for array utility functions
- `proem/dict` for objects as hashmaps utility functions
- `proem/function` for utilities and types for working with functions
- `proem/pipe` for composing functions as a pipeline
- `proem/some` for working with nullable values
- `proem/union` for working union type values
- `proem/variant` for working with algebraic data types (like redux actions)

unlike the proem main module, submodules are designed to be imported as namespace:

```
import * as array from 'proem/array'

array.filter([1, 2, 3], n => n >= 2)
```

Importing the main module once in your project adds other submodules into your TypeScript autocomplete.
