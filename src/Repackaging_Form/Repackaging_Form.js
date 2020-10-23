import axios from 'axios';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol, MDBTableBody, MDBTable, MDBIcon, MDBBtn } from "mdbreact";

import './Repackaging_Form.css'
import Aux from '../hoc/Aux/Aux'


class Repackaging_Form extends Component {
    state = {
        weight: '',
        quantity: 3,
        shopsName: [],
        costsList: ["Particular", "Raw Material", "Wastage",
                    "Fumigation", "Label Printing", "Packing Labour",
                    "Primary PM Cost", "Secondary PM Cost", 
                    "Final FG Cost", "Conversion Cost"],
        integerError: false,
        costError: false,
        allDetails: {Seller_Shop: "", Source_SKU: "", Destination_SKU: "", Weight_of_Source_SKU: ""},
        inputRows: []
    }

    addRowCostsInputHandler = () => {
        let rows = this.state.inputRows;
        rows.push(1)
        console.log(rows)
        this.setState({inputRows: rows});
    }

    deleteRowHandler = () => {
        let rows = this.state.inputRows;
        rows.pop();
        this.setState({inputRows: rows});
    }

    allcosts() {
        return this.state.costsList.map((cost, index) => {
            return <td key={index}><label style={{fontWeight: "bold"}} htmlFor={cost}>{cost}</label></td>
        });
    }
    integerErrorHandler = () => {
        this.setState({integerError: true})
    }
    allInputCosts() {
        return this.state.costsList.map((cost, index) => {
            return <td key={index}><input type="text" id={cost} onChange={(event) => this.costValidationHandler(event)} className="smallroundbox text-center ml-0 form-control" /></td>
        });
    }

    inputCosts = () => {
        return this.state.inputRows.map((value, index) => {
            return <tr key={index}>
                        {this.allInputCosts()}
                        <td onClick={this.deleteRowHandler}><i className="fas fa-times"></i></td>
                    </tr>
        });
    }

    sampleInputCosts() {
        return this.state.inputRows.map((value, index1) => {
            return this.state.costsList.map((cost, index2) => {
                return <td key={index2}><input type="text" id={cost} onChange={(event) => this.costValidationHandler(event)} className="smallroundbox text-center ml-0 form-control" /></td>
            });
        });
    }

    inputChangedHandler = (event) => {
        const value = event.target.value;
        this.setState({integerError: false});
        if (value.match(/^[0-9]+$/) !== null ) {
            this.setState({weight : event.target.value, integerError: false});
            this.state.allDetails.Weight_of_Source_SKU = event.target.value;
        }
        else {
            this.setState({weight: ''})
            if (value!=''){
                this.integerErrorHandler();
            }
        }
        
    }

    costValidationHandler = (event) => {
        const value = event.target.value;
        this.setState({costError: false});
        if (value.match(/^[0-9]\d*(\.\d+)?$/) !== null ) {
            this.setState({costError: false})
        }
        else {
            if (value!=''){
                this.setState({costError: true})
            }
        }
    } 

    integerErrorHandler = () => {
        this.setState({integerError: true})
    }

    sellerShopHandler = (event) => {
        let a = null;
        let detail = {...this.state.allDetails};
        let value = event.target.value;
        this.state.shopsName.map((shop, index) => {
            a = [value, shop.shop_name]
            if (a[0] === a[1]){
                detail.Seller_Shop = shop.shop_name
            }
        })
        this.setState({allDetails: detail});
    }

    sourceSKUHandler = (event) => {
        let detail = {...this.state.allDetails};
        if (event.target.value === "Toor Dal") {
            detail.Source_SKU = "Toor Dal 50 Kgs";
        }
        if (event.target.value === "Moong Dal") {
            detail.Source_SKU = "Moong Dal 50 Kgs";
        }
        this.setState({allDetails: detail});
        // this.state.allDetails = detail;
    }

    destinationSKUHandler = (event) => {
        let detail = {...this.state.allDetails};
        if (event.target.value === "gf toor dal") {
            detail.Destination_SKU = "Gramfactory Toor Dal 1 Kg";
        }
        if (event.target.value === "gf moong dal") {
            detail.Destination_SKU = "Gramfactory Toor Dal 500 grams";
        }
        this.setState({allDetails: detail});
        // this.state.allDetails = detail;
    }

    componentDidMount () {
        axios.get('http://127.0.0.1:8080/wms/api/shop_name/')
                .then(response => {
                    this.setState({shopsName: response.data.data});
                });
        this.inputCosts();
    }

    shops() {
        return this.state.shopsName.map((shop, index) => {
            return <option key={index} value={shop.shop_name}>{shop.shop_name}</option>
        });
    }
  
