/**
 * 替换过程：
 * 不能够直接替换，因为多值属性与缩写属性的存在，会替换错误
 * vue 文件提取 style 块内文本
 * scss 文件提取全部文本
 * 对文本逐行检查替换
 *
 * 使用：
 * 在业务系统中，增加script命令
 *
 * "cssVarReplace": "node ./node_modules/jerri-ui/src/themes/varReplace.js"
 *
 * npm run cssVarReplace
 */

const fs = require('fs')
const path = require('path')
const join = path.join
const dirName = 'src'

//  解析并返回完全以系统根路径开始计算的文件路径
const resolve = (dir) => path.join(__dirname, dir)

//  替换属性集合
const replaceAttrs = ['color', 'border', 'background', 'background-color']

//  样式变量
let cssVars

/**
 * @desc 替换样式变量名
 * @param { String } str 替换内容
 * @param { String } filePath 文件路径
 */
function replaceVarName(str, filePath) {
  let replaceCount = 0;
  const result = str
    .split('\n')
    .reduce((prev, current, index, arr) => {
      //  含有属性的合法行
      if (current.includes(':')) {
        const [attrStr, valueStr] = current.split(':')
        //  仅属性名
        const attrName = attrStr.trim()
        //  属性值数组
        const values = valueStr
          .trim()
          .replace(';', '')
          .split(' ')

        //  此属性匹配允许修改的属性集合
        if (replaceAttrs.includes(attrName)) {
          //  循环属性集合
          values.forEach((value) => {
            //  经过特殊处理的值
            let handledValue = value

            /**————————————特殊处理开始—————————————— */

            //  开头为#
            if (value.startsWith('#')) {
              //  同时后续值相同
              const sameVal =
                value.split('#')[1] ===
                value
                  .split('#')[1]
                  .split('')
                  .reverse()
                  .join('')

              //  说明是十六进制缩写色值
              if (sameVal) {
                //  转化为4位长度缩写
                //  #666666 => #666
                handledValue = value.slice(0, 4)
              }
            }

            /**————————————特殊处理结束—————————————— */

            //  存在能够替换的变量
            if (cssVars[handledValue]) {
              replaceCount++;
              current = current.replace(value, cssVars[handledValue])
            }
          })
        }
      }
      prev.push(
        current,
        //  不为最后一位时，需要补上换行符
        index === arr.length - 1 ? '' : '\n'
      )
      return prev
    }, [])
    .join('')

  if (replaceCount) {
    console.info(`文件：${filePath}，样式变量替换成功，共替换${replaceCount}处变量。`)
  }
  return result
}

/**
 * @desc 巴黎铁塔翻转再翻转
 * @param { String } path
 */
function loopAndLoopReplace(path) {
  const files = fs.readdirSync(path)

  files.forEach((fileName) => {
    //  文件路径
    const filePath = join(path, fileName)
    //  在文件夹中
    const isDir = fs.statSync(filePath).isDirectory()
    const [
      //  名称
      name,
      //  后缀
      suffix,
    ] = fileName.split('.')

    //  文件夹，继续寻找
    if (isDir) {
      loopAndLoopReplace(filePath)
    }
    //  文件
    else if (['scss', 'vue'].includes(suffix)) {
      fs.readFile(filePath, 'utf8', function(err, file) {
        let result = file

        switch (suffix) {
          //  vue文件时，只有拥有 lang="scss" 的样式块才能够替换
          case 'vue': {
            if (result.includes(`lang="scss"`)) {
              //  截取模板及样式块
              const [templateAndScript, style] = result.split(`lang="scss"`)
              //  样式块变量转换
              result = [
                templateAndScript,
                `lang="scss"${replaceVarName(style, filePath)}`,
              ].join('')
            }
            break
          }

          //  样式文件
          case 'scss': {
            result = replaceVarName(result, filePath)
            break
          }
        }

        fs.writeFile(filePath, result, 'utf8', function(err) {
          if (err) {
            console.info(`文件：${filePath}，变量替换时出错了`, err)
          }
        })
      })
    }
  })
}

fs.readFile(resolve('./var.scss'), 'utf8', (err, file) => {
  cssVars = file
    .split('\n')
    .filter((row) => row.startsWith('$'))
    .reduce((prev, current) => {
      const [varName, attrValue] = current.split(':')

      prev[attrValue.trim().split(' !default')[0]] = varName
      return prev
    }, {})

  console.info('开始寻找文件进行替换🚀🚀🚀🚀')
  //  开始翻转
  loopAndLoopReplace(__dirname.split('\\node_modules')[0] + `\\${dirName}`)
  console.info('寻找文件进行替换结束🔚🔚🔚🔚')
});
