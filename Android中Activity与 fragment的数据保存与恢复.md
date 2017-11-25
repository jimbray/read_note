## Android中Activity的数据保存

APP 在使用过程中，总有可能出现各种突发情况(电话打进来、进程被杀死)，所以对APP中一些临时数据或者关键持久数据型数据，都需要保存和恢复。

### 突发情况有哪些

* 点击back键
* 点击电源键
* 点击home键
* 电话打进来(其他APP进入前台)
* 屏幕方向旋转
* APP被 Kill

当突发情况发生时，哪些方法会被调用呢？

结论：当 APP 处在前台，能与用户交互的情况下，出现上述突发事件时，除了点击Back键，onSaveInstanceState方法不会被调用，其他的情况都会调用。并且 onPause 是一定会调用的。

#### **onSaveInstanceState**方法在什么时候会被调用呢？

> 当某个Activity变得“可能”被销毁时， onSaveInstanceState 就会被执行，除非是用户主动操作（比如说 点击返回 back 时）才不会调用。

关键词是：**被动**！当Activity并不是有用户主动操作导致失去焦点的情况，都一定会调用 onSaveInstanceState 方法。

#### onSaveInstanceState**方法会在生命周期的那个位置会被调用呢？

目前了解到的是在 onPause 和 onStop 之间，Google 结论：能保证 onSaveInstanceState 在 onStop 之前，但不一定在 onPause 之后。

其实Android 的 View 自身就实现了 onSaveInstanceState 方法，比如 TextView

**但是**：只有当这个 控件在 xml 中赋予了 id之后，才具有保存数据并且恢复的能力，并且id不能重复，否则可能会出现 **数据覆盖**的情况。

### 恢复数据

恢复数据的操作可以在 onCreate 和 onRestoreSaveInstanceState 方法中执行



#### 另外

无论出现什么样的状况，比如程序突然被kill掉了，onPause 是一定会调用的，但是 onStop 和 onDestroy 却不一定。这个特性给了我们一个保存数据的机会，如果需要保存一些持久化的数据，onPause 就是我们的最后一根救命稻草了。



### 结论

当activity中有一些临时数据需要保存的时候（Activity 出现意外），建议使用 onSaveInstance保存会恢复

当activity中有一些永久性数据需要保存的时候，建议使用 onPause 时机操作，但是 onPause方法最好不要做太多或者耗时的操作，会影响下一个 Activity 入栈。



### 扩展链接

[[[译\] 保存/恢复 Activity 和 Fragment 状态的最佳实践](https://segmentfault.com/a/1190000006691830)]