$(function(){
    
    
    $(".menu-btn").click(function(){
        // $("header").animate({
        //     height:"200px"
        // })
        if($(".menu-btn img:first-child:visible").length > 0)
        {
            $(".menu-btn img").show()
            $(".menu-btn img:first-child").hide()
        }
        else{
            $(".menu-btn img").hide()
            $(".menu-btn img:first-child").show()
        }
        $("nav").slideToggle()
    })
    // $(document).on('click', '[data-toggle="lightbox"]', function(event) {
    //     event.preventDefault();
    //     $(this).ekkoLightbox({
    //         alwaysShowClose: true,
    //         showArrows: true
    //     });
    // });
    
    $(".calculator-form").validate({
        rules: {
            propertyprice:"required",
            loanperiod:"required",
            interestrate:"required",
            downpayment:"required",
        }
    })

    $(".interest-form").validate({
        rules: {
            name:"required",
            mobileNo:"required",
            email:{
                required: true
            }
        }
    })

    $(".submit-btn").click(function(){
        $(this).parentsUntil("form").submit()
    })
    $('.selectpicker').selectpicker({
        size: "10"
    });
    var scrollItems = $(".inner-navigations-listing a").map(function(){
        if($(this).attr("href").charAt(0)  == "#")
        {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        }  
      
    });


    window.addEventListener("scroll", function(){
        var st = window.pageYOffset || document.documentElement.scrollTop; 

        var windowWidth = $(window).width()
        
        
        //if(st > 5)
        //{
        //    $("header,.logo,.inner-navigations").addClass("scrolled")
        //}
        //else
        //    $("header,.logo,.inner-navigations").removeClass("scrolled")

        // if(st >= $(".scrollto-content").scrollTop()
        // {

        // }

        var fromTop = $(this).scrollTop()
        var cur = scrollItems.map(function(){
            
            if (($(this).offset().top ) < (fromTop + 60))
                return this;
        });            

        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";
        var lastId
        
        $(".inner-navigations-listing li a").removeClass("selected")
        if (lastId !== id) {
            lastId = id;
        
            
            $(".inner-navigations-current").text($(".inner-navigations-listing li a[href='#"+id+"']").text())
            $(".inner-navigations-listing li a[href='#"+id+"']").addClass("selected")

        }

        if(id == ""){
            
            $(".inner-navigations-current").text($(".inner-navigations-current").attr("data-default"))
        } 
    
    })

    var initPhotoSwipeFromDOM = function(gallerySelector) {

        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                el,
                childElements,
                thumbnailEl,
                size,
                item;
                console.log(el)
            for(var i = 0; i < numNodes; i++) {
                el = thumbElements[i];

                // include only element nodes 
                if(el.nodeType !== 1) {
                  continue;
                }

                childElements = el.children;

                size = el.getAttribute('data-size').split('x');

                // create slide object
                item = {
                    src: el.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10),
                    author: el.getAttribute('data-author')
                };

                item.el = el; // save link to element for getThumbBoundsFn

                if(childElements.length > 0) {
                  item.msrc = childElements[0].getAttribute('src'); // thumbnail url
                  if(childElements.length > 1) {
                      item.title = childElements[1].innerHTML; // caption (contents of figure)
                  }
                }


                var mediumSrc = el.getAttribute('data-med');
                if(mediumSrc) {
                    size = el.getAttribute('data-med-size').split('x');
                    // "medium-sized" image
                    item.m = {
                        src: mediumSrc,
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10)
                    };
                }
                // original image
                item.o = {
                    src: item.src,
                    w: item.w,
                    h: item.h
                };

                items.push(item);
            }

            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && ( fn(el) ? el : closest(el.parentNode, fn) );
        };

        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            var clickedListItem = closest(eTarget, function(el) {
                return el.tagName === 'A';
            });

            if(!clickedListItem) {
                return;
            }

            var clickedGallery = clickedListItem.parentNode;

            var childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;

            for (var i = 0; i < numChildNodes; i++) {
                if(childNodes[i].nodeType !== 1) { 
                    continue; 
                }

                if(childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }

            if(index >= 0) {
                openPhotoSwipe( index, clickedGallery );
            }
            return false;
        };

        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
            params = {};

            if(hash.length < 5) { // pid=1
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');  
                if(pair.length < 2) {
                    continue;
                }           
                params[pair[0]] = pair[1];
            }

            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            return params;
        };

        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

            items = parseThumbnailElements(galleryElement);

            // define options (if needed)
            options = {

                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function(index) {
                    // See Options->getThumbBoundsFn section of docs for more info
                    var thumbnail = items[index].el.children[0],
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect(); 

                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                },

                addCaptionHTMLFn: function(item, captionEl, isFake) {
                    if(!item.title) {
                        captionEl.children[0].innerText = '';
                        return false;
                    }
                    captionEl.children[0].innerHTML = item.title +  '<br/><small>Photo: ' + item.author + '</small>';
                    return true;
                },
                
            };


            if(fromURL) {
                if(options.galleryPIDs) {
                    // parse real index when custom PIDs are used 
                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for(var j = 0; j < items.length; j++) {
                        if(items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }

            // exit if index not found
            if( isNaN(options.index) ) {
                return;
            }



            
            options.mainClass = 'pswp--minimal--dark';
            options.barsSize = {top:0,bottom:0};
            options.captionEl = false;
            options.fullscreenEl = false;
            options.shareEl = false;
            options.bgOpacity = 0.85;
            options.tapToClose = true;
            options.tapToToggleControls = false;

            if(disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

            // see: http://photoswipe.com/documentation/responsive-images.html
            var realViewportWidth,
                useLargeImages = false,
                firstResize = true,
                imageSrcWillChange;

            gallery.listen('beforeResize', function() {

                var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
                dpiRatio = Math.min(dpiRatio, 2.5);
                realViewportWidth = gallery.viewportSize.x * dpiRatio;


                if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
                    if(!useLargeImages) {
                        useLargeImages = true;
                        imageSrcWillChange = true;
                    }
                    
                } else {
                    if(useLargeImages) {
                        useLargeImages = false;
                        imageSrcWillChange = true;
                    }
                }

                if(imageSrcWillChange && !firstResize) {
                    gallery.invalidateCurrItems();
                }

                if(firstResize) {
                    firstResize = false;
                }

                imageSrcWillChange = false;

            });

            gallery.listen('gettingData', function(index, item) {
                
                if( useLargeImages ) {
                    item.src = item.o.src;
                    item.w = item.o.w;
                    item.h = item.o.h;
                } else {

                    // item.src = item.msrc;
                    // item.w = item.m.w;
                    // item.h = item.m.h;
                }
            });

            gallery.init();
        };

        // select all gallery elements
        var galleryElements = document.querySelectorAll( gallerySelector );
        for(var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid,  galleryElements[ hashData.gid - 1 ], true, true );
        }
    };
    initPhotoSwipeFromDOM('.siteplan-pic');
    initPhotoSwipeFromDOM('.exterior');
    initPhotoSwipeFromDOM('.floor-pic');
    initPhotoSwipeFromDOM('.impression');
    initPhotoSwipeFromDOM('.type-a');
    initPhotoSwipeFromDOM('.type-b');
    
    
    $(".scrollto").click(function(e){
        // alert($(this).attr("href"))
        var obj = $(this)
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 50.8
        }, 600, function(){
            if($(window).width() <= 768){
                //$(".inner-navigations-current").removeClass("selected").text(obj.text())
                $(".inner-navigations-current").removeClass("selected")
                $(".inner-navigations-listing").slideUp()

            }
        });

        return false
    })
    $(".gallery-title-item").click(function(){
        var obj = $(this)
        $(".gallery-title-item").removeClass("selected")
        obj.addClass("selected")
        $(".gallery-item").hide()
        $(".gallery-item").eq(obj.index()).show()
    })

    $(".gallery-showing-title").click(function(){
        $(".gallery-title-listing").slideToggle()
        $(this).toggleClass("selected")
    })

    $(".gallery-title-item").click(function(){
        if($(window).width() <= 768)
        {

            $(".gallery-title-listing").slideToggle()
        }
    })
    $(".inner-navigations-current").click(function(){
        if($(window).width() <= 768)
        {
            $(this).toggleClass("selected")
            $(".inner-navigations-listing").slideToggle()
        }
    })

    $(".floor-plan-current").click(function(){
        var obj = $(this)
        if($(window).width() <= 768)
        {
            obj.toggleClass("selected")
            $(".floor-plan-listing").slideToggle()
        }
    })
    $(".floor-item").click(function(){
        var obj = $(this)
        $(".floor-item").removeClass("selected")
        obj.addClass("selected")
        $(".floor-plan-img-item").hide().eq(obj.parent().index()).show()
        $(".floor-plan-current").text(obj.text())

        if($(window).width() <= 768)
        {
            $(".floor-plan-listing").slideToggle()
        }
    })
    $(".view-floor-btn").click(function(){

        $(".floor-plan-img-item:visible").trigger("click")
    })
    $(".location-btn").click(function(){

        $(".location .exterior").trigger("click")
    })

    // $(".text-link").click(function(){
    //     var parentObj = $(this).parentsUntil("section")
        
    //     //$(".floor-pic",parentObj)[0].trigger("click")
    //     var currentFloorIndex = $(".floor-plan-listing li a.selected").parent().index()
    //     $(".floor-pic:eq("+currentFloorIndex+")",parentObj).trigger("click")
    // })
    $(".site .text-link ").click(function(){
        $(".site .exterior").trigger("click")
    })
})