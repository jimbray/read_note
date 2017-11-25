针对Android的性能优化，主要有几个方面：

> 1. 布局优化
> 2. 绘制优化
> 3. 内存泄露优化
> 4. 响应速度优化
> 5. 列表复用优化
> 6. 图片优化
> 7. 线程优化
> 8. 其他优化

#### 布局优化

优化思想很简单，就是**尽量减少布局文件的层级**

* 如何进行布局优化

1. 删除无用的控件和布局

2. 有选择地使用性能消耗较低的ViewGroup（LinearLayout和FrameLayout）,如果过于复杂，则使用 RelativeLayout

3. 采用 include merge ViewStub

   - include 主要用于布局重用

   - merge 一般和 include 配合使用，可以降低布局的层级。（<merge/>只能作为XML布局的根标签使用。当Inflate以<merge/>开头的布局文件时，必须指定一个父ViewGroup，并且必须设定attachToRoot为true）

   - ViewStub 提供了按需加载的功能，当需要时才会将ViewStub中的布局加载到内存，提高程序初始化效率。（于ViewStub这种使用后即可就置空的策略，所以当需要在运行时不止一次的显示和隐藏某个布局，那么ViewStub是做不到的。这时就只能使用View的可见性来控制了。

     layout_*相关属性与include标签相似，如果使用应该在ViewStub上面使用，否则使用在嵌套进来布局root上面无效。

     ViewStub的另一个缺点就是目前还不支持merge标签。）

4. 避免过度绘制

   * 可以使用 开发者工具 <调试GPU过度绘制> 工具进行检测
   * 移除默认的 window background
   * 移除不必要的背景
   * 通过合理高效的布局避免
   * 自定义控件的 clipRect 和 quickReject 优化




#### 绘制优化

Google 的性能优化标准里，View的绘制频率保证60fps是最佳的，也就是要求每帧绘制时间不能超过16ms

主要思想就是 **尽可能降低onDraw方法中的复杂度**

1. onDraw() 中不要创建新的 局部变量（不要 new !）
2. onDraw() 中不要做耗时操作、不要执行成千上万的循环操作，虽然每次都是轻量级，但是大量循环还是会占用CPU，会造成View的绘制过程不流畅



#### 内存泄露优化

* 可能引起内存泄露的因素：

1. 广播注册后没有取消
2. 监听器的及时取消
3. 静态变量持有Activity的引用(context)
4. 单例模式持有Activity的引用(context)
5. 查询数据库之后没有关闭游标/数据库
6. Activity生命周期外，句柄被引用导致无法释放
7. 使用 Handler 造成的内存泄露，没有进行 removeCallback，removeMessage

* 如何解决内存泄露问题
  - 检测
    - 使用 ~~Memory monitor~~ 已经废弃，现在直接使用Android studio 3.0 的 Android profiler 进行分析即可
    - 使用第三方工具 LeakCanary 进行检测
  - 避免
    * 避免使用枚举，枚举往往需要两倍多的内存
    * 使用优化过的容器 SparseArray 
    * 避免短时间内大量创建临时对象（onDraw方法内的临时变量）



#### 响应速度优化

主要是ANR问题的解决，主要思想是 **避免在主线程做耗时操作**

* ANR 是怎么引起的

  * Activity在 **5秒**内没有办法响应
  * Broadcast 在 **10秒**内还未执行完操作
  * Service 在**15秒**内还未执行完操作
  * 在主线程做了耗时操作
  * 潜在的耗时操作（网络或数据库操作，）

* ANR 如何避免

  * 避免在主线程做耗时操作

    学习了解 Handler、AsyncTask、InterService的使用

  * 在 组件中 避免超时操作

* 发生了ANR，如何分析解决

  * 当发生ANR之后，在 data/anr 目录会自动生成 一个 traces.txt 通过分析这个文件可以方便地定位 ANR发生的位置



#### 线程优化

主要思想是 **采用线程池，避免程序中存在大量的Thread**

线程池可以重用内部的线程，从而避免了线程的创建和销毁带来的性能消耗，同时线程池还能有效地控制线程的最大并发数，从而避免大量线程因互相抢占系统资源而导致阻塞现象的发生。

因此，在实际开发过程中，尽量采用线程池，而不是每次都要创建一个Thread对象。



#### 参考链接

[Android布局优化之include、merge、ViewStub的使用](http://www.sunnyang.com/418.html)

[Android 过度绘制优化](https://jaeger.itscoder.com/android/2016/09/29/android-performance-overdraw.html)

[[译]Android内存泄漏的八种可能（上）](http://www.jianshu.com/p/ac00e370f83d)

[[译]Android防止内存泄漏的八种方法（下）](http://www.jianshu.com/p/c5ac51d804fa)

[Android 内存泄漏总结](https://yq.aliyun.com/articles/3009)

[Android 性能优化之使用MAT分析内存泄露问题](http://blog.csdn.net/xiaanming/article/details/42396507)

[Android消息机制的原理及源码解析](http://www.jianshu.com/p/f10cff5b4c25)

[Android中的线程状态之AsyncTask详解](http://www.jianshu.com/p/817a34a5f200)

[Android多线程全面解析：IntentService用法&源码](http://www.jianshu.com/p/8a3c44a9173a)

[ListView的优化](http://www.jianshu.com/p/f0408a0f0610)

[彻底理解Bitmap的高效加载策略](http://www.jianshu.com/p/5f02db4a225d)

[Java线程池详解](http://www.jianshu.com/p/47e903ab1bec)