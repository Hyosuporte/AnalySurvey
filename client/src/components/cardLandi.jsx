// eslint-disable-next-line react/prop-types
function Card({ title, content, img }) {
  return (
    <div className="card-landig">
      <div>
        <h2>
          {title} <span>.</span>
        </h2>
        <p>{content} </p>
      </div>
      <img src={img} alt="" />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
export function CardList({ data }) {
  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <section className="card-list-landig">
      {data.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          content={item.content}
          img={item.img}
        />
      ))}
    </section>
  );
}
