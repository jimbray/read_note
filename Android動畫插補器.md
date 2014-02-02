###Android動畫插補器
使用插補器的方法

	`
	animation.setInterpolator(AnimationUtils.loadInterpolator(this,
                        android.R.anim.accelerate_interpolator));
	`

android.R.anim.accelerate_interpolator 就是一個插補器
這是一個加速插補器

還有其他的，記錄一下:

	`
	加速插補器: android.R.anim.accelerate_interpolator
	減速插補器：android.R.anim.decelerate_interpolator
	先加速后減速插補器：accelerate_decelerate_interpolator
	先前翻一下插補器：android.R.anim.anticipate_interpolator
	到了越過一下插補器：android.R.anim.overshoot_interpolator
	前後都越過彈插補器：android.R.anim.anticipate_overshoot_interpolator
	回彈插補器：android.R.anim.bounce_interpolator
	`

名字不太官方，純粹做個記錄。通俗易懂，哈哈~
已发布至[jimbray](http://1.jimblog.sinaapp.com/?p=89)
