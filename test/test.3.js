const parser = require("@babel/parser");
const generate = require("@babel/generator").default;
const types = require('@babel/types');

const a = "log(1)";
const code = ''
const ast = parser.parse(a, { sourceFilename: "a.js" });

const myIdentifier = types.identifier('myFun')
const myArguments = types.NumericLiteral(1)

const myExpressionStatement = types.callExpression(myIdentifier, [myArguments])

// 将表达式放入body中
ast.program.body.push(myExpressionStatement)


const output = generate(
    ast,
    {},
    code
);
console.log('Input \n', code)
console.log('Output \n', output.code)
