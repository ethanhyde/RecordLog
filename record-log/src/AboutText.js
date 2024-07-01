/*
File: AboutText.js 
Authors: Eric E
Creation Date: 6-2-24
Purpose: This file returns a styled about page that informs the user of the purpose of the tool, and how to use it.
Structure: The main function, AboutText, returns a stack that contains a number of Typography elements, which contain text.
*/
import { Stack, Typography } from "@mui/material";

function AboutText() {
  return (
    <Stack>
      <Typography variant="about_h1">What is record-log?</Typography>
      <Typography variant="about_p">
        This software provides deejays, musicians, and music fans a centralized
        space to track the music they listen to, how they feel about it, and how
        it relates to other music they've encountered. These relations can be
        used to build interesting, thematically driven playlists, smoothly
        transitioned sets, and to keep a customizable diary of all the songs
        they want to remember.
      </Typography>
      <Typography sx={{ pt: 2 }} variant="about_h1">
        How do I use it?
      </Typography>

      <Typography variant="about_p">
        This application centers around the 'track entry,' a storage container
        for all your thoughts and feelings about he music you listen to.
      </Typography>
      <Typography sx={{ pt: 2 }} variant="about_p">
        The Review section is for all of your formal analysis of the track.
      </Typography>
      <Typography sx={{ pt: 2 }} variant="about_p">
        The Thought section is for quick notes about the track for later
        reference, be it the genre, full artist name, BPM, general vibe, of any
        other thought or detail that you may want to include.
      </Typography>
      <Typography sx={{ pt: 2 }} variant="about_p">
        The Rating widget is on a scale of 0-5, giving an easy reminder of your
        high-level feelings about the track.
      </Typography>
      <Typography sx={{ pt: 2 }} variant="about_p">
        Lists and Related Tracks are two different ways to form relations
        between the songs you listen to. It's easy to think of Related Tracks as
        a qualitative representation of your thoughts on the track--you may want
        to link songs with similar keys together for smooth transitions between
        tracks, or maybe you want to represent links between songs that make you
        feel sad, or make you feel energetic. Lists are more discrete
        representations of these relationships, with a specific, overarching
        theme of every list.{" "}
      </Typography>

      <Typography sx={{ pt: 2 }} variant="about_h1">
        Graph and List View
      </Typography>
      <Typography variant="about_p">
        List View provides a visual representation of the lists you specify, and
        provides a tool to create lists easily using a search bar to query the
        entries you've stored.
      </Typography>
      <Typography sx={{ pt: 2 }} variant="about_p">
        Graph View displays the entries and related entry links visually in a
        node-edge format. The graph can be dragged, zoomed, and panned. Clicking
        on a node will bring up the details about the selected entry.
      </Typography>
    </Stack>
  );
}

export default AboutText;
