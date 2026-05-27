import Photo from '../Photo/Photo.jsx';

const ProdutCard = () => {
  return (
    <>
      <Photo
        type="main"
        width={this.props.type === 'main' ? 240 : 160}
        height={this.props.type === 'main' ? 270 : 180}
      />
      <h2>title</h2>
    </>
  );
};

export default ProdutCard;
