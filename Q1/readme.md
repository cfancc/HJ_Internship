#分析页面:www.hujiang.com

##学习到的知识：
1. 如站点不希望页面被搜索引擎转码，可添加此协议，告知我们原网页对应有一个WAP版页面，当用户进入网站时，先进入中间提示页，让用户自主选择跳转至原网页或网站自有的wap页面。
```javascript
<link rel="alternate" type="application/vnd.wap.xhtml+xml" media="handheld" href="http://m.hujiang.com/" />
```

2. 这段代码可以防止网页被iframe嵌套
```javascript
<script>
  if (top.location != self.location) {    
     location.href = "about:blank";
  }
</script>
```

3. 文档模式
```javascript
<meta content="IE=EmulateIE7" http-equiv="X-Ua-Compatible" />
```
IE8 引入了一个新的概念叫“文档模式”（document mode）。页面的文档模式决定了可以使用什么功能。换句话说，文档模式决定了你可以使用哪个级别的 CSS，可以在 JavaScript中使用哪些 API，以及如何对待文档类型（doctype）。`EmulateIE7`：如果有文档类型声明，则以 IE7 标准模式渲染页面，否则将文档模式设置为 IE5。
猜测这么做的原因：是因为IE有太多不可控因素，所以将IE下的文档模式调为IE7，这样所有IE下只做一套适配即可。但是这样会导致IE8以上的浏览器体验不到新的JS、CSS特性。

4. 通过cookie进行新版和旧版的切换

##建议：
1. 
```
<meta charset="UTF-8" />
```
在html5中，只写一种形式就可以了
2. 引入 CSS 和 JavaScript 时无须指明 type 属性
3. class命名方式，最好不要存在两种情况。
```
    <div class="headShortVideoBox">
    <div class="main-block cf"></div>
```
4. onclick事件，不要写在HTML中，可以为a标签添加需要的attributes，然后在js里统一处理
5. 线上代码没有全部压缩，缺少版本控制
6. cookie有些大，任何HTTP请求都会带上这些数据，耗费带宽资源



