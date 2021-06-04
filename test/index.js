const babel = require('@babel/core');
const c = `import { Button } from 'antd'`;

const { code } = babel.transform(c, {
  plugins: [
    function ({ types: t }) {
      return {
        visitor: {
          ImportDeclaration(path) {
            const { node: { specifiers, source } } = path;
            if (!t.isImportDefaultSpecifier(specifiers[0])) { // 对 specifiers 进行判断，是否默认倒入
              const newImport = specifiers.map(specifier => (
                t.importDeclaration(
                  [t.ImportDefaultSpecifier(specifier.local)],
                  t.stringLiteral(`${source.value}/lib/${specifier.local.name}`)
                )
              ))
              path.replaceWithMultiple(newImport)
            }
          }
        }
      }
    }
  ]
})

console.log(code); // import Button from "antd/lib/Button";