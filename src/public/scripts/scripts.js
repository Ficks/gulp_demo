function tab(ops) {
  this.el = ops.el; //滑动容器
  this.elList = ops.elList; //滑动列表
  this.btns = ops.btns || ""; //按钮组>切换显示内容
  this.prevNext = ops.prevNext || "";
  this.index = 0; //索引
  this.timer = null; //动画定时器
  this.bannerTimer = null; //轮播定时器
  this.autoplay = ops.autoplay; //轮播速度
  this.init();
}

// 初始化
tab.prototype.init = function () {
  // 外盒子的width
  var w = this.elList.eq(0).width();
  this.el.width(w * this.elList.length);
  // 如果有按钮切换 执行
  if (this.btns) this.bindToActive();
  // 如果有上下切换 执行
  if (this.prevNext) this.bindPrevNext();
  // 是否轮播
  if (this.autoplay) this.autoplayLoop();
};

// 跳转到某页
tab.prototype.toActive = function (i) {
  this.index = i;
  var w = this.elList.eq(0).width();
  var lt = -(i * w);
  this.el.animate({
    left: lt + "px"
  });
};

// 绑定按钮组切换内容
tab.prototype.bindToActive = function () {
  var self = this;
  // 事件滑动
  this.btns.on("click", function () {
    $(this)
      .siblings()
      .removeClass("active");
    if ($(this).index() == self.index) return;
    self.toActive($(this).index());
    $(this).addClass("active");
  });
};
// 绑定按钮组切换内容
tab.prototype.bindPrevNext = function () {
  var self = this;
  var len = this.elList.length - 1;
  this.prevNext.prevBtn.on("click", function () {
    if (self.index > 0) self.index--;
    else self.index = len;
    self.toActive(self.index);
  });

  this.prevNext.nextBtn.on("click", function () {
    if (self.index < len) self.index++;
    else self.index = 0;
    self.toActive(self.index);
  });

  if (!this.autoplay) return;
  $.each(this.prevNext, function (index, item) {
    item.hover(
      function () {
        clearInterval(self.bannerTimer);
      },
      function () {
        self.autoplayLoop();
      }
    );
  });
};

// 循环轮播
tab.prototype.autoplayLoop = function () {
  var self = this;
  var len = this.elList.length - 1;
  // 循环
  this.bannerTimer = setInterval(function () {
    if (self.index < len) self.index++;
    else self.index = 0;
    self.toActive(self.index);
  }, this.autoplay);
};


function oddLun(opt) {
  this.el = opt.el;
  this.elList = opt.elList;
  this.prevNext = opt.prevNext;
  this.index = 0;

  this.init();
}

oddLun.prototype.init = function () {
  var w = this.elList.eq(0).outerWidth();
  var len = this.elList.length;
  this.el.width(w * len);
  this.bindPrevNext();
}

oddLun.prototype.toActive = function (i) {
  this.index = i;
  var w = this.elList.eq(0).outerWidth();
  var lt = -(i * w);
  this.el.animate({
    left: lt + "px"
  });
};

// 绑定按钮组切换内容
oddLun.prototype.bindPrevNext = function () {
  var self = this;
  var len = this.elList.length - 3;
  this.prevNext.prevBtn.on("click", function () {
    if (self.index > 0) self.index--;
    else self.index = len;
    self.toActive(self.index);
  });

  this.prevNext.nextBtn.on("click", function () {
    if (self.index < len) self.index++;
    else self.index = 0;
    console.log(self.index)
    self.toActive(self.index);
  });
};