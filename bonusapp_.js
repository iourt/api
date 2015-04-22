var M_INFO = {};

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
	        CtripUtil.app_init_member_H5_info();
	        break;
		case "init_member_H5_info":
			if(res.param.userInfo){
				localStorage.setItem('USERINFO', JSON.stringify(res.param.userInfo));
			}else{
				localStorage.removeItem('USERINFO');
			}

			M_INFO = {
				// 用户登录信息
				UserInfo: JSON.parse(localStorage.getItem("USERINFO")),
				// 用户ID
				UserID: function(){
					var id = '';
					if (this.UserInfo) {
						id = this.UserInfo.data.Auth;
					}
					return id;
				},
				// 评论ID
				CommentID: function(){
					var id = this.getUrlID("id");
					return id;
				},
				URL_TYPE: function(){
					var type = 0;
					if(this.UserID() && this.CommentID()){
						if(window.location.href.indexOf("bonusapp#result")>0){
							type = 1;
						}else{
							type = 0;
						}
					}else{
						type = 0;
					}
					return type;
				},
				getUrlID: function(name){
					var reg = new RegExp("(.*)"+name+"=([^&]*)(&|$)"),
					id  = window.location.href.match(reg);
					if (id !== null) return unescape(id[2]).replace(/\D/g, ''); return null;
				}
			};

			StartInit.init();
			break;
		case "share":
			shareCallback(res);
			break;
    }
};

function setNavbar() {
	// if (parseFloat(curVesrion) < 5.4) return;
	var nav_bar_config_json = {
		"left": [{ "tagname": "back"}],
		"center": [{ "tagname": "title", "value": "社区活动"}],
		"right": [{"tagname": "share", "value":"分享"}]
	};
    CtripUtil.app_refresh_nav_bar( JSON.stringify(nav_bar_config_json) );
}

function shareCallback() {
    var title = "点评成金，寻宝送好礼！",
    	url = "http://m.ctrip.com/you/operations/bonus";
    var weiboContent = title + url;
    var params = {
        sharetag: 'ad',
        weixinContent: "",
        weiboContent: weiboContent,
        shareUrl: url,
        title: title,
        picUrl: "http://pages.ctrip.com/destination/bonus/img.jpg" 
    };
    CtripGS.shareCommon( JSON.stringify(params) );
}


var PageID = {
	Web: [240022, 240023],
	App: [240020, 240021]
};

var ErrorMsg = {
	wait: '数据加载中，请稍后...',
	miss: '矮油，服务器抽筋啦，数据请求错误...'
};


