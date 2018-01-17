# 轮播图组件1.0（原生JS，无其他依赖）
[演示demo](https://wowill.github.io/)

使用须知：
> 1.引入js,css,font文件到所开发项目中

> 2.创建DOM节点

```
<!--该元素为轮播图组件的父容器，id必须指定-->
<div id="container"></div>
```
```
<!--此段代码为组件核心代码，使用时只需添加展示的图片及标题即可，及该段代码
<li>
    <a href="#"  target="_blank">
        <img src="图片路径">
        <div class="banner-title">轮播图标题，或描述信息</div>
    </a>
    
</li>
其他html代码可不做修改。
-->
<!-- 轮播图：S -->
        <div id="banner">
            <ul>
                <li>
                    <a href="#"  target="_blank">
                        <img src="图片路径">
                        <div class="banner-title">轮播图标题，或描述信息</div>
                    </a>
                    
                </li>
                

            </ul>
        </div>
        <div class="change">
            <a href="javascript:void(0);" id="prePic"><i class="iconfont icon-houtuishangyige"></i></a>
            <a href="javascript:void(0);" id="nextPic"><i class="iconfont icon-qianjinxiayige"></i></a>
        </div>
        <div class="list-pointer"></div>
        <!-- 轮播图：E -->
```

> 3.配置js组件参数

```
组件有部分默认配置，但有些配置参数必须在创建组件对象时传入，否则将抛出异常
window.onload = function() {
        new SliderBanner({
            containerId: 'container', //轮播图容器id，必填
            leftBtnId: 'prePic',      //上一张按钮id，必填
            rightBtnId: 'nextPic',   //下一张按钮id，必填
            displayListPointer: true,//轮播图索引列表显示，可选
            currentPictrueIndex: 0, //当前显示图片索引值，可选
            autoSwitchTime: 3000,    //图片自动切换时间，可选
            displayTitle: true      //显示每一张图片的标题，可选

        });
    }
```

