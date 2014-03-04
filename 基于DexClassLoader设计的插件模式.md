###基于DexClassLoader设计的插件模式
通过ClassLoader装载的类，调用其内部方法的过程有点繁琐，包括首先构造出Method对象，并构造出Method对象所使用的参数对象，然后才能调用。有没有一种办法，技能通过动态装载，利用动态装载的灵活性，又讷讷感项直接类引用那样方便地调用其函数？  
使用 DexClassLoader 同样的例子。可以使用如下的方法。
首先定义一个Interface 接口，Interface仅仅定义函数的输入和输出，却不定义函数的具体实现。该Interface类一方面存在于Plugin项目中，同时也存在于Host项目中，即该类同时参与两个项目的编译。
使用这种方法之后，Plugin项目中原来的代码可以修改为：

	```
	public class PluginClass implements Comm {
		private static final String TAG = PluginClass.class.getSimpleName();
		
		public PluginClass() {
			Log.d(TAG, "This is the constructor in plugin class!");
		}

		@Override
		public int add(int num1, int num2) {
			return num1 + num2;
		}

	}
	```

其中Comm接口定义如下：

	```
	public interface Comm {
		public int add(int num1, int num2);
	}

	```
注：Comm接口在Host项目中定义

修改完毕后，可重新安装Plugin.apk
接下来在Host项目中，对于Class对象newInstance返回的对象就可以强制转换为Comm接口对象了，相关代码如下：

	```
	clazz = cl.loadClass(packageName + ".PluginClass");
			
	Comm comm = (Comm) clazz.newInstance();
	result = comm.add(num1, num2);
	```
不再使用反射机制进行函数调用。
该段代码的执行结果与此前通过反射来调用的相同。

这里有一个问题：Plugin项目中需要引用Comm类，应该如何种方式来引用呢？
最简单的方法就是把Host中的Comm类打包成jar包，然后放在Plugin中就可以了（怎么放）！方法可行，Plugin项目中起码能编译通过了！
运行Host项目出现错误信息 

	```
	Class ref in pre-verified class resolved to unexpected implementation
	```
为什么呢？
先说说我是怎么将jar加到Plugin项目中的
我将jar 直接放入Plugin项目中的libs文件夹中，并在buildPath中将该jar导入。  
这种方式会使得jar作为程序的一部分被打包到最终的程序文件中，从而使得Plugin和Host项目中存在报名相同但验证码不同的类文件。所以导致了以上错误。

我的导入方法是：

	1.我将Host导出的Comm.jar 放入 Host项目中的assets文件加中
	2.在Plugin项目中的buildPath中，Add Library--User Library -- New -- Add Jar -- 从Host项目中选择--导入成功

PS.

	add jar 和add external jars 与add library 中User Libraries的区别是：
	通过“add jar” 和“add external jars”添加的jar包作为程序的一部分被打包到最终的程序中。通过“User Libraries”添加的jar包不是。
	
这样，成功运行Host与Plugin项目的，执行效果跟之前一样。

