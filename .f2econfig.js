const path = require('path')
const mdppt = require('mdppt')
mdppt.cfg.base = '/assets/'

module.exports = {
    livereload: true,
    gzip: true,
    buildFilter: (pathname) => {
        return !/^node_modules/.test(pathname) || /^node_modules\/mdppt\//.test(pathname)
    },
    middlewares: [
        // mdppt 编译
        (conf) => {
            return {
                onSet(pathname, data, store) {
                    if (pathname.match(/\.md$/)) {
                        let res = mdppt(data.toString())
                        // 在数据仓库中设置一个新的资源 .html
                        store._set(pathname.replace(/\.md$/, '.html'), res)
                    }
                },
                outputFilter (pathname, data) {
                    // .md 资源开发环境可见， 但是不输出
                    return !/\.md$/.test(pathname)
                }
            }
        }
    ],
    output: path.resolve(__dirname, '../scrum-output')
}
