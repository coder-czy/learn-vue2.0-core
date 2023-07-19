// rollup默认可以导出一个对象，作为打包配置文件
import babel from "rollup-plugin-babel"
export default {
  input: './src/index.js',//入口
  output: {
    file: './dist/vue.js',//出口
    name: 'Vue',//global.Vue
    format: 'umd',//规范
    sourcemap: true//可以调试源代码
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'//排除node_modules
    })
  ]

}