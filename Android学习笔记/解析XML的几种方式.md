###解析XML的几种方式

DOM操作，SAX操作，PULL操作

DOM操作有一个致命的缺点（在Android上），
DOM是一次性加载XML文件，在使用DOM api去进行解析，这样很大程度的消耗内存，对性能可能会有一定的影响。而Android设备，虽然一直在升级，但是内存方面还是无法与PC媲美。所以在Android上面，不推荐使用DOM的方式来解析和操作XML

SAX操作全称Simple Api For Xml 是一个使用广泛的XML解析标准

Pull解析和Sax解析很相似，都是轻量级的解析，在Android的内核中已经潜入了Pull，不需要再添加第三方jar包来支持Pull。跟sax解析不一样的地方有  
1.pull读取xml文件后触发相应的事件调用方法返回的是数字  
2.pull可以在程序中控制想解析到哪里就可以停止解析。  