    render() {
        let integerError = this.state.integerError ? <p style={{fontWeight: "bold", color: "blue"}}>Please Enter a valid value!</p> : null
        let costError = this.state.costError ? <span style={{fontWeight: "bold"}} className="d-block p-2 bg-primary text-white"><img style={{width: "30px"}} src="https://img.icons8.com/color/48/000000/error.png"/>Please Enter an valid Cost!</span> : null
        return (
            <Aux>
                <div>
                    <MDBRow>
                        <MDBCol xs="6" sm="4">
                            <MDBTable borderless className="m-5">
                                <MDBTableBody>
                                    <tr>
                                        <td style={{fontWeight: "bold"}}><label htmlFor="seller_shop" className="mt-2">Seller Shop</label></td>
                                        <td>
                                            <select onChange={this.sellerShopHandler} id="seller_shop" className="browser-default custom-select ml-0">
                                                <option style={{color: "blue"}}>Select Shop</option>
                                                {this.shops()}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{fontWeight: "bold"}}><label htmlFor="source_sku" className="mt-2">Source SKU</label></td>
                                        <td>
                                            <select onChange={this.sourceSKUHandler} id="source_sku" className="browser-default custom-select ml-0">
                                                <option style={{color: "blue"}}>Select Source SKU</option>
                                                <option value="Toor Dal">Toor Dal 50 Kgs</option>
                                                <option value="Moong Dal">Moong Dal 50 Kgs</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{fontWeight: "bold"}}><label for="destination_sku" className="mt-2">Destination SKU</label></td>
                                        <td>
                                            <select onChange={this.destinationSKUHandler} id="destination_sku" className="browser-default custom-select ml-0">
                                                <option style={{color: "blue"}}>Select Destination SKU</option>
                                                <option value="gf toor dal">Gramfactory Toor Dal 1 Kg</option>
                                                <option value="gf moong dal">Gramfactory Toor Dal 500 grams</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{fontWeight: "bold"}}><label for="weight" className="mt-2">Weight of Source SKU to be repackaged(Kg): </label></td>
                                        <td><input type="text" id="weight" className="roundbox text-center ml-0 form-control" onChange={(event) => this.inputChangedHandler(event)}/></td>
                                        <td>{integerError}</td>
                                        
                                    </tr>
                                    
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCol>
                        <MDBCol xs="0" sm="2"></MDBCol>
                        <MDBCol xs="6" sm="4">
                            <MDBTable borderless className="m-5">
                                <MDBTableBody>
                                    <tr>
                                        <td><label for="seller_shop" className="mt-2">Available Source SKU Weight(Kg)</label></td>
                                        <td><p type="text" id="weight" className="roundbox text-center">{this.state.quantity * this.state.weight}</p></td>
                                    </tr>
                                    <tr>
                                        <td><label for="source_sku" className="mt-2">Available Source SKU Qty(pcs)</label></td>
                                        <td><p type="text" id="weight" className="roundbox text-center">{this.state.quantity}</p></td>
                                    </tr>
                                    <tr>
                                        <td><label for="destination_sku" className="mt-2">Created Destination SKU Qty(pcs)</label></td>
                                        <td><p type="text" id="weight" className="roundbox text-center">{this.state.weight}</p></td>
                                    </tr>
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCol>
                        <MDBCol xs="0" sm="2"></MDBCol>
                    </MDBRow>
                    <span className="d-block p-1 text-white" style={{backgroundColor:"#79aec8"}}>
                        <p style={{fontWeight: "bold"}} className="m-2 ml-1">Cost (per Kg)</p>
                    </span>
                    {costError}
                    <MDBRow>
                        <MDBCol size="12">
                            <MDBTable responsive>
                                <MDBTableBody>
                                    <tr>
                                        {this.allcosts()}
                                        <td>DELETE?</td>
                                    </tr>
                                    <tr>
                                        {this.allInputCosts()}
                                    </tr>
                                    {this.inputCosts()}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                                <MDBIcon icon="plus" className="m-5" style={{color: "blue"}} onClick={this.addRowCostsInputHandler}>Add Another Cost</MDBIcon>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="2" md="4" lg="6" xl="8"></MDBCol>
                        <MDBCol sm="10" md="8" lg="6" xl="4">
                            <MDBTable borderless>
                                <MDBTableBody>
                                    <tr>
                                        {this.state.weight && this.state.allDetails.Seller_Shop && this.state.allDetails.Source_SKU && this.state.allDetails.Destination_SKU ? 
                                            <div>
                                                <td><MDBBtn color="secondary">Save and add another</MDBBtn></td>
                                                <td><Link to={{
                                                    pathname: "/repackaging_data",
                                                    search: '?data=' + [this.state.allDetails.Seller_Shop, this.state.allDetails.Source_SKU,
                                                                    this.state.allDetails.Destination_SKU, this.state.allDetails.Weight_of_Source_SKU]
                                                }}>
                                                <MDBBtn color="secondary">Save and View</MDBBtn></Link></td>
                                                <td><MDBBtn color="secondary">Save</MDBBtn></td>
                                            </div>
                                        :
                                            <div>
                                                <td><MDBBtn disabled color="secondary">Save and add another</MDBBtn></td>
                                                <td><MDBBtn disabled color="secondary">Save and View</MDBBtn></td>
                                                <td><MDBBtn disabled color="secondary">Save</MDBBtn></td>
                                            </div>
                                            
                                        }
                                    </tr>
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                </div> 
            </Aux>
        )
    }
}

export default withRouter(Repackaging_Form);