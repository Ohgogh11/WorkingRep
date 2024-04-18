import React, { Component } from "react";
import Skeleton from "./skeleton";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      products: [],
    };
  }

  componentDidMount() {
    setTimeout(async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        this.setState({ products: response.data, loading: false });
      } catch (error) {
        console.error("Error fetching products:", error);
        this.setState({ loading: false });
      }
    }, 2000);
  }

  loadProducts() {
    return this.state.loading
      ? Array.from({ length: 21 }).map((_, index) => (
          <div key={`skeleton ${index}`}>
            <Skeleton />
          </div>
        ))
      : // TODO: need to add individual Product page when pressing a product
        this.state.products.map((product) => (
          <Link
            to={{ pathname: `/products/${product.id}` }}
            key={product.id}
            className="bg-gray-200 p-4 rounded shadow cursor-pointer">
            <img src={product.image} alt="" />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            {/* Add more product details here */}
          </Link>
        ));
  }

  render() {
    return <>{this.loadProducts()}</>;
  }
}
