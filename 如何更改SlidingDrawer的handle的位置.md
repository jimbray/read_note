SlidingDrawer是Android中的一个抽屉效果，既然是抽屉，就会有把手（就是handle）
而这个handle默认的位置是居中的，但是实际使用中并不一定会将handle放到中间位置。问题来了：
怎么将handle放到左边或者右边呢？两种方案。
####第一种解决方案
不改变handle的实际位置，使用布局解决问题
使用layout布满handle,在将handle可见内容偏移即可

	```
	<SlidingDrawer
        android:id="@+id/layout_effect"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:content="@+id/content"
        android:handle="@+id/handle" >

        <RelativeLayout
            android:id="@id/handle"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">
            
	           <TextView android:id="@+id/tv"
		            android:layout_width="wrap_content"
		            android:layout_height="wrap_content"
					android:layout_alignParentRight="true"
		            android:text="handle"/>
        </RelativeLayout>
		
		<RelativeLayout
            android:id="@id/content"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content">
            
        </RelativeLayout>
	</SlidingDrawer>
	```

这样的话，起码在看起来是将handle移到右边（左边）了。但是，会存在问题，当你使用handle的时候，无法做到真正的“指哪打哪”，上面的handle移到右边了，当你点击或者拖动handle左边时，一样会触发handle的操作，虽然这是个细节问题，但这是个问题。所以就有了第二种方案。

####第二种方案
继承重写SlidingDrawer的onLayout方法，实际改变handle的位置

	```
	    @Override
    	protected void onLayout(boolean changed, int l, int t, int r, int b) {//改变handle的位置
    	super.onLayout(changed, l, t, r, b);
    	final int height = b - t;

        final View handle = this.getHandle();

        int childWidth = handle.getMeasuredWidth();
        int childHeight = handle.getMeasuredHeight();

        int childLeft;
        int childTop;

        final View content = this.getContent();

		//想靠左的话，mHandleMarginLeft是左边距
		childLeft = l + mHandleMarginLeft;//设置左边距

		//想靠右的话
        //childLeft = childLeft + 往右的距离 - childWidth - 右边距;


        childTop = this.isOpened() ? this.getPaddingTop() : height
                        - childHeight + this.getPaddingBottom();

        content.layout(0, this.getPaddingTop() + childHeight,
                        content.getMeasuredWidth(), this.getPaddingTop() + childHeight
                                        + content.getMeasuredHeight());

        handle.layout(childLeft, childTop, childLeft + childWidth, childTop
                        + childHeight);
    }
	```

这样，就能真正地改变handle的位置，不管是看到的还是使用到的范围，都没有第一种方案的问题了。
所以，推荐使用第二种方案
