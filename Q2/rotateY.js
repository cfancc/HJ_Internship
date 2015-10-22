var rotateManager = (function(){
	// 定义动画状态
	var rotating = false;

	// 定义元素列表
	var elemnts = [];

	// 默认旋转参数
	var config = {
		maxDeg: 180,
		time: 2000,
		interval: 20,
		rotateType: "rotateY"
	};

	// 设定参数
	function setConfig(conf) {
		if (typeof conf === "object") {
			config = conf;
		}
	}

	// 得到动画状态
	function isRotating() {
		return rotating;
	}

	// 增加元素
	function addElement(ele) {
		// 如果元素不存在，推入订阅者列表
		if(elemnts.indexOf(ele) === -1) {
			elemnts.push(ele);
			return true;
		}
		// 如果存在
		return false;
	}

	// 删除元素
	function removeElement(ele) {
		// 如果元素不存在，返回失败
		if(elemnts.indexOf(ele) === -1) {
			return false;
		}
		// 如果存在,删除该元素
		elemnts.splice(elemnts.indexOf(ele), 1);
		return true;
	}

	// 旋转所有元素
	function rotateAll() {
		var len = elemnts.length;
		if (len > 0) {
			for (var i = 0; i < len; i++) {
				rotating = true;
				rotate(elemnts[i]);
			}
		}
	}

	// 旋转单个元素
	function rotate(ele) {
		// 计算出速度
		var roateSpeed = config.maxDeg / (config.time / config.interval);
		function intervalRotate() {
			rotating = true;
			// 如果有上一次角度的数据，取出来。如果没有或为0，代表刚开始旋转
			var oldDeg = ele.oldDeg || 0;

			// 如果旧的角度值大于或等于180了，那么就可以停下了
			if (parseInt(oldDeg, 10) >= config.maxDeg) {
				clearInterval(intervalId);
				rotating = false;
				return;
			}

			// 新的角度 = 旧的角度 + 速度
			var newDeg = oldDeg + roateSpeed;

			// 设置新的角度值
			ele.style.transform = config.rotateType + "(" + newDeg + "deg)";
			// 存起来新的角度值，下一轮备用
			ele.oldDeg = newDeg;
		}
		// 每隔一段时间执行一次小幅度的旋转
		var intervalId = setInterval(intervalRotate, config.interval);
	}

	return {
		addElement: addElement,
		removeElement: removeElement,
		setConfig: setConfig,
		rotateAll: rotateAll,
		isRotating: isRotating
	}
})();


var logo = document.querySelector('.logo');
rotateManager.addElement(logo);

logo.onclick = function(e){
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
	// 如果不在旋转
	if (!rotateManager.isRotating()) {
		rotateManager.rotateAll();
	}
}