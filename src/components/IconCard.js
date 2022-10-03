export const IconCard = (props) => {
  const onClickChangeCategory = () => {
    // call the callback prop passed down from the scoreboard
    props.changeCategoryFilter(props.name);
  };

  return (
    <div style={{ width: "6rem", margin: "1rem" }}>
      {" "}
      <div
        className="card text-center btn btn-outline-secondary "
        onClick={onClickChangeCategory}
      >
        <div className="card-body">
          <div style={{ fontSize: "2rem" }}>{props.icon}</div>
        </div>
        <p className="card-text">{props.name} </p>
      </div>
    </div>
  );
};
