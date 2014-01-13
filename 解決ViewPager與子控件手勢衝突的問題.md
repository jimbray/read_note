###requestDisallowInterceptTouchEvent

ViewPager来实现左右滑动切换tab，如果tab的某一项中嵌入了水平可滑动的View就会让你有些不爽，比如想滑动tab项中的可水平滑动的控件，却导致tab切换。

因为Android事件机制是从父View传向子View的，可以去检测你当前子View是不是在有可滑动控件等，决定事件是否拦截，但是这个麻烦，而且并不能解决所有的问题（必须检测触摸点是否在这个控件上面），其实有比较简单的方法，在你嵌套的控件中注入ViewPager实例（调用控件的getParent()方法），然后在onTouchEvent，onInterceptTouchEvent，dispatchTouchEvent里面告诉父View，也就是ViewPager不要拦截该控件上的触摸事件。

	'''
	requestDisallowInterceptTouchEvent(true)
	'''

代码一般如下：
	
	'''
	public boolean onTouch(View v, MotionEvent event) {
		switch (event.getAction()) {
		case MotionEvent.ACTION_MOVE: 
			pager.requestDisallowInterceptTouchEvent(true);
			break;
		case MotionEvent.ACTION_UP:
		case MotionEvent.ACTION_CANCEL:
			pager.requestDisallowInterceptTouchEvent(false);
			break;
		}
	}
	'''
	
当用户按下的时候，我们告诉父组件，不要拦截我的事件（这个时候子组件是可以正常响应事件的），拿起之后就会告诉父组件可以阻止。

活学活用。
已发布至 [Jimbray](http://1.jimblog.sinaapp.com/?p=85)