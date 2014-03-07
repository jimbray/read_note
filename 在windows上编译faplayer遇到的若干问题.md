编译faplayer 若干问题


问题：D:/android/android-ndk-r8e-windows-x86/android-ndk-r8e/platforms/android-9/arch-                                                                                                                           arm/usr/include/../include/pthread.h:111:8: error: expected identifier or '(' be                                                                                                                           fore string constant
Compile arm    : vlccore <= libvlc-module.c
In file included from D:/android/android-ndk-r8e-windows-x86/android-ndk-r8e/sou                                                                                                                           rces/cxx-stl/stlport/stlport/pthread.h:29:0,
from D:/personal/git/faplayer/faplayer/jni/vlc/include/vlc_fixu                                                                                                                           ps.h:312,
from D:/personal/git/faplayer/faplayer/jni/vlc/config.h:834,
from D:/personal/git/faplayer/faplayer/jni/vlc/src/libvlc-modul                                                                                                                           e.c:34:

解决：

	```
	#ifdef __ANDROID__
	# undef __linux__
	# ifndef __cplusplus
	#  define __cplusplus 0
	# endif
	# include <pthread.h>
	# if __cplusplus == 0
	#  undef __cplusplus
	# endif
	char *tempnam(const char *, const char *);
	#endif // ANDROID
	```

删掉 那个cplus_plus 的定义

	```
	#ifdef __ANDROID__
	# undef __linux__
	# include <pthread.h>
	char *tempnam(const char *, const char *);
	#endif // ANDROID
	```

就可以了

----------------------------------------------------------------------------

问题：D:/personal/git/faplayer/faplayer/jni/vlc/modules/codec/libass.c:518:67: error:                                                                                                                            unknown type name 'ASS_Image'

解决：
jni/vlc/modules/codec/Android.mk
25行

	```
	LOCAL_C_INCLUDES += \
    $(VLCROOT) \
    $(VLCROOT)/include \
    $(VLCROOT)/src \
    $(EXTROOT)/iconv/include \
    $(EXTROOT)/freetype/include \
    $(EXTROOT)/libass/include
	```
改为

	LOCAL_C_INCLUDES += \
    $(VLCROOT) \
    $(VLCROOT)/include \
    $(VLCROOT)/src \
    $(EXTROOT)/iconv/include \
    $(EXTROOT)/freetype/include \
    $(EXTROOT)/libass/libass

最后一行

jni/vlc/modules/codec/libass.c

	#include <ass/ass.h>
修改为

	#include <ass.h>
-----------------------------------------------------------------------------------

问题：make: execvp: /cygdrive/d/android/android-ndk-r8d/toolchains/arm-linux-androideabi-4.6/prebuilt/windows/bin/arm-linux-androideabi-ar: Argument list too long
/cygdrive/d/android/android-ndk-r8d/build/core/build-binary.mk:385: recipe for target `/cygdrive/d/personal/git/faplayer/faplayer/obj/local/armeabi-v7a/libavcodec.a' failed
make: *** [/cygdrive/d/personal/git/faplayer/faplayer/obj/local/armeabi-v7a/libavcodec.a] Error 127

网络查找一下原因：[Cygwin，NDK编译动态库时报Argument list too long错误](http://blog.csdn.net/xulaoban/article/details/8926185)
原因是：LOCAL_SRC_FILES变量的参数太长。就是直接赋值了太多了源文件，如xx1.cpp xx2.cpp ...，过多导致的。可以将其源文件按类型分开后，在赋值就ok了。比如A1 = xx1.cpp xx2.cpp ...   A2 = xx3.cpp ,xx4.cpp ... 等等。
接下来就是寻找这个LOCAL_SRC_FILES 的位置所在

最后在jni/ext/ffmpeg/Android.mk中找到792行

	include $(CLEAR_VARS)

	LOCAL_ARM_MODE := arm
	ifeq ($(BUILD_WITH_NEON),1)
	LOCAL_ARM_NEON := true
	endif

	LOCAL_MODULE := avcodec

	LOCAL_C_INCLUDES += \
    	$(LOCAL_PATH) \
    	$(LOCAL_PATH)/avcodec

	LOCAL_CFLAGS += $(FF_CFLAGS)

	LOCAL_SRC_FILES := \
    	$(FF_AVCODEC_SRC) 

看了下，确实这个FF_AVCODEC_SRC 很长！
果断分两截！
以libavcodec/mpeg4video_parser.c 文件为断点

分两截，修改后

	LOCAL_SRC_FILES := \
    $(FF_AVCODEC_SRC_1) \
    $(FF_AVCODEC_SRC_2)

OK!继续往下编译！还是出错！
[解决编译faplayer出现的一揽子问题](http://blog.csdn.net/chao56789/article/details/8817298) 分段编译.a文件解决argument list too long 的问题
既然已经编完了 libavcodec.a文件 
就把ext/ffmpeg/Android.mk 的相关模块去除

	LOCAL_ARM_MODE := arm
	ifeq ($(BUILD_WITH_NEON),1)
	LOCAL_ARM_NEON := true
	endif

	LOCAL_MODULE := avcodec

	LOCAL_C_INCLUDES += \
    $(LOCAL_PATH) \
    $(LOCAL_PATH)/avcodec

	LOCAL_CFLAGS += $(FF_CFLAGS)

	LOCAL_SRC_FILES := \
    $(FF_AVCODEC_SRC_1) \
    $(FF_AVCODEC_SRC_2)

	ifeq ($(BUILD_WITH_NEON),1)
	LOCAL_CFLAGS += -DHAVE_NEON=1
	LOCAL_SRC_FILES += $(FF_AVCODEC_NEON_SRC)
	else
	LOCAL_CFLAGS += -DHAVE_NEON=0
	endif

	include $(BUILD_STATIC_LIBRARY)