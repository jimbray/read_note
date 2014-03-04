###DexClassLoader的调用方法
用一个小例子来说明DexClassLoader 的使用方法。假设有两个APK,第一个叫Host， 第二个叫Plugin，其中Plugin中定义了一个类PluginClass，该类中定义了一个函数add(int num1, int num2),用于两个数字的相加。代码如下：

	```
	public class PluginClass {
	private static final String TAG = PluginClass.class.getSimpleName();
	
	public PluginClass() {
		Log.d(TAG, "PluginClass");
	}

	@Override
	public int add(int num1, int num2) {
		return num1 + num2;
	}

}
	```

接下来延时如何在Host中使用DexClassLoader 来动态PluginClass 类， 并调用其中的add函数。
将Plugin.apk安装到Android设备中，然后再新建一个Host工程，该工程中主Activity的代码如下：

	```
	public class MainActivity extends Activity {
	private TextView tv;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		tv = (TextView) findViewById(R.id.tv);
		tv.setText(getNum(12, 34) + "");
	}

	private int getNum(int num1, int num2) {
		int result = 0;

		Intent intent = new Intent("com.example.plugin.Client", null);
		PackageManager pm = getPackageManager();
		final List<ResolveInfo> plugins = pm.queryIntentActivities(intent, 0);
		ResolveInfo rinfo = plugins.get(0);
		ActivityInfo ainfo = rinfo.activityInfo;

		//String div = System.getProperty("path.separator"); //分隔符
		String packageName = ainfo.packageName;
		String dexPath = ainfo.applicationInfo.sourceDir;
		String dexOutoutDir = getApplicationInfo().dataDir;
		String libPath = ainfo.applicationInfo.nativeLibraryDir;

		DexClassLoader cl = new DexClassLoader(dexPath, dexOutoutDir, libPath,
				this.getClass().getClassLoader());

		Class<?> clazz;
		try {
			clazz = cl.loadClass(packageName + ".PluginClass");
			
			Object obj = clazz.newInstance();
			Class[] params = new Class[2];
			params[0] = Integer.TYPE;
			params[1] = Integer.TYPE;
			Method action = clazz.getMethod("add", params);
			Integer ret = (Integer) action.invoke(obj, num1, num2);
			result = ret;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} 
		return result;
	}
	```

DexClassLoader 构造函数的参数意义如下：
	
	dexPath:指目标类所在的APK或JAR文件的路径。类装载器将从该路径中寻找指定的目标类，该路径必须是APK或JAR的全路径。如果要包含多个路径，路径之间必须使用特定分隔符进行分股，这个特定分隔符可使用System.getProperty("separtor") 获得。

	dexOutputDir:由于dex文件被包含在APK或着JAR文件中，因此在装载目标类之前需要先从APK或JAR文件中解压出dex文件，该参数就是指定解压出的dex文件存放路径。在Android系统中，一个应用程序一般对应一个Linux用户id， 应用程序仅对属于自己的数据目录路径有写的权限，因此，该参数可以使用该程序的数据路径。

	libPath:指码元表类中所使用的C/C++库存放的路径。
	
	最后一个参数是指该装载器的父装载器，一般为当前执行类的装载器。

 创建了DexClassLoader 对象后，接下来就可以调用loadClass()装载指定的类了，该函数返回的是一个Class对象，注意区分Class对象和目标类PluginClass类。Class对象是ClassLoader所能识别的类，而PluginClass是程序执行后所能识别的类，此时仅仅装载了PluginClass的程序代码，却还没有创建出PluginClass对象，因此接下来调用Class对象的newInstance() 方法。该方法内部会调用PluginClass 的构造函数，并返回一个真正的PluginClass对象。  
尽管返回的是一个PluginClass对象，但是Host班底却没有任何PluginClass的定义，因此不能直接去调用PluginClass对象的任何方法，而只能通过通用的反射机制去调用PluginClass中方法。  
反射机制调用时主要使用了Methon类，Class对象的getMethon()方法可以返回该类中的任何方法，比如本例中的add方法，getMethon()有两个参数，第一个是需要访问的函数名称，后面一个参数是该函数参数的类型。  
得到目标类的函数对象的Method后，就可以调用该Methon对象的invoke() 方法。该方法的第一个参数是指执行目标函数的对象，此处该对象就应该是真正的PluginClass 类，该对象是调用Class类的newInstance()创建的。  
以上代码执行后，可以看到效果，host中显示TextView 值是46。  
From 《Android内核剖析》