var GS_Templates = {
	tempHeader: function(){
		var templates = '<header class="bonus_banner"><img src="http://pages.ctrip.com/destination/bonus/bonus_banner.png" /></header>';
		return templates;
	},
	tempList: function(){
		var templates = '<section class="bonus_list"><div class="bonus_list_info">数据加载中请稍后……</div></section>' +
						'<div class="bonus_list_click">我的<br>奖品</div>';
		return templates;
	},
	tempFooter: function(){
		var templates = '<dl class="bonus_marquee">' +
						'    <dt class="marquee"><div style="text-align:center;">数据加载中请稍后……</div></dt>' +
						'</dl>' +
						'<section class="bonus_rule">' +
						'    <h3 class="t_ac">活动规则</h3>' +
						'    <div class="bonus_rule_icon"></div>' +
						'    <div class="bonus_rule_art">' +
						'        <article>' +
						'            通过以下途径，点评任意地点，均可得到开宝箱的机会：<br>' +
						'			 a) 手机打开携程旅行V5.5及以上版本，进入攻略频道，点击右侧“点评”；<br>' +
						'            b) 手机登陆m.ctrip.com/you/comment；<br>' +
						'            c) 微信添加“携程攻略社区”，点击“游友互助”—“写点评”；<br><br>' +
						'            本次活动奖品有：100元旅游基金，50元旅游基金，100携程积分等。<br>' +
						'            1. 每条点评需至少10个汉字，否则无法开启宝箱。发表成功后，选择其一宝箱打开。<br>' +
						'            2. 每条点评需原创且并且真实，禁止抄袭、恶意灌水等非真实点评，情节严重者将被取消获奖资格。<br>' +
						'            3. 通过“我的奖励”可查询获奖记录；奖励于抽奖成功并且审核后5个工作日内发放，不符合要求的获奖点评与用户则不予奖励。<br>' +
						'            4. 旅游基金将1:1比例形式以携程任我行礼品卡形式发放用户，可叠加使用，可抵扣携程旅行网酒店、机票、团购等产品。<br>' +
						'            5. 携程攻略社区保留活动的最终解释权，有关活动疑问请联系邮箱：vot@ctrip.com。' +
						'        </article>' +
						'    </div>' +
						'</section>';
		return templates;
	},
	tempIndex: function(){
		var templates = '<div class="bonus_text t_ac">' +
					    '    <span>点评</span>任意地点即可打开<span>幸运宝箱</span><br />' +
					    '    据说<span>添加照片</span>会有<span>更高中奖概率</span>' +
					    '</div>' +
					    '<div class="bonus_time t_ac">活动时间：04.15 ~ 05.16</div>' +
					    '<div class="bonus_box">' +
					    '     <img src="http://pages.ctrip.com/destination/bonus/bonus_box.png" />' +
					    '</div>';
			if(curVesrion>=5.5){
				templates += '<div class="bonus_btn">' +
						     '    <a class="btn_url" data-href="ctrip://wireless/destination/toCommetMain">点评开宝箱</a>' +
						     '</div>';
			}
		return templates;
	},
	tempResult: function(){
		var templates = '<div class="bonus_text t_ac">' +
				        '    点评成功！<br />' +
				        '    赶紧打开其中一个宝箱吧！' +
				        '</div>' +
				        '<div class="bonus_box_open">' +
				        '    <ul><li>A</li><li>B</li><li>C</li></ul>' +
				        '    <canvas id="bonus"></canvas>' +
				        '</div>';
		return templates;
	},
	tempFrame: function(){
		var templates = '<section class="bonus_frame success">' +
						'    <div style="height:175px;">' +
						'        <dl>' +
						'            <dt>恭喜</dt>' +
						'            <dd></dd>' +
						'        </dl>' +
						'    </div>' +
						'    <a class="btn_url this_btn" data-href="ctrip://wireless/destination/toCommetMain">继续点评开宝箱</a>' +
						'    <div class="this_text" style="padding-top:5px;">' +
						'        奖励将在审核后5日内发放，<br>' +
						'        如有问题请联系vot@ctrip.com' +
						'    </div>' +
						'</section>' +
						'<section class="bonus_frame failure">' +
						'    <div style="height:230px;">' +
						'        <dl>' +
						'            <dt>好可惜</dt>' +
						'            <dd></dd>' +
						'        </dl>' +
						'    </div>' +
						'    <a class="btn_url this_btn" data-href="ctrip://wireless/destination/toCommetMain">继续点评开宝箱</a>' +
						'</section>';
		return templates;
	}
};

