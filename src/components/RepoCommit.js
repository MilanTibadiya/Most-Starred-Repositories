import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, CartesianGrid, Legend, ResponsiveContainer, Line, XAxis, YAxis, Tooltip } from "recharts";

import classes from "./RepoCommit.module.css";

const RepoCommit = ({ item }) => {
  const [repoCommit, setRepoCommit] = useState([]);
  const [displayOption, setDisplayOption] = useState("changes");

  const fetchCommitActivity = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${item.owner.login}/${item.name}/stats/code_frequency`
      );
      if (response.data.length > 0) {
        setRepoCommit(response.data);
      }
    } catch (error) {
      alert("there is some error");
    }
  };
  useEffect(() => {
    fetchCommitActivity();
  }, []);

  const handleDisplayOptionChange = (e) => {
    setDisplayOption(e.target.value);
  };

  const data = repoCommit.map((week) => ({
    week: new Date(week[0] * 1000),
    changes: week[1] - week[2], // Total chang = Add + Del
    additions: week[1],
    deletions: -1 * week[2],
  }));
  // console.log('ss',data)
  
  return (
    <div className={classes.containerCommit}>
      <h3>Commit Activity for {item?.name}</h3>

      <div className={classes.select}>
        <div>
          <label htmlFor="displayOption">Display Option:</label>
          <select
            value={displayOption}
            onChange={handleDisplayOptionChange}
          >
            <option value="changes">Changes</option>
            <option value="additions">Additions</option>
            <option value="deletions">Deletions</option>
          </select>
        </div>

        {repoCommit.length === 0 ? 
          <>
            <p>data not available or wait max. 3sec</p>
          </>
         : (
          <>
            <h3>
              Total Number of{" "}
              {displayOption.charAt(0).toUpperCase() + displayOption.slice(1)}
            </h3>
            {/* <ResponsiveContainer> */}
            <LineChart className={classes.linechart} width={500} height={300} data={data}>
            {/* <CartesianGrid /> */}
              <XAxis
                dataKey="week"
                tickFormatter={(date) => date.toLocaleDateString()}
              />
              <YAxis />
              {/* <Legend /> */}
              <Tooltip
                labelFormatter={(date) => date.toLocaleDateString()}
                formatter={(value) => [value, displayOption]}
              />
              <Line type="monotone" dataKey={displayOption} stroke="#8884d8" />
            </LineChart>
            {/* </ResponsiveContainer> */}
          </>
        )}
      </div>
    </div>
  );
};

export default RepoCommit;
