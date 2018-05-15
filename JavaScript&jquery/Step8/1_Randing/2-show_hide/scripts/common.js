/**
 * Debug Log
 */
if (!window.console) {
  var Console = function() {
   return {
    log : function(message) {},
    info : function(message) {},
    warn : function(message) {},
    error : function(message) {}
   };
  };
  console = Console();
}

// 공통 Ready
$(document).ready(function(){
    //숫자만 입력
	$(".number").keyup(function(event){
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^0-9]/gi,''));
        }
    });
	
	// 마우스 우클릭 방지
	$(document).on("contextmenu", "body", function (e) {
	    return false;
	});
	
});

//
$(window).load(function(){
	var now = new Date();   
//	var yy = now.getFullYear();
//	var mm = now.getMonth() + 1;
//	var dd = now.getDate();
//	var currDate = yy + "" + mm + "" + dd;
//	parseInt(currDate);
	var currSeconds = now.getSeconds();
	var zero = parseInt(currSeconds)%5;
	if(zero == 0 ){
		//secertBag();
	}
});
// 시크릿백 이벤트 팝업창 호출
function secertBag(){
	$.ajax({
        async : false,
        type : "POST",
        data : {"EVT_MST_IDX":"5",
        	    "CURR_PATH" : location.href},
        url : "/fr/louissquare/eventSecertViewPopupAjax.do",
        success : function (data) 
        {
            if(data.viewYn == "Y" && data.secertYn == "Y")
            {
            	var scmUrl = data.result.SCM_URL.replace('bag','banner');
            	    scmUrl = scmUrl.replace('jpg','png');
            	var $eventSecretImg = data.imgDomain+scmUrl; // 시크릿 배너 이미지 경로
        		var $eventSecret = $("<div style='position: absolute; z-index: 1000; top: 50%; left: 50%; margin: -80px 0 0 -80px;'>"
        				         //+ "<a href=javascript:goEventSecertRegist('"+data.result.EVT_SCM_IDX+"','"+data.loingYn+"','"+data.result.EVT_MST_IDX+"');'>"
        				         + "<a href=javascript:;' class='btn-popup'>"
        				         + "<img src='" + $eventSecretImg + "' alt='시크릿 Bag. 숨은 가방 찾기 이벤트 배너' /></a><div style='position: absolute; top: 12px; right: 13px;'>"
        				         + "<a href='javascript:;' class='btn-close'><img src='"+data.imgDomain+"/fr/img/common/event_secret_banner_close.png' alt='시크릿 Bag. 숨은 가방 찾기 이벤트 배너 닫기' /></a></div></div>");
        		$eventSecret.prependTo($document);
        		$eventSecret.find('a.btn-close').one('click', function(e){
        			e.preventDefault();
        			$(this).parent().parent().remove();
        		});
        		$eventSecret.find('a.btn-popup').one('click', function(e){
        			if(data.LoginYn == 'N')
        			{
            			if(confirm("로그인 후 이벤트 참여가 가능합니다. \n로그인하시겠습니까?")){
            				goLogin('','','Y','N'); 
                			e.preventDefault();
                			$('a.btn-close').parent().parent().remove();
            			}
        				
        				
        			}else{
        				if(confirm("축하합니다. 새로운 아이콘을 찾으셨습니다. \n 지금까지 찾으신 아이콘을 확인하시겠습니까?"))
        				{
        		            $.ajax({
        		                async : false,
        		                type : "POST",
        		                data : {"EVT_SCM_IDX":data.result.EVT_SCM_IDX,"EVT_MST_IDX":data.result.EVT_MST_IDX,"eventProgressYn":data.secertYn},
        		                url : "/fr/louissquare/eventSecertRegistAjax.do",
        		                success : function (data) 
        		                {
        		                	if(data.eventUseYn =='Y'&& data.viewYn == 'Y')
	        		                {
        		                		e.preventDefault();
	        	            			$('a.btn-close').parent().parent().remove();
	        		                	window.open("/fr/louissquare/eventMySecertBagViewPopup.do","_blank","scrollbars=no,resizable=yes,,width=820,height=670");
        		                	}else{
        		                		if(data.eventUseYn =='Y') 
        		                		{
	        		                		e.preventDefault();
		        	            			$('a.btn-close').parent().parent().remove();
		        	            			alert(data.alertMsg);
		        	            			return;
        		                		}
        		                		if(data.viewYn =='Y') 
        		                		{
        		                			e.preventDefault();
		        	            			$('a.btn-close').parent().parent().remove();
		        	            			alert(data.alertMsg);
		        	            			return;	
        		                		}
        		                	}
        		                },
        		                error : function (err)
        		                {
        		                    alert(err);
        		                	return;
        		                }
        		            });
        				}
        			}		
        		});
            }
        },
        error : function (err)
        {
            return;
        }
    });
}

