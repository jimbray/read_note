###关于在代码中设置TextView的DrawableLeft/top/right/bottom 的问题

	Drawable icon = getResources().getDrawable(R.drawable.icon);
	textView.setCompoundDrawables(icon, null, null, null);

查看官方文档，设置drawableLeft之类的图片方法为： [setCompoundDrawables](http://developer.android.com/reference/android/widget/TextView.html#setCompoundDrawables(android.graphics.drawable.Drawable, android.graphics.drawable.Drawable, android.graphics.drawable.Drawable, android.graphics.drawable.Drawable)
描述是：

	Sets the Drawables (if any) to appear to the left of, above, to the right of, and below the text. Use null if you do not want a Drawable there. The Drawables must already have had setBounds(Rect) called.

最后一句话注意：
	
	The Drawables must already have had setBounds(Rect) called.

drawable 必须要已经调用 setBounds方法。
所以，当我使用上面的代码的时候，死活出不来 icon
SO,修改一下

	Drawable icon = getResources().getDrawable(R.drawable.icon);
	icon.setBounds(0, 0, icon.getMinimumWidth(), icon.getMinimumHeight());//这句话是一定要的!!不然无法显示
	textView.setCompoundDrawables(icon, null, null, null);

记录一下，别又忘记了

已发布至 [Jimbray](http://1.jimblog.sinaapp.com/?p=113)