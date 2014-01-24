当你遇到 

	```
	E/Preview(4101): IOException caused by setPreviewDisplay()
	E/Preview(4101): java.io.IOException: setPreviewDisplay failed
	```
可能是由于SurfaceHolder 没有设置类型导致的  
如果SurfaceHolder 不调用  
	```setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
	```  
在2.2以下是无法显示的  
这个方法官方建议在 API-11 以后就不要用了

	```
	public abstract void setType (int type)

	Added in API level 1
	This method was deprecated in API level 11.
	this is ignored, this value is set automatically when needed.

	Sets the surface's type.
	```
加上之后就有画面了，便有了预览功能。  
但是，之前我遇到这个问题的时候，网上也很多人问。
有很多人都说到：这个设置可以解决无法预览的问题，但是会引发其他问题。
这个其他问题我是没有遇到，如果你设置了这个type ，看看会不会出现这个错误吧

	```
	ERROR/AndroidRuntime(607): android.view.SurfaceHolder$BadSurfaceTypeException: Surface type is SURFACE_TYPE_PUSH_BUFFERS
	```

据说是绘图问题。这个我还没有看到。
担心的同学请自行钻研。