//사이트구분
function getSite()
{
    if($("#shopGate").find("li:eq(1)").hasClass("active"))
    {
    	return 2;
    }
    else
    {
    	return 1;
    }
}
// 우편번호 팝업
function goSearchZipCode(serverDomain)
{
    window.open(serverDomain + "/fr/common/commonZipCodePopup.do", "searchZipCodePopup", "width=750, height=600, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=yes");
}

// 로그인 팝업
function goLogin(serverDomain, url, parentFunctionYn, confirmYn) 
{
    if(url == "")
    {
        url = document.location.href;
    }
    url = encodeURIComponent(url);
    
    if(confirmYn == 'N')
    {
        if(parentFunctionYn!=undefined && "Y"==parentFunctionYn)
        {
            window.open(serverDomain + "/fr/manager/loginPopup.do?pFunYn=Y&url="+url + "&site=" + getSite(), "loginPopup", "width=804, height=415, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no");
        }
        else
        {
            window.open(serverDomain + "/fr/manager/loginPopup.do?url=" + url + "&site=" + getSite(), "loginPopup", "width=804, height=415, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no");	
        }
    }
    else
    {
    	if(confirm("직영몰 회원 로그인 시 이용 가능한 서비스입니다.(SNS 로그인 제외)\n직영몰 ID로 로그인하시겠습니까?"))
    	{
    		if(parentFunctionYn!=undefined && "Y"==parentFunctionYn)
    		{
    			window.open(serverDomain + "/fr/manager/loginPopup.do?pFunYn=Y&url="+url + "&site=" + getSite(), "loginPopup", "width=804, height=415, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no");
    		}
    		else
    		{
    			window.open(serverDomain + "/fr/manager/loginPopup.do?url=" + url + "&site=" + getSite(), "loginPopup", "width=804, height=415, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no");	
    		}
    	}
    }
    
}

// 비회원 로그인 팝업 (실명인증)
function accreditationLogin(serverDomain)
{
    var url = document.location.href;
    url = encodeURIComponent(url);
    window.open(serverDomain + "/fr/manager/accreditationLoginStep1Popup.do?site=" + getSite() + "&url=" + url, "loginPopup", "width=804, height=415, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no");
}

// SNS 회원 인증 팝업
function accreditationDi(serverDomain)
{
    window.open(serverDomain + "/fr/manager/accreditationLoginStep2Popup.do?site=" + getSite(), "loginPopup", "width=804, height=415, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no");
}

//쿠폰받기 ( 도메인정보[필수] , 상품코드[필수], 장바구니코드[선택] )
function getCoupon(jsp_http,ov,ov2)
{
	$.ajax({
        type : "POST", 
        url : jsp_http+"/fr/common/checkLogin.do",  
        async : false,
        success : function (data) 
        {
            if(data.result=="Y")    // 로그인 상태
	        {
            	popup(jsp_http+"/fr/reward/onCouponPopup.do?PRD_MST_CD="+ov+"&CART_IDX="+ov2, '400','350');
	        }
	        else
	        {
	        	goLogin(jsp_http,'');    
	        }
        },
        error : function () 
        {
            alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
        }
    });
}

// L포인트 쿠폰교환
function getLpointCoupon(jsp_http,ov,ov2)
{
	$.ajax({
        type : "POST", 
        url : jsp_http+"/fr/common/checkLogin.do",  
        async : false,
        success : function (data) 
        {
            if(data.result=="Y")    // 로그인 상태
	        {
            	if(confirm("L포인트로 교환한 쿠폰은 발급 이후 취소가 되지 않습니다.\n"+ov2+"P를 사용하여 쿠폰을 교환하시겠습니까?"))
            	{
            		$.ajax({
            	        type : "POST", 
            	        url : jsp_http+"/fr/reward/lpointCouponDownAjax.do",  
            	        data : {"COUPON_IDX" : ov}, 
            	        async : false,
            	        success : function (data) 
            	        {
            	            if(data.result=="S00")    // 성공
            	            {
            	            	alert("쿠폰이 발급되었습니다.\nMY LOUIS > 쇼핑혜택 > 쿠폰\n페이지에서 확인하실 수 있습니다.");  
            	            }
            	            else if(data.result=="F03")  // L포인트 부족
            	            {
            	        	    alert("보유하신 L포인트가 부족합니다.");  
            	            }
            	            else	
            	            {
            	        	    alert("데이터 오류 입니다. 다시 시도 해 주십시오.");  
            	            }
            	        },
            	        error : function () 
            	        {
            	            alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
            	        }
            	    });
            	}	
	        }
	        else
	        {
	        	goLogin(jsp_http,'');    
	        }
        },
        error : function () 
        {
            alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
        }
    });
}

