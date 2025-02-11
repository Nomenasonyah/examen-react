import Products from "../Products/Products";
import "./Store.scss"

const Store: React.FC = () => {
    return (
      <div className="store">
       
        <h1>Store</h1>
        <div className="p-btn_store">

        <p className="p-title">Welcome to the store section!</p>
        <button className="btnCreate_store">Create</button>
        </div>
        <Products hideTitle={true} image={true} customClass="store_style" 
        price={true}
         />
      </div>
    );
  };
  
  export default Store;
  