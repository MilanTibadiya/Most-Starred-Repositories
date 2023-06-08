import React, { useState } from "react";
import { format } from "date-fns";
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";
import Button from '@mui/material/Button';
import RepoCommit from "./RepoCommit";
import classes from "./Repo.module.css";
import { useSelector } from "react-redux";

const Repo = ({ repo }) => {
  const [selectedRepo, setSelectedRepo] = useState(null);

  const data = useSelector((state) => state.repos.repos);
  // console.log('redux', data)

  const handleRepoSelect = (item) => {
    // if (item?.id === selectedRepo?.id) {
    if (item === selectedRepo) {
      setSelectedRepo(null);
      return;
    }
    setSelectedRepo(item);
  };

  return (
    <>
      {repo?.map((item, i) => (
        <div key={item.id - Math.random()} className={classes.mainContainer}>
          <div className={classes.repoContainer}>
            <div className={classes.repoContainer1}>
              <img src={item.owner.avatar_url} />
              <div className={classes.repoRight}>
                <h2>
                  {item.name}{" "}
                  <span className={classes.repoBadge}>{item.visibility}</span>
                </h2>
                { item.description ?
                  <p className={classes.repoDes}>{item.description}</p>
                  :
                  <p className={classes.repoDes}>Description not available</p>
                }
                <p className={classes.repoStar}>
                  <span className={classes.repoSpan}>
                    Stars-{item.stargazers_count}
                  </span>
                  <span className={classes.repoSpan}>
                    Issues-{item.open_issues_count}
                  </span>
                  <span>
                    Last pushed at{" "}
                    <u>{format(new Date(item.pushed_at), "dd MMMM yyyy")}</u> by{" "}
                    <u>{item.owner.login}</u>
                  </span>
                </p>
              </div>
            </div>
            <Button
              variant="outlined"
              className={classes.repoContainer2}
              onClick={() => handleRepoSelect(item)}
            >
              Activity {"   "}
              {selectedRepo === item ? <AiOutlineDown /> : <AiOutlineRight />}
            </Button>
          </div>
          {selectedRepo === item && <RepoCommit item={item} />}
        </div>
      ))}
    </>
  );
};

export default Repo;
