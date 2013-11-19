###如何隱藏Android系統的虛擬鍵
自Android3.0以來，就引入了虛擬鍵。3.0還好，4.0上本來就小的屏幕還要浪費一點空間，這讓人很不爽。
在做一些需要全屏的應用的時候，總會遇到這個需求。我要播視頻，卻不能全屏！！我要隱藏那三個討人嫌的虛擬鍵。

很簡單:
	
	```
	if (Build.VERSION.SDK_INT >= 11 && Build.VERSION.SDK_INT < 14) {
        view.setSystemUiVisibility(View.STATUS_BAR_VISIBLE);
    }
    else if (Build.VERSION.SDK_INT >= 14) {
        view.setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
    }
	```

當然了，這個虛擬鍵的問題只有在4.0+的系統中出現，所以這個API也是只有在4.0以後才有的，為了保證程序的健壯性，做了一個SDK版本的判斷（3.0有區別）
	
	4.0+:用的是 View.SYSTEM_UI_FLAG_VISIBLE (相对应的常量)
	4.0-:用的是 View.STATUS_BAR_VISIBLE (相对应的常量)

著重說4.0+的吧
關於隱藏，有兩種表現方式

	1.将三个虚拟键 虚化 成三个圆点，状态可点，在整体界面范围内减小视觉冲击
	2.将三个键连同背景一起滑到屏幕外，扩大屏幕显示范围

根據你的需求決定

######關鍵代碼:
顯示虛擬按鍵

	```
	getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
	```

隱藏虛擬按鍵(完全隱藏)

	```
	getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION);
	```

隱藏虛擬按鍵（虛化為三個點）

	```
	getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LOW_PROFILE);
	```

這樣就可以搞定了！

不過我是沒有成功的。
搞了我2、3個小時，死活沒有效果，就這卡死了。
原因：

	1.这个API需要使用4.0以上版本编译
	2.AndroidManafest.xml中 android:targetSdkVersion="14" 

應該為 **14  ！！！*切記切記！！***
搞定收工