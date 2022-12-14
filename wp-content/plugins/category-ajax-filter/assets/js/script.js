function get_posts(t) {
    var a = jQuery.noConflict(),
        e = t["data-target-div"],
        n = a(e).find("#manage-ajax-response"),
        s = a(e).find(".status");
    tc_caf_ajax.plugin_path,
        a(s).html('<i class="fa fa-spinner fa-spin"></i>').addClass("active"),
        a(n).addClass("loading"),
        a.ajax({
            url: tc_caf_ajax.ajax_url,
            data: { action: "get_filter_posts", nonce: tc_caf_ajax.nonce, params: t },
            type: "post",
            dataType: "json",
            success: function (t, e, r) {
                a(n).removeClass("loading"), 200 === t.status ? a(n).html(t.content) : 201 === t.status ? a(n).html(t.content) : 404 === t.status ? a(n).html(t.content) : a(s).html(t.message);
            },
            error: function (t, e, n) {
                a(s).html(e);
            },
            complete: function (t, e) {
                (msg = e), "success" === e && (msg = t.responseJSON.found), a(s).text("Posts found: " + msg);
            },
        });
}
jQuery(function (t) {
    function a(a, e) {
        return {
            page: a,
            tax: t((e = "." + e)).attr("data-tax"),
            "post-type": t(e).attr("data-post-type"),
            term: t(e).attr("data-terms"),
            "per-page": t(e).attr("data-per-page"),
            "filter-id": t(e).attr("data-filter-id"),
            "caf-post-layout": t(e).attr("data-post-layout"),
            "data-target-div": e,
        };
    }
    t(".caf-post-layout-container").each(function (e) {
        0 == e && get_posts(a(1, t(this).attr("data-target-div")));
    }),
        t("ul.dropdown li a").click(function () {
            var a = t(this).text();
            t("ul.dropdown span.result").html(a);
        }),
        t(".caf-post-layout-container").on("click", ".caf-filter-container li a, .caf-pagination a", function (e) {
            var n = e.currentTarget.getAttribute("data-target-div");
            if ("flt" == e.currentTarget.getAttribute("data-main-id")) {
                t("." + n + " .caf-filter-layout ul li a").each(function () {
                    t(this).removeClass("active");
                });
                var s = t(this).attr("data-id");
                t(this).addClass("active"), t("." + n).attr("data-terms", s), ($page = "1");
            } else (n = e.delegateTarget.getAttribute("data-target-div")), ($page = parseInt(t(this).attr("href").replace(/\D/g, "")));
            get_posts(a($page, n)), e.preventDefault();
        });
}),
    jQuery(document).ready(function (t) {
        t("ul.dropdown").on("click", ".init", function () {
            t("ul.dropdown li ul").toggle(), t("ul.dropdown li").toggleClass("activss");
        });
    });
