angular.module('uCommon')

    .directive('homepage', ['$rootScope', 'moment', function ($rootScope, moment) {
        return {
            restrict: 'E',
            templateUrl: 'templates/console/homepage.html',
            controller: 'homepageCtrl',
        };
    }])

    .controller('homepageCtrl', ['$rootScope', '$scope', 'uApi', function ($rootScope, $scope, uApi) {


        google.charts.load('current', {
            'packages': ['geochart'],

            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);
        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable([
                ['Country', 'Users'],
                ['Germany', 200],
                ['United States', 300],
                ['Brazil', 400],
                ['Canada', 500],
                ['France', 600],
                ['RU', 700]
            ]);

            var options = {
                height: '450',
                legend: 'none',

                colorAxis: {colors: ["#a8b6bf", '#FAAF3E']}
            };

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }


        $scope.maleNum;
        $scope.femaleNum;
        $scope.showMaleNum = 'hideMaleNum';
        $scope.showFemaleNum = 'hideFemaleNum';
        $scope.verticalBarOption = {
            // scaleLineColor: 'transparent',
            // showScale: false,
            legend: {
                display: false
            },


            scales: {

                xAxes: [{
                    gridLines: {
                        display: false

                    },
                    barThickness: 50,
                    categoryPercentage: 1
                }],
                yAxes: [{

                    display: false,
                }]
            }
        }
        uApi.getAllTotalData(totalDataResp);


        function totalDataResp(resp) {
            $scope.totalData = resp;
            pieData1.datasets[0].data = [$scope.totalData.data.totalMaleUsers, $scope.totalData.data.totalActiveLockScreen]
            pieData2.datasets[0].data = [$scope.totalData.data.totalMaleUsers, $scope.totalData.data.totalInactiveLockScreen]
            $scope.barD.datasets[0].data = [
                $scope.totalData.data.totalAdClickUpoints,
                $scope.totalData.data.totalVideoWatchUpoints,
                $scope.totalData.data.totalOtherUpoints,
                $scope.totalData.data.totalDownloadUpoints,
                $scope.totalData.data.totalAdWatchUpoints
            ]

            $scope.maleNum = $scope.totalData.data.totalMaleUsers;
            $scope.femaleNum = $scope.totalData.data.totalFemaleUsers;

            $scope.activeNum = $scope.totalData.data.totalActiveLockScreen;
            $scope.inactiveNum = $scope.totalData.data.totalInactiveLockScreen;

            var myPieChart = new Chart(maleFem, {
                percentageInnerCutout: 20,

                type: 'doughnut',
                data: pieData1,
                options: $scope.pieOptions,

            });
            var myPieChart = new Chart(activeInact, {
                type: 'doughnut',
                data: pieData2,
                options: {
                    tooltips: {
                        enabled: false,
                    },
                    hover: {
                        onHover: function (e, legendItem) {
                            if (legendItem.length > 0) {
                                if (legendItem[0]._model.label == "Active") {
                                    $scope.showActive()

                                } else if (legendItem[0]._model.label == "Inactive") {
                                    $scope.showInactive()
                                }
                            } else {
                                $scope.activityHideAll();
                            }
                        }
                    },


                    legend: {
                        display: false,
                        position: 'bottom',
                        onClick: function (e) {
                            e.stopPropagation();
                        },

                    },
                    cutoutPercentage: 80
                }
            });
            var canvas = document.getElementById("botStatisticBlockBar");
            var ctx = canvas.getContext('2d');
            ctx.textBaseline = 'top';
            var myBarChart = new Chart(ctx, {
                type: 'bar',
                data: $scope.barD,
                // options: {
                //
                //     legend: {
                //         display: false,
                //     },
                //     title: {
                //         display: true,
                //         // text: '...Predicted world population (millions) in 2050...'
                //     },
                //
                //     scales: {
                //         ticks: {
                //             suggestedMin: 0,
                //             mirror: true,
                //             position: "left",
                //             fontSize: 16,
                //             beginAtZero: true,
                //             stepSize: 1
                //         },
                //         xAxes: [{
                //
                //             gridLines: {
                //                 display: false,
                //             }
                //         }],
                //         yAxes: [{
                //             gridLines: {
                //                 color: '#ffffff',
                //                 drawBorder: true,
                //                 display: false
                //             },
                //             barThickness: 17,
                //             categoryPercentage: 0.8,
                //             ticks: {
                //                 padding: 20,
                //                 // mirror: true,
                //             }
                //         }]
                //     },
                //
                //
                // }
                options: $scope.verticalBarOption
            });



            var activityBarChart = new Chart(document.getElementById("activityBar"), {
                type: 'bar',
                data: $scope.barActivity,
                options: $scope.verticalBarOption
            });
            var totalUserRewadrsRequests = new Chart(document.getElementById("totalUserRewadrsRequests"), {
                type: 'line',
                data: $scope.totalUserRewadrsRequests,
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                color: '#f4f4f4',
                                drawBorder: true,
                            },

                        }]
                    },

                    scales: {

                        yAxes: [{
                            ticks: {
                                padding: 10,
                            }
                        }],
                    },
                    tooltips: {
                        mode: 'point'
                    },
                    elements: {
                        line: {
                            tension: 0.1, // disables bezier curves
                        }
                    },
                }
            });
            var pieInterectsChart = new Chart(document.getElementById("pieChart"), {
                type: 'pie',
                data: $scope.pieInterects,
                options: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }

                }
            });
            var perRewards = new Chart(document.getElementById("perRewards"), {
                type: 'bar',
                data: $scope.perRewardsData,
                // options: {
                //     legend: {
                //         display: false
                //     },
                //     scales: {
                //         xAxes: [{
                //
                //             gridLines: {
                //                 display: false,
                //             }
                //         }],
                //         yAxes: [{
                //             gridLines: {
                //                 color: '#f4f4f4',
                //                 drawBorder: false,
                //                 display: false
                //             },
                //             barThickness: 17,
                //             categoryPercentage: 0.8
                //         }]
                //     },
                // }
                options:$scope.verticalBarOption
            });
        };


        $scope.totalUserRewadrsRequests = {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [{

                backgroundColor: "rgba(0, 0, 0, 0)",
                borderColor: '#a8b6bf',
                pointBackgroundColor: '#8499a5',
                borderWidth: '4',
                pointRadius: '4',
                pointHoverRadius: '6',
                data: [0, 59, 75, 80, 90, 155, 240, 260, 480, 800],
            }]
        }

        $scope.barActivity = {
            labels: ["7 DAYS", "14 DAYS", "30 DAYS"],
            datasets: [
                {
                    borderColor: ["#FAAF3E", "#8499a5", "#FAAF3E", "#8499a5", "#FAAF3E"],
                    backgroundColor: ["rgba(250, 175, 62, 0.4)",
                        "#a8b6bf",
                        "rgba(250, 175, 62, 0.4)",
                    ],
                    hoverBackgroundColor: [
                        "rgba(250, 175, 62, 0.6)",
                        "#8499a5",
                        "rgba(250, 175, 62, 0.6)",

                    ],
                    borderWidth: 1,
                    data: [2478, 5267, 734, 784, 433]
                }
            ],


        };

        $scope.perRewardsData = {
            labels: ["PS", "XBox", "Other", '5$', 'Twich', "XBox", "Other", '5$', 'Twich', "XBox", "Other", '5$', 'Twich'],
            datasets: [
                {
                    borderColor: ["#FAAF3E", "#8499a5", "#FAAF3E", "#8499a5", "#FAAF3E", "#8499a5", "#FAAF3E", "#8499a5", "#FAAF3E", "#8499a5", "#FAAF3E", "#8499a5", "#FAAF3E"],
                    backgroundColor: ["rgba(250, 175, 62, 0.4)",
                        "#a8b6bf",
                        "rgba(250, 175, 62, 0.4)",
                        "#a8b6bf",
                        "rgba(250, 175, 62, 0.4)",
                        "#a8b6bf",
                        "rgba(250, 175, 62, 0.4)",
                        "#a8b6bf",
                        "rgba(250, 175, 62, 0.4)",
                        "#a8b6bf",
                        "rgba(250, 175, 62, 0.4)",
                        "#a8b6bf",
                        "rgba(250, 175, 62, 0.4)"],
                    hoverBackgroundColor: [
                        "rgba(250, 175, 62, 0.6)",
                        "#8499a5",
                        "rgba(250, 175, 62, 0.6)",
                        "#8499a5",
                        "rgba(250, 175, 62, 0.6)",
                        "#8499a5",
                        "rgba(250, 175, 62, 0.6)",
                        "#8499a5",
                        "rgba(250, 175, 62, 0.6)",
                        "#8499a5",
                        "rgba(250, 175, 62, 0.6)",
                        "#8499a5",
                        "rgba(250, 175, 62, 0.6)"
                    ],
                    borderWidth: 1,
                    // fill: true,
                    // lineTension: 0.2,
                    data: [2478, 5267, 1222, 2000, 87777, 3245, 734, 5666, 433, 2444, 1234, 983, 500]
                }
            ],
        }

        $scope.pieInterects = {
            labels: [
                "text",
                "text",
                "text",
                "text",
                "text",
                "text",
                "text",

            ],
            datasets: [
                {
                    data: [133, 86, 52, 31, 20, 13, 6],
                    backgroundColor: [
                        "#FAAF3E",
                        "rgba(250, 175, 62, 0.4)",
                        "#a8b6bf",
                        "#8499a5",
                        "#01b8aa",
                        "#374649"
                    ],


                    hoverBorderWidth: 2,
                    circumference: 1
                }]


        };


        var pieData1 = {
            labels: [
                "Male",
                "Female"],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        "#a8b6bf",
                        "rgba(250, 175, 62, 0.4)"
                    ],
                    hoverBackgroundColor: [
                        "#8499a5",
                        "rgba(250, 175, 62, 0.6)"
                    ],
                    borderWidth: 1,
                    borderColor: ["#8499a5", "#FAAF3E"]
                }]
        };


        var pieData2 = {
            labels: [
                "Active",
                "Inactive"],
            datasets: [
                {
                    backgroundColor: [
                        "rgba(250, 175, 62, 0.4)",
                        "#a8b6bf"
                    ],
                    hoverBackgroundColor: [
                        "rgba(250, 175, 62, 0.6)",
                        "#8499a5"
                    ],
                    borderWidth: 1,
                    borderColor: ["#FAAF3E", "#8499a5"]
                }]
        };


        var maleFem = document.getElementById("maleFemale").getContext("2d");


        var maleNum = document.getElementById('maleNum');
        var femaleNum = document.getElementById('femaleNum');
        var activeNum = document.getElementById('activeNum');
        var inactiveNum = document.getElementById('inactiveNum');


        $(document).ready(function () {
            $('.hoverMale').hover(function () {
                    $scope.showMale()
                }, function () {
                    $scope.hideAll();
                }
            );
            $('.hoverFemale').hover(function () {
                    $scope.showFemale()
                }, function () {
                    $scope.hideAll();
                }
            );


            $('.hoverActive').hover(function () {
                    $scope.showActive()
                }, function () {
                    $scope.activityHideAll();
                }
            );
            $('.hoverInactive').hover(function () {
                    $scope.showInactive()
                }, function () {
                    $scope.activityHideAll();
                }
            );

        });

        function remuveClasses() {
            maleNum.classList.remove('hideMaleNum')
            femaleNum.classList.remove('hideFemaleNum');
            maleNum.classList.remove('showFemaleNum')
            femaleNum.classList.remove('showMaleNum');
        }

        $scope.showMale = function () {
            remuveClasses();
            maleNum.classList.add('showMaleNum')
            femaleNum.classList.add('hideFemaleNum');
        }
        $scope.showFemale = function () {
            remuveClasses();
            maleNum.classList.add('hideMaleNum')
            femaleNum.classList.add('showFemaleNum');
        }
        $scope.hideAll = function () {


            maleNum.classList.add('hideMaleNum')
            femaleNum.classList.add('hideFemaleNum');

        }


        function activityRemuveClasses() {
            activeNum.classList.remove('hideActiveNum');
            inactiveNum.classList.remove('hideInactiveNum');
            activeNum.classList.remove('showInactiveNum');
            inactiveNum.classList.remove('showActiveNum');
        }

        $scope.showActive = function () {
            activityRemuveClasses();
            activeNum.classList.add('showActiveNum');
            inactiveNum.classList.add('hideInactiveNum');
        }
        $scope.showInactive = function () {
            activityRemuveClasses();
            activeNum.classList.add('hideActiveNum');
            inactiveNum.classList.add('showInactiveNum');


        }
        $scope.activityHideAll = function () {
            activeNum.classList.add('hideActiveNum');
            inactiveNum.classList.add('hideInactiveNum');
        }


        var activeInact = document.getElementById("activeInactive").getContext("2d");

        $scope.pieOptions = {
            tooltips: {
                enabled: false,
            },
            hover: {
                onHover: function (e, legendItem) {

                    if (legendItem.length > 0) {
                        if (legendItem[0]._model.label == "Female") {
                            $scope.showFemale()

                        } else if (legendItem[0]._model.label == "Male") {
                            $scope.showMale()
                        }
                    } else {
                        $scope.hideAll();
                    }

                }
            },

            legend: {
                display: false,
                position: 'bottom',
                onClick: function (e) {
                    e.stopPropagation();
                },

            },
            cutoutPercentage: 80
        };


        $scope.barD = {
            labels: ["AD_CLICK", "VIDEO_WATCH", "OTHER", "DOWNLOAD", "AD_WATCH"],
            datasets: [
                {
                    data: [],
                    fill: true,
                    lineTension: 0.2,
                    borderWidth: 1,
                    borderColor: ["#FAAF3E", "#8499a5", "#FAAF3E", "#8499a5", "#FAAF3E"],
                    backgroundColor: ["rgba(250, 175, 62, 0.4)",
                        "#a8b6bf",
                        "rgba(250, 175, 62, 0.4)",
                        "#a8b6bf",
                        "rgba(250, 175, 62, 0.4)"],
                    hoverBackgroundColor: [
                        "rgba(250, 175, 62, 0.6)",
                        "#8499a5",
                        "rgba(250, 175, 62, 0.6)",
                        "#8499a5",
                        "rgba(250, 175, 62, 0.6)"
                    ],
                }
            ],

        }
    }])

