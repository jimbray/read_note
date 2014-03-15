解决ANR问题除了需要查看log日志
还需要使用trace.txt文件进行分析
如何获取trace.txt文件呢？

如何获取呢？可以用如下命令获取

    $chmod 777 /data/anr

    $rm /data/anr/traces.txt

    $ps

    $kill -3 PID

    adbpull data/anr/traces.txt ./mytraces.txt