// 사은품 신청
function getLpointGift(jsp_http,ov, ov2)
{
	var text="";
	var point = 0;
	point = ov2 == "Y" ? "10,000" : "25,000";
	    
	if(ov=="M")
	{
		text= point + "를 사용하여\n 이달의 사은품을 교환\n";
	}
	else if(ov=="T")
	{
		text= point + "를 사용하여 영화티켓을\n";
	}	
	if(text!="")
	{
		$.ajax({
	        type : "POST", 
	        url : jsp_http+"/fr/common/checkLogin.do",  
	        async : false,
	        success : function (data) 
	        {
	            if(data.result=="Y")    // 로그인 상태
		        {
	            	if(confirm(text+"신청하시겠습니까?"))
	        		{
	        			$.ajax({
	        		        type : "POST", 
	        		        url : jsp_http+"/fr/reward/lpointGiftAjax.do",  
	        		        data : {"PIT_REQ_TYPE" : ov}, 
	        		        async : false,
	        		        success : function (data) 
	        		        {
	        		            if(data.result=="S00")    // 성공
	        		            {
	        		            	alert("정상적으로 신청이 완료되었습니다.");  
	        		            }
	        		            else if(data.result=="F03")  // L포인트 부족
	        		            {
	        		        	    alert("보유하신 L포인트가 부족합니다.");  
	        		            }
	        		            /*else if(data.result="F05") // 100개 제한
	        		            {
	        		                alert("이벤트 기간동안 진행되는 한정수량이 모두 소진되었습니다.\n성원에 감사드립니다.");
	        		            }*/
	        		            else if(data.result="F06") // SMS, 이메일 수신동의 필요
	        		            {
	        		                //팝업
	        		                popup(jsp_http+'/fr/louissquare/lpointInfoPopup.do', '380', '450', 'no', '_lpointInfo');
	        		            }
	        		            else	
	        		            {
	        		        	    alert("데이터 오류 입니다. 다시 시도 해 주십시오.");  
	        		            }
	        		        },
	        		        error : function () 
	        		        {
	        		            alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
	        		        }
	        		    });
	        		}
		        }
		        else
		        {
		        	goLogin(jsp_http,'');    
		        }
	        },
	        error : function () 
	        {
	            alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
	        }
	    });
	}
}

//송장번호 조회
function invoicePop(jsp_http, ov1, ov2, ov3, ov4)
{
	$.ajax({
        type : "POST", 
        url : jsp_http+"/fr/order/invoiceInfoAjax.do",  
        data : {"ORD_MST_CD" : ov1, "PRD_MST_CD" : ov2, "ORD_PRD_SEQ_IDX" : ov3, "ORD_PRD_IDX" : ov4},
        async : false,
        success : function (data) 
        {
        	popup(data.result, "555", "600", "yes", "invoice");
        },
        error : function () 
        {
            alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
        }
    });
}

//구매확정
function orderFix(jsp_http, ov1, ov2, ov3, ov4)
{
	if(confirm("구매확정 후에는 교환/반품 신청을 하실 수 없습니다.\n구매확정 하시겠습니까?\n(구매확정 후 나의 상품평을 작성하실 수 있는 팝업이 출력됩니다.)"))
	{
		$.ajax({
			type : "POST", 
			url : jsp_http+"/fr/order/orderFixAjax.do",  
			data : {"ORD_MST_CD" : ov1, "PRD_MST_CD" : ov2, "ORD_PRD_SEQ_IDX" : ov3, "ORD_PRD_IDX" : ov4},
			async : false,
			success : function (data) 
			{
				if(data.result=="Y")
				{
					location.reload();
					var url = jsp_http+"/fr/product/productCommentFormPopup.do?PRD_MST_CD="+ov2;
		    		popup(url, "820", "530", "no");
				}
				else
				{
					alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
				}
			},
			error : function () 
			{
				alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
			}
		});	
	}
}

