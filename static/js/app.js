d3.json("data/samples.json").then((sampleData) => {
	console.log(sampleData);
	var ids = sampleData.samples[0].otu_ids;
    console.log(ids);
    var sampleValues = sampleData.samples[0].sample_values.slice(0,10).reverse();
    console.log(sampleValues);
    var labels = sampleData.samples[0].otu_labels.slice(0,10);
    console.log(labels);
    var topOTU = (sampleData.samples[0].otu_ids.slice(0,10)).reverse();
    var idOTU = topOTU.map(d => "OTU " + d);
    console.log (`OTU IDs: ${idOTU}`);

		// BAR CHART
		var trace1 = {
			x: sampleValues,
			y: idOTU,
			text: labels,
            marker: {
            color: 'blue'},
            }
			type: "bar",
			orientation: "h"
		};

		var barData = [trace1];

		// Create layout variable to set the layout
		var barLayout = {
			title: `<b>Top 10 OTUs<b>`,
			xaxis: { title: "Sample Value"},
			yaxis: { title: "OTU ID"},
			autosize: false,
			width: 450,
			height: 600
		}

		// Create the bar plot
		Plotly.newPlot("bar", barData, barLayout);

		// BUBBLE CHART
		var trace2 = {
			x: sampleData.samples[0].otu_ids,
            y: sampleData.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampleData.samples[0].sample_values,
                color: sampleData.samples[0].otu_ids
            },
            text:  sampleData.samples[0].otu_labels
		};
		
		var bubbleData = [trace2];
		
		var bubbleLayout = {
			title: '<b>Bubble Chart of OTU IDs<b>',
			xaxis: { title: "OTU ID"},
			showlegend: false,
		};
		
		Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
}
// create the function to get the demographic info
function getDemoInfo(id) {
        d3.json("samples.json").then((data)=> {
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // filter meta data info by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
           var demographicInfo = d3.select("#sample-metadata");
            
         // clear out info
           demographicInfo.html("");
    
         // display each key value from the metadata JSON
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // create the function for the change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // create the function for the initial data rendering
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // get the id data to the dropdwown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // call the functions to display the data and the plots to the page
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();
	