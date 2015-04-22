<?php
$jsonp = $_REQUEST["callback"];
$page = $_GET ["page"];

switch ($page){
	case 1:
		$str = '{
					"state": 0,
					"msg": "",
					"list": [
						{
							"url":"1",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/01.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区最佳国内景区"
						},
						{
							"url":"2",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/02.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						},
						{
							"url":"3",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/03.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						}
					]
				}';
		break;  
	case 2:
		$str = '{
					"state": 0,
					"msg": "",
					"list": [
						{
							"url":"4",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/04.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						},
						{
							"url":"5",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/05.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						},
						{
							"url":"6",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/06.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						}
					]
				}';
		break; 
	case 3:
		$str = '{
					"state": 0,
					"msg": "",
					"list": [
						{
							"url":"1",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/07.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						},
						{
							"url":"2",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/08.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						},
						{
							"url":"3",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/09.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						}
					]
				}';
		break;
	case 4:
		$str = '{
					"state": 0,
					"msg": "",
					"list": [
						{
							"url":"10",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/10.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						}
					]
				}';
	  	break;
	case 5:
		$str = '{
					"state": 0,
					"msg": "",
					"list": [
						{
							"url":"10",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/10.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						}
					]
				}';
	  	break;
	case 6:
		$str = '{
					"state": 0,
					"msg": "",
					"list": [
						{
							"url":"10",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/10.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						}
					]
				}';
	  	break;
	case 7:
		$str = '{
					"state": 0,
					"msg": "",
					"list": [
						{
							"url":"10",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/10.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						}
					]
				}';
	  	break;
	case 8:
		$str = '{
					"state": 0,
					"msg": "",
					"list": [
						{
							"url":"10",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/10.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						}
					]
				}';
	  	break;
	case 9:
		$str = '{
					"state": 0,
					"msg": "",
					"list": [
						{
							"url":"10",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/10.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						}
					]
				}';
	  	break;
	case 10:
		$str = '{
					"state": 0,
					"msg": "",
					"list": [
						{
							"url":"10",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/10.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						}
					]
				}';
	  	break;
	case 11:
		$str = '{
					"state": 0,
					"msg": "",
					"list": [
						{
							"url":"10",
							"img":"http://pages.ctrip.com/destination/wenyiqinnian/10.jpg",
							"title": "国内必须去",
			            	"content": "最佳国内景区"
						}
					]
				}';
	  	break;
}
$str = $jsonp . "(" .$str.")";
echo $str;
?>