var StartInit = {
	init: function(){
		this.GS_DOM = document.getElementById("dom"),
		this.$pageId = $("#page_id");
		switch (M_INFO.URL_TYPE()){
			case 0:
				if(M_INFO.UserID() && curVesrion>=5.5){
					this.GS_DOM.innerHTML = GS_Templates.tempHeader() + GS_Templates.tempList() + GS_Templates.tempIndex() + GS_Templates.tempFooter();
				}else{
					this.GS_DOM.innerHTML = GS_Templates.tempHeader() + GS_Templates.tempIndex() + GS_Templates.tempFooter();
				}
				this.$pageId.val(PageID.App[0]);
				break;
			case 1:
				if(curVesrion>=5.5){
					this.GS_DOM.innerHTML = GS_Templates.tempHeader() + GS_Templates.tempList() + GS_Templates.tempResult() + GS_Templates.tempFooter() + GS_Templates.tempFrame();
				}else{
					this.GS_DOM.innerHTML = GS_Templates.tempHeader() + GS_Templates.tempResult() + GS_Templates.tempFooter() + GS_Templates.tempFrame();
				}
				this.$pageId.val(PageID.App[1]);
				break;
		}

		// url 跳转
		this.urlReturn();
		
		HomeView.init();
		HomeView.bonusShow({
			state: 1
		});
		this.getMyBonusData();
		this.getUserListData();
	},
	urlReturn: function(){
		var $btn = $(".btn_url");
		$btn.on("click", function(){
			CtripUtil.app_open_url("ctrip://wireless/destination/toCommetMain", 1);
			CtripUtil.app_back_to_last_page("", true);
		});
	},
	showResult: function(){
		if(curVesrion>=5.5){
			this.GS_DOM.innerHTML = GS_Templates.tempHeader() + GS_Templates.tempList() + GS_Templates.tempResult() + GS_Templates.tempFooter() + GS_Templates.tempFrame();
		}else{
			this.GS_DOM.innerHTML = GS_Templates.tempHeader() + GS_Templates.tempResult() + GS_Templates.tempFooter() + GS_Templates.tempFrame();
		}
		this.$pageId.val(PageID.App[1]);
	},
	// 获取当前用户中奖信息
	getMyBonusData: function(){
		$.ajax({
			url: '/you/api/CommentOpenJewelBoxapi/GetAwardWinningStatListByUserId',
			type: 'GET',
			data: {
				Auth: M_INFO.UserID()
			},
			datatype: 'json',
			timeout: 20000,
			success: function(data){
				if(!!M_INFO.UserID()){
					HomeView.bonusShow(data);
				}
			},
			error: function(e){
			}
		});
	},
	// 滚动用户列表
	getUserListData: function(){
		$.ajax({
			url: '/you/api/CommentOpenJewelBoxapi/GetLatestAwardWinninglist',
			type: 'GET',
			data: {
				topNumber: 10
			},
			datatype: 'json',
			timeout: 20000,
			success: function(data){
				SetMarquee.init(data);
			},
			error: function(e){
				SetMarquee.init({
					state: -1
				});
			}
		});
	},
	// 抽奖
	getLotteryData: function(images, boxSite){
		$.ajax({
			url: '/you/api/CommentOpenJewelBoxapi/LuckyDraw',
			type: 'GET',
			data: {
				Auth: M_INFO.UserID(),
				commentid: M_INFO.CommentID()
			},
			datatype: 'json',
			timeout: 20000,
			success: function(data){
				Lottery.startData(data, images, boxSite);
			},
			error: function(e){
			}
		});
	}
};