//장바구니 담기 ( 도메인정보[필수] , 상품코드[필수], 옵션코드[필수], 구매수량[필수] )
function putCart(jsp_http,ov,ov2,ov3) {
    $.ajax({
        type : "POST", 
        url : jsp_http+"/fr/order/insertCartAjax.do",  
        data : {"PRD_MST_CD" : ov, "PRD_OPT_IDX" : ov2, "CRT_CNT": ov3}, 
        async : false,
        success : function (data) 
        {
            if(data.cart.result=="S00")    // 성공
            {
            	// 광고효과측정 쿠키
            	writeCookie("KMAZ_"+ov, new Date().getDate(), 7);
            	
            	if( confirm("장바구니에 담았습니다.\n장바구니로 이동하시겠습니까?") )
            	{
            		try
                    {
            			if(opener)
                		{
            				if(opener.location.href.indexOf("louisclub.com") > -1)
            				{
            					//상품간편보기 팝업 호출
                    	    	$(opener.location).attr("href",jsp_http+"/fr/order/cart.do?site="+getSite());
                    	    	self.close();
            				}
            				else
            				{
            					$(location).attr("href",jsp_http+"/fr/order/cart.do?site="+getSite());
            				}
                		}
                	    else
                	    {
                	        $(location).attr("href",jsp_http+"/fr/order/cart.do?site="+getSite());
                	    }
                    }
                    catch(e)
                    {
                    	 $(location).attr("href",jsp_http+"/fr/order/cart.do?site="+getSite());
                    }
            	}
            	else
            	{
        	        $("#headerCartCount").text(data.cart.count);
        	        if($("#utility").find(".no_login").length>0)
        	        {
        	            $("#utility").find(".no_login").remove();
        	            $("#utility").find(".cart").before("<li><a href='"+jsp_http+"/fr/manager/logout.do?site="+getSite()+"' class='ir'>LOGOUT</a></li><li><a href='"+jsp_http+"/fr/mylouis/orderList.do?site="+getSite()+"' >ORDER</a></li><li><a href='"+jsp_http+"/fr/mylouis/mylouisSubMain.do?site="+getSite()+"' >MY LOUIS</a></li>");
        	        }  
            	}
            }
            else if(data.cart.result=="F00")  // 인증오류
            {
        	    goLogin(jsp_http,'','Y','N');    
            }
            else if(data.cart.result=="F01")  // 판매중인 상품 X
            {
        	    alert("판매중인 상품이 아닙니다.");  
            }
            else if(data.cart.result=="F02")  // 옵션 수량부족
            {
        	    alert("수량이 부족합니다.");  
            }
            else	
            {
        	    alert("데이터 오류 입니다. 다시 시도 해 주십시오.");  
            }
        },
        error : function () 
        {
            alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
        }
    });
}

//바로구매 ( 도메인정보[필수] , 상품코드[필수], 옵션코드[필수], 구매수량[필수], 픽업스토어YN, 팝업YN, 픽업스토어코드 )
function goDirectOrder(jsp_http,ov,ov2,ov3,pickup,popup,pickupShopCode) {
	if(pickup!="Y"){ pickup="N"; }
	$.ajax({
        type : "POST", 
        url : jsp_http+"/fr/order/directCheckAjax.do",  
        data : {"PRD_MST_CD" : ov, "PRD_OPT_IDX" : ov2, "CRT_CNT" : ov3, "pickup" : pickup, "popup" : popup, "pickupShopCode" : pickupShopCode}, 
        async : false,
        success : function (data) 
        {
            if(data.result=="S00")    // 성공
	        {
            	// 광고효과측정 쿠키
            	writeCookie("KMAZ_"+ov, new Date().getDate(), 7);
            	
    		    if(popup == 'Y')
    		    {
            		if ( confirm("주문서 작성 화면으로 이동됩니다.\n팝업창을 닫으시겠습니까?") )
            		{
            			if(pickup=="Y")
            			{
            				alert("픽업스토어를 신청하셨습니다.\n상품 결제 후 주문완료페이지를\n인쇄하셔서 매장을 방문해주세요.");
            			}
	    		    	// 간편보기 팝업에서 호출
	    		    	$(opener.location).attr("href",jsp_http+"/fr/order/order.do?PRD_MST_CD="+ov+"&PRD_OPT_IDX="+ov2+"&CRT_CNT="+ov3+"&PATH=direct&pickup="+pickup+"&pickupShopCode="+pickupShopCode+"&site="+getSite()+"&privateYn="+$("input[name='privateYn']").val() );
	    		    	self.close();
            		}
    		    }
    		    else
    		    {
        			if(pickup=="Y")
        			{
        				alert("픽업스토어를 신청하셨습니다.\n상품 결제 후 주문완료페이지를\n인쇄하셔서 매장을 방문해주세요.");
        			}
    		    	$(location).attr("href",jsp_http+"/fr/order/order.do?PRD_MST_CD="+ov+"&PRD_OPT_IDX="+ov2+"&CRT_CNT="+ov3+"&PATH=direct&pickup="+pickup+"&pickupShopCode="+pickupShopCode+"&site="+getSite()+"&privateYn="+$("input[name='privateYn']").val() );
    		    }
	        }
	        else if(data.result=="F00")  // 인증오류
	        {
	        	accreditationLogin(jsp_http);    
	        }
	        else if(data.result=="F01")  // 판매중인 상품 X
	        {
	        	alert("판매중인 상품이 아닙니다.");  
	        }
	        else if(data.result=="F02")  // 옵션 수량부족
	        {
	        	alert("수량이 부족합니다.");  
	        }
	        else if(data.result=="F03")  // 프라이빗 상품 대상자 X	
	        {
	        	alert("PRIVATE SHOP 대상자가 아닙니다.");  
	        }
	        else if(data.result=="F04")  // 인증오류
	        {
	        	accreditationDi(jsp_http);    
	        }
	        else	
	        {
	        	alert("데이터 오류 입니다. 다시 시도 해 주십시오.");  
	        }
        },
        error : function () 
        {
            alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
        }
    });
}

