#  CNode-origin

这个是我用小程序原生语法进行开发的 CNode 社区小程序端项目

使用CNode社区开放的api进行数据请求交互

在`src`中，使用 `.sty` 样式开发，然后开发工具输出到dist目录，并把`.styl`文件转换为了`.wxss`文件

**项目仓库：**<https://github.com/tingzhong666/cnode-origin>



##  项目结构

```
├─dist	小程序项目最终完成目录
├─src	含有 .styl 文件的源代码目录
│  ├─components	组件
│  │  ├─card	卡片
│  │  ├─comment	评论
│  │  ├─hr	分割线
│  │  ├─list	列表
│  │  ├─loading	加载中
│  │  ├─loadpro	进度条
│  │  ├─top	返回顶部
│  │  ├─topic	主题内容
│  │  └─user	个人主页
│  ├─fonticon	字体图标
│  ├─images	图片
│  ├─lib	第三方库
│  │  └─towxml	md转wxml库
│  │      ├─lib
│  │      ├─plugins
│  │      │  └─hljs
│  │      │      ├─languages
│  │      │      └─style
│  │      └─style
│  │          └─theme
│  ├─pages	页面
│  │  ├─about	关于
│  │  ├─api	cnode开发api页面
│  │  ├─index	首页
│  │  ├─init	刚进入小程序的初始化LOGO页面
│  │  ├─intro	新手入门
│  │  ├─list	创建/参与/收藏的主题列表
│  │  ├─login	登录指导
│  │  ├─msg	消息
│  │  ├─topic	主题详情
│  │  ├─user	我的个人主页
│  │  └─userinfo	用户个人主页
│  └─utils 存放工具函数，还有几个接口
└─styl
   └─theme.styl 存放颜色变量
```