var HomeView = {
	// 初始化
	init: function(){
		var self = this;

		self.showType    = false; //活动规则是否显示
		self.refer();

		self.ruleShow();

		// 中奖弹框
		Lottery.init();

		// 屏幕旋转
		window.addEventListener('orientationchange', function(){
			self.refer();
			self.ruleShow();
			Lottery.initDraw();
		}, false);
	},
	refer: function(){
		var self = this;
		self.$bodyHeight = $("body").height();
		self.$bonusMask  = $(".bonus_mask");
		self.$bonusMask.css("height",self.$bodyHeight+"px");
	},
	// 显示我的奖品
	bonusShow: function(data){
		var self = this;
		
		var $bonusBtn   = $(".bonus_list_click"),
			$bonusList  = $(".bonus_list"),
			isClick 	= false;
		$bonusBtn.css('display','block');

		self.sendHtml(data, $bonusList);

		var $bonusListHeight = self.getHeight($bonusList);

		$bonusList.css({
			"-webkit-transform": "translate3d(0, -"+$bonusListHeight+"px, 0)"
		});

		setTimeout(function(){
			$bonusList.css({
				"display": "block"
			});
		}, 1);

		$bonusBtn.on('click', function(){
			self.refer();
			if(!isClick){
				self.$bonusMask.on('click', function(){
					// a();
					self.execAnimate({
						state: 'none',
						x1: $bonusList,
						y1: -$bonusListHeight,
						x2: $bonusBtn,
						y2: 0
					});
					isClick = !isClick;
					self.$bonusMask.unbind('click');
				});
				self.execAnimate({
					state: 'block',
					x1: $bonusList,
					y1: -5,
					x2: $bonusBtn,
					y2: $bonusListHeight-5
				});
			}else{
				self.$bonusMask.unbind('click');
				self.execAnimate({
					state: 'none',
					x1: $bonusList,
					y1: -$bonusListHeight,
					x2: $bonusBtn,
					y2: 0
				});
			}
			isClick = !isClick;
		});
	},
	sendHtml: function(data, elem){
		var msg = '',
			$elem = elem;
		switch (data.state){
			case 0:
				var detail = data.Record;
				if(detail){
					for(var i=0,len=detail.length; i<len; i++){
						var name = this.bonusName(detail[i].AwardName);
						msg += '<li>' + name+ ' X' + detail[i].AwardNum + '</li>';
					}
					msg = '<ul class="bonus_list_detail">'+ msg +'</ul>';
				}else{
					msg = '<div class="bonus_list_info">你还没有中奖</div><article>没有中奖是中奖的前奏<br>快去点评，得开宝箱的机会</article><a href="/you/comment">马上点评</a>';
				}
				break;
			case 1:
				msg = '<div class="bonus_list_info">'+ ErrorMsg.wait +'</div>';
				break;
			default:
				msg = '<div class="bonus_list_info">'+ ErrorMsg.miss +'</div>';

		}
		$elem.html(msg);
	},
	bonusName: function(AwardName){
		var name = '';
		switch (AwardName){
			case "point100":
				name = "<span>100</span>携程积分";
				break;
			case "card100":
				name = "<span>100</span>元旅游基金";
				break;
			case "card50":
				name = "<span>50</span>元旅游基金";
				break;
		}
		return name;
	},
	execAnimate: function(conf){
		this.maskShow(conf.state);
		this.setAnimate({
			elem: conf.x1,
			tType: '-webkit-transform',
			tCSS: 'translate3d(0, '+conf.y1+'px, 0)'
		});
		this.setAnimate({
			elem: conf.x2,
			tType: '-webkit-transform',
			tCSS: 'translate3d(0, '+conf.y2+'px, 0)'
		});
	},
	// 显示活动规则
	ruleShow: function(){
		var self = this,
			$btn     = $(".bonus_rule"),
			$tIcon   = $(".bonus_rule_icon"),
			$tView   = $(".bonus_rule_art"),
			$show    = $(".bonus_rule article"),
			$tHeight = self.getHeight($show),
			isClick  = false;

		$btn.on('click', function(){
			if(!isClick){
				self.showType = true;
				$tIcon.css({
					'-webkit-animation': 'rotateup .6s ease-in-out forwards'
				});
				self.setAnimate({
					elem: $tView,
					tType: 'height',
					tCSS: $tHeight+'px'
				});
			}else{
				self.showType = false;
				$tIcon.css({
					'-webkit-animation': 'rotatedown .6s ease-in-out forwards'
				});
				self.setAnimate({
					elem: $tView,
					tType: 'height',
					tCSS: 0
				});
			}
			isClick = !isClick;
		});
	},
	// 遮罩层显示
	maskShow: function(type){
		if(this.showType){
			this.$bodyHeight = $("body").height();
			this.$bonusMask.css("height", this.$bodyHeight+"px");
		}
		this.$bonusMask.css("display", type);
	},
	// 高度获取
	getHeight: function(elem){
		var $elem = elem,
			$height = $elem.innerHeight();
		return $height;
	},
	// 设置动画
	setAnimate: function(conf){
		var $elem  = conf.elem,
			$tTime = conf.tTime || 0.5,
			$tType = conf.tType,
			$tCSS  = conf.tCSS,
			style  = {};
		style['-webkit-transition'] = $tType+' '+$tTime+'s ease-in-out';
		style[$tType] = $tCSS;
		$elem.css(style);
	}
};

// 滚动
var SetMarquee = {
	init: function(params){
		var self = this,
			msg = '';

		clearInterval(self.textTimer);

		self.moveDom = document.querySelector('.marquee');
		switch (parseInt(params.state)){
			case 0:
				var dataRecord = params.Record;
				if(dataRecord){
					for (var i=0,len=dataRecord.length; i<len; i++) {
						var name = HomeView.bonusName(dataRecord[i].AwardName);
						msg += '恭喜' + dataRecord[i].UserName + '获得:' + name + '；';
					}
				}else{
					msg = '暂无数据';
				}
				break;
			case 1:
				msg = ErrorMsg.wait;
				break;
			default:
				msg = ErrorMsg.miss;
		}
		self.sendMsg(msg);
		self.startInit();

		self.textTimer = setInterval(function(){
			self.loopAnimate();
		}, 10);

		window.addEventListener('orientationchange', function(){

			clearInterval(self.textTimer);

			self.refer();

			self.textTimer = setInterval(function(){
				self.loopAnimate();
			}, 10);
		}, false);
	},
	startInit: function(){
		this.moveX    = 0;
		this.distMove = 0;
		this.wrapper  = document.querySelector('.bonus_marquee');
		this.newDom   = '';
		
		var temp = document.createElement('dd');
		this.newDom = this.wrapper.appendChild(temp);
		this.newDom.innerHTML = this.moveDom.innerHTML;
		
		this.changeStyle();
	},
	sendMsg: function(msg){
		this.moveDom.innerHTML = msg;
	},
	refer: function(){
		this.newDom = this.wrapper.getElementsByTagName('dd')[0];
		this.changeStyle();
	},
	changeStyle: function(){
		this.distMove = this.moveDom.offsetWidth;
		this.newDom.style.cssText = 'left:'+this.distMove+'px;width:'+this.distMove+'px';
	},
	loopAnimate: function(){
		if(this.moveX == -this.moveDom.offsetWidth){
			this.moveX = 0;
		}else{
			this.moveDom.style.cssText = '-webkit-transform:translate3d('+this.moveX+'px, 0, 0)';
			this.newDom.style.webkitTransform = 'translate3d('+this.moveX+'px, 0, 0)';
			this.moveX--;
		}
	}
};