//장바구니 이동 ( 도메인정보[필수] )
function goCart(jsp_http)
{
	$.ajax({
      type : "POST", 
      url : jsp_http+"/fr/common/checkLogin.do",  
      async : false,
      success : function (data) 
      {
          if(data.result=="Y")    // 로그인 상태
	        {
        	    $(location).attr("href",jsp_http+"/fr/order/cart.do?site="+getSite());
	        }
	        else
	        {
	        	goLogin(jsp_http, jsp_http+"/fr/order/cart.do?site="+getSite());    
	        }
      },
      error : function () 
      {
          alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
      }
  });
}

//KT쿠폰받기 ( 도메인정보[필수] )
function getKtCoupon(jsp_http)
{
	$.ajax({
        type : "POST", 
        url : jsp_http+"/fr/common/checkLogin.do",  
        async : false,
        success : function (data) 
        {
            if(data.result=="Y")    // 로그인 상태
	        {
            	popup(jsp_http+"/fr/reward/ktCertifyPopup.do", '400','460');
	        }
	        else
	        {
	        	goLogin(jsp_http,'');    
	        }
        },
        error : function () 
        {
            alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
        }
    });
}

//SK쿠폰받기 ( 도메인정보[필수] )
function getSkCoupon(jsp_http,price)
{
	$.ajax({
        type : "POST", 
        url : jsp_http+"/fr/common/checkLogin.do",  
        async : false,
        success : function (data) 
        {
            if(data.result=="Y")    // 로그인 상태
	        {
            	popup(jsp_http+"/fr/reward/skCertifyPopup.do?SK_PRICE="+price, '400','530');
	        }
	        else
	        {
	        	goLogin(jsp_http,'');    
	        }
        },
        error : function () 
        {
            alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
        }
    });
}

//로그인 헤더 영역 변경
function changeLoginHeader(jsp_http)
{
	$.ajax({
        type : "POST", 
        url : jsp_http+"/fr/common/checkLoginCartCount.do",  
        async : false,
        success : function (data) 
        {
            if(data.result=="Y")    // 로그인 상태
	        {
    	        //로그인영역
	            if($("#utility").find(".no_login").length>0)
	            {
	                //장바구니수량
	                $("#headerCartCount").text(data.count);
	            
	                $("#utility").find(".no_login").remove();
	                $("#utility").find(".cart").before("<li><a href='"+jsp_http+"/fr/manager/logout.do?site="+getSite()+"' class='ir'>LOGOUT</a></li><li><a href='"+jsp_http+"/fr/mylouis/orderList.do?site="+getSite()+"' >ORDER</a></li><li><a href='"+jsp_http+"/fr/mylouis/mylouisSubMain.do?site="+getSite()+"' >MY LOUIS</a></li>");
	            }
	        }
        },
        error : function () 
        {
            alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
        }
    });
}

/*
 * 날짜보기
 * strDate : 날짜(YYYYMMDD)
 * str : 구분자
 * */
function getDateView(strDate, str){
    strDate = strDate.replace(/\-/g, "");
    return strDate.substring(0, 4) + str + strDate.substring(4, 6) + str + strDate.substring(6, 8);
}
/*
 * 날짜보기
 * strDate : 날짜(YYYYMMDD HHMMSS)
 * str : 날짜 구분자
 * str2 : 시간 구분자
 * */
function getDateTimeView(strDate, str, str2){
    strDate = strDate.replace(/\-/g, "");
    return strDate.substring(0, 4) + str + strDate.substring(4, 6) + str + strDate.substring(6, 8) + " " + strDate.substring(8, 10) + str2 + strDate.substring(10, 12) + str2 + strDate.substring(12, 14);
}

// 날짜 셋팅 - 오늘, 일주일, 15일, 한달, 두달
function fnDateSet(v_start_name, v_end_name, s_year, s_month, s_day, e_year, e_month, e_day, seperator){
    $("#"+v_start_name	).val(getCalculatedDate(s_year, s_month, s_day, seperator));
    $("#"+v_end_name	).val(getCalculatedDate(e_year, e_month, e_day, seperator));
}
function getCalculatedDate(iYear, iMonth, iDay, seperator){
    //현재 날짜 객체를 얻어옴.
    var gdCurDate = new Date();

    //현재 날짜에 날짜 게산.
    gdCurDate.setYear ( gdCurDate.getFullYear() + iYear );
    gdCurDate.setMonth( gdCurDate.getMonth() 	+ iMonth);
    gdCurDate.setDate ( gdCurDate.getDate() 	+ iDay 	);

    //실제 사용할 연, 월, 일 변수 받기.
    var giYear  = gdCurDate.getFullYear();
    var giMonth = gdCurDate.getMonth()+1;
    var giDay   = gdCurDate.getDate();

    //월, 일의 자릿수를 2자리로 맞춘다.
    giMonth = "0" + giMonth;
    giMonth = giMonth.substring(giMonth.length-2,giMonth.length);
    giDay   = "0" + giDay;
    giDay   = giDay.substring(giDay.length-2,giDay.length);

    //display 형태 맞추기.
    return giYear + seperator + giMonth + seperator +  giDay;
}

