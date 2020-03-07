/*https://liubing.me/vue-auto-regist-global-component-and-plugin.html
1、项目中新建plugins目录，和components目录保持同级。
2、plugins目录中新建index.js
3、以引入element-ui为例：再在plugins目录中新建element.js
4、plugins目录中的index.js中引入element.js
5、main.js中引入plugins中的index.js
这样main.js看起来就清爽很多了，后面有新增的插件，只需要再plugins目录下新建相应的插件名称，然后在index.js中引入即可，再多的插件也可以很方便的进行维护。

*/



import './element'
