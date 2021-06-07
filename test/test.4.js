const parser = require("@babel/parser");
const generate = require("@babel/generator").default;
const t = require('@babel/types');


const code = `
import {
    A,
  } from './'
  
  
  import A_CONFIG from './a'
  
  export default {
    [A]: A_CONFIG,
  }
  
`
const ast = parser.parse(code, {
    allowImportExportEverywhere: true,
})

// 生成 VariableDeclarator
const id = t.identifier('a')
const literal = t.numericLiteral(1)
const declarator = t.variableDeclarator(id, literal)

// 生成 VariableDeclaration
const declaration = t.variableDeclaration('const', [declarator])

// 将表达式放入body中
ast.program.body.push(declaration)

const output = generate(ast, {}, code)
console.log('Input \n', code)
console.log('Output \n', output.code)