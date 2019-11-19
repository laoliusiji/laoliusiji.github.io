$(function() {
    var dom = document.getElementById("container2");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        
        legend: {
            x : 'center',
            y : 'bottom',
            itemWidth: 8,
            itemHeight: 8,
            textStyle:{//图例文字的样式
                color:'#fff',
                fontSize:12
            },
            data:['在线','不在线']
        },
        calculable : true,
        series : [
            {
                name:'面积模式',
                type:'pie',
                radius : [10, 90],
                center : ['50%', '45%'],
                roseType : 'area',
                data:[
                    {value:10, name:'在线',itemStyle:{normal:{color:'#ff7800'}}},
                    {value:90, name:'不在线',itemStyle:{normal:{color:'#23eb6a'}}}
                    
                ]
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
});