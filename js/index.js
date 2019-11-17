function parseMercImage(list) {
    let html = '';
    let len = list.length;
    for (let i = 0; i < len; i++) {
        html += '<div class="swiper-slide"><img src="{0}" /></div>';
        html = html.format(list[i]);
    }
    return html;
}

function parseTypeList(list) {
    let html = '';
    let len = list.length;
    for (let i = 0; i < len; i++) {
        html += '<div class="slide-item" data-type="1" data-id="{0}">{1}</div>';
        html = html.format(list[i].id, list[i].groupName);
    }
    return html;
}

function parseSortList(list) {
    let html = '';
    let len = list.length;
    for (let i = 0; i < len; i++) {
        let obj = new Object();
        obj.itemCls = i == 0? ' slide-selected-item': '';
        obj.text = list[i].sortValue;
        html += '<div class="slide-item {itemCls}" data-type=1 data-sortValue="{text}">{text}</div>';
        html = html.format(obj);
    }
    return html;
}

function parseCategoryList(list) {
    let html = '';
    let len = list.length;
    for (let i = 0; i < len; i++) {
        let obj = new Object();
        obj.itemCls = i == 0? ' slide-selected-item': '';
        obj.categoryId = list[i].categoryId;
        obj.text = list[i].categoryName;
        html += '<div class="slide-item {itemCls}" data-categoryId="{categoryId}">{text}</div>';
        html = html.format(obj);
    }
    return html;
}

function parseYearList(list) {
    let html = '';
    let len = list.length;
    for (let i = 0; i < len; i++) {
        let obj = new Object();
        obj.itemCls = i == 0? ' slide-selected-item': '';
        obj.categoryName = list[i].categoryName;
        obj.text = list[i].categoryName;
        html += '<div class="slide-item {itemCls}" data-categoryName="{categoryName}">{categoryName}</div>';
        html = html.format(obj);
    }
    return html;
}

function parseMovieList(list) {
    let len = list.length;
    let html = '';
    for (let i = 0; i < len; i++) {
        let obj = new Object();
        obj.fId = list[i].fId;
        obj.movieLogo = list[i].movieLogo;
        obj.movieName = list[i].movieName;
        let openTag = i % 4 == 0?  '<ul id="common-container"': '';
        let closeTag = (i % 4 == 3 || i == len -1)? '</ul>': '';
        let elem = '' +
            '<li>' +
                '<a href="particulars.html?id={fId}">' + 
                    '<img src="{movieLogo}" alt="">' +
                    '<p class="p-text">{movieName}</p>' +
                '</a>' +
            '</li>';
        elem = elem.format(obj);
        html += openTag + elem + closeTag;
    }
    return html;
}

function filter() {
    let that = this;
    $('.slide-item').click(function() {
        let num = $(this).attr("data-type");
        let url = "";
        if(num == '1') {
            let categoryId = $(this).attr('categoryId');
            url = "https://svrstg.xiaoniaoguanying.com/hmVodSvr/movieTheater/v3_scanCodeSelectMovie?pageIndex=1&pageSize=12&mercId=925336436335575040&searchType=01&categoryId=" + categoryId + "&movieName=";
        } else {
            let sortValue = $(this).attr("data-sortValue");
            let categoryId = $(this).attr("categoryId") //3和2一样	
            let categoryName = $(this).attr("data-categoryName");
            url = "https://svrstg.xiaoniaoguanying.com/hmVodSvr/movieTheater/v3_scanCodeSelectMovie?pageIndex=1&pageSize=12&mercId=925336436335575040&searchType=02&categoryId=" + categoryId + "&year=" + categoryName + "&sortType=" + sortValue;
        }
        that.getMovieList(url);
    })
}

function slide() {
    $(".slide").click(function() {
        $(".slide-box").slideToggle()
    })
}

function swipe() {
    var swiper = new Swiper('.swiper-container', {
        autoplay: true,
        slidesPerView: 2,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

function layInit() {
    layui.use(['carousel', 'element', 'form'], function() {
        var $ = layui.jquery,
            element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
        var carousel = layui.carousel,
            form = layui.form;
        //常规轮播
        carousel.render({
            elem: '#test1',
            arrow: 'always',
            width: '100%'
        });
        var $ = layui.$,
            active = {
                set: function(othis) {
                    var THIS = 'layui-bg-normal',
                        key = othis.data('key'),
                        options = {};
                    othis.css('background-color', '#5FB878').siblings().removeAttr('style');
                    options[key] = othis.data('value');
                    ins3.reload(options);
                }
            };
        //监听开关
        form.on('switch(autoplay)', function() {
            ins3.reload({
                autoplay: this.checked
            });
        });
        $('.demoSet').on('keyup', function() {
            var value = this.value,
                options = {};
            if(!/^\d+$/.test(value)) return;
            options[this.name] = value;
            ins3.reload(options);
        });
        $('.slide-item').each(function() {
            $(this).click(function() {
                $(this).addClass('slide-selected-item');
                $(this).siblings().removeClass('slide-selected-item');
            })
        })
    });
}