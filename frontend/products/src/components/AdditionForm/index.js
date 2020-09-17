/**
 * IMPORTS
 */
import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Container} from './styles';
import * as actions from '../../actions/dataactions';
import {api} from '../../util/api';

/**
 * CODE
 */
function AdditionForm() {
    // product state
    const [product, setProduct] = useState({});

    // component dispatch
    const dispatch = useDispatch();

    // function to send product as json object to the beckend
    async function handleSubmit(event) {
        // prevent default behavior
        event.preventDefault();

        // call api
        await api
            .post('/products', {
                name: product.name,
                price: product.price,
                qty: product.qty,
            })
            .then((response) => {
                // log result
                console.log(response);

                // dispatch update action
                dispatch(actions.update());
            });
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <h1>Cadastrar Produto</h1>
                <div className="formrow">
                    <TextField
                        label="Produto"
                        variant="outlined"
                        required={true}
                        onChange={(e) => {
                            setProduct({...product, name: e.target.value});
                        }}
                    ></TextField>
                </div>
                <div className="formrow">
                    <TextField
                        inputProps={{step: 0.01, min: 0}}
                        label="Preço"
                        required={true}
                        type="number"
                        variant="outlined"
                        onChange={(e) => {
                            setProduct({
                                ...product,
                                price: Number(e.target.value),
                            });
                        }}
                    ></TextField>
                </div>
                <div className="formrow">
                    <TextField
                        inputProps={{step: 1, min: 0}}
                        label="Quantidade"
                        type="number"
                        variant="outlined"
                        required={true}
                        onChange={(e) => {
                            setProduct({
                                ...product,
                                qty: Number(e.target.value),
                            });
                        }}
                    ></TextField>
                </div>
                <div className="formrow">
                    <Button color="primary" variant="contained" type="submit">
                        Cadastrar
                    </Button>
                </div>
            </form>
        </Container>
    );
}

/**
 * EXPORTS
 */
export default AdditionForm;
