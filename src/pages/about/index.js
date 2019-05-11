const app = getApp(),
  Towxml = require('../../lib/towxml/main')

Page({
  data: {
    md: null,
    top: null
  },

  onLoad () {
    let md = '#  CNode-origin\r\n\r\n这个是我用小程序原生语法进行开发的 CNode 社区小程序端项目\r\n\r\n使用CNode社区开放的api进行数据请求交互\r\n\r\n在`src`中，使用 `.sty` 样式开发，然后开发工具输出到dist目录，并把`.styl`文件转换为了`.wxss`文件\r\n\r\n**项目仓库：**<https://github.com/tingzhong666/cnode-origin>\r\n\r\n\r\n\r\n##  项目结构\r\n\r\n```\r\n├─dist	小程序项目最终完成目录\r\n├─src	含有 .styl 文件的源代码目录\r\n│  ├─components	组件\r\n│  │  ├─card	卡片\r\n│  │  ├─comment	评论\r\n│  │  ├─hr	分割线\r\n│  │  ├─list	列表\r\n│  │  ├─loading	加载中\r\n│  │  ├─loadpro	进度条\r\n│  │  ├─top	返回顶部\r\n│  │  ├─topic	主题内容\r\n│  │  └─user	个人主页\r\n│  ├─fonticon	字体图标\r\n│  ├─images	图片\r\n│  ├─lib	第三方库\r\n│  │  └─towxml	md转wxml库\r\n│  │      ├─lib\r\n│  │      ├─plugins\r\n│  │      │  └─hljs\r\n│  │      │      ├─languages\r\n│  │      │      └─style\r\n│  │      └─style\r\n│  │          └─theme\r\n│  ├─pages	页面\r\n│  │  ├─about	关于\r\n│  │  ├─api	cnode开发api页面\r\n│  │  ├─index	首页\r\n│  │  ├─init	刚进入小程序的初始化LOGO页面\r\n│  │  ├─intro	新手入门\r\n│  │  ├─list	创建/参与/收藏的主题列表\r\n│  │  ├─login	登录指导\r\n│  │  ├─msg	消息\r\n│  │  ├─topic	主题详情\r\n│  │  ├─user	我的个人主页\r\n│  │  └─userinfo	用户个人主页\r\n│  └─utils 存放工具函数，还有几个接口\r\n└─styl\r\n   └─theme.styl 存放颜色变量\r\n```\r\n\r\n'
    let towxml = new Towxml()
    md = towxml.toJson(md, 'markdown')
    this.setData({
      md: md
    })
  },

  onPageScroll (e) {
    if (e.scrollTop > 300 && !this.data.top) {
      this.setData({
        top: true
      })
    }
    if (e.scrollTop < 300 && this.data.top) {
      this.setData({
        top: false
      })
    }
  }
})

