###ScrollView嵌套ViewPager无法显示的问题

在 Vertical ScrollView 中 放置 ViewPager 

	<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
	    android:layout_width="fill_parent"
	    android:layout_height="fill_parent" >
	
	    <RelativeLayout
	        android:layout_width="match_parent"
	        android:layout_height="match_parent" >
	
	        <TextView android:id="@+id/text_view"
	            android:layout_width="fill_parent"
	            android:layout_height="180dp"
	            android:text="@string/hello_world"
	            android:background="#ff0000" />
	        
	        <android.support.v4.view.ViewPager
		        android:id="@+id/view_pager"
		        android:layout_width="fill_parent"
		        android:layout_height="wrap_content"
		        android:layout_below="@id/text_view" />
	    </RelativeLayout>
	
	</ScrollView>

预想的界面是 

	TextView 下面 显示 ViewPager 

实际上 显示的界面是

	TextView 下面 什么都不显示

这个是ScrollView中嵌套ViewPager 导致的问题

解决方法：
	
		private void resizePager() {
		final int w = View.MeasureSpec.makeMeasureSpec(0,
				View.MeasureSpec.UNSPECIFIED);
		final int h = View.MeasureSpec.makeMeasureSpec(0,
				View.MeasureSpec.UNSPECIFIED);
		mViewPager.measure(w, h);
		ViewTreeObserver vto = mViewPager.getViewTreeObserver();
		vto.addOnGlobalLayoutListener(new OnGlobalLayoutListener() {

			public void onGlobalLayout() {
				mViewPager.getViewTreeObserver().removeGlobalOnLayoutListener(
						this);
				View view = mViewPager.getChildAt(mViewPager.getCurrentItem());
				view.measure(w, h);
				LayoutParams params = new LayoutParams(
						LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
				params.height = view.getMeasuredHeight();

		//params.addRule(RelativeLayout.BELOW, mTextView.getId());//用于布局

				mViewPager.setLayoutParams(params);
				mViewPager.setMinimumHeight(180);//这句不生效....
			}
		});
	}

就可以显示了

关于 显示出来之后 滑动ViewPager 与 ScrollView 手势冲突的问题 不在本文解决范围之内
