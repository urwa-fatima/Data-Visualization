// render();
// window.addEventListener('resize', render);

function render() {
    div_id = "line-chart";
    const divID = d3.select('#' + div_id);
    line_chart(divID, Object.assign({}, {
        width: divID.node().getBoundingClientRect().width,
        height: divID.node().getBoundingClientRect().height,
        margin: { top: 0, bottom: 0, left: 0, right: 0 }
    }));

}
function line_chart(selection, props) {

    const { width,
        height,
        margin
    } = props;


    let svg = selection.selectAll('svg').data([null]);

    svg = svg.enter().append('svg')
        .merge(svg)
        .attr("class", "svg-content")
        .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height));

    // Remove previous group element
    svg.selectAll("g").remove();

    let g = svg.selectAll('g').data([null]);
    g = g
        .enter()
        .append('g')
        .merge(g)
        .attr('width', width)
        .attr('height', height)
        .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");


    //CSV Data
    // d3.csv("../../data/data.csv").then(function (data) {

    // if data is a list of object like 
    // data = [{"name":"a", "value":1},{"name":"b", "value":2},{"name":"c", "value":3}];
    // then we create pir generator to be 
    // const data_ready = d3.pie().value(d => d.value)(data);
    // I need to test the data brackets part if it works or not (https://youtu.be/10dl-gDJLks?t=196)
    // Create dummy data
    const data = { "a": 9, "b": 20, "c": 30, "d": 8, "e": 12, "f": 4, h: 10 }

    //color 
    var colorList = ["#FF1D33", "#26265C", "#32327A", "#5454CC",
        "#6969FF", "#8E8EFF", "#B4B4FF"];

    const color = d3.scaleOrdinal()
        .range(colorList);



    // close of Data function from csv
    // });


}

