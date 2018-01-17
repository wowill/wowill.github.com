"use strict";

(function(win, doc){
    let defaultConfig = {
        displayListPointer: true,//轮播图索引列表显示，可选
        currentPictrueIndex: 0, //当前显示图片索引值，可选
        autoSwitchTime: 3000,    //图片自动切换时间，可选
        displayTitle: false      //显示每一张图片的标题，可选
        
    };

    function SliderBanner(config){
        
        this.init(config);
    }
    SliderBanner.prototype = {
        init: function(config){
            //对象初始化
            let self = this;
            if(!config){
                throw new Error("木有参数");
            }
            self = Object.assign(self, defaultConfig, config);
            self.container = doc.querySelector(self.container) || doc.querySelectorAll(self.container);
            self.addClass(doc.querySelector('#banner ul li:first-child'), 'active');
            //注册前后切换事件
            self.addEventHandler(doc.querySelector('#'+self.rightBtnId), "click", self.next.bind(self));
            self.addEventHandler(doc.querySelector('#'+self.leftBtnId), "click", self.previous.bind(self));
            // 设置定时器
            let timer = win.setInterval(self.next.bind(self), this.autoSwitchTime);
            self.addEventHandler(doc.querySelector("#"+self.containerId), 'mouseenter', function(){
                win.clearInterval(timer);
            });
            self.addEventHandler(doc.querySelector("#"+self.containerId), 'mouseleave', function(){
                timer = win.setInterval(self.next.bind(self), self.autoSwitchTime);
            });
            //注册轮播索引列表
            if(self.displayListPointer){
                self.getPostion.call(this);
                doc.querySelectorAll(".list-pointer a")[self.currentPictrueIndex].style.cssText = "background: rgba(255,255,255,1);width:20px;"
            }
            // 标题显示控制
            if(!self.displayTitle){
                doc.querySelectorAll(".banner-title").forEach((e) => {
                    e.style.cssText = "display:none;";
                });
            }
           

        }, 
        previous: function(){
            // 后退一步函数
            this.currentPictrueIndex = this.currentPictrueIndex || 0;
            if(this.currentPictrueIndex > 0){
                this.currentPictrueIndex = this.currentPictrueIndex - 1;
            }else{
                this.currentPictrueIndex = doc.querySelectorAll("#banner ul li").length - 1;
            }
             
            if(this.currentPictrueIndex == doc.querySelectorAll("#banner ul li").length - 1){
                doc.querySelectorAll("#banner ul li")[0].style.cssText = "opacity:0;display:blcok;left:100px";
                doc.querySelectorAll("#banner ul li")[this.currentPictrueIndex].style.cssText = "display:block;opacity:1;";
            }else{
                doc.querySelectorAll("#banner ul li")[this.currentPictrueIndex+1].style.cssText = "display:block;opacity:0;left:100px";
                doc.querySelectorAll("#banner ul li")[this.currentPictrueIndex].style.cssText = "display:block;opacity:1;";
            }
            //设置索引列表选中样式
            if(this.displayListPointer){
                doc.querySelectorAll(".list-pointer a")[this.currentPictrueIndex].style.cssText = "background: rgba(255,255,255,1);width:20px;"
                doc.querySelectorAll(".list-pointer a")[this.currentPictrueIndex+1>doc.querySelectorAll("#banner ul li").length-1 ? 0 : this.currentPictrueIndex+1].style.cssText = "background: rgba(255,255,255,0);"
            }
        },
        next: function(){
            // 前进一步函数
            this.currentPictrueIndex = this.currentPictrueIndex || 0;
            if(this.currentPictrueIndex < doc.querySelectorAll("#banner ul li").length - 1){
                this.currentPictrueIndex = this.currentPictrueIndex + 1;
            }else{
                this.currentPictrueIndex = 0;
            }
            doc.querySelectorAll("#banner ul li")[this.currentPictrueIndex <= 0 ? doc.querySelectorAll("#banner ul li").length - 1 : this.currentPictrueIndex - 1].style.cssText = "display:block;opacity:0;left:-100px;";
            doc.querySelectorAll("#banner ul li")[this.currentPictrueIndex].style.cssText = "display:block;opacity:1;";
            //设置索引列表选中样式
            if(this.displayListPointer){
                doc.querySelectorAll(".list-pointer a")[this.currentPictrueIndex].style.cssText = "background: rgba(255,255,255,1);width:20px;"
                doc.querySelectorAll(".list-pointer a")[this.currentPictrueIndex <= 0 ? doc.querySelectorAll("#banner ul li").length - 1 : this.currentPictrueIndex - 1].style.cssText = "background: rgba(255,255,255,0);";
            }
        },
        getPostion: function(){
            // 跳到指定图片
            let html = '', self = this;
            for(let i = 0; i < doc.querySelectorAll("#banner ul li").length; i++){
                html += '<a href="javascript:void(0);" data-index = "'+i+'" ></a>';
            }
            doc.querySelector(".list-pointer").innerHTML= html; 
            this.addEventHandler(doc.querySelector(".list-pointer"), 'click', function(e){
                let event = e || win.event;
                let target = event.target || event.srcElement;
                if(target.nodeName.toLowerCase() == 'a'){
                    if(self.currentPictrueIndex < target.getAttribute('data-index')-'0'){
                        doc.querySelectorAll("#banner ul li")[self.currentPictrueIndex].style.cssText = "display:block;opacity:0;left:-100px;";
                        doc.querySelectorAll("#banner ul li")[target.getAttribute('data-index')].style.cssText = "display:block;opacity:1;";
                    }
                    else{
                        doc.querySelectorAll("#banner ul li")[self.currentPictrueIndex].style.cssText = "display:block;opacity:0;left:100px;";
                        doc.querySelectorAll("#banner ul li")[target.getAttribute('data-index')].style.cssText = "display:block;opacity:1;";
                    }
                    
                    doc.querySelectorAll(".list-pointer a")[self.currentPictrueIndex].style.cssText = "background: rgba(255,255,255,0);";
                    self.currentPictrueIndex = target.getAttribute('data-index')-'0';
                    doc.querySelectorAll(".list-pointer a")[self.currentPictrueIndex].style.cssText = "background: rgba(255,255,255,1);width:20px;";
                }
            });
        },
        addClass: function(node, className){
            var addClassName = this.trim(className);
            var oriClassName = node.className;
            if(oriClassName.indexOf(addClassName)===-1){
                node.className = oriClassName+ ' ' +className;
            }
        },
        removeClass: function(node, className){
            var reg = new RegExp('\\b'+ trim(className) +'\\b', 'g');
            node.className = node.className.replace(reg, '');
        },
        hasClass: function(node, className){
            return node.className.indexOf(trim(className))!==-1;
        },
        trim: function(str){
            return str.replace(/^\s+/, '').replace(/\s+$/, '');
        },
        addEventHandler: function(node, type, callback){
            try{
                node.addEventListener(type, callback,false);
            }catch(e){
                try{
                    node.attachEvent('on'+type, callback);
                }catch(e){
                    node['on'+type] = callback;
                }
            }
            
        },
        removeEventHandler: function(node, type, callback){
            try{
                node.removeEventListener(type, callback);
            }catch(e){
                try{
                    node.detachEvent('on'+type, callback);
                }catch(e){
                    node['on'+type] = null;
                }
            }
            
        },
        
    }
    win.SliderBanner = SliderBanner;
})(window, document);