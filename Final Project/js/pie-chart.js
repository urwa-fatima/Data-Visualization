render();
window.addEventListener('resize', render);

function render() {
    const divID = d3.select('#world-asia-pie-chart');
    pie_chart(divID, Object.assign({}, {
        width: divID.node().getBoundingClientRect().width,
        height: divID.node().getBoundingClientRect().height,
        margin: { top: 0, bottom: 0, left: 0, right: 0 }
    }));

}
function pie_chart(selection, props) {

    const { width,
        height,
        margin
    } = props;

    var radius = Math.min(width, height) / 2 - margin.left - margin.right;

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

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        .value(function (d) { return d[1] })
        .sortValues((a, b) => a < b ? 1 : -1);

    const data_ready = pie(Object.entries(data))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.

    // var paths = svg.selectAll('mySlices').data([null]);
    // paths = paths
    //     .enter()

    // g.selectAll("path").remove();
    // g.selectAll("text").remove();

    // let paths = g.selectAll('mySlices').data([null]);

    // paths = paths
    g.selectAll('mySlices')
        .data(data_ready)
        .join('path')
        .attr('d', arcGenerator)
        .attr('fill', function (d) { return (color(d.data[0])) })
        .attr("stroke", "#E0E0E0")
        .style("stroke-width", "1px")
        .style("opacity", 1);

    // Now add the annotation. Use the centroid method to get the best coordinates
    g.selectAll('mySlices')
        .data(data_ready)
        .join('text')
        .text(function (d) { return "grp " + d.data[0] })
        .attr("transform", function (d) { return `translate(${arcGenerator.centroid(d)})` })
        .style("text-anchor", "middle")
        .style("fill", "#E0E0E0")
        .style("font-size", "1.25em")

    // close of Data function from csv
    // });


}
