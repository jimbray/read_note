## 经典蓝牙与Ble的区别

要是仅仅从两者的通信方式上来看，可以说除了两者的名字都叫蓝牙外，完全是两个东西。

但是，两者在总体上的流程是相似的

* **发现设备-->配对/绑定设备-->建立连接-->数据通信**

其实，除了配对/绑定 环节是一样的之外，另外三个环节都是不同的

#### 发现设备

* 经典蓝牙

调用 BluetoothAdapter 的 startDiscovery() 方法，只能发现经典蓝牙设备

* Ble(低功耗蓝牙)

有一个主设备(central)与从设备(periperal)也叫外围设备的概念。

主设备作为发现方，调用BluetoothAdapter的 startLeScan() 方法实现。从设备作为被发现方，仅仅是发出广播，以供发现。

只能发现ble设备

 #### 配对绑定

使用广播监听配对状态



#### 建立连接

> 蓝牙小知识
>
> 在蓝牙设备中，存在着物理地址，也叫作蓝牙的mac地址，这个地址是唯一的，就像网络中的ip地址。同时还存在一个叫做UUID的东西，可以把它理解为端口号。知道了IP地址和端口号，就能具体定位到目标网络服务器位置。知道了MAC地址和UUID，就能定位到是具体哪一台蓝牙设备了。
>
> 两者合起来就是蓝牙的唯一标识。

* 经典蓝牙

建立连接的方式实际上就是 socket连接的建立。只不过不是直接用socket，而是用bluetoothSocket。

利用搜索到的 bluetoothDevice，调用方法 createRfcommSocketToServiceRecord(UUID)，最后调用 connect 方法就建立了连接。

* Ble

主要使用GATT进行连接

> BLE 的基本概念
>
> **Generic Attribute Profile (GATT)**
>
> 通过 ble 连接，读写属性类小数据的profile通用规范。现在所有的ble应用profile都是基于GATT的。
>
> **Attribute Protocol(ATT)**
>
> GATT 是基于 ATT protocol 的。
>
> **Characteristic**
>
> characteristic 可以理解为一个数据类型，包括一个 value 和 0至多个对此value 的 descriotor（描述）
>
> **Descriptor**
>
> 对characteristic 的描述。比如范围、计量单位等。
>
> **Service**
>
> Characteristic的集合
>
> 一个 Service 可以有多个 CHaracteristic ,一个 Characteristic 可以有多个 Descriptor。

版本限制：

如果手机需要作为主设备，必须是 Android 4.3 及以上版本

如果手机需要作为从设备，必须是 Android 5.0 及以上版本

#### 数据通信

* 经典蓝牙

连接建立后，直接使BluetoothSocket 的getOutputStream() 获取输出流写入需要发送的数据。调用getInputStream() 输入流进行读取数据操作。几乎与 socket 通信一致。

* Ble

1. 通过 service uuid 获取对应的 bluetoothGattService
2. 通过调用 BluetoothDevice 和对应的 characteritic 的写入UUID进行获取操作
3. 通过 characteristic 的 setValue 进行设置 byte[]
4. 最后使用 bluetoothGatt 的 写入方法进行命令发送



扩展阅读：[BLE开发的各种坑](https://www.race604.com/android-ble-tips/)