$(function(){ 
	//工具代码
	tools = {
	    cookie:{
	        set:function(name,value){
	            var exp  = new Date();
	            exp.setTime(exp.getTime() + 30*24*60*60*1000);   
	            document.cookie = name + '='+ escape (value) + ';expires=' + exp.toGMTString()+';path=/';
	        },
	        get:function(name){
	            var arr = document.cookie.match(new RegExp('(^| )'+name+'=([^;]*)(;|$)'));
	            if(arr != null) return unescape(arr[2]); return null;
	        },
	        del:function(name){
	            var exp = new Date();
	            exp.setTime(exp.getTime() - 1);
	            var cval=api.cookie.getCookie(name);
	            if(cval!=null){
	                document.cookie= name + '='+cval+';expires='+exp.toGMTString()+';path=/';
	                document.cookie= name + '='+cval+';expires='+exp.toGMTString();
	            }
	        }
	    }, 
		
		// 计算字符串的字符长度,中文算2个字符
	    countByte: function(str) {
	        var size = 0;
	        for (var i = 0, l = str.length; i < l; i++) {
	            size += str.charCodeAt(i) > 255 ? 2 : 1;
	        }
	        return size; 
	    },
		
		isInt:function(num){
			if (num == "")
				return false;
			var reg = /\D+/;
			return !reg.test(num);     
		},
		
		gotoPage:function(page){
			$("#page").val(page) ;
			$("#searchForm").submit() ;
		},
		
	    isEmail:function(email){
			if (email=="" ||  !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.(\w)+)*(\.(\w){2,3})$/.test(email))	
			{
				return false ;
			}
			else 
			{
				return true ;
			}
		},
		isLetterNum:function(str){
			if (str=="" || !/^[a-zA-Z0-9]*$/.test(str))	
			{
				return false ;
			}
			else
			{
				return true ;
			}
		},
		
		ischinese:function(str){  // 全是中文
			var reg = /^[\u4E00-\u9FA5]+$/; 
			if(!reg.test(str)){
				return false; 
			} else {
				return true; 
			}
		}, 
		
		getLocalTime:function(nS) {  // 时间戳转 Y-m-d H:i:s   
		   return new Date(nS.toString().length == 10 ? nS * 1000 : nS).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
		},
		add0:function(m){
			return m<10?'0'+m:m ;
		},
		formatDate:function(shijianchuo)
		{
			//shijianchuo是整数，否则要parseInt转换
			// 时间戳的精度不同导致，位数分为两种：10位和13位
			var shijianchuo1 = parseInt(shijianchuo.toString().length == 10 ? shijianchuo * 1000 : shijianchuo) ; 
			var time = new Date(shijianchuo1);
			var y = time.getFullYear(); 
			var m = time.getMonth()+1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds(); 
			//return y+'-'+ this.add0(m)+'-'+this.add0(d)+' '+ this.add0(h)+':'+ this.add0(mm)+':'+ this.add0(s);
			return y+'-'+ this.add0(m)+'-'+this.add0(d)+' '+ this.add0(h)+':'+ this.add0(mm);
		},
		
		dealCurrent:function(tm){
			var time = new Date(),
				y = time.getFullYear(); 
				m = time.getMonth()+1;
				d = time.getDate(),
				curr = y+'-'+ this.add0(m)+'-'+this.add0(d) ;
			if (tm.indexOf(curr) !== -1) {
				return tm.substring(10) ;
			} else {
				return tm ;	
			}
		},
		
		showMsg:function(msg){ 
			$(".showMsg").html(msg) ;
			$(".showMsg").show() ;
			setTimeout("$('.showMsg').hide() ;",2000);
		},
		/** 
	     * js截取字符串，中英文都能用 
	     * @param str：需要截取的字符串 
	     * @param len: 需要截取的长度 
	     */
		cutstr:function(str, len) {
	        var str_length = 0;
	        var str_len = 0;
	        str_cut = new String();
	        str_len = str.length;
	        for (var i = 0; i < str_len; i++) {
	            a = str.charAt(i);
	            str_length++;
	            if (escape(a).length > 4) {
	                //中文字符的长度经编码之后大于4  
	                str_length++;
	            }
	            if (str_length > len) {
	                str_cut = str_cut.concat("...");
	                return str_cut;
	            }
	            str_cut = str_cut.concat(a);
	        }
	        //如果给定字符串小于指定长度，则返回源字符串；  
	        if (str_length <= len) {
	            return str;
	        }
	    }
	}
}); 