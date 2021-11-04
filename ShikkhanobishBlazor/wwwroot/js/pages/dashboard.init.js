!(function (e) {
    "use strict";
    var a = function () {};
    (a.prototype.createLineChart = function (e, a, r, t, i, o, b, n, y) {
        Morris.Line({
            element: e,
            data: a,
            xkey: r,
            ykeys: t,
            labels: i,
            fillOpacity: o,
            pointFillColors: b,
            pointStrokeColors: n,
            behaveLikeLine: !0,
            gridLineColor: "rgba(108, 120, 151, 0.1)",
            hideHover: "auto",
            lineWidth: "3px",
            pointSize: 0,
            preUnits: "$",
            resize: !0,
            lineColors: y,
        });
    }),
        (a.prototype.createBarChart = function (e, a, r, t, i, o) {
            Morris.Bar({ element: e, data: a, xkey: r, ykeys: t, labels: i, hideHover: "auto", resize: !0, gridLineColor: "rgba(108, 120, 151, 0.1)", barSizeRatio: 0.4, xLabelAngle: 35, barColors: o });
        }),
        (a.prototype.createStackedChart = function (e, a, r, t, i, o) {
            Morris.Bar({ element: e, data: a, xkey: r, ykeys: t, stacked: !0, labels: i, hideHover: "auto", resize: !0, gridLineColor: "rgba(108, 120, 151, 0.1)", barColors: o });
        }),
        (a.prototype.init = function () {
            this.createLineChart(
                "morris-line-chart",
                [
                    { y: "2008", a: 50, b: 0 },
                    { y: "2009", a: 75, b: 50 },
                    { y: "2010", a: 30, b: 80 },
                    { y: "2011", a: 50, b: 50 },
                    { y: "2012", a: 75, b: 10 },
                    { y: "2013", a: 50, b: 40 },
                    { y: "2014", a: 75, b: 50 },
                    { y: "2015", a: 100, b: 70 },
                ],
                "y",
                ["a", "b"],
                ["Mobiles", "Tablets"],
                ["0.1"],
                ["#ffffff"],
                ["#999999"],
                ["#458bc4", "#23b195"]
            );
            this.createBarChart(
                "morris-bar-chart",
                [
                    { y: "2009", a: 100, b: 90, c: 40 },
                    { y: "2010", a: 75, b: 65, c: 20 },
                    { y: "2011", a: 50, b: 40, c: 50 },
                    { y: "2012", a: 75, b: 65, c: 95 },
                    { y: "2013", a: 50, b: 40, c: 22 },
                    { y: "2014", a: 75, b: 65, c: 56 },
                    { y: "2015", a: 100, b: 90, c: 60 },
                ],
                "y",
                ["a", "b", "c"],
                ["Series A", "Series B", "Series C"],
                ["#458bc4", "#3db9dc", "#ebeff2"]
            );
            this.createBarChart(
                "morris-bar-chart2",
                [
                    { y: "2009", a: 100, b: 90, c: 40 },
                    { y: "2010", a: 75, b: 65, c: 20 },
                    { y: "2011", a: 50, b: 40, c: 50 },
                    { y: "2012", a: 75, b: 65, c: 95 },
                    { y: "2013", a: 50, b: 40, c: 22 },
                    { y: "2014", a: 75, b: 65, c: 56 },
                    { y: "2015", a: 100, b: 90, c: 60 },
                ],
                "y",
                ["a", "b", "c"],
                ["Series A", "Series B", "Series C"],
                ["#458bc4", "#3db9dc", "#ebeff2"]
            );
            this.createBarChart(
                "morris-bar-chart3",
                [
                    { y: "2009", a: 100, b: 90, c: 40 },
                    { y: "2010", a: 75, b: 65, c: 20 },
                    { y: "2011", a: 50, b: 40, c: 50 },
                    { y: "2012", a: 75, b: 65, c: 95 },
                    { y: "2013", a: 50, b: 40, c: 22 },
                    { y: "2014", a: 75, b: 65, c: 56 },
                    { y: "2015", a: 100, b: 90, c: 60 },
                ],
                "y",
                ["a", "b", "c"],
                ["Series A", "Series B", "Series C"],
                ["#458bc4", "#3db9dc", "#ebeff2"]
            );
            this.createBarChart(
                "morris-bar-chart4",
                [
                    { y: "2009", a: 100, b: 90, c: 40 },
                    { y: "2010", a: 75, b: 65, c: 20 },
                    { y: "2011", a: 50, b: 40, c: 50 },
                    { y: "2012", a: 75, b: 65, c: 95 },
                    { y: "2013", a: 50, b: 40, c: 22 },
                    { y: "2014", a: 75, b: 65, c: 56 },
                    { y: "2015", a: 100, b: 90, c: 60 },
                ],
                "y",
                ["a", "b", "c"],
                ["Series A", "Series B", "Series C"],
                ["#458bc4", "#3db9dc", "#ebeff2"]
            );
            this.createBarChart(
                "morris-bar-chart5",
                [
                    { y: "2009", a: 100, b: 90, c: 40 },
                    { y: "2010", a: 75, b: 65, c: 20 },
                    { y: "2011", a: 50, b: 40, c: 50 },
                    { y: "2012", a: 75, b: 65, c: 95 },
                    { y: "2013", a: 50, b: 40, c: 22 },
                    { y: "2014", a: 75, b: 65, c: 56 },
                    { y: "2015", a: 100, b: 90, c: 60 },
                ],
                "y",
                ["a", "b", "c"],
                ["Series A", "Series B", "Series C"],
                ["#458bc4", "#3db9dc", "#ebeff2"]
            );
            this.createBarChart(
                "morris-bar-chart6",
                [
                    { y: "2009", a: 100, b: 90, c: 40 },
                    { y: "2010", a: 75, b: 65, c: 20 },
                    { y: "2011", a: 50, b: 40, c: 50 },
                    { y: "2012", a: 75, b: 65, c: 95 },
                    { y: "2013", a: 50, b: 40, c: 22 },
                    { y: "2014", a: 75, b: 65, c: 56 },
                    { y: "2015", a: 100, b: 90, c: 60 },
                ],
                "y",
                ["a", "b", "c"],
                ["Series A", "Series B", "Series C"],
                ["#458bc4", "#3db9dc", "#ebeff2"]
            );
            this.createBarChart(
                "morris-bar-chart7",
                [
                    { y: "2009", a: 100, b: 90, c: 40 },
                    { y: "2010", a: 75, b: 65, c: 20 },
                    { y: "2011", a: 50, b: 40, c: 50 },
                    { y: "2012", a: 75, b: 65, c: 95 },
                    { y: "2013", a: 50, b: 40, c: 22 },
                    { y: "2014", a: 75, b: 65, c: 56 },
                    { y: "2015", a: 100, b: 90, c: 60 },
                ],
                "y",
                ["a", "b", "c"],
                ["Series A", "Series B", "Series C"],
                ["#458bc4", "#3db9dc", "#ebeff2"]
            );
            this.createStackedChart(
                "dashboard-bar-stacked",
                [
                    { y: "2005", a: 45, b: 180 },
                    { y: "2006", a: 75, b: 65 },
                    { y: "2007", a: 100, b: 90 },
                    { y: "2008", a: 75, b: 65 },
                    { y: "2009", a: 100, b: 90 },
                    { y: "2010", a: 75, b: 65 },
                    { y: "2011", a: 50, b: 40 },
                    { y: "2012", a: 75, b: 65 },
                    { y: "2013", a: 50, b: 40 },
                    { y: "2014", a: 75, b: 65 },
                    { y: "2015", a: 100, b: 90 },
                ],
                "y",
                ["a", "b"],
                ["Series A", "Series B"],
                ["#458bc4", "#ebeff2"]
            );
        }),
        (e.Dashboard = new a()),
        (e.Dashboard.Constructor = a);
})(window.jQuery),
    (function (e) {
        "use strict";
        // window.jQuery.Dashboard.init();
    })();
