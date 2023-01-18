render();
window.addEventListener('resize', render);

function render() {
    const divID = d3.select('#world-asia-pie-chart');
    pie_chart(divID, Object.assign({}, {
        width: divID.node().getBoundingClientRect().width,
        height: divID.node().getBoundingClientRect().height,
        margin: { top: 50, bottom: 50, left: 50, right: 50 }
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
        .attr("class", "arc")
        .attr('width', width)
        .attr('height', height)
        .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");


    //CSV Data
    d3.csv("./data/world_total_death_pie_data.csv").then(function (data) {

        console.log(data);

        //color 
        // var colorList = ["#26265C", "#32327A", "#5454CC",
        //     "#6969FF", "#8E8EFF", "#B4B4FF"];

        var mycolors = ["#26265C", '#1D382B', '#D68C2C', '#1F1F1F',
            '#53070D', '#B7264A', '#66976B', '#A54A2B',
            '#C7A98C', '#F4A6B3', '#C5BE6A',
            '#364277', '#8FBFCC', '#226D7B', '#002E6B'];


        const color = d3.scaleOrdinal()
            .range(mycolors);

        var colorScale = d3.scaleThreshold()
            .domain([0, 2, 19, 22, 23, 25])
            .range(mycolors);

        // Compute the position of each group on the pie:
        const pie = d3.pie()
            .sort(null);

        const data_ready = pie.value(d => d.percentage)(data)
            .sort(function (a, b) { return d3.descending(a.value, b.value); });
        // Now I know that group A goes from 0 degrees to x degrees and so on.

        // shape helper to build arcs:
        const arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        var formatDecimal = d3.format(",.2f");

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
            .attr('fill', function (d) {
                if (d.data.continent == "Asia") {
                    return ("#FF1D33")

                } else {
                    return (color(d.value))
                    // return (colorScale(d.value))

                }
            })
            .attr("stroke", "#E0E0E0")
            .style("stroke-width", "1px")
            .style("opacity", 1);

        // Now add the annotation. Use the centroid method to get the best coordinates
        g.selectAll('mySlices')
            .data(data_ready)
            .join('text')
            .text(function (d) { return d.data.continent + " " + formatDecimal(d.value) + "%" })
            .attr("transform", function (d) { return `translate(${arcGenerator.centroid(d)})` })
            .style("text-anchor", "middle")
            .style("fill", "#E0E0E0")
            .style("font-size", "1em")

        // close of Data function from csv
    });


}
