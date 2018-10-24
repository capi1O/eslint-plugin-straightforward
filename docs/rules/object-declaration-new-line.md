# Require object declaration first brace on new line (object-declaration-new-line)

Object declaration first brace on new line ensures consistency when [Allman](https://en.wikipedia.org/wiki/Indent_style#Allman_style) brace style is used.

## Rule Details

This rule enforces the use of first brace on new line for object declaration.

Examples of **incorrect** code for this rule:

```js
/*eslint object-declaration-new-line: "error"*/

let foo = {
		key: "bar"
	};

let foo2 = {
	key: "bar",
	key2: "bar2"
};
```

Examples of **correct** code for this rule:

```js
/*eslint object-declaration-new-line: "error"*/

let foo =
{
	key: "bar"
};

let foo2 =
{
	key: "bar",
	key2: "bar2"
};

let fooo = { key: "bar" };

let fooo2 = { key: "bar", key2: "bar2" };
```

Examples of **incorrect** code for this rule with the { "allowSingleLine": false } option:

```js
/*eslint object-declaration-new-line: ["error", { "allowSingleLine": false }]*/

let foo = { key: "bar" };

let foo2 = { key: "bar1", key2: "bar2" };

```

Examples of **correct** code for this rule with the { "allowSingleLine": false } option:

```js
/*eslint object-declaration-new-line: ["error", { "allowSingleLine": false }]*/

let foo =
{
	key: "bar"
};

let foo2 =
{
	key: "bar",
	key2: "bar2"
};
```

### Options

This rule has an object option for an exception:

- `"allowSingleLine": false` (default `true`) disallows the opening brace on same line for one line object delcaration.

## When Not To Use It

This rule is meant to be used in conjonction with [Allman](https://en.wikipedia.org/wiki/Indent_style#Allman_style) `brace-style` [eslint brace-style rule](https://eslint.org/docs/rules/brace-style).

## Further Reading

The discussion on this eslint github issue https://github.com/eslint/eslint/issues/5203 is related to this rule.

## Caveats

Following will be considered valid :

```js
let foo =
{ key: "bar",
  key2: "bar2"
};
```

Therefore :

```js
let foo = { key: "bar",
  key2: "bar2"
};
```

`--fix` will result in :

```js
let foo =
{ key: "bar",
  key2: "bar2"
};
```