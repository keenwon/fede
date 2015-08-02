# fede
> fede不是在造轮子，而是组装一辆车

一个的前端开发环境，实现前后端分离开发。

主要功能：
- 模拟后端接口，在尽可能真实的环境下数据
- 定义`_map.js`文件，自动拦截javascript中的“线上接口地址”到“本地模拟的接口”，无需修改javascript文件
- 使用handlebars模板代替html文件，可根据不同的环境编译成不同版本的html文件

依赖于：
- 基于expresss实现，可以使用任何express的中间件
- 使用gulp执行自动化构建
- 使用bower进行第三方组件的管理
- 使用amd模块，开发环境直接引入require.js，生产环境将代码和almond打包在一起

另外：代码很简单，大部分是第三方组件，可以根据自己的需要修改

##Installation

    npm install
    bower install

##Usage
所有开发文件在`dev`目录下，执行编译后的待发布文件在`dist`目录下

启动服务

    gulp server

编译打包

    gulp build

还可以单独运行各个任务，任务都定义在`gulpfile.js`文件下，很好修改。

##Documents
### 编译hbs文件
`.hbs`的文件也就是handlebars模板，你可以`bin/helpers`中写自定义的helper，然后就可以在hbs文件中使用了，默认设置了`development`和`development`两个helper，在本地运行的时候，默认是`development`环境，gulp编译时，是`production`环境

```handlebars
<head>
  {{#development}}
  <link href="css/index.css" type="text/css" media="all" rel="stylesheet" />
  {{/development}}
  {{#production}}
  <link href="css/index.min.css" type="text/css" media="all" rel="stylesheet" />
  {{/production}}
</head>
```
在本地运行的时候，会应用index.css文件，编译后的html文件只显示index.min.css

### Mock
在Mock文件夹下js文件（除了`_map.js`）都会被认为是mock文件，其实就是express中定义的路由接口，具体可以参考[express的文档](expressjs.com/zh/4x/api.html)

### 拦截ajax请求
mock已经很好用了，但是还不够好用。因为我们必须把`http://localhost:3000/xxxx`这样的接口写在js里，发布前还要替换（当然你可以使用gulp-replace等）。
我理想的方式是拦截url，重定位到本地接口（类似fiddler&charles），更妙的是我们使用的express，可以自定义静态文件中间件，通过一个map文件替换js里的url，然后在响应给浏览器，而实际上js文件是没有变的。
例如我们的本地文件有这样一个请求：
```javascript
  $.ajax({
    url: 'http://github.com',
    success: function(){

    }
  });
```
在`mock/_map.js`中这么写:
```javascript
module.exports = {
    // url映射举例
    'http://github.com': '/json'
};
```
启动服务，在浏览器中打开js文件，我们不会看到`http://github.com`，只会看到`/json`。
当然还有种方法是，在hbs中定义url的变量，因为有时url是根据后端的输出来变换的。

##Changelog
####1.0
AMD版本

##License
MIT