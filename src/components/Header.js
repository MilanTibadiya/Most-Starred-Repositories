import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Repo from './Repo';
import { useDispatch } from 'react-redux';
import { reposAction } from '../store/reposSlicer';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
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
              ...new Set([...prevRepo, ...newRepo]),
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
     <div>
     <h1 className={classes.reposHeading}>Github | Repositories</h1>

     <div className={classes.Header}>
        <label htmlFor="timeRange" className={classes.range}>
          Time Range:
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
      <h2 className={classes.Header}>Most Starred Repositories</h2>
       
      <Repo repo={repo}/>

      {loading && <p className={classes.center}>Loading...<AiOutlineLoading3Quarters/></p>}
      <button className={classes.nextPage}
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
      > Next Page</button>
     </div> 
    </>
  )
}

export default Header;
