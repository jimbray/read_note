###Android中如何停止一个线程

关于线程结束，
1.[Thread](http://developer.android.com/reference/java/lang/Thread.html)中自带了 [stop](http://developer.android.com/reference/java/lang/Thread.html#stop(java.lang.Throwable))函数

函数描述：

	public final synchronized void stop (Throwable throwable)

	Added in API level 1
	This method was deprecated in API level 1.
	Stopping a thread in this manner is unsafe and can leave your application and the VM in an unpredictable state.

	Throws UnsupportedOperationException.

还有一个stop
	
	public final void stop ()

	Added in API level 1
	This method was deprecated in API level 1.
	Stopping a thread in this manner is unsafe and can leave your application and the VM in an unpredictable state.

	Requests the receiver Thread to stop and throw ThreadDeath. The Thread is resumed if it was suspended and awakened if it was sleeping, so that it can proceed to throw ThreadDeath.

通过描述可以直接看到，这些方法都是Android不推荐使用的，通过这种方式结束线程是不安全的。

2.在线程的run方法中如果没有一个while循环的存在，当run方法执行完成之后，线程会自行销毁。

3.手动停止。在线程run方法中设计标记量终止运行，再调用Thread.interrupt()方法。PS.在run没有停止时调用Interrupt方法是无效的。

-------------------------------------------------------
使用标记量，在run中设计一个标记量，用于终止run的操作

	private class StopThread extends Thread {
		private boolean isRunning = true;
		
		public void setRunning(boolean is_running) {
			this.isRunning = is_running;
		}

		@Override
		public void run() {
			while(isRunning) {
				//做耗时操作
				Log.d(TAG, "thread is running");
			}
		}
	}

这样在isRunning判断之后就能直接结束掉run函数，线程就能自动销毁了。

但能发现一个弊端：在run中存在阻塞操作时，根本就不会继续做isRunning的判断了，这个时候最好设置一个timeout值，这样的话，阻塞过久也能进行其他操作。

------------------------------------------------

	while(!Thread.interrupted()) {
		//做耗时操作
		Log.d(TAG, "thread is running");
	}

使用thread.interrupt();来进行interrupt操作。但是不要依赖 interrupt 方法，线程能够被 interrupt 前提是线程处于可以被中断的状态，比如：sleep，wait 等等，如果线程处于其他状态，interrupt 是没有用的

当遇到抛出 InterruptedException 会取消线程的中断状态，这样会导致，这样的话while里面的判断就永远成真了。所以一般我们见到的判断条件都会加多一个判断条件。

	while(!Thread.interrupted() && mKeepWork) {
		//做耗时操作
		Log.d(TAG, "thread is running");
	}

并捕获InterruptedException,在catch块进行 Interrupt操作。

-----------------------------------
PS. 线程有几种状态

	1.新建状态：新创建了一个线程对象  

	2.就绪状态(Runnable)：线程对象创建之后，其他线程调用了该对象的start方法。该状态的线程位于可运行线程池中，变得可运行，等待获取CPU的使用权。  

	3.运行状态(Running)：就绪状态的线程获取了CPU，执行run方法。  

	4.阻塞状态(Blocked)：阻塞状态是线程因为某种原因放弃CPU使用权，暂时停止运行。知道线程进入就绪状态，才有机会转到运行状态。阻塞的情况分三种：  

		4.1等待阻塞：运行的线程执行wait方法，JVM会把线程放入等待池中。 
 
		4.2同步阻塞：运行的线程在获取对象的同步锁时，如果同步锁被别的线程占用，则JVM会把该线程放入锁池中。  

		4.3其他阻塞：运行的线程执行sleep或者join方法，或者发出了I/O请求时，JVM会把该线程置为阻塞状态。当sleep状态超时，join等待线程终止或者超时、或者I/O处理完毕时，线程重新进入就绪状态。
  
	5.死亡状态(Dead)：线程执行完了或者因为异常退出了run方法，该线程结束生命周期。

当调用start方法时，该线程就进入就绪状态。等待CPU进行调度执行，此时还没有真正执行线程。当调用run方法时，是已经被CPU进行调度，执行线程的主要任务。

-------------------------------------------------------
