//获取随机id
const uuid = function(len, binary) {
	len = !len ? 36 : len;
	binary = !binary ? 16 : binary;
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * binary | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(binary);
	}).substring(0, len)
};
export {
    uuid
}