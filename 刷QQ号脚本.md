��Ҫʹ��Chrome���������F12�������´��븴�Ƶ�console���س���
��Ѷ��ַ��http://zc.qq.com/chs/new.html


		var total = 10;
		var i = 1;
		index.goodNumArr = index.goodNumArr.length == 3 ? [] : index.goodNumArr;
		var _act_lsig = typeof _act_lsig == 'object' ? _act_lsig : [];
		console.log('%cע�⣺���ǲ��Դ���','font-size:40px;color:red;');
		console.group('��ǰ����' + index.goodNumArr.length + '��QQ����ɹ�ѡ��');
		console.groupEnd();
		console.group('����Ҫ�ٻ�ȡ' + total * 3 + '��QQ����ɹ�ѡ��');
		console.groupEnd();
		do {
			(function() {
				$.post(index.getNumUrl, index.submitObj, function(a) {
					if (a.ec == 0) {
						index.submitObj.act_lsig = a.act_lsig;
						_act_lsig.push(a.act_lsig);
						_act_lsig.push(a.act_lsig);
						_act_lsig.push(a.act_lsig);
						$.cookie.set("_act_lsig", a.act_lsig, "zc.qq.com", "/", 0.5 * 1000);
						index.goodNumArr.push(a.new_uin_0);
						index.goodNumArr.push(a.new_uin_1);
						index.goodNumArr.push(a.new_uin_2);
						index.submitObj.safeverifyResult = a.safeverifyResult;
						index.submitObj.elevel = a.safeverifyResult;
					}
					console.warn('�����ĵȴ����');
				});
				i++;
			})();
		} while (i <= total);
		
		setTimeout(function() {
			console.info('������ϣ�');
				console.group('��պ�����ˢ��ҳ�棬���߿���ִ̨�У�');
				console.log('index.goodNumArr=[]; ');
				console.groupEnd();
			if (!index.goodNumArr.length) {
				console.error('�㱻����IP');
			}
			console.group(index.goodNumArr.length + '��QQ�������£�');
				console.groupEnd();
			for (num in index.goodNumArr) {
						console.groupCollapsed("%c"+index.goodNumArr[num],"color:red");
						console.log('��' + (parseInt(num) + 1) + '��');
						console.group('����ѡ��˺��룬�����ڿ���̨ճ������Ĵ���ִ�У�');
						console.log('$.cookie.set("_act_lsig", "' + _act_lsig[num] + '", "zc.qq.com", "/", 0.5*1000);\nindex.act_lsig = "' + _act_lsig[num] + '"; \nindex.currenNum=' + num + ';');
						console.groupEnd();
						console.group('Ȼ����дҳ������Ϣ���ύ���ɣ�ֻ�ǲ��Թ���');
						console.groupEnd();
						console.groupEnd();
			}
		}, total * 500);