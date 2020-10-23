import React, {Component}  from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTableBody, MDBTable, MDBTableHead} from "mdbreact";


class Repackaging_Data extends Component {
    state = {
        Seller_Shop: "",
        Source_SKU: "",
        Destination_SKU: "",
        Weight_of_SKU_to_be_repackaged: ""
    }

    componentWillMount() {
        let detail = null;
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            detail = (param[1].split(','))
        }
        this.state.Seller_Shop = detail[0]
        this.state.Source_SKU = detail[1]
        this.state.Destination_SKU = detail[2]
        this.state.Weight_of_SKU_to_be_repackaged = detail[3]

        console.log(this.state)


    }
    render() {
        return (
            <div>
                <MDBContainer>
                <MDBTable style={{marginTop:"50px"}}>
                    <MDBTableHead>
                        <tr style={{textAlign: "center", fontWeight: "bold"}}><h3>Seller Shop: {this.state.Seller_Shop}</h3></tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                            <td>Source SKU</td>
                            <td>{this.state.Source_SKU}</td>
                        </tr>
                        <tr>
                            <td>Destination_SKU</td>
                            <td>{this.state.Destination_SKU}</td>
                        </tr>
                        <tr>
                            <td>Weight_of_SKU_to_be_repackaged(Kg)</td>
                            <td>{this.state.Weight_of_SKU_to_be_repackaged}</td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>
                </MDBContainer>
            </div>
        )
    }
}

export default Repackaging_Data;