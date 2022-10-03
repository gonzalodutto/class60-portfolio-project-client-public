export const NewsCard = (props) => {
  return (
    <div
      className="card mb-3"
      style={{ maxWidth: "1300px", maxHeight: "250px" }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={props.imageUrl}
            className="img-fluid rounded-start"
            alt="yiji"
            style={{ width: "100%", height: "248px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.title} </h5>
            <p className="card-text">{props.content.substring(0, 320)}...</p>
            <p className="card-text">
              <small className="text-muted">Writted 3 mins ago by</small>
            </p>
            <a href={props.url} target="_blank" rel="noreferrer">
              <button type="button" className="btn btn-outline-success">
                Read Article
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// npx sequelize-cli model:generate --name article --attributes title:string,content:text,imageUrl:text
