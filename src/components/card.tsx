interface Props {
  caption: string;
  imgUrl: string;
}

export const Card = ({ caption, imgUrl }: Props) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-2by3">
          <img width="622px" height="933px" src={imgUrl} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          {caption.slice(0, 10)}
          {caption.length > 10 && "..."}
        </div>
      </div>
    </div>
  );
};
