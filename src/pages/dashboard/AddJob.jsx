import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
} from "../../features/job/jobSlice";
import { useEffect } from "react";

function AddJob() {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    setEditJob,
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }

    if (isEditing) {
      dispatch(
        editJob({
          jobId: setEditJob,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }

    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  }

  function handleJobInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(handleChange({ name, value }));
  }

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }
  });

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "edit job" : "add job"} </h3>
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/*company*/}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/*jobLocation*/}
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default AddJob;
