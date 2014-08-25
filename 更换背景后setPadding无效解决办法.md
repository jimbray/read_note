先保存view 在变换background前的padding

	int bottom = theView.getPaddingBottom();
    int top = theView.getPaddingTop();
    int right = theView.getPaddingRight();
    int left = theView.getPaddingLeft();
    theView.setBackgroundResource(R.drawable.bg);
    theView.setPadding(left, top, right, bottom);

在更换背景后进行padding 设置即可