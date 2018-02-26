/*
 * author:handsomePeng
 * date:2.2.2018
 */

function PagePlugin(obj){
			this.container = obj.container;
			//总数据量
			this.contentCount = obj.contentCount;
			//每页显示数据量
			this.showContentCount = obj.showContentCount;
			//总页码数
			this.pageCount = Math.ceil(this.contentCount/this.showContentCount)
			//显示页码数；
			this.showPageCount = this.pageCount<obj.showPageCount?this.pageCount:obj.showPageCount;
			this.activeStyle = obj.activeStyle;
			//当前页码
			this.currentPage = 1;
			//首页
			this.startPage = null;
			//上一页
			this.prevPage = null;
			//下一页
			this.nextPage = null;
			//末页
			this.endPage = null;
			//页码页码按钮储存数组；
			this.pageArr = [];
			//执行回调函数；
			this.backFn = obj.backFn;
			this.init();
			this.backFn(this.currentPage);
		}
		PagePlugin.prototype = {
			//初始化方法；
			init:function(){
				var ul = document.createElement("ul");
				var that = this;
				//页码
				for (var i = 1 ; i <= this.showPageCount ; i++) {
//					lis+="<li class='page'>"+i+"</li>"
					var li = document.createElement("li");
					li.innerHTML = i;
					ul.appendChild(li);
					if (i == this.currentPage) {
							li.style.background = this.activeStyle;		
						}else{
							li.style.background = "white"
					}
					li.onclick = function(){
						that.currentPage = this.innerHTML/1;
						that.changePage();
						that.backFn(that.currentPage)
					}
					this.pageArr.push(li);
				}
				//下一页按钮
				this.nextPage = document.createElement("li");
				this.nextPage.innerHTML = "下一页";
				ul.appendChild(this.nextPage);
				this.nextPage.onclick = function(){
					if (that.currentPage>=that.pageCount) {
						return;
					}
					that.currentPage++;
					that.changePage();
					that.backFn(that.currentPage)
				}
				//下一页按钮是否显示；
				if(this.pageCount>this.showPageCount){
					this.nextPage.style.display = "block";
				}else{
					this.nextPage.style.display = "none";
				}
				//尾页
				this.endPage = document.createElement("li");
				this.endPage.innerHTML = "尾页";
				ul.appendChild(this.endPage);
				this.endPage.style.display = "none";
				this.endPage.onclick = function(){
					that.currentPage = that.pageCount;
					that.changePage();
					that.backFn(that.currentPage)
				}
				//上一页按钮
				this.prevPage = document.createElement("li");
				this.prevPage.innerHTML = "上一页";
				ul.insertBefore(this.prevPage,ul.firstChild);
				this.prevPage.style.display = "none";
				this.prevPage.onclick = function(){
					
					if (that.currentPage==1) {
						return;
					}
					that.currentPage--;
					that.changePage();
					that.backFn(that.currentPage)
				}
				//首页
				this.startPage = document.createElement("li");
				this.startPage.innerHTML = "首页";
				ul.insertBefore(this.startPage,ul.firstChild)
				this.container.appendChild(ul);
				this.startPage.style.display = "none";
				this.startPage.onclick = function(){
					that.currentPage = 1;
					that.changePage();
					that.backFn(that.currentPage)
				}
			},
			changePage:function(){
				//首页：
				/*
				 * this.currentPage = 1;
				 * 首页按钮隐藏；
				 * 上一页按钮隐藏
				 * 页码一标注为响应状态；
				 */
				if (this.currentPage == 1) {
					this.sh(this.startPage,"none");
					this.sh(this.prevPage,"none");
					this.sh(this.nextPage,"block");
					this.sh(this.endPage,"none");
					for (var i = 0 ; i < this.pageArr.length ; i++) {
						this.pageArr[i].innerHTML = i+1;
						if (this.pageArr[i].innerHTML == this.currentPage) {
							this.pageArr[i].style.background = this.activeStyle;		
						}else{
							this.pageArr[i].style.background = "white"
						}
					}
				}
				//上一页显示    首页不显示   末页不显示
				else if(this.currentPage<=Math.floor(this.showPageCount/2)){
					this.sh(this.startPage,"none");
					this.sh(this.prevPage,"block");
					this.sh(this.nextPage,"block");
					this.sh(this.endPage,"none");
					for (var i = 0 ; i < this.pageArr.length ; i++) {
						this.pageArr[i].innerHTML = i+1;
						if (this.pageArr[i].innerHTML == this.currentPage) {
							this.pageArr[i].style.background = this.activeStyle;		
						}else{
							this.pageArr[i].style.background = "white"
						}
					}
				}
				//上一页  首页  下一页显示   尾页不显示
				else if (this.currentPage<=this.showPageCount) {
					this.sh(this.startPage,"block");
					this.sh(this.prevPage,"block");
					this.sh(this.nextPage,"block");
					this.sh(this.endPage,"none");
					//当前点击的页码按钮内容    Math.floor(this.pageArr.length/2)
					for (var i = 0 ; i < this.pageArr.length ; i++) {
						this.pageArr[i].innerHTML = this.currentPage+1-(Math.floor(this.pageArr.length/2)-i)
						if (this.pageArr[i].innerHTML == this.currentPage) {
							this.pageArr[i].style.background = this.activeStyle;		
						}else{
							this.pageArr[i].style.background = "white"
						}
					}
				}
				//上下尾首都显示
				else if (this.currentPage+Math.ceil(this.showPageCount/2) < this.pageCount) {
					this.sh(this.startPage,"block");
					this.sh(this.prevPage,"block");
					this.sh(this.nextPage,"block");
					this.sh(this.endPage,"block");
					for (var i = 0 ; i < this.pageArr.length ; i++) {
						this.pageArr[i].innerHTML = this.currentPage+1-(Math.floor(this.pageArr.length/2)-i)
						if (this.pageArr[i].innerHTML == this.currentPage) {
							this.pageArr[i].style.background = this.activeStyle;		
						}else{
							this.pageArr[i].style.background = "white"
						}
					}
				}
				//尾页再次隐藏
				else if (this.currentPage<=this.pageCount-1){
					this.sh(this.startPage,"block");
					this.sh(this.prevPage,"block");
					this.sh(this.nextPage,"block");
					this.sh(this.endPage,"none");
					for (var i = 0 ; i < this.pageArr.length ; i++) {
						this.pageArr[i].innerHTML = this.pageCount-this.pageArr.length+i+1;
						if (this.pageArr[i].innerHTML == this.currentPage) {
							this.pageArr[i].style.background = this.activeStyle;		
						}else{
							this.pageArr[i].style.background = "white"
						}
					}
				}else{
					this.sh(this.startPage,"block");
					this.sh(this.prevPage,"block");
					this.sh(this.nextPage,"none");
					this.sh(this.endPage,"none");
					for (var i = 0 ; i < this.pageArr.length ; i++) {
						this.pageArr[i].innerHTML = this.pageCount-this.pageArr.length+i+1;
						if (this.pageArr[i].innerHTML == this.currentPage) {
							this.pageArr[i].style.background = this.activeStyle;		
						}else{
							this.pageArr[i].style.background = "white"
						}
					}
				}
			},
			sh:function(ele,type){
				ele.style.display = type;
			}
		}