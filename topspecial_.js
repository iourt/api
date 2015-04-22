var ua = navigator.userAgent.toLowerCase(),
	ctripYouth = ua.match("ctripyouth"),
	ctripWireless = ua.match("ctripwireless");

var isHbridApp = ctripYouth||ctripWireless ? !0 : !1;

//getVesrion
var app = app || {};
var curVesrion = 5.4;
app.callback = function (res) {
    var tagname = res.tagname;
    switch (tagname) {
	    case "web_view_finished_load":
	        if (res.param.version) {
	            curVesrion = parseFloat(res.param.version);
	        }
	        setNavbar();
	        break;
    }
};

function setNavbar() {
	var nav_bar_config_json = {
		"left": [{ "tagname": "back"}],
		"center": [{ "tagname": "title", "value": "特色榜单"}],
		"right": ''
	};
    CtripUtil.app_refresh_nav_bar( JSON.stringify(nav_bar_config_json) );
}

var App_Templates = {
	tempBody: function(){
		var template = '<ul class="list_img"></ul>' +
					   '<div class="list_footer"></div>' +
			           '<div class="loading">' +
					   '	<span class="logo_white">' +
					   '		<i class="loading_ring"></i>' +
					   '	</span>' +
					   '</div>';
		return template;
	},
	tempLoading: function(){
		var template = '<span class="loading_bottom">' +
					   '	<i class="loading_ring"></i>' +
					   '</span> 加载中...';
		return template;
	}
};

var view = document.getElementById("appview");
view.innerHTML = App_Templates.tempBody();

var App_View = {
	$html: $(".list_img"),
	$next: $(".list_footer"),
	page: 1,
	$end: false,
	isLoadingData: false,
	$winHeight: $(window).height(),
	$pageLoad: $(".loading"),
	imgLoaded: [],

	init: function(){
		this.getData();
		this.getScroll();
	},

	getData: function(){
		var self = this;
		if(self.isLoadingData) return;

		self.isLoadingData = true;
		$.ajax({
			url: 'http://172.16.125.99:4444/api/topspecial.php',
			type: 'GET',
			data: {
				"page": self.page
			},
			dataType: "jsonp",
			jsonp: "callback",
			timeout: 20000,
			beforeSend: function(){
				if(self.page!==1){
					self.$next.html(App_Templates.tempLoading());
				}	
			},
			success: function(data){
				self.$pageLoad.css({"display":"none"});
				self.isLoadingData = false;
				if(data){
					self.page++;
					self.setImgList(data, self.page);
				}else{
					self.$end = true;
					self.$next.html("没有更多信息了");
				}
				console.log(self.page);
			},
			error: function(e){
			}
		});
	},

	setImgList: function(data, page){
		var dataContent = data.list,
			html = '';

		console.log(dataContent);
		self.page = page;
		console.log(self.page);

		for(var i=0,len=dataContent.length; i<len; i++){
			html += '<li>' +
					'<a href="'+ dataContent[i].url +'">' +
					'	<div data-img="'+ dataContent[i].img +'"></div>' + 
					'	<div>'+ dataContent[i].title +'<br>'+ dataContent[i].content +'</div>' +
					'</a>' +
					'</li>';
		}

		this.$html.append(html);
		this.$next.html("");
		this.loadImages();
	},

	loadImages: function(){
		var listImages = document.querySelectorAll(".list_img li"),
			images = [];

		for(var i=0,len=listImages.length; i<len; i++){
			// (function(i){
			// 	var div = listImages[i].querySelectorAll("a div"),
			// 		img_href = div[0],
			// 		img_text = div[1],
			// 		img_src = img_href.getAttribute("data-img");
			// 	images[i] = new Image();
			// 	images[i].onload = function(){
			// 		img_href.innerHTML = '<img src="'+ img_src +'" >';
			// 		img_text.style.display = "block";
			// 	};
			// 	images[i].src = img_src;
			// })(i);
			setShow(i);
		}

		function setShow(i){
			console.log(i);
			var div = listImages[i].querySelectorAll("a div"),
				img_href = div[0],
				img_text = div[1],
				img_src = img_href.getAttribute("data-img");
			images[i] = new Image();
			images[i].onload = function(){
				img_href.innerHTML = '<img src="'+ img_src +'" >';
				img_text.style.display = "block";
			};
			images[i].src = img_src;
		}
	},

	getScroll: function(){
		var self = this;

		var scrollTop = '',
			nextTop = '';

		document.addEventListener("scroll", function(){
			if(!self.$end){
				scrollTop = $(window).scrollTop();
				nextTop = self.$next.offset().top;

				if((scrollTop+self.$winHeight) > (nextTop-50)){
					self.getData();
				}
			}
		}, false);


	}
};

App_View.init();


	