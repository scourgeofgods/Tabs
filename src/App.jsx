import { useState, useEffect } from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";
const url = "https://course-api.com/react-tabs-project";

function App() {
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data);
      setLoading(false);
      setJobs(data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  if (loading) {
    return (
      <div>
        <div className="container">
          <div className="row my-5 text-center">
            <div className="col-md-12 ">
              <h1>Loading...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const { id, company, title, dates, duties } = jobs[value];
  return (
    <div className="tabs">
      <div className="vh-100 container">
        <div className="row justify-content-center">
          <div className="col-8 text-center">
            <div className="d-flex flex-column align-items-center heading-text justify-content-center  p-3">
              <h1>Tabs</h1>
              <hr className="w-50 border-1 border-bottom border-2 border-white" />
            </div>
          </div>
        </div>
        <div className="row text-lg-start h-50 border text-center">
          {/* btn Container */}
          <div className="col-lg-4 d-flex flex-lg-column justify-content-center align-items-center h-100 gap-3">
            {" "}
            <div className="text-center ">
              <h3>{title}</h3>
              <h4>{company}</h4>
              <p>{dates}</p>
            </div>
            {jobs.map((job, index) => {
              return (
                <button
                  key={job.id}
                  onClick={() => setValue(index)}
                  className={`btn btn-outline-secondary  ${
                    index === value && "active"
                  }`}
                >
                  {job.company}
                </button>
              );
            })}
          </div>
          <div className="col-lg-8 d-flex flex-column justify-content-center ">
            {duties.map((duty, index) => {
              return (
                <div key={index} className="row justify-content-center">
                  <MdOutlineDoubleArrow
                    className="col-3"
                    style={{ width: 50, height: 50 }}
                  ></MdOutlineDoubleArrow>
                  <p className=" col-9 text-start ">{duty}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
