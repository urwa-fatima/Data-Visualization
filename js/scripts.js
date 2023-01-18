$(function () {
    $("#top-header").load("./elements/navbar.html");
});

$(function () {
    $("#down-footer").load("./elements/footer.html");
});
// pie_chart()
// // window.addEventListener('resize', pie_chart);

// function pie_chart() {
//     let div_id = "#world-asia-pie-chart"
//     // Definition of the div target dimentions
//     let ratio = 1.25; // 3 width = 1 height
//     let win_width = d3.select(div_id).node().getBoundingClientRect().width;
//     let win_height = win_width / ratio;

//     // set the dimensions and margins of the graph
//     let margin = 20,
//         width = win_width - margin,
//         height = win_height - margin;


//     // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
//     const radius = Math.min(width, height) / 2 - margin

//     // append the svg object to the div called 'my_dataviz'
//     const svg = d3.select("#world-asia-pie-chart")
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .append("g")
//         .attr("transform", `translate(${width / 2}, ${height / 2})`);

//     // Create dummy data
//     const data = { "a": 9, "b": 20, "c": 30, "d": 8, "e": 12, "f": 4, "h": 10 }

//     // set the color scale

//     var colorList = ["#ff595e", "#ffca3a", "#dd6e42", "#6a4c93",
//         "#8ac926", "#1982c4", "#8f2d56"];
//     // ["#FF1D33", "#26265C", "#ffb703", "#fb8500",
//     //     "#084c61", "#8f2d56", "#1982c4", "#6a4c93", "#218380"];

//     const color = d3.scaleOrdinal()
//         .range(colorList);
//     // .range(d3.schemeSet2);

//     // Compute the position of each group on the pie:
//     const pie = d3.pie()
//         .value(function (d) {
//             console.log(d[1])
//             return d[1]
//         })
//     const data_ready = pie(Object.entries(data))
//     // Now I know that group A goes from 0 degrees to x degrees and so on.

//     // shape helper to build arcs:
//     const arcGenerator = d3.arc()
//         .innerRadius(0)
//         .outerRadius(radius)

//     // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
//     svg
//         .selectAll('mySlices')
//         .data(data_ready)
//         .join('path')
//         .attr('d', arcGenerator)
//         .attr('fill', function (d) { return (color(d.data[0])) })
//         .attr("stroke", "white")
//         .style("stroke-width", "1px")
//         .style("opacity", 0.9)

//     // Now add the annotation. Use the centroid method to get the best coordinates
//     svg
//         .selectAll('mySlices')
//         .data(data_ready)
//         .join('text')
//         .text(function (d) { return "grp " + d.data[0] })
//         .attr("transform", function (d) { return `translate(${arcGenerator.centroid(d)})` })
//         .style("text-anchor", "middle")
//         .style("font-size", "1.25em")
// }