/*
File: Graph.js
Authors: Eric E
Creation Date: 5-22-24
Purpose: This file defines the implementation of the Graph View component, it is responsible for visualizing the connections
between track entries.
Structure: This graph component is utilized in the App.js file, where it is called to be routed by /graph-view.
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme, Box, Stack, Typography } from "@mui/material";
import ForceGraph2D from "react-force-graph-2d";
import "./Graph.css";

// component to display entry content of each node when clicked
function DisplayNode({ entry }) {
  const theme = useTheme();
  return (
    <Box
      // define the style properties
      sx={{
        width: 300,
        height: "fit-content",
        backgroundColor: theme.palette.primary.light,
        padding: 2,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "left",
        fontSize: 20,
        fontFamily: "Raleway, sans-serif",
        boxShadow: `7px 7px ${theme.palette.primary.dark}`,
      }}
    >
      <div id="entry_text" style={{ color: "white" }}>
        <h3>{entry.name}</h3>
        <em>Review:</em> <p>{entry.review}</p>
        <em>Thought:</em> <p>{entry.thought}</p>
        <em>Rating: </em> <p>{entry.val}</p>
        <em>Lists: </em>{" "}
        <p>{entry.lists.filter((list) => list !== "").join(", ")}</p>
      </div>
    </Box>
  );
}

// graph view component to render the relational song graph
const GraphView = () => {
  // define states, for loading, populating graph data, and selecting nodes
  const [graphData, setGraphData] = useState({ nodes: [], links: [] }); // initial graph data to be populated
  const [loading, setLoading] = useState(true); // track if entries are still being pulled
  const [selectedNode, setSelectedNode] = useState(null); // track the selected node

  // define effect hook
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        // populate the response with request to backend for all entries
        const res = await axios.get("http://localhost:5001/entries");
        const entries = res.data;
        const graph = { links: [], nodes: [] };

        // push each entry to the graph with appropriate data
        entries.forEach((entry) => {
          graph.nodes.push({
            id: entry._id,
            name: entry.entryName,
            val: entry.rating,
            review: entry.review,
            thought: entry.thought,
            lists: entry.lists,
            related: entry.related,
          });

          // loop through related entry nodes to build edge relationships for graph
          entry.related.forEach((related_entry) => {
            graph.links.push({
              source: entry._id,
              target: related_entry,
            });
          });
        });

        // halt loading state, allow graph to render
        setGraphData(graph);
        setLoading(false);
      } catch (error) {
        // catch if entries do not populate
        console.error("Error fetching entries:", error);
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  // display loading text
  if (loading) {
    return <div>Loading...</div>;
  }

  // return a stack container to allow for entry details to fill the left of the canvas
  // only display details when a node is selected
  return (
    <Stack spacing={5} sx={{ display: "flex", flexDirection: "row" }}>
      {selectedNode && <DisplayNode entry={selectedNode} />}
      <ForceGraph2D
        sx={{
          flexGrow: 1,
        }}
        graphData={graphData}
        nodeAutoColorBy={(d) => d.id}
        onNodeClick={(node) => setSelectedNode(node)}
      />
    </Stack>
  );
};

export default GraphView;
