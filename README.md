# eslint-plugin-straightforward

adds rules for object declaration first brace and array declaration first bracket on new line

## Installation

`npm install eslint-plugin-straightforward --save-dev`

*Note : You'll first need to install [ESLint](http://eslint.org) if you don't have it : `npm i eslint --save-dev`*

*If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-straightforward` globally.*

## Usage

Add `straightforward` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
		"plugins": [
				"straightforward"
		]
}
```

Then configure the rules you want to use under the rules section.

```json
{
		"rules": {
				"straightforward/rule-name": "error"
		}
}
```

## Supported Rules






