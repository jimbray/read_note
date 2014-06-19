Java泛型方法的定义

对象

	public static <T> T getObjectFromJson(String json, Class<T> clazz) {
		Gson gson = new Gson();
		T t = gson.fromJson(json, clazz);
		return t;
	}
	
列表

	public static ArrayList<?> getObjectListFromJson(String json) {
		Type listType = new TypeToken<ArrayList<?>>(){}.getType();
		
		Gson gson = new Gson();
		
		ArrayList<?> list = gson.fromJson(json, listType);
		
		return list;
	}