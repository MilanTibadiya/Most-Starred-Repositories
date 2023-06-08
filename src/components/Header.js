import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Repo from './Repo';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import classes from './Header.module.css';

function Header() {

    const [repo, setRepo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [timeRange, setTimeRange] = useState("1week");
    const [page, setPage] = useState(1);

    const fetchRepoData = async() => {
        const currentDate = new Date();
        let createdDate;
        
        if (timeRange === '1week') {
            createdDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
          } else if (timeRange === '2weeks') {
            createdDate = new Date(currentDate.setDate(currentDate.getDate() - 14));
          } else if (timeRange === '1month') {
            createdDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
          }
          const formattedDate = createdDate.toISOString().split('T')[0];
          setLoading(true);

          try {
            const res = await axios.get(
              `https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc&page=${page}`
            );
            const newRepo = res.data.items;
      
            setRepo((prevRepo) => [
              ...new Set([...newRepo]),
            ]);
          } catch (error) {
            alert("Error while fetching repositories");
          }
          setLoading(false);
    }

    const handleTimeRangeChange = (e) => {
        setTimeRange(e.target.value);
        setRepo([]);
        fetchRepoData()
      };

      useEffect(() => {
        fetchRepoData();
      }, [page]);
    

  return (
    <>
     <div id="home">
     <h1 className={classes.reposHeading}>Github | Repositories</h1>

     <div className={classes.Header}>
        <label htmlFor="timeRange" className={classes.range}>
          Time Range:{" "}
        </label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value="1week">1 Week</option>
          <option value="2weeks">2 Weeks</option>
          <option value="1month">1 Month</option>
        </select>
      </div>
      <h2 className={classes.HeaderRepo}>Most Starred Repositories</h2>
       
      <Repo repo={repo}/>

      {loading && <p className={classes.center}><CircularProgress/></p>}
      
      <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
      className={classes.pageButton}
    >
      <Button  onClick={() => {
          setPage((prev) => prev - 1);
        }}><ArrowBackIosIcon/>
        <a href='#home'>PREV</a></Button>
      <Button onClick={() => {
          setPage((prev) => prev + 1);
        }}><ArrowForwardIosIcon/><a href='#home'>NEXT</a></Button>
    </ButtonGroup>
     </div> 
    </>
  )
}

export default Header;