/**
 * 글자제한
 * onkeyup="getStrByte(this,'#byte', 200);"
 */
function getStrByte(obj, tgt, size) {
	var str = obj.value;
	var str_max = size;	
	var p = 0;
	var bytes = 0;
	var len_num = 0;  
	var str2 = "";
 
	if(str != ""){
		for(p=0; p<str.length; p++) {
			(str.charCodeAt(p) > 255) ? bytes+=3 : bytes++; //한글은 3byte, 영문, 숫자, 공백은 1byte
			if(bytes <= str_max){
				len_num = p + 1;
			}else{
				alert(size + " byte를 초과 입력할수 없습니다.\n초과된 내용은 자동으로 삭제 됩니다.");
				str2 = str.substr(0, len_num);
				obj.value = str2;
				break;
			}
			$(tgt).text(bytes);
		}
	}else{
		$(tgt).text("0");
	}
	obj.focus();
}
/**
 * 글자제한(글자수기준)
 * onkeyup="getStrLength(this,'#byte', 200);"
 */
function getStrLength(obj, tgt, size) {
	var str = obj.value;
	var str_max = size;	
	var length = 0;
	var str2 = "";
 
	if(str != ""){
		length = str.length;
		if(length > str_max){
			alert(size + " 글자를 초과 입력할수 없습니다.\n초과된 내용은 자동으로 삭제 됩니다.");
			str2 = str.substr(0, str_max);
			obj.value = str2;
		}
		$(tgt).text(length);
	}else{
		$(tgt).text("0");
	}
	obj.focus();
}
/**
 * 가격숫자만 입력가능체크 및 콤마
 * @param obj
 * @param fLen
 * @returns {Boolean}
 */
function addComma(obj,fLen)
{ 
   if(event.keyCode == 37 || event.keyCode == 39 ) 
   {                                              
      return;
   }
   var fLen = fLen || 2; 
   var strValue = obj.value.replace(/,|\s+/g,'');
   var strBeforeValue = (strValue.indexOf('.') != -1)? strValue.substring(0,strValue.indexOf('.')) :strValue ;
   var strAfterValue  = (strValue.indexOf('.') != -1)? strValue.substr(strValue.indexOf('.'),fLen+1) : '' ;
   if(isNaN(strValue))
   {
      alert('숫자만 입력가능합니다.');
      obj.value = "";
      return false;
   }
   var intLast =  strBeforeValue.length-1;
   var arrValue = new Array;
   var strComma = '';

   for(var i=intLast,j=0; i >= 0; i--,j++)
   { 
         
          if( j !=0 && j%3 == 0) 
          {   
              strComma = ',';
          }
          else
          {
              strComma = '';
          } 
          arrValue[arrValue.length] = strBeforeValue.charAt(i) + strComma  ;
   }
   obj.value=  arrValue.reverse().join('') +  strAfterValue;
}
/**
 * 콤마 만들기
 * @param x
 * @returns
 */
function setComma(x){
       var pattern = /(^[+-]?\d+)(\d{3})/;
       x += '';
       while (pattern.test(x)){
           x = x.replace(pattern, '$1' + ',' + '$2');
       }
       return x;
}
/**
 * 콤마제거
 * @param val
 * @returns
 */
function removeComma(val) {
    console.log("val " + val)
    if (val == "" || val == undefined){
        val ="";
    }
    self.focus();
    return val.split(",").join("");
}

//콤마제거후 숫자리턴
function getInt(val) {
    
    if (val == "" || val == undefined || val == null){
        val ="0";
    }
    return val.split(",").join("");
}

//SNS (FACEBOOK)
function link_sns() 
{
	var paramUrl = location.href;
	var paramDesc = "LOUIS QUATORZE";
	var paramImgUrl = "http://www.louisclub.com/fr/img/common/logo.jpg";
	
	// CREATE PARAM
	var url = "http://www.facebook.com/share.php?s=100&p[url]="+ paramUrl;
	url += "&p[images][0]="+ paramImgUrl; 
	url += "&p[title]="+ paramDesc;
	
	url = url.split("#").join("%23");
	url = encodeURI(url);
	
	// OPEN POPUP
	window.open(url,'sharer','toolbar=0,status=0,width=1024,height=665');
}

//url 복사
function copy_trackback(trb)
{
    var IE=(document.all)?true:false;
    
    var ie_version = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
    	  ie_version = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape')
    {
      var ua = navigator.userAgent;
      var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
    	  ie_version = parseFloat( RegExp.$1 );
    }
    
    if (IE) {
        if(confirm("이 페이지의 주소를 클립보드에 복사하시겠습니까?")) 
        {
            window.clipboardData.setData("Text", trb);
            alert("주소가 복사되었습니다.\n붙여 넣을 곳에 Ctrl+V 하세요.");
        }
    } else {
    	if(ie_version == 11)
        {
            if(confirm("이 페이지의 주소를 클립보드에 복사하시겠습니까?")) 
            {
                window.clipboardData.setData("Text", trb);
                alert("주소가 복사되었습니다.\n붙여 넣을 곳에 Ctrl+V 하세요.");
            }
        }
    	else
    	{
    		temp = prompt("이 페이지의 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요.", trb);
    	}
    }
}

