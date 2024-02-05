const getContestData = async () => {
    return await fetch("https://kontests.net/api/v1/all")
      .then((data) => data.json())
      .then((data) => {
        const currentTime = new Date();
        const upcomingContests = data
          .filter((contest) => new Date(contest.start_time) > currentTime)
          .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
        const relevantData = upcomingContests.map((contest) => {
          const startTime = new Date(contest.start_time);
          const startTimeIST = startTime.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          });
          return `${contest.name} ${contest.site} ${startTimeIST}`;
        });
        console.log({ relevantData });
        document.getElementById("contests").innerHTML = upcomingContests
          .map((contest) => {
            const startTime = new Date(contest.start_time);
            const startTimeIST = startTime.toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            });
            return `<div class="contest">
              <div>${contest.name}</div>
              <div class="site">
                  <div class="bold">${contest.site}</div>
                  <div>${startTimeIST}</div>
              </div>
              <a href=${contest.url} class="url" target="_blank">Go to Contest</a>
          </div>`;
          })
          .join(" ");
        return relevantData;
      })
      .catch((e) => console.log(e));
  };
  
  getContestData();
  