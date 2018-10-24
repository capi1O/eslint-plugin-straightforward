/**
 * @fileoverview ensures object declaration first brace is on new line
 * @author monkeydri
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/object-declaration-new-line");

var RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig(
{
	parserOptions:
	{
		ecmaVersion: 6,
		ecmaFeatures:
		{
			jsx: true,
		},
	}
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

function errorAt(line, column)
{
	return (
	{
		message: ruleTester.error,
		type: "VariableDeclaration",
		line,
		column
	});
}

ruleTester.run("object-declaration-new-line", rule, 
{
	valid:
	[
		// first brace on new line
		{ code: "var foo =\n{\nkey: \"bar\"\n};" },
		{ code: "let foo =\n{\nkey: \"bar\"\n};", parserOptions: { ecmaVersion: 6 } },
		{ code: "const foo =\n{\nkey: \"bar\"\n};", parserOptions: { ecmaVersion: 6 } },
		{ code: "var foo =\n{\nkey: bar,\nkey2: \"bar2\"\n};" },
		{ code: "let foo =\n{\nkey: bar,\nkey2: \"bar2\"\n};", parserOptions: { ecmaVersion: 6 } },
		{ code: "const foo =\n{\nkey: bar,\nkey2: \"bar2\"\n};", parserOptions: { ecmaVersion: 6 } },
		{ code: "var foo =\n{ key: bar,\nkey2: \"bar2\"\n};" },
		{ code: "let foo =\n{ key: bar,\nkey2: \"bar2\"\n};", parserOptions: { ecmaVersion: 6 } },
		{ code: "const foo =\n{ key: bar,\nkey2: \"bar2\"\n};", parserOptions: { ecmaVersion: 6 } },

		// first brace on same line - single line
		{ code: "var foo = { key: \"bar\" };" },
		{ code: "let foo = { key: \"bar\" };", parserOptions: { ecmaVersion: 6 } },
		{ code: "const foo = { key: \"bar\" };", parserOptions: { ecmaVersion: 6 } },
		{ code: "var foo = { key: bar, key2: \"bar2\" };" },
		{ code: "let foo = { key: bar, key2: \"bar2\" };", parserOptions: { ecmaVersion: 6 } },
		{ code: "const foo = { key: bar, key2: \"bar2\" };", parserOptions: { ecmaVersion: 6 } }
	],

	invalid:
	[
		// first brace on same line
		{ code: "var foo = {\nkey: bar\n};", errors: [errorAt(1, 11)] },
		{ code: "let foo = {\nkey: bar\n};", errors: [errorAt(1, 11)], parserOptions: { ecmaVersion: 6 } },
		{ code: "const foo = {\nkey: bar\n};", errors: [errorAt(1, 13)], parserOptions: { ecmaVersion: 6 } },
		{ code: "var foo = {\nkey: bar,\nkey2: \"bar2\"\n};", errors: [errorAt(1, 11)] },
		{ code: "let foo = {\nkey: bar,\nkey2: \"bar2\"\n};", parserOptions: { ecmaVersion: 6 }, errors: [errorAt(1, 11)] },
		{ code: "const foo = {\nkey: bar,\nkey2: \"bar2\"\n};", parserOptions: { ecmaVersion: 6 }, errors: [errorAt(1, 13)] },
		{ code: "var foo = { key: bar,\nkey2: \"bar2\"\n};", errors: [errorAt(1, 11)] },
		{ code: "let foo = { key: bar,\nkey2: \"bar2\"\n};", parserOptions: { ecmaVersion: 6 }, errors: [errorAt(1, 11)] },
		{ code: "const foo = { key: bar,\nkey2: \"bar2\"\n};", parserOptions: { ecmaVersion: 6 }, errors: [errorAt(1, 13)] },

		// first brace on same line - single line with allowSingleLine false
		{ code: "var foo = { key: \"bar\" };", options: [{ allowSingleLine: false }], errors: [errorAt(1, 11)] },
		{ code: "let foo = { key: \"bar\" };", options: [{ allowSingleLine: false }], parserOptions: { ecmaVersion: 6 }, errors: [errorAt(1, 11)] },
		{ code: "const foo = { key: \"bar\" };", options: [{ allowSingleLine: false }], parserOptions: { ecmaVersion: 6 }, errors: [errorAt(1, 13)] },
		{ code: "var foo = { key: \"bar\", key2: \"bar2\" };", options: [{ allowSingleLine: false }], errors: [errorAt(1, 11)] },
		{ code: "let foo = { key: \"bar\", key2: \"bar2\" };", options: [{ allowSingleLine: false }], parserOptions: { ecmaVersion: 6 }, errors: [errorAt(1, 11)] },
		{ code: "const foo = { key: \"bar\", key2: \"bar2\" };", options: [{ allowSingleLine: false }], parserOptions: { ecmaVersion: 6 }, errors: [errorAt(1, 13)] }
	]
});
