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
