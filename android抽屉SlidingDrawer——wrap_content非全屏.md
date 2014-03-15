SlidingDrawer的用法比较多，就不说明了。

如果设置了属性layout_height="wrap_content"是不起作用的，在原来的SlidingDrawer中的onMeasure()方法使得layout_height一直都是fill_parent，但是使用layout_height="固定高度"也是可以！

		/** 
	 	* 使得SlidingDrawer在屏幕低端，而不会填满整个屏幕 
	 	* @author akai 2012-03-06 
	 	*/  
		public class WrapSlidingDrawer extends SlidingDrawer {  
	    private boolean mVertical;  
	    private int mTopOffset;  
      
	    public WrapSlidingDrawer(Context context, AttributeSet attrs, int defStyle) {  
	        super(context, attrs, defStyle);  
	        int orientation = attrs.getAttributeIntValue("android", "orientation", ORIENTATION_VERTICAL);  
	        mTopOffset = attrs.getAttributeIntValue("android", "topOffset", 0);  
	        mVertical = (orientation == SlidingDrawer.ORIENTATION_VERTICAL);  
	    }  
  
	    public WrapSlidingDrawer(Context context, AttributeSet attrs) {  
	        super(context, attrs);  
	        int orientation = attrs.getAttributeIntValue("android", "orientation", ORIENTATION_VERTICAL);  
	        mTopOffset = attrs.getAttributeIntValue("android", "topOffset", 0);  
	        mVertical = (orientation == SlidingDrawer.ORIENTATION_VERTICAL);  
	    }  
  
	    @Override  
	    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {  
	        int widthSpecMode = MeasureSpec.getMode(widthMeasureSpec);  
	        int widthSpecSize =  MeasureSpec.getSize(widthMeasureSpec);  
	        int heightSpecMode = MeasureSpec.getMode(heightMeasureSpec);  
	        int heightSpecSize =  MeasureSpec.getSize(heightMeasureSpec);  
	  
	        final View handle = getHandle();  
	        final View content = getContent();  
	        measureChild(handle, widthMeasureSpec, heightMeasureSpec);  
	  
	        if (mVertical) {  
	            int height = heightSpecSize - handle.getMeasuredHeight() - mTopOffset;  
	            content.measure(widthMeasureSpec, MeasureSpec.makeMeasureSpec(height, heightSpecMode));  
	            heightSpecSize = handle.getMeasuredHeight() + mTopOffset + content.getMeasuredHeight();  
	            widthSpecSize = content.getMeasuredWidth();  
	            if (handle.getMeasuredWidth() > widthSpecSize) widthSpecSize = handle.getMeasuredWidth();  
	        }  
	        else {  
	            int width = widthSpecSize - handle.getMeasuredWidth() - mTopOffset;  
	            getContent().measure(MeasureSpec.makeMeasureSpec(width, widthSpecMode), heightMeasureSpec);  
	            widthSpecSize = handle.getMeasuredWidth() + mTopOffset + content.getMeasuredWidth();  
	            heightSpecSize = content.getMeasuredHeight();  
	            if (handle.getMeasuredHeight() > heightSpecSize) heightSpecSize = handle.getMeasuredHeight();  
	        }  
  
        	setMeasuredDimension(widthSpecSize, heightSpecSize);  
    	}  
	}  
注释：本代码可以直接使用，不需修改，使用是把原来的<SlidingDrawer>标签修改为<packageName.WrapSlidingDrawer>即可。