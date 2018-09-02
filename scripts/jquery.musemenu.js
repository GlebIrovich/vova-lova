/*
 Copyright 2011-2016 Adobe Systems Incorporated. All Rights Reserved.
*/
(function(d) {
    "function" === typeof define && define.amd && define.amd.jQuery ? define(["jquery", "museutils"], d) : d(jQuery)
})(function(d) {
    d.fn.museMenu = function() {
        return this.each(function() {
            var b = this.id,
                c = d(this),
                a = c.closest(".breakpoint"),
                g = "absolute",
                j, f, h, i, l, k;
            if (!c.data("initialized")) {
                c.data("initialized", !0);
                var m = function(a) {
                        return a.hasClass("scroll_effect") === !0
                    },
                    n = function() {
                        if (c.css("position") == "fixed") {
                            g = "fixed";
                            k = c;
                            var a = Muse.Utils.getStyleSheetRulesById(Muse.Utils.getPageStyleSheets(), b);
                            j = a ? Muse.Utils.getRuleProperty(a, "top") : c.css("top");
                            f = a ? Muse.Utils.getRuleProperty(a, "left") : c.css("left");
                            h = a ? Muse.Utils.getRuleProperty(a, "right") : c.css("right");
                            i = a ? Muse.Utils.getRuleProperty(a, "bottom") : c.css("bottom");
                            l = parseInt(c.css("margin-left"))
                        } else
                            for (a = c.parent(); !a.is(document) && a.length > 0 && a.attr("id") != "page";) {
                                if (a.css("position") == "fixed") {
                                    g = "fixed";
                                    k = a;
                                    var d = a.offset(),
                                        m = c.offset(),
                                        n = Muse.Utils.getStyleSheetRulesById(Muse.Utils.getPageStyleSheets(), a.attr("id")),
                                        o = n ? Muse.Utils.getRuleProperty(n,
                                            "top") : a.css("top"),
                                        p = n ? Muse.Utils.getRuleProperty(n, "left") : a.css("left"),
                                        q = n ? Muse.Utils.getRuleProperty(n, "right") : a.css("right"),
                                        n = n ? Muse.Utils.getRuleProperty(n, "bottom") : a.css("bottom");
                                    j = o && o != "auto" ? parseInt(o) + (m.top - d.top) : o;
                                    f = p && p != "auto" && p.indexOf("%") == -1 ? parseInt(p) + (m.left - d.left) : p;
                                    h = q && q != "auto" && q.indexOf("%") == -1 ? parseInt(q) + (d.left + a.width()) - (m.left + c.width()) : q;
                                    i = n && n != "auto" ? parseInt(n) + (d.top + a.height()) - (m.top + c.height()) : n;
                                    l = parseInt(a.css("margin-left")) + (p && p.indexOf("%") !=
                                        -1 ? m.left - d.left : 0);
                                    break
                                }
                                a = a.parent()
                            }
                    },
                    p = function(b, c) {
                        a.is(b) && s.each(function() {
                            var a = d(this).data("offsetContainerRaw");
                            a && (c.swapPlaceholderNodesRecursively(a), c.activateIDs(a))
                        })
                    };
                d("body").on("muse_bp_activate", function(a, b, c, d) {
                    p(c, d);
                    n()
                });
                n();
                var o = d(),
                    q = !1,
                    r = c.find(".MenuItemContainer"),
                    s = c.find(".MenuItem"),
                    w = c.find(".SubMenu").add(s),
                    x;
                w.on("mouseover", function() {
                    q = !0
                });
                w.on("mouseleave", function() {
                    q = !1;
                    setTimeout(function() {
                        q === !1 && (r.each(function() {
                                d(this).data("hideSubmenu")()
                            }),
                            o = d())
                    }, 300)
                });
                r.on("mouseleave", function(a) {
                    var b = d(a.target),
                        c = b.closest(".SubMenu");
                    x && clearTimeout(x);
                    c.length > 0 && (x = setTimeout(function() {
                        c.find(".MenuItemContainer").each(function() {
                            d(this).data("hideSubmenu")()
                        });
                        o = b.closest(".MenuItemContainer").data("$parentMenuItemContainer")
                    }, 300))
                });
                r.on("mouseenter", function() {
                    clearTimeout(x)
                });
                s.each(function() {
                    var a = d(this),
                        b = a.siblings(".SubMenu"),
                        n = a.closest(".MenuItemContainer"),
                        p = n.parentsUntil(".MenuBar").filter(".MenuItemContainer").length ===
                        0,
                        q;
                    if (p && b.length > 0) a.data("offsetContainerRaw", d("<div style='position:" + g + "' class='MenuBar popup_element'></div>").hide().appendTo("body")), b.show(), q = b.position().top, b.hide();
                    var s = function(a) {
                        a = d(a.target);
                        d(".MenuItem", a.closest(".MenuItemContainer")).length > 1 || r.each(function() {
                            d(this).data("hideSubmenu")()
                        })
                    };
                    n.data("$parentMenuItemContainer", n.parent().closest(".MenuItemContainer")).data("showSubmenuOnly", function() {
                        if (p && b.length > 0) {
                            var o = a.data("offsetContainer"),
                                o = o || a.data("offsetContainerRaw");
                            if (!m(o))
                                if (g != "fixed") {
                                    var r = n.offset();
                                    o.css({
                                        left: r.left,
                                        top: r.top,
                                        width: a.width()
                                    })
                                } else {
                                    var r = n.position(),
                                        w = 0,
                                        x = 0;
                                    h && h != "auto" && (w = c.outerWidth() - r.left - a.width());
                                    i && i != "auto" && (x = q);
                                    l = parseInt(k.css("margin-left"));
                                    if (k != c) {
                                        var D = Muse.Utils.getStyleSheetRulesById(Muse.Utils.getPageStyleSheets(), k.attr("id"));
                                        (D = D ? Muse.Utils.getRuleProperty(D, "left") : k.css("left")) && D.indexOf("%") != -1 && (l += c.offset().left - k.offset().left)
                                    }
                                    o.css({
                                        left: f,
                                        top: j,
                                        right: h,
                                        bottom: i,
                                        marginLeft: l + r.left,
                                        marginRight: w,
                                        marginTop: r.top,
                                        marginBottom: x,
                                        width: a.width()
                                    })
                                }
                            o.append(b).show();
                            d(".MenuItem", o).on("click", s);
                            a.data("offsetContainer", o);
                            k && m(k) && o && !m(o) && o.cloneScrollEffectsFrom(k)
                        }
                        b.show();
                        b.find(".SubMenu").hide()
                    }).data("hideSubmenu", function() {
                        var c = a.data("offsetContainer");
                        c && m(c) && c.clearScrollEffects();
                        b.hide();
                        c && d(".MenuItem", c).off("click", s)
                    }).data("isDescendentOf", function(a) {
                        for (var b = n.data("$parentMenuItemContainer"); b.length > 0;) {
                            if (a.index(b) >= 0) return !0;
                            b = b.data("$parentMenuItemContainer")
                        }
                        return !1
                    });
                    var w = function() {
                            var a = o;
                            a.length == 0 ? n.data("showSubmenuOnly")() : n.data("$parentMenuItemContainer").index(a) >= 0 ? n.data("showSubmenuOnly")() : n.siblings().index(a) >= 0 ? (a.data("hideSubmenu")(), n.data("showSubmenuOnly")()) : a.data("isDescendentOf")(n) ? n.data("showSubmenuOnly")() : a.data("isDescendentOf")(n.siblings(".MenuItemContainer")) ? (n.siblings(".MenuItemContainer").each(function() {
                                d(this).data("hideSubmenu")()
                            }), n.data("showSubmenuOnly")()) : a.get(0) == n.get(0) && n.data("showSubmenuOnly")();
                            o = n
                        },
                        x = null;
                    a.on("mouseenter", function() {
                        a.data("mouseEntered", !0);
                        x = setTimeout(function() {
                            w()
                        }, 200);
                        a.one("mouseleave", function() {
                            clearTimeout(x);
                            a.data("mouseEntered", !1)
                        })
                    });
                    b.length && (a.attr("aria-haspopup", !0), Muse.Browser.Features.Touch && (a.click(function() {
                        return b.is(":visible")
                    }), d(document.documentElement).on(Muse.Browser.Features.Touch.End, Muse.Browser.Features.Touch.Listener(function(c) {
                        !b.is(":visible") && d(c.target).closest(n).length > 0 ? (c.stopPropagation(), Muse.Utils.redirectCancelled = !0, setTimeout(function() {
                            Muse.Utils.redirectCancelled = !1
                        }, 16), a.data("mouseEntered") && setTimeout(function() {
                            n.data("showSubmenuOnly")()
                        }, 200)) : b.is(":visible") && d(c.target).closest(b).length == 0 && d(c.target).closest(n).length == 0 && n.data("hideSubmenu")()
                    }))))
                });
                s.filter(".MuseMenuActive").each(function() {
                    for (var a = d(this).closest(".MenuItemContainer").data("$parentMenuItemContainer"); a && a.length > 0;) a.children(".MenuItem").addClass("MuseMenuActive"), a = a.data("$parentMenuItemContainer")
                })
            }
        })
    }
});;
(function() {
    if (!("undefined" == typeof Muse || "undefined" == typeof Muse.assets)) {
        var a = function(a, b) {
            for (var c = 0, d = a.length; c < d; c++)
                if (a[c] == b) return c;
            return -1
        }(Muse.assets.required, "jquery.musemenu.js");
        if (-1 != a) {
            Muse.assets.required.splice(a, 1);
            for (var a = document.getElementsByTagName("meta"), b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                if ("generator" == d.getAttribute("name")) {
                    "2017.0.2.363" != d.getAttribute("content") && Muse.assets.outOfDate.push("jquery.musemenu.js");
                    break
                }
            }
        }
    }
})();