// 抽奖
var Lottery = {
	init: function(){
		this.pixelRatio = this.getDevicePixelRatio(); // 获得像素比
		this.frames     = 5; // 帧数
		this.interState = 1;
		this.loopTime   = 100;
		this.isStart    = true; //用户是否可以点击开始抽奖了
		this.talkNum    = Math.floor(Math.random()*16); //随机产生（0~15）之间的数
		this.canvas     = document.getElementById('bonus');
		this.initDraw();
	},
	initDraw: function(images){
		var tWarpper = document.querySelector('.bonus_box_open');
		if(!tWarpper) return;
		// 获得外围宽度
		var cWidth = tWarpper.offsetWidth;

		// 绘制canvas大小
		this.canvas.style.width = cWidth+'px';
		this.canvas.style.height = '85px';
		this.canvas.width = cWidth*this.pixelRatio;
		this.canvas.height = 80*this.pixelRatio;

		// 箱子需要绘制的坐标
		this.imgPos = [
			{
				x: (cWidth/3-90)/2,
				y: 85
			},
			{
				x: cWidth/3+(cWidth/3-90)/2,
				y: 85
			},
			{
				x: cWidth/3*2+(cWidth/3-90)/2,
				y: 85
			}
		];

		this.ctx = this.canvas.getContext('2d');

		this.loadImages();
	},
	loadImages: function(){
		var self = this,
			images = new Image();
		
		images.onload = function() {
			self.isStart = true;
			for(var i=0; i<3; i++){
				self.drawImageBox(images, 0, 0, 180, 170, self.imgPos[i].x);
				self.drawImageBox(images, 900, 0, 180, 170, self.imgPos[i].x);
			}
			self.canvas.addEventListener('click', function(e){
				if(self.isStart){
					var boxSite = self.getClickBox(e)-1;
					if(boxSite>=0){
						// self.playAnimate(images, self.imgPos[boxSite].x);
						if(M_INFO.CommentID() && M_INFO.UserID()){
							StartInit.getLotteryData(images, boxSite);
						}else{
							Lottery.startData({
								no: 1
							}, images, boxSite);
						}
					}
				}
			}, false);
		};
		images.src = 'http://pages.ctrip.com/destination/bonus/bonus_animate.png';
	},
	startData: function(data, images, boxSite){
		var self = this;
		self.playAnimate(data, images, self.imgPos[boxSite].x);
	},
	// 获得点击的坐标
	getEventPosition: function(ev){  
		var x, y;  
		if (ev.layerX || ev.layerX === 0) {  
			x = ev.layerX;  
			y = ev.layerY;  
		} else if (ev.offsetX || ev.offsetX === 0){ // Opera  
			x = ev.offsetX;  
			y = ev.offsetY;  
		}  
		return {x: x, y: y};  
	},
	// 获得像素比
	getDevicePixelRatio: function(){
		return window.devicePixelRatio || 1;
	},
	// 获得点击的箱子是哪个
	getClickBox: function(e){
		var sortBox = 0,
			site = this.getEventPosition(e);

		if((site.x > this.imgPos[0].x) && (site.x < (this.imgPos[0].x+85)) && (site.y < this.imgPos[0].y) && (site.y > 0)){
			sortBox = 1;
		}
		if((site.x > this.imgPos[1].x) && (site.x < (this.imgPos[1].x+85)) && (site.y < this.imgPos[1].y) && (site.y > 0)){
			sortBox = 2;
		}
		if((site.x > this.imgPos[2].x) && (site.x < (this.imgPos[2].x+85)) && (site.y < this.imgPos[2].y) && (site.y > 0)){
			sortBox = 3;
		}
		return sortBox;
	},
	clearRectBox: function(dx){
		if (typeof CanvasRenderingContext2D !== "undefined") {
			var dX = dx * this.pixelRatio,
				dY = 0,
				dW = 90 * this.pixelRatio,
				dH = 85 * this.pixelRatio;
			this.ctx.clearRect(dX, dY, dW, dH);
			return this;
		}
	},
	drawImageBox: function(images, sx, sy, sw, sh, dx){
		if (typeof CanvasRenderingContext2D !== "undefined") {
	        var dX = dx * this.pixelRatio,
		        dY = 0,
		        dW = 90 * this.pixelRatio,
		        dH = 85 * this.pixelRatio;

			this.ctx.drawImage(images, sx, sy, sw, sh, dX, dY, dW, dH);
	        return this;
		}
	},
	playAnimate: function(data, images, x){
		var self = this;
		self.clearRectBox(x);
		self.drawImageBox(images, 0, 0, 180, 170, x);
		self.timer = setInterval(function(){
			if(self.interState == self.frames){
				clearInterval(self.timer);
				setTimeout(function(){
					self.showFrame(data);
				}, (self.loopTime+100));
			}else{
				self.clearRectBox(x);
				self.drawImageBox(images, self.interState*180, 0, 180, 170, x);
				self.interState++;
			}
		}, self.loopTime);
	},
	showFrame: function(data){
		var bodyHeight = document.querySelector('body').offsetHeight,
			mask 	   = document.querySelector('.bonus_mask'),
			frame      = '',
			text       = '';

		if(data.no){
			frame = document.querySelector('.bonus_frame.failure');
			text  = document.querySelector('.bonus_frame.failure dd');
			text.innerHTML = '快去点评吧！';
		}else{
			if(data.IsWin){
				var name = HomeView.bonusName(data.AwardName);
				frame = document.querySelector('.bonus_frame.success');
				text  = document.querySelector('.bonus_frame.success dd');
				text.innerHTML = '你的小宇宙遭遇M78星云冲击，强势爆发，<br>获得 '+name;
			}else{
				if(data.IsRepeat){
					frame = document.querySelector('.bonus_frame.failure');
					text  = document.querySelector('.bonus_frame.failure dd');
					text.innerHTML = '您已经抽过奖了，<br>请再去点评获得新的抽奖机会!';
				}else{
					frame = document.querySelector('.bonus_frame.failure');
					text  = document.querySelector('.bonus_frame.failure dd');
					text.innerHTML = this.setSpeak();
				}
			}
		}

		mask.style.cssText = 'display:block;height:'+bodyHeight+'px;z-index:1001;';
		frame.style.cssText = 'display:block';
	},
	setError: function(){
		var bodyHeight = document.querySelector('body').offsetHeight,
			mask 	   = document.querySelector('.bonus_mask'),
			frame      = '',
			text       = '';

		frame = document.querySelector('.bonus_frame.success');
		text  = document.querySelector('.bonus_frame.success dd');
		text.innerHTML = '亲，快去点评吧，赢取奖机会!';
		mask.style.cssText = 'display:block;height:'+bodyHeight+'px;z-index:1001;';
		frame.style.cssText = 'display:block';
	},
	setSpeak: function(){
		var talk = [];
		talk = [
			'虽说人艰不拆，但是这次真的木有中奖。<br>再点评一次，幸运总会眷顾你。',
			'貌似，可能……就差一点点了。<br>马上中奖，再点评试试吧！',
			'礼品卡擦肩而过，但是积攒人品终究会爆发。<br>亲，对自己的人品有信心吗？',
			'一切点评一条就放弃的行为都是耍流氓！<br>多写点评，中奖妥妥的！',
			'虽说木有中奖，但绝不放弃治疗。<br>药可以停，点评一定不能停。',
			'别伤心，<br>分享中奖率翻倍，快分享给好友！',
			'亲，你长得太好看了，下次一定中！',
			'亲！幸运女神说你就差一点点！<br>再写一条吧！',
			'攒点人品继续抽，写个点评再抽一次！',
			'曾经有一份豪礼在你面前，<br>可是你没有抽中啊。',
			'据说分享活动再来会有双倍几率噢~~',
			'每天早上的中奖概率是最高的，<br>你造吗？',
			'继续点评吧，<br>你的RP一定会爆发的！<br>这是我说的！',
			'休息会儿，继续再写，<br>奖励源源不断的发给你。',
			'OH!MY GOD<br>试试打卡其他的宝箱吧！',
			'世事无奈，再来一次吧'
		];
		return talk[this.talkNum];
	}
};
