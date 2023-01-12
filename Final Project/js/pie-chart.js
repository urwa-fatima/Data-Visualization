render();
window.addEventListener('resize', render);

function render() {
    var $container = $('#world-asia-pie-chart'),
        τ = 2 * Math.PI,
        width = $container.width(),
        height = $container.height();
    const divID = d3.select('#world-asia-pie-chart');
    myResponsiveComponent(divID, Object.assign({}, {
        // width: +divID.node().getBoundingClientRect().width,
        // height: +divID.node().getBoundingClientRect().height,
        width: width,
        height: height,
        margin: { top: 0, bottom: 0, left: 0, right: 0 }
    }));

}
function myResponsiveComponent(selection, props) {

    const { width,
        height,
        margin
    } = props;

    var radius = Math.min(width, height) / 2 - margin;

    console.log(width, height)

    let svg = selection.selectAll('svg').data([null]);

    svg = svg.enter().append('svg')
        .merge(svg)
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height));
    //     .append("g")
    //     .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");
    // ;

    // const { g, innerwidth, innerheight } = marginConvention(svg, { width, height, margin });

    let g = svg.selectAll('g').data([null]);
    g = g
        .enter()
        .append('g')
        .merge(g)
        .attr('width', width)
        .attr('height', height)
        .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");

    // let rect = g.selectAll('rect').data([null]);
    // rect = rect
    //     .enter()
    //     .append('rect')
    //     .attr('rx', 50)
    //     .merge(rect)
    //     .attr('width', innerwidth)
    //     .attr('height', innerheight);

    //CSV Data
    // d3.csv("../../data_clean/monthly_data.csv").then(function (data) {

    // if data is a list of object like 
    // data = [{"name":"a", "value":1},{"name":"b", "value":2},{"name":"c", "value":3}];
    // then we create pir generator to be 
    // const data_ready = d3.pie().value(d => d.value)(data);
    // I need to test the data brackets part if it works or not (https://youtu.be/10dl-gDJLks?t=196)
    // Create dummy data
    const data = { "a": 9, "b": 20, "c": 30, "d": 8, "e": 12, "f": 4, h: 10 }

    //color 
    var colorList = ["#ff595e", "#ffca3a", "#dd6e42", "#6a4c93",
        "#8ac926", "#1982c4", "#8f2d56"];

    const color = d3.scaleOrdinal()
        .range(colorList);

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        .value(function (d) { return d[1] })

    const data_ready = pie(Object.entries(data))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('mySlices')
        .data(data_ready)
        .join('path')
        .attr('d', arcGenerator)
        .attr('fill', function (d) { return (color(d.data[0])) })
        .attr("stroke", "white")
        .style("stroke-width", "1px")
        .style("opacity", 0.9)

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
        .selectAll('mySlices')
        .data(data_ready)
        .join('text')
        .text(function (d) { return "grp " + d.data[0] })
        .attr("transform", function (d) { return `translate(${arcGenerator.centroid(d)})` })
        .style("text-anchor", "middle")
        .style("font-size", 17)

    //close of Data function from csv
    // });


}
function marginConvention(selection, props) {
    const { width, height, margin, className = "margin-group" } = props;
    let g = selection
        .selectAll('.' + className).data([null]);
    g = g.enter().append('g')
        .attr('class', className)
        .merge(g)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const innerwidth = width - margin.left - margin.right;
    const innerheight = height - margin.top - margin.bottom;

    return { g, innerwidth, innerheight }
}


function piechart() {


}