//즐겨찾기 추가
function addFavorite(jsp_http)
{
    var title = "루이까또즈 직영몰";  //document.title;
    var url = "http://www.louisclub.com";  //location.href;

    //L포인트지급
	$.ajax({
        type : "POST", 
        url : jsp_http+"/fr/reward/lpointRegistAddFavorite.do",  
        async : false,
        success : function (data) 
        {
            //alert("data.result-"+data.result);
        },
        error : function () 
        {
            //alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
        }
    });

    //IE 버전 체크
    var ie_version = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
    	  ie_version = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape')
    {
      var ua = navigator.userAgent;
      var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
    	  ie_version = parseFloat( RegExp.$1 );
    }

	if(window.sidebar){// firefox
		//window.sidebar.addPanel(title, url, "");
		alert("Ctrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
	}else if(document.all){
		window.external.AddFavorite(url, title);
	}else if ( ie_version == 11 ){
        //IE 11
    	window.external.AddFavorite(url, title);
	}else{// Google Chrome && 그외
		alert("Ctrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
	}
	
}

/* 오늘본 상품 관련  쿠기 적용  스크립트 Start */
function setRecentlyProduct( itm_no, popupYn, jsp_http, img_domain, product_img ){
	var cookie_name = "LQ_PRODUCTS_"+itm_no;
    var oldCookieVal = readCookie("LQ_PRODUCTS_"+itm_no);

    if(oldCookieVal != null){
    	deleteCookie(itm_no);
    	writeCookie(cookie_name, itm_no, 7);
    }
    else
    {
    	writeCookie(cookie_name, itm_no, 7);
    }

    //최근본상품 레이어 업데이트
	$.ajax({
        type : "POST", 
        url : jsp_http+"/fr/include/recentlyProductAjax.do",  
        //async : false,
        success : function (data) 
        {
        	var strHtml = "";

            if(data.list.length > 0)
            {
                $.each(data.list, function(i) {
                    var item = data.list[i];
                    var web_path = product_img + '/' + item.PRD_MST_CD;
                    
                    strHtml += "<li>";
                    strHtml += "<div class=\"item thumb90\">";
                    strHtml += "<a class=\"thumb\" href=\""+jsp_http+"/fr/product/productView.do?PRD_MST_CD="+item.PRD_MST_CD+"\">";
                    strHtml += "<span class=\"thumb\"><img src=\""+web_path+"/166_0.jpg\" onerror=\"this.src='"+img_domain+"/fr/img/common/noimage_90.gif'\"  alt=\"\" /></span>";
                    if ( item.PRD_CTG_TOP_IDX == '2' )
                    {
                    	//루이스클럽 - 브랜드명
                    	if ( item.CMN_BRD_NM != '' && typeof(item.CMN_BRD_NM) == 'string' )
                    	{
                    	    strHtml += "<span class=\"shop\">["+item.CMN_BRD_NM+"]</span>";
                    	}
                    }
                    else
                    {
                    	//루이까또즈 - 라인명
                    	if ( item.PRD_MST_LINE_IDX_NM != '' && typeof(item.PRD_MST_LINE_IDX_NM) == 'string' )
                    	{
                    	    strHtml += "<span class=\"shop\">["+item.PRD_MST_LINE_IDX_NM+"]</span>";
                    	}
                    }
                    strHtml += "<span class=\"subject\"><span class=\"link\">"+item.PRD_MST_NM_KOR+"</span></span>";
                    strHtml += "</a>";
                    strHtml += "<div class=\"price\"><p><span class=\"tiny\">판매가 : ";
                    var PRD_MST_CONSUMER_PRICE = Math.floor(item.PRD_MST_CONSUMER_PRICE);
                    var SELL_PRICE = Math.floor(item.SELL_PRICE);
                    if ( item.PRD_MST_CONSUMER_PRICE != item.SELL_PRICE )
                    {
                        strHtml += "<span class=\"semantic\">소비자가&nbsp;</span><em>" + setComma(PRD_MST_CONSUMER_PRICE) + "원</em>";
                    }
                    strHtml += "<strong>" + setComma(SELL_PRICE) + "원</strong>";
                    strHtml += "</span></p></div>";                        
                    strHtml += "</div>";
                    strHtml += "<a href=\"javascript:;\" class=\"ir btn-delete deleteRecently\" data-val=\""+item.PRD_MST_CD+"\"><em>최근 본 상품 "+item.PRD_MST_NM_KOR+" 삭제</em></a>";
                    strHtml += "</li>";
                    
                });

                $.each(data.deleteCookieList, function(i) {
                    var item = data.deleteCookieList[i];
                	deleteCookie(item);
                });
            }
            if ( popupYn == 'Y' )
            {
                //상품 간편보기 팝업에서 호출
            	$(opener.document).find("#ulRecently").html(strHtml);
            	$(opener.document).find("#recentlyProductCount").text(data.recentlyProductCount);
            }
            else
            {
                //상품 상세에서 호출            	
                $("#ulRecently").html(strHtml);
            	$("#recentlyProductCount").text(data.recentlyProductCount);
            }
        },
        error : function () 
        {
            alert("데이터 오류 입니다. 다시 시도 해 주십시오.");
        }
    });	
    
}

function writeCookie( cookie_name, cookie_value, days ){ 
	var expires = "";	
    var date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = ";expires=" + date.toGMTString();
    
    document.cookie = cookie_name + "=" + escape( cookie_value ) + expires + ";path=/; ";
} 

function deleteCookie( itm_no )
{
	var cookie_name = "LQ_PRODUCTS_"+itm_no;
	
    //어제 날짜를 쿠키 소멸 날짜로 설정한다.
    writeCookie(cookie_name, "", -1);
}

function readCookie(name) {
    var cname = name + '=';
    var dc    = document.cookie;
    if (dc.length > 0 ) {
        begin = dc.indexOf(cname);
        if (begin != -1) {
            begin = begin + cname.length;
            end   = dc.indexOf(';', begin);

            if (end == -1) end = dc.length;
            return unescape(dc.substring(begin,end));
        }
    }
    return null;
}
/* 오늘본 상품 관련 스크립트 End */ 

/* 레이어팝업 오늘그만보기 관련 스크립트 Start */ 
function writeCookieToday( cookie_name, cookie_value ){ 
    //쿠키 만료일을 오늘 자정(24시) 까지로 설정
	var expires = "";	
    var date = new Date();

    date.setTime(date.getTime() + ((24-date.getHours()) * 60 * 60 * 1000));
    expires = ";expires=" + date.toGMTString();
    
    document.cookie = cookie_name + "=" + escape( cookie_value ) + expires + ";path=/; ";
} 

function closePopup(popupName) 
{
	writeCookieToday( popupName, "done" );
    $("#skyscraperAbanner").fadeOut('fast');
}
/* 레이어팝업 오늘그만보기 관련 스크립트 End */ 

/*
 * 커스텀 팝업 url, popupName, width, height
 * 사용법
 * var obj = new Object;
 *     obj.url = "";         팝업주소
 *     obj.popupName = "";   팝업창 이름
 *     obj.width = "";       팝업창 가로사이즈
 *     obj.height = "";      팝업창 세로사이즈
 *     obj.scrollbars = "";  팝업창 스크롤 여부 yes/no     
 */
function customPopup(object)
{
	window.open(object.url, object.popupName, "width=" + object.width + ", height=" + object.height + ", scrollbars=" + object.scrollbars + ", toolbar=no, menubar=no, resizable=no");
}

/**
 * jquery 함수
 */
(function($) {
	$.fn.extend(jQuery, {
		/**
		 * check 박스 전체 선택 해제 
		 * 사용법 : $.checkBoxSelect("allSelect", "select") 전체선택 클래스, 선택 클래스 
		 */
		checkBoxSelect : function(allSelect, select, callback){
			//전체선택  이벤트 호출
			$(document).on("click", "."+allSelect, function (){
				$.checkBoxAllSelect(allSelect, select, callback);
			});
			
			//개별선택 이벤트 호출
			$(document).on("click", "."+select, function (){
				$.checkBoxUnitSelect(allSelect, select, callback);
			});
			
			//로딩
			if($("."+allSelect).is(":checked")){
				$.checkBoxAllSelect(allSelect, select, callback);
			}else{
				$.checkBoxUnitSelect(allSelect, select, callback);
			}
		},
		
		//전체 선택
		checkBoxAllSelect : function(allSelect, select, callback){
			var totalCount = $("."+select).length; 
			if( totalCount <= 0 ){
				$("."+allSelect).prop("checked", false);
				return; 
			}
			if($("."+allSelect).is(":checked")){
				$("."+select).prop("checked", true);
			}else{
				$("."+select).prop("checked", false);
			}
			
			if (typeof callback == 'function') { 
		        callback.call(this); 
		    }
		},
		
		//개별 선택
		checkBoxUnitSelect : function(allSelect, select, callback){
			var checkdLength = $("."+select + ":checked").length;
			var totalCount = $("."+select).length; 
			
			//선택된 checkbox 확인
			if(checkdLength > 0 && checkdLength == totalCount){
				$("."+allSelect).prop("checked", true);
			}else{
				$("."+allSelect).prop("checked", false);
			}
			
			if (typeof callback == 'function') { 
		        callback.call(this); 
		    }
			
		}
	});	
})(jQuery);