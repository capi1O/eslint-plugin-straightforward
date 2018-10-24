/**
 * @fileoverview ensures object declaration first brace is on new line
 * @author monkeydri
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var ERROR_MESSAGE = "Expected object declaration brace to be on a new line.";

module.exports =
{
	meta:
	{
		docs:
		{
			description: "Require object declaration first brace on new line",
			category: "Stylistic Issues",
			recommended: false
		},
		fixable: "whitespace",  // or "code" or "whitespace"
		schema:
		[
			{
				type: "object",
				properties:
				{
					allowSingleLine:
					{
						type: "boolean"
					}
				},
				additionalProperties: false
			}
		]
	},

	error: ERROR_MESSAGE,

	create: function(context)
	{
		var params = context.options[0] || {};

		var allowSingleLine = (params.allowSingleLine !== undefined) ? params.allowSingleLine : true; //; // default to true (cannot use simpler `|| true` as fallback because if params.allowSingleLine is set to false it will fallback to true)

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		/**
		* Checks newlines around variable declarations.
		* @private
		* @param {ASTNode} node - `VariableDeclaration` node to test
		* @returns {void}
		*/
		function checkVariableDeclaration(node)
		{
			// get all VariableDeclarations for the specified VariableDeclaration
			var declarations = node.declarations;

			// check each delcaration of a VariableDeclaration
			declarations.forEach(function (declaration)
			{
				// if declaration is an object declaration
				if (declaration.init.type === "ObjectExpression")
				{
					var declarationNameLineNumber = declaration.id.loc.start.line;
					var declarationObject = declaration.init;
					var declarationObjectLineNumber = declarationObject.loc.start.line;

					// allowSingleLine: false
					if (!allowSingleLine)
					{
						if (declarationNameLineNumber === declarationObjectLineNumber)
						{
							context.report(
							{
								node,
								message: ERROR_MESSAGE,
								loc: declarationObject.loc,
								fix: fixer => fixer.insertTextBefore(declarationObject, "\n")
							});
						}
					}
					
					// allowSingleLine: true
					else
					{
						// check if one of the objectvariables (key: "value") is on another line than object declaration
						var notSingleLine = declarationObject.properties.some(function(property)
						{
							return (property.loc.start.line !== declarationNameLineNumber);
						});
						
						// if multi-line object delceration, check ?
						if (notSingleLine && (declarationNameLineNumber === declarationObjectLineNumber))
						{
							context.report(
							{
								node,
								message: ERROR_MESSAGE,
								loc: declarationObject.loc,
								fix: fixer => fixer.insertTextBefore(declarationObject, "\n")
							});
						}
					}
				}
			});
		}
	
		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return (
		{
			VariableDeclaration: checkVariableDeclaration
		});
